# Navigation access in narrow previews

## Diagnosis
The rendered home page hid desktop links at widths below 960 CSS pixels. Its only general-menu access then was a small, unlabeled hamburger icon. DOM checks at 650, 800 and 950 found that icon visible inside the page; complete button disappearance and the owner's reported clipping were not reproducible in the sandbox. Previous viewport-only breakpoints also did not adapt when a parent container was narrower than the browser viewport.

## Correction
- A labeled, outlined Menú control remains visible at every width, independent of desktop-link visibility.
- The main grid reserves its own column for the control.
- Container queries select the compact layout from the actual header width, including narrow embedding containers.
- The preparation row reserves space for its disclosure and constrains/wraps its label.
- Radix menus retain expanded state, keyboard navigation, Escape dismissal and focus restoration; all existing destinations and account access remain in the general menu.

## Evidence
Run `python3 src/test/header-browser-regression.py` against the running preview. Screenshots and execution evidence go under `/tmp/browser/header-regression/`.

Verified four public pages (`/`, `/simulacros`, `/biblioteca`, `/planes`) at 650, 800, 950, 1100, 1280 and 1440 CSS pixels: actionable menu, full destinations, bounded controls, no horizontal overflow, keyboard opening/dismissal and navigation to existing pages. Also verified a 650-pixel header container inside a 1440-pixel viewport.

The profile fixture changes only temporary browser DOM geometry; it does not create users, inject a session or establish authenticated access. Real signed-in behavior remains unverified. No account settings, roles, payments or content were changed.