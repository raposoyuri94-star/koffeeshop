import { test, expect } from '@playwright/test';

test('mobile autoplay rejection leaves a plain background without a photo', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.addInitScript(() => {
    HTMLMediaElement.prototype.play = () => Promise.reject(new DOMException('Autoplay blocked', 'NotAllowedError'));
  });
  await page.goto('./');
  await expect(page.locator('.hero-video')).toHaveCount(0);
  await expect(page.locator('.hero img')).toHaveCount(0);
  await expect(page.locator('.hero')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(page.getByRole('link', { name: 'Escolher o meu pedido' })).toBeVisible();
});

for (const width of [390, 1366]) {
  test(`hero video plays silently at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('./');

    const video = page.locator('.hero-video');
    await expect(video).not.toHaveAttribute('poster');
    await expect.poll(() => video.evaluate(element => (
      element.muted && !element.paused && element.currentTime > 0 && element.videoWidth > 0
    ))).toBe(true);

    await expect(page.getByRole('link', { name: 'Escolher o meu pedido' })).toBeVisible();
  });
}

test('reduced motion shows a plain background without downloading the video and responds to preference changes', async ({ page }) => {
  const videoRequests = [];
  page.on('request', request => {
    if (request.url().includes('/videos/koffee-hero.mp4')) videoRequests.push(request.url());
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');

  await expect(page.locator('.hero img')).toHaveCount(0);
  await expect(page.locator('.hero-video')).toHaveCount(0);
  expect(videoRequests).toEqual([]);

  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.locator('.hero-video').evaluate(video => !video.paused && video.currentTime > 0)).toBe(true);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.hero-video')).toHaveCount(0);
  await expect(page.locator('.hero')).toHaveCSS('background-color', 'rgb(0, 0, 0)');
});

test('an unavailable video leaves a plain background and usable menu link', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/videos/koffee-hero.mp4', route => route.abort());
  await page.goto('./');

  await expect(page.locator('.hero-video')).toHaveCount(0);
  await expect(page.locator('.hero img')).toHaveCount(0);
  await page.getByRole('link', { name: 'Escolher o meu pedido' }).click();
  await expect(page).toHaveURL(/#menu$/);
  await expect(page.locator('#menu')).toBeVisible();
});
