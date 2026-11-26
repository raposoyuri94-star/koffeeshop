import { test, expect } from '@playwright/test';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'Koffeeshop-future';
const repositoryPath = `/${repositoryName}/`;

test('repository URL serves both pages, fonts, images, and the hero video', async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const failedAssets = [];
  page.on('response', response => {
    if (new URL(response.url()).origin === new URL(page.url()).origin && response.status() >= 400) {
      failedAssets.push(response.url());
    }
  });

  const response = await page.goto(repositoryPath);
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle('Kofeeshop');
  await page.evaluate(() => document.fonts.ready);
  expect(await page.evaluate(() => [...document.fonts].every(font => font.status === 'loaded'))).toBe(true);
  await expect.poll(() => page.locator('.logo img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);

  const video = await request.get(`${repositoryPath}videos/koffee-hero.mp4`);
  expect(video.status()).toBe(200);
  expect(video.headers()['content-type']).toContain('video/mp4');

  await page.locator('#menu').getByRole('link', { name: 'Ver as bebidas da estação' }).click();
  await expect(page).toHaveURL(new RegExp(`${repositoryPath}bebidas-sazonais\\.html$`));
  const seasonal = await page.reload();
  expect(seasonal.status()).toBe(200);
  await expect.poll(() => page.locator('.seasonal-poster img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
  expect(failedAssets).toEqual([]);
});
