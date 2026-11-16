"""Run with python3 src/test/header-browser-regression.py against the local preview.
The signed-in-layout fixture tests geometry only, never authentication or permissions.
"""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path('/tmp/browser/header-regression')
OUT.mkdir(parents=True, exist_ok=True)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        for width in [650, 800, 950, 1100, 1280, 1440]:
            await page.set_viewport_size({'width': width, 'height': 1800})
            for route in ['/', '/simulacros', '/biblioteca', '/planes']:
                await page.goto('http://localhost:8080' + route, wait_until='domcontentloaded')
                await page.wait_for_timeout(2000)
                menu = page.get_by_role('button', name='Abrir menú general')
                assert await menu.is_visible(), (width, route)
                rect = await menu.bounding_box()
                assert rect['x'] >= 0 and rect['x'] + rect['width'] <= width
                assert await menu.inner_text() == 'Menú'
                assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
                preparation = page.locator('.profile-mobile-button')
                if await preparation.is_visible():
                    box = await preparation.bounding_box()
                    assert box['x'] + box['width'] <= width
                await menu.focus()
                await page.keyboard.press('Enter')
                panel = page.get_by_role('menu', name='Abrir menú general')
                await panel.wait_for(state='visible')
                for label in ['Inicio', 'Concursos', 'Formación', 'Simulacros', 'Biblioteca', 'Planes', 'Mi cuenta', 'DOCENTE IA', 'Ingresar', 'Registrarse']:
                    assert await panel.get_by_role('menuitem', name=label, exact=True).is_visible()
                if route == '/':
                    await page.screenshot(path=str(OUT / f'open-menu-{width}.png'))
                await page.keyboard.press('Escape')
                await page.wait_for_function('document.querySelectorAll("[role=menu][data-state=open]").length === 0')
                assert await menu.get_attribute('aria-expanded') == 'false'
                await page.wait_for_function('document.activeElement?.getAttribute("aria-label") === "Abrir menú general"')
                if route == '/':
                    await page.screenshot(path=str(OUT / f'home-{width}.png'))
                # Geometry-only fixture: no session, user or authorization is created.
                await page.evaluate('''() => {
                    const label = document.querySelector('.preparation-label');
                    label.outerHTML = '<div class="profile-selector"><label>Perfil activo</label><select aria-label="Perfil activo simulado"><option>Docente en ejercicio / ascenso y reubicación</option></select></div>';
                }''')
                selector = page.get_by_role('combobox', name='Perfil activo simulado')
                box = await selector.bounding_box()
                assert box['x'] >= 0 and box['x'] + box['width'] <= width
                assert await menu.is_visible()
                print(width, route, 'public and simulated profile geometry OK')
            await page.goto('http://localhost:8080/', wait_until='domcontentloaded')
            await page.wait_for_timeout(2000)
            menu = page.get_by_role('button', name='Abrir menú general')
            for label, path in [('Biblioteca', '/biblioteca'), ('Planes', '/planes'), ('DOCENTE IA', '/docente-ia'), ('Ingresar', '/ingresar'), ('Registrarse', '/registro')]:
                await menu.click()
                await page.get_by_role('menuitem', name=label, exact=True).click()
                await page.wait_for_url('**' + path)
                await page.wait_for_function('document.querySelectorAll("[role=menu][data-state=open]").length === 0')
            await menu.click()
            await page.get_by_role('menuitem', name='Simulacros', exact=True).hover()
            await page.get_by_role('menuitem', name='Aspirante a rector', exact=True).click()
            await page.wait_for_url('**/simulacros/rector')
        # Parent container narrower than the viewport: container queries must still work.
        await page.set_viewport_size({'width': 1440, 'height': 1800})
        await page.goto('http://localhost:8080/', wait_until='domcontentloaded')
        await page.wait_for_timeout(2000)
        await page.locator('header').evaluate("h => h.style.width = '650px'")
        assert not await page.locator('.desktop-nav').is_visible()
        assert await page.get_by_role('button', name='Abrir menú general').is_visible()
        await page.locator('header').screenshot(path=str(OUT / 'container-650-in-1440.png'))
        assert not errors, errors
        print('24 page/width checks, geometry fixtures, keyboard, full menu, real routes and narrow parent container passed')
        await browser.close()

asyncio.run(main())