import { test, expect } from '@playwright/test';

const viewports = [
 {width:320,height:568}, {width:390,height:844},
 {width:844,height:390}, {width:768,height:1024},
 {width:820,height:1180}, {width:1024,height:768},
 {width:1366,height:1024}, {width:1920,height:1080},
];
for (const viewport of viewports) {
 test(`responsive layout at ${viewport.width}x${viewport.height}`, async ({page}) => {
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize(viewport);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('./');
  await page.evaluate(()=>document.fonts.ready);
  const checkBounds=async()=>{
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const overflow=await page.locator('.hero-content, .hero-visual, .story-photo, .scene-wrap, .menu-item, .visit-details').evaluateAll(elements=>elements.filter(element=>{
    const bounds=element.getBoundingClientRect();
    return bounds.left < -1 || bounds.right > innerWidth+1;
   }).map(element=>element.className));
   expect(overflow).toEqual([]);
  };
  await checkBounds();
  if(viewport.width<=900){
   const toggle=page.getByRole('button',{name:'Toggle navigation'});
   await toggle.click();
   await expect(toggle).toHaveAttribute('aria-expanded','true');
   await page.getByRole('link',{name:'Our menu',exact:true}).click();
   await expect(toggle).toHaveAttribute('aria-expanded','false');
  }
  await page.locator('#menu').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Something else',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Matcha latte',exact:true})).toBeVisible();
  await checkBounds();
  await page.getByRole('button',{name:'Coffee',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Espresso',exact:true})).toBeVisible();
  for(const selector of ['.hero-visual img','.story-photo img','.coffee-detail img']){
   await page.locator(selector).scrollIntoViewIfNeeded();
   await expect.poll(()=>page.locator(selector).evaluate(image=>image.complete && image.naturalWidth>0)).toBe(true);
  }
  expect(errors).toEqual([]);
 });
}
