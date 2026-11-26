import { test, expect } from '@playwright/test';

for (const width of [320, 1366]) {
  test(`menu image can be closed without leaving the page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    const initialURL = page.url();
    const trigger = page.getByRole('button', { name: 'Ampliar o menu de café e chocolate', exact: true });

    for (const action of ['button', 'escape', 'backdrop']) {
      await trigger.click();
      const viewer = page.getByRole('dialog', { name: 'Menu de café e chocolate', exact: true });
      const close = viewer.getByRole('button', { name: 'Fechar imagem', exact: true });
      await expect(viewer).toBeVisible();
      await expect(close).toBeFocused();
      expect(page.context().pages()).toHaveLength(1);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden');

      if (action === 'button') {
        const zoom = viewer.getByRole('button', { name: 'Ampliar imagem', exact: true });
        await page.keyboard.press('Tab');
        await expect(zoom).toBeFocused();
        await page.keyboard.press('Shift+Tab');
        await expect(close).toBeFocused();
        await zoom.click();
        await expect(viewer.getByRole('button', { name: 'Ajustar imagem ao ecrã' })).toBeVisible();
        await expect.poll(() => viewer.locator('img').evaluate(image => image.getBoundingClientRect().width)).toBe(1284);
        await expect(close).toBeInViewport();
        await close.click();
      } else if (action === 'escape') {
        await page.keyboard.press('Escape');
      } else {
        await viewer.locator('.image-viewer-stage').click({ position: { x: 2, y: 2 } });
      }

      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(page.url()).toBe(initialURL);
      expect(await page.evaluate(() => document.body.style.overflow)).toBe('');
    }
  });

  test(`both seasonal image triggers open a closable viewer at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./bebidas-sazonais.html');
    const initialURL = page.url();
    for (const name of ['Ampliar o cartaz de bebidas de abóbora e especiarias', 'Ver as quatro combinações']) {
      const trigger = page.getByRole('button', { name, exact: true });
      await trigger.click();
      const viewer = page.getByRole('dialog', { name: 'Bebidas da estação', exact: true });
      const close = viewer.getByRole('button', { name: 'Fechar imagem', exact: true });
      await expect(viewer).toBeVisible();
      await expect(viewer.locator('img')).toHaveAttribute('src', /Koffe\.jpeg$/);
      await expect.poll(() => viewer.locator('img').evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
      const fitted = await viewer.locator('img').boundingBox();
      expect(fitted.x).toBeGreaterThanOrEqual(0);
      expect(fitted.x + fitted.width).toBeLessThanOrEqual(width);
      expect(fitted.y + fitted.height).toBeLessThanOrEqual(900);
      await expect(close).toBeInViewport();
      await close.click();
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(trigger).toBeFocused();
      expect(page.url()).toBe(initialURL);
      expect(page.context().pages()).toHaveLength(1);
    }
  });
}

test('story and events photos open in a closable viewer without opening a tab', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const initialURL = page.url();
  for (const selector of ['.story-main-image', '.story-inset img', '.catering-photo img']) {
    await page.locator(selector).click();
    const viewer = page.locator('.image-viewer');
    await expect(viewer).toBeVisible();
    await viewer.getByRole('button', { name: 'Fechar imagem', exact: true }).click();
    await expect(viewer).toHaveCount(0);
    expect(page.url()).toBe(initialURL);
    expect(page.context().pages()).toHaveLength(1);
  }
});
