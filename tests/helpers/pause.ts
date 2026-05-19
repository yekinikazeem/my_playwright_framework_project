import { type Page } from '@playwright/test';

export async function pause(page: Page, milliseconds = 2000) {
  await page.waitForTimeout(milliseconds);
}
