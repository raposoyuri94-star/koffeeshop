# Future

Future is the Kofeeshop website, hosted in the [Koffeeshop-future repository](https://github.com/raposoyuri94-star/Koffeeshop-future).

A complete React café redesign inspired by [Sunbeam Bagels](https://sunbeambagels.com/): oversized soft serif typography, large food photography, a black, gray, and white palette, and a playful coffee character.

## Develop and verify

```sh
npm ci
npm run dev
npm run build
npm test
```

Open the development URL at `/Koffeeshop-future/`. Browser tests use installed Google Chrome and launch a dedicated production preview on port 5175, so build before testing. The suite checks eight screen sizes, deployed asset paths, image loading, three menu pages and their full-size links, section navigation, mobile navigation across screen sizes, keyboard focus in the events dialog, and reduced motion. The website uses Portuguese for Mozambique (`pt-MZ`).

## Source structure

```text
src/
  App.jsx              Page composition and shared dialog state
  main.jsx             React entry point
  components/          Header, footer, dialog, and coffee animation
    brand/             Logo, illustration, and Instagram icon
  sections/            Hero, story, menu, and events
  data/                Images, menu pages, and event options
  hooks/               Coffee animation state and timer
  styles/              index.css imports base, shared, and section styles
```

Navigation state belongs to `components/SiteHeader.jsx`, and menu selection belongs to `sections/MenuSection.jsx`. The seasonal feature stays with the menu section. `App.jsx` connects the page sections, the shared events dialog, and the coffee animation.

## Add your images and shop details

Image paths and Portuguese descriptions are centralized in `src/data/images.js`. The shop's supplied images are used from `public/images/`:

| File | Placement |
| --- | --- |
| `kofee 3.jpeg` | Hero poster and still-image fallback with friends and iced coffees |
| `Koffee 2.jpeg` | Main story photo with coffee and a laptop |
| `kofee 4.jpeg` | Inset story photo with iced matcha |
| `Koffee 5.jpg` | Sandwich photo in the events section |
| `Koffee 8.jpg` | Coffee and chocolate menu page |
| `koffee 7.jpg` | Matcha and drinks menu page |
| `koffee 6.jpg` | Food menu page |
| `Koffe.jpeg` | Pumpkin spice poster beside the menu, with a full-size link |

Update the alt descriptions when replacing photos. Menu page metadata lives in `src/data/menu.js`. Each category displays its original menu image and a short caption; clicking the image opens an image viewer with zoom, a visible Close button, Escape dismissal, and backdrop dismissal. Products and prices are shown in the supplied artwork. Event options live in `src/data/catering.js` and remain illustrative. Page copy lives with its section in `src/sections/`, and the dialog and footer copy live in their respective files in `src/components/`. Ordering and payment services are not connected. Add the real location and opening hours to `src/components/SiteFooter.jsx` when available.

## Design direction

- Colors: black `#000000`, white `#ffffff`, soft gray `#f2f2f2`, gray `#d6d6d6`, light gray `#e6e6e6`. Photos retain their original colors.
- Type: Fraunces at weight 900 for the brand and headlines; DM Sans for navigation, descriptions, and prices. Fonts are hosted locally.
- Layout: a full-bleed café hero with left-aligned copy, a split photo/story section, a browsable menu with a seasonal poster, events, and a generous wordmark footer. Sections stack on mobile. The former “Something good” favorites section and its navigation links have been removed.
- Branding: the supplied Koffee logo is used in the header and footer, with the Instagram story ring removed. The coffee-bean favicon follows the logo. The header displays a dark version against its light background; the footer retains the original white artwork on black.
- Character: an original SVG coffee cup and a user-triggered coffee-bean shower. Reduced-motion settings disable animation.
- Copy: conversational Portuguese built around shared iced coffees and the catch-up that runs a little longer, led by "Era só um café". Buttons and links use text without arrow icons. Decorative punctuation, trademark stamps, and repeated flower ornaments have been removed.

The reference informed the prominent serif typography, food focus, and playful interaction. Kofeeshop uses its own copy, illustration, palette, and images.

## Assets

The hero uses the supplied six-second clip at `public/videos/koffee-hero.mp4`, with its audio removed and MP4 metadata positioned for streaming. It autoplays silently, loops, and plays inline on mobile. Reduced-motion preferences show the original hero photo without downloading the video; playback errors also leave the photo visible.

The website logo is stored at `public/images/koffee-logo.png`. It was cleaned from the supplied Instagram screenshot using the built-in image editing tool, preserving the wordmark, coffee beans, and tagline while removing the colored story ring.

The supplied shop images are stored locally in `public/images/`. Original menu artwork and the pumpkin spice poster retain their proportions and open in the same closable image viewer, without leaving the website.

Font licenses are included in `public/fonts/`.

## GitHub Pages

The local Vite base path is `/Koffeeshop-future/`. GitHub Actions derives it from `GITHUB_REPOSITORY` so deployment asset paths follow the actual repository name. In repository Settings → Pages, select GitHub Actions. Push to `main` or manually run **Deploy Future to GitHub Pages** to deploy `dist/`.

Build output, screenshots, and browser reports are ignored by Git.
