import { test, expect } from '@playwright/test';

const viewports = [
  { width: 320, height: 568 }, { width: 390, height: 844 },
  { width: 844, height: 390 }, { width: 768, height: 1024 },
  { width: 820, height: 1180 }, { width: 1024, height: 768 },
  { width: 1366, height: 1024 }, { width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  test(`responsive layout at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveTitle(/Kofeeshop/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

    if (viewport.width <= 900) {
      const toggle = page.getByRole('button', { name: 'Alternar navegação' });
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('link', { name: 'Ver o menu', exact: true }).click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    }

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    for (const category of ['Café e chocolate', 'Matcha e bebidas', 'Para comer']) {
      await page.getByRole('button', { name: category, exact: true }).click();
      await expect.poll(() => page.locator('.menu-sheet img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      const overflow = await page.locator('.hero-content, .story-copy, .menu-sheet, .seasonal-copy, .catering-copy, .closing-note > p, .footer-wordmark, h1, h2, h3').evaluateAll(elements => elements.filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.left < -1 || bounds.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1;
      }).map(element => element.className));
      expect(overflow).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test('uploaded menu pages switch categories and open from the image', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-MZ');
  await expect(page.locator('#favorites, a[href="#favorites"]')).toHaveCount(0);
  const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links => links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash));
  expect(brokenAnchors).toEqual([]);
  for (const [category, filename] of [
    ['Café e chocolate', 'Koffee%208.jpg'],
    ['Matcha e bebidas', 'koffee%207.jpg'],
    ['Para comer', 'koffee%206.jpg'],
  ]) {
    const button = page.getByRole('button', { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.menu-sheet img')).toHaveAttribute('src', new RegExp(filename + '$'));
  }
  const popupPromise = page.waitForEvent('popup');
  await page.locator('.menu-sheet-link').click();
  const fullMenu = await popupPromise;
  await expect(fullMenu).toHaveURL(/koffee%206\.jpg$/);
  await expect.poll(() => fullMenu.locator('img').evaluate(image => image.complete && image.naturalWidth === 1284)).toBe(true);
  await fullMenu.close();
});

test('mobile navigation closes with Escape and returns keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Alternar navegação' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Navegação principal' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('catering dialog traps focus, restores scrolling, and can reopen', async ({ page }) => {
  await page.goto('./');
  const trigger = page.getByRole('button', { name: 'Opções para eventos' });
  const dialog = page.getByRole('dialog');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Fechar detalhes para eventos' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Combinado' })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Combinado' }).click();
  await expect(dialog).not.toBeVisible();
});

test('coffee sticker responds and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.getByRole('button', { name: 'Fazer chover grãos de café' }).click();
  await expect(page.getByRole('status')).toHaveText('Uma chuva de grãos de café.');
  await expect(page.locator('.falling-bean')).toHaveCount(18);
  expect(await page.locator('.falling-bean').first().evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await expect(page.locator('.bean-rain')).toHaveCount(0, { timeout: 5000 });
});
