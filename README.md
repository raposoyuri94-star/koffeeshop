# Morrow Coffee

A responsive React and GSAP coffee shop concept with a brown and cream palette, a featured latte, drink categories, and a coffee guide. The bag-and-cup image remains static. Motion respects reduced-motion preferences.

## Local development

```sh
npm ci
npm run dev
```

Open the printed URL at `/koffeeshop/`.

## Build and verify

```sh
npm run build
npm run preview
npx playwright test
```

The Playwright suite starts a production preview automatically and uses installed Google Chrome. It checks eight phone, tablet, landscape, and desktop viewport sizes, image loading, navigation, and menu switching.

## GitHub Pages

The site is configured for https://raposoyuri94-star.github.io/koffeeshop/.

In the repository's Settings > Pages, select **GitHub Actions** as the source. Push to `main`, or run the **Deploy Morrow to GitHub Pages** workflow manually. The workflow installs locked dependencies, builds with Vite, and deploys `dist/` through GitHub's Pages actions.

The Vite base path and runtime image URLs support the repository subdirectory. Update `base` in `vite.config.js` if the repository name changes or a custom domain is added.

## Content and assets

The shop identity, prices, and copy are demonstration content. There is no ordering or booking backend. Product renders were generated with imagegen and stored in `public/images/`. The sunrise monogram is `public/images/morrow-mark.svg`. Google Fonts load remotely with local fallbacks.

Legacy latte footage and its poster are retained in `public/`, but no video is displayed. Footage source: [Rachel Claire on Pexels](https://www.pexels.com/video/person-pouring-milk-in-a-cup-8855727/), under the [Pexels license](https://www.pexels.com/license/).

Build output, local screenshots, and test reports are excluded from Git.
