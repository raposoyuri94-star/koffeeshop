import { test, expect } from '@playwright/test';

for (const width of [320, 768, 1366]) {
  test(`seasonal page supports navigation and direct reload at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    await expect(page.locator('#seasonal')).toHaveCount(0);
    await page.locator('#menu').getByRole('link', { name: 'Ver as bebidas da estação' }).click();
    await expect(page).toHaveURL(/\/koffeeshop\/bebidas-sazonais\.html$/);
    await expect(page).toHaveTitle('Bebidas da estação | Kofeeshop');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Especiarias');
    await expect(page.locator('#menu, #story, #location')).toHaveCount(0);

    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Especiarias');
    await expect.poll(() => page.locator('.seasonal-poster img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash));
    expect(brokenAnchors).toEqual([]);

    await page.getByRole('link', { name: 'Voltar ao menu', exact: true }).click();
    await expect(page).toHaveURL(/\/koffeeshop\/#menu$/);
    await expect(page.locator('#menu')).toBeVisible();
    await expect(page.locator('#seasonal')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

for (const width of [320, 1366]) {
  test(`location links from another page land below the navbar at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    async function expectLocationAligned() {
      await expect(page).toHaveURL(/\/koffeeshop\/#location$/);
      await expect.poll(() => page.locator('#location').evaluate(section => {
        const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
        return Math.abs(section.getBoundingClientRect().top - offset);
      })).toBeLessThan(2);
    }

    for (const navigation of ['#main-navigation', '.site-footer']) {
      await page.goto('./bebidas-sazonais.html');
      if (navigation === '#main-navigation' && width <= 900) {
        await page.locator('.mobile-toggle').click();
      }
      await page.locator(navigation).getByRole('link', { name: 'Onde estamos', exact: true }).click();
      await expectLocationAligned();
      await page.reload();
      await expectLocationAligned();
    }
  });
}
