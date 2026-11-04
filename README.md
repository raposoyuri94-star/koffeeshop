# Kofeeshop

A complete React café redesign inspired by [Sunbeam Bagels](https://sunbeambagels.com/): oversized soft serif typography, large food photography, a black, gray, and white palette, and a playful coffee character.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
npm test
```

Open the development URL at `/koffeeshop/`. Browser tests use installed Google Chrome and launch the production preview automatically, so build before testing. The suite checks eight screen sizes, image loading, four menu categories, food links, mobile navigation, keyboard focus in the catering dialog, and reduced motion.

## Add your images and shop details

Image paths and descriptions are centralized in `src/content.js`. Replace the temporary files in `public/images/kofeeshop/`, or change their paths in that file:

| File | Placement |
| --- | --- |
| `cafe.jpg` | Full-width hero |
| `coffee.jpg` | Coffee category |
| `pastries.jpg` | Breakfast category |
| `sandwich.jpg` | Lunch category |
| `gather.jpg` | Our story |

Update the alt descriptions when replacing photos. Product names, copy, and sample prices also live in `src/content.js`. The catering dialog and footer copy live in `src/App.jsx`. The menu and catering options are concept content; ordering and payment services are not connected. Add the real location and opening hours to the footer when available.

## Design direction

- Colors: black `#000000`, white `#ffffff`, soft gray `#f2f2f2`, gray `#d6d6d6`, light gray `#e6e6e6`. Photos retain their original colors.
- Type: Fraunces at weight 900 for the brand and headlines; DM Sans for navigation, descriptions, and prices. Fonts are hosted locally.
- Layout: a full-bleed café hero with left-aligned copy, a centered introduction with three food photos, a split photo/story section, a browsable menu, and a generous wordmark footer. Sections stack on mobile.
- Character: an original SVG coffee cup, flower mark, and a user-triggered coffee-bean shower. Reduced-motion settings disable animation.

The reference informed the prominent serif typography, food focus, and playful interaction. Kofeeshop uses its own copy, illustration, palette, and images.

## Assets

The temporary photographs come from Unsplash and are stored locally, ready for replacement:

- [Café hero](https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb)
- [Coffee](https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd)
- [Croissants](https://images.unsplash.com/photo-1555507036-ab1f4038808a)
- [Sandwiches](https://images.unsplash.com/photo-1528735602780-2552fd46c7af)
- [Café interior](https://images.unsplash.com/photo-1554118811-1e0d58224f24)

[Unsplash license](https://unsplash.com/license). Fraunces and DM Sans are distributed under the SIL Open Font License; their licenses are included in `public/fonts/`. Earlier project image assets are retained but are not shown by this design.

## GitHub Pages

The existing `/koffeeshop/` Vite base path and GitHub Pages workflow are retained. In repository Settings → Pages, select GitHub Actions. Push to `main` or manually run **Deploy Kofeeshop to GitHub Pages** to deploy `dist/`.

No deployment was performed as part of the redesign. Screenshots and browser reports are ignored by Git.
