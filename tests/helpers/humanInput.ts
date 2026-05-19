import { type Locator, type Page } from '@playwright/test';

import { physicalClick } from './physicalClick';

export async function humanInput(page: Page, locator: Locator, value: string) {
  await physicalClick(page, locator);
  await locator.pressSequentially(value, { delay: 120 });
}
