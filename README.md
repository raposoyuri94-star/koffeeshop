# Kofeeshop

A complete React café redesign inspired by [Sunbeam Bagels](https://sunbeambagels.com/): oversized soft serif typography, large food photography, a black, gray, and white palette, and a playful coffee character.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
npm test
```

Open the development URL at `/koffeeshop/`. Browser tests use installed Google Chrome and launch the production preview automatically, so build before testing. The suite checks eight screen sizes, image loading, three menu pages and their full-size links, section navigation, mobile navigation, keyboard focus in the events dialog, and reduced motion. The website uses Portuguese for Mozambique (`pt-MZ`).

## Source structure

```text
src/
  App.jsx              Page composition and shared dialog state
  main.jsx             React entry point
  style.css            Stylesheet imports in cascade order
  components/          Header, footer, branding, dialog, and coffee animation
  sections/            Hero, story, menu, and events
  data/                Images, menu items, and event options
  hooks/               Coffee animation state and timer
  styles/              Base, shared, and section styles with their media queries
```

Navigation state belongs to `components/SiteHeader.jsx`, and menu selection belongs to `sections/MenuSection.jsx`. The seasonal feature stays with the menu section. `App.jsx` connects the page sections, the shared events dialog, and the coffee animation.

## Add your images and shop details

Image paths and Portuguese descriptions are centralized in `src/data/images.js`. The shop's supplied images are used from `public/images/`:

| File | Placement |
| --- | --- |
| `kofee 3.jpeg` | Full-width hero with friends and iced coffees |
| `Koffee 2.jpeg` | Main story photo with coffee and a laptop |
| `kofee 4.jpeg` | Inset story photo with iced matcha |
| `Koffee 5.jpg` | Sandwich photo in the events section |
| `Koffee 8.jpg` | Coffee and chocolate menu page |
| `koffee 7.jpg` | Matcha and drinks menu page |
| `koffee 6.jpg` | Food menu page |
| `Koffe.jpeg` | Pumpkin spice poster beside the menu, with a full-size link |

Update the alt descriptions when replacing photos. Menu page metadata and a selection of items with prices transcribed from the supplied menus live in `src/data/menu.js`. The complete original menu pages open at full size from the image or its text link. Prices are shown in meticais (MT); paired prices follow those printed in the menu. Event options live in `src/data/catering.js` and remain illustrative. Page copy lives with its section in `src/sections/`, and the dialog and footer copy live in their respective files in `src/components/`. Ordering and payment services are not connected. Add the real location and opening hours to `src/components/SiteFooter.jsx` when available.

## Design direction

- Colors: black `#000000`, white `#ffffff`, soft gray `#f2f2f2`, gray `#d6d6d6`, light gray `#e6e6e6`. Photos retain their original colors.
- Type: Fraunces at weight 900 for the brand and headlines; DM Sans for navigation, descriptions, and prices. Fonts are hosted locally.
- Layout: a full-bleed café hero with left-aligned copy, a split photo/story section, a browsable menu with a seasonal poster, events, and a generous wordmark footer. Sections stack on mobile. The former “Something good” favorites section and its navigation links have been removed.
- Character: an original SVG coffee cup, flower mark, and a user-triggered coffee-bean shower. Reduced-motion settings disable animation.
- Copy: conversational Portuguese built around shared iced coffees and the catch-up that runs a little longer, led by "Era só um café". Buttons and links use text without arrow icons. Decorative punctuation, trademark stamps, and repeated flower ornaments have been removed.

The reference informed the prominent serif typography, food focus, and playful interaction. Kofeeshop uses its own copy, illustration, palette, and images.

## Assets

The supplied shop images are stored locally in `public/images/`. Original menu artwork and the pumpkin spice poster retain their proportions and can be opened at full size.

The original placeholder photographs from Unsplash are retained in `public/images/kofeeshop/` for reference:

- [Café hero](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb)
- [Coffee](https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd)
- [Croissants](https://images.unsplash.com/photo-1555507036-ab1f4038808a)
- [Sandwiches](https://images.unsplash.com/photo-1528735602780-2552fd46c7af)
- [Café interior](https://images.unsplash.com/photo-1554118811-1e0d58224f24)

[Unsplash license](https://unsplash.com/license). Fraunces and DM Sans are distributed under the SIL Open Font License; their licenses are included in `public/fonts/`.

## GitHub Pages

The existing `/koffeeshop/` Vite base path and GitHub Pages workflow are retained. In repository Settings → Pages, select GitHub Actions. Push to `main` or manually run **Deploy Kofeeshop to GitHub Pages** to deploy `dist/`.

No deployment was performed as part of the redesign. Screenshots and browser reports are ignored by Git.
