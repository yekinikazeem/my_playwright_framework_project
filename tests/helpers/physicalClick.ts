import { type Locator, type Page } from '@playwright/test';

export async function physicalClick(page: Page, locator: Locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.scrollIntoViewIfNeeded();

  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Cannot physically click an element without a visible bounding box.');
  }

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 12 });
  await page.waitForTimeout(250);
  await page.mouse.down();
  await page.waitForTimeout(150);
  await page.mouse.up();
  await page.waitForTimeout(250);
}
