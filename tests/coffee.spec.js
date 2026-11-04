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
      const toggle = page.getByRole('button', { name: 'Toggle navigation' });
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.getByRole('link', { name: 'View the menu', exact: true }).click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    }

    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => element.complete && element.naturalWidth > 0)).toBe(true);
    }
    for (const category of ['Coffee', 'Breakfast', 'Lunch', 'Something else']) {
      await page.getByRole('button', { name: category, exact: true }).click();
      const overflow = await page.locator('.hero-content, .favorite, .story-copy, .menu-item, .catering-copy, .footer-wordmark').evaluateAll(elements => elements.filter(element => {
        const bounds = element.getBoundingClientRect();
        return bounds.left < -1 || bounds.right > innerWidth + 1 || element.scrollWidth > element.clientWidth + 1;
      }).map(element => element.className));
      expect(overflow).toEqual([]);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}

test('menu categories and food links show their matching menu', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  for (const [category, heading] of [['Coffee', 'Espresso'], ['Breakfast', 'Butter croissant'], ['Lunch', 'The cheese toastie'], ['Something else', 'Matcha latte']]) {
    const button = page.getByRole('button', { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('.menu-item')).toHaveCount(4);
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
  }
  await page.getByRole('link', { name: 'Meet your breakfast' }).click();
  await expect(page.getByRole('button', { name: 'Breakfast', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('heading', { name: 'Butter croissant' })).toBeVisible();
});

test('mobile navigation closes with Escape and returns keyboard focus', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await toggle.click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
});

test('catering dialog traps focus, restores scrolling, and can reopen', async ({ page }) => {
  await page.goto('./');
  const trigger = page.getByRole('button', { name: 'Explore catering' });
  const dialog = page.getByRole('dialog');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close catering details' })).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(page.getByRole('button', { name: 'Sounds good' })).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  await trigger.click();
  await expect(dialog).toBeVisible();
  await page.getByRole('button', { name: 'Sounds good' }).click();
  await expect(dialog).not.toBeVisible();
});

test('coffee sticker responds and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  await page.getByRole('button', { name: 'Make it rain coffee beans' }).click();
  await expect(page.getByRole('status')).toHaveText('A little coffee joy, on the house.');
  await expect(page.locator('.falling-bean')).toHaveCount(18);
  expect(await page.locator('.falling-bean').first().evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await expect(page.locator('.bean-rain')).toHaveCount(0, { timeout: 5000 });
});
