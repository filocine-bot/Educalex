"""Visible Home regression: run against the running local preview."""
import asyncio
from pathlib import Path
from playwright.async_api import async_playwright

async def main():
    out = Path('/tmp/browser/home-link')
    out.mkdir(parents=True, exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 1800})
        for width in [390, 650, 800, 950, 1280]:
            await page.set_viewport_size({'width': width, 'height': 1800})
            for route in ['/biblioteca', '/simulacros', '/planes', '/formacion/guia-34-pmi', '/mi-cuenta', '/concursos/rector', '/simulacros/rector', '/biblioteca/guias-men']:
                await page.goto('http://localhost:8080' + route, wait_until='domcontentloaded')
                await page.wait_for_timeout(1800)
                print("checking", width, route, page.url, flush=True)
                home = page.locator('header .header-home-link')
                await home.wait_for(state='visible')
                assert await home.get_attribute('href') == '/'
                box = await home.bounding_box()
                assert box['x'] >= 0 and box['x'] + box['width'] <= width
                assert await page.get_by_role('button', name='Abrir menú general').is_visible()
                assert await page.locator('header .header-brand').get_attribute('href') == '/'
                assert not await page.evaluate('document.documentElement.scrollWidth > innerWidth')
                await home.click()
                await page.wait_for_url('http://localhost:8080/')
                assert await page.locator('header .header-home-link').is_visible()
            await page.locator('header').screenshot(path=str(out / f'header-{width}.png'))
            print(width, '8 deep routes: visible Home and return to / passed')
        await page.goto('http://localhost:8080/pagina-inexistente', wait_until='domcontentloaded')
        await page.wait_for_timeout(1500)
        home = page.get_by_role('navigation', name='Navegación de recuperación').get_by_role('link', name='Inicio', exact=True)
        assert await home.is_visible()
        await home.click()
        await page.wait_for_url('http://localhost:8080/')
        print('40 route/width cases plus independent 404 Home passed; account checked signed-out only')
        await browser.close()

asyncio.run(main())