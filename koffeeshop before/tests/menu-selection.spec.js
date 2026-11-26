import { test, expect } from '@playwright/test';

for (const width of [320, 1366]) {
  test(`menu selection keeps price options and categories separate at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    await page.getByRole('button', { name: 'Adicionar Single espresso, 100 MT', exact: true }).click();
    await page.getByRole('button', { name: 'Café quente', exact: true }).click();
    const hotCoffee = page.getByRole('region', { name: 'Hot coffee', exact: true });
    await hotCoffee.getByRole('button', { name: 'Adicionar Caramel Macchiato M, 350 MT', exact: true }).click();
    await page.getByRole('button', { name: 'Café gelado', exact: true }).click();
    const icedCoffee = page.getByRole('region', { name: 'Iced coffee', exact: true });
    await icedCoffee.getByRole('button', { name: 'Adicionar Caramel Macchiato L, 400 MT', exact: true }).click();
    await page.getByRole('button', { name: 'Para comer', exact: true }).click();
    await page.getByRole('region', { name: 'Tostas', exact: true }).getByRole('button', { name: 'Adicionar Tuna Melt, 350 MT', exact: true }).click();
    const summary = page.locator('.menu-selection summary');
    await expect(summary).toContainText('A minha seleção (4)');
    await expect(summary).toContainText(/1.?200 MT/);
    await summary.click();
    const selection = page.locator('.menu-selection');
    await expect(selection.getByRole('listitem')).toHaveCount(4);
    await expect(selection.getByRole('heading', { name: 'Caramel Macchiato · M', exact: true })).toBeVisible();
    await expect(selection.getByRole('heading', { name: 'Caramel Macchiato · L', exact: true })).toBeVisible();
    await selection.getByRole('button', { name: 'Aumentar Single espresso', exact: true }).click();
    await expect(summary).toContainText('A minha seleção (5)');
    await expect(summary).toContainText(/1.?300 MT/);
    await selection.getByRole('button', { name: 'Diminuir Tuna Melt', exact: true }).click();
    await expect(selection.getByRole('listitem')).toHaveCount(3);
    await expect(summary).toContainText('950 MT');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await selection.getByRole('button', { name: 'Limpar seleção', exact: true }).click();
    await expect(selection).toHaveCount(0);
    await expect(page.locator('#menu').getByRole('status')).toHaveText('Seleção limpa.');
  });
}
