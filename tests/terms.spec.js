import { test, expect } from '@playwright/test';

for (const width of [320, 1366]) {
  test(`terms are reachable from both pages and survive reload at ${width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });

    for (const route of ['./', './bebidas-sazonais.html']) {
      await page.goto(route);
      await page.locator('.site-footer').getByRole('link', { name: 'Termos e Condições', exact: true }).click();
      await expect(page).toHaveURL(/\/koffeeshop\/termos-e-condicoes\.html$/);
      await expect(page).toHaveTitle('Termos e Condições | Kofeeshop');
      await expect(page.getByRole('heading', { level: 1, name: 'Termos e Condições' })).toBeVisible();
      expect((await page.reload()).status()).toBe(200);
      await expect(page.getByRole('heading', { name: 'Privacidade e serviços externos' })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      const brokenAnchors = await page.locator('a[href^="#"]').evaluateAll(links =>
        links.filter(link => !document.getElementById(link.hash.slice(1))).map(link => link.hash));
      expect(brokenAnchors).toEqual([]);

      const agency = page.locator('.footer-credit').getByRole('link', { name: 'Nexzo_agency', exact: true });
      await expect(agency).toHaveAttribute('href', 'https://raposoyuri94-star.github.io/nexzo-agency-website/');
      await expect(agency).toHaveAttribute('rel', 'noopener noreferrer');
      await page.getByRole('link', { name: 'Voltar ao início', exact: true }).click();
      await expect(page).toHaveURL(/\/koffeeshop\/#home$/);
      await expect(page.locator('#home')).toBeVisible();
    }
    expect(errors).toEqual([]);
  });

  test(`terms keep home navigation and shared dialogs working at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./termos-e-condicoes.html');
    await page.locator('.site-footer').getByRole('button', { name: 'Bebidas da estação', exact: true }).click();
    const image = page.getByRole('dialog', { name: 'Bebidas da estação', exact: true });
    await expect(image).toBeVisible();
    await image.getByRole('button', { name: 'Fechar imagem' }).click();
    await expect(image).toHaveCount(0);

    await page.locator('.site-footer').getByRole('button', { name: 'Eventos', exact: true }).click();
    const events = page.getByRole('dialog', { name: 'Vamos pôr a mesa' });
    await expect(events).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(events).not.toBeVisible();

    if (width <= 900) await page.getByRole('button', { name: 'Alternar navegação' }).click();
    await page.locator('#main-navigation').getByRole('link', { name: 'Onde estamos', exact: true }).click();
    await expect(page).toHaveURL(/\/koffeeshop\/#location$/);
    await expect.poll(() => page.locator('#location').evaluate(section => {
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop);
      return Math.abs(section.getBoundingClientRect().top - offset);
    })).toBeLessThan(2);
  });
}
