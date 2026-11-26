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
    for (const category of ['Café quente', 'Café gelado', 'Matcha e chá', 'Outras bebidas', 'Para comer', 'Extras']) {
      await page.getByRole('button', { name: category, exact: true }).click();
      await expect(page.locator('.menu-sheet')).toBeVisible();
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

test('menu categories show readable items and prices with sandwich photos', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  for (const [category, section, name, price] of [
    ['Café quente', 'Espresso & chá', 'Single espresso', '100 MT'],
    ['Matcha e chá', 'Iced matcha', 'Iced Matcha latte', '300 MT'],
    ['Para comer', 'Pequeno-almoço', 'English Breakfast', '700 MT'],
  ]) {
    const button = page.getByRole('button', { name: category, exact: true });
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    const region = page.getByRole('region', { name: category, exact: true });
    const group = region.getByRole('region', { name: section, exact: true });
    const row = group.getByRole('listitem').filter({ has: page.getByRole('heading', { name, exact: true }) });
    await expect(row).toContainText(price);
    await expect(region.locator('img')).toHaveCount(category === 'Para comer' ? 2 : 0);
  }
  await expect(page.getByText('07:30h – 11:00h', { exact: true })).toBeVisible();
  await expect(page.getByRole('group', { name: 'Categoria do menu', exact: true }).getByRole('button')).toHaveCount(6);
  await page.getByRole('button', { name: 'Café gelado', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Iced cappuccino', exact: true }).getByRole('listitem').filter({ has: page.getByRole('heading', { name: 'Iced Caramel', exact: true }) })).toContainText('330 / 380 MT');
  await expect(page.getByRole('dialog')).toHaveCount(0);
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

test('closing mobile Events returns keyboard focus to the menu toggle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.locator('.mobile-toggle');
  const dialog = page.getByRole('dialog');

  for (const closeAction of ['escape', 'button']) {
    await toggle.click();
    await page.locator('#main-navigation').getByRole('button', { name: 'Eventos' }).click();
    await expect(dialog).toBeVisible();
    if (closeAction === 'escape') {
      await page.keyboard.press('Escape');
    } else {
      await dialog.getByRole('button', { name: 'Combinado' }).click();
    }
    await expect(dialog).not.toBeVisible();
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  }
});

test('mobile navigation stays closed after switching to desktop and back', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const toggle = page.locator('.mobile-toggle');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.setViewportSize({ width: 1366, height: 900 });
  await expect(toggle).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#main-navigation')).toBeHidden();
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
  await expect(page.getByRole('status').filter({ hasText: 'Uma chuva de grãos de café.' })).toHaveText('Uma chuva de grãos de café.');
  await expect(page.locator('.falling-bean')).toHaveCount(18);
  expect(await page.locator('.falling-bean').first().evaluate(element => getComputedStyle(element).animationName)).toBe('none');
  await expect(page.locator('.bean-rain')).toHaveCount(0, { timeout: 5000 });
});
