import { test, expect, type TestInfo } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { attachArtifacts } from './helpers/attachArtifacts';
import { pause } from './helpers/pause';
import { physicalClick } from './helpers/physicalClick';

test.afterEach(async ({}, testInfo: TestInfo) => {
  await attachArtifacts(testInfo);
});

test('Cart: add an inventory item and open cart', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.loginAsStandardUser();

  await expect(page).toHaveURL(/inventory/);
  await pause(page);

  const addBackpackButton = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to cart' });

  await physicalClick(page, addBackpackButton);

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await pause(page);

  await physicalClick(page, page.locator('.shopping_cart_link'));

  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  await pause(page);
});
