import { test, expect, type TestInfo } from '@playwright/test';

import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';
import { attachArtifacts } from './helpers/attachArtifacts';
import { pause } from './helpers/pause';
import { physicalClick } from './helpers/physicalClick';

test.afterEach(async ({}, testInfo: TestInfo) => {
  await attachArtifacts(testInfo);
});

test('Checkout: complete purchase', async ({ page }) => {
  const login = new LoginPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.loginAsStandardUser();

  await expect(page).toHaveURL(/inventory/);
  await pause(page);

  const backpackLink = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .locator('.inventory_item_name');

  await physicalClick(page, backpackLink);

  await expect(page).toHaveURL(/inventory-item/);
  await pause(page);

  await physicalClick(page, page.getByRole('button', { name: 'Add to cart' }));
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  await pause(page);

  await physicalClick(page, page.locator('.shopping_cart_link'));
  await expect(page).toHaveURL(/cart/);
  await pause(page);

  await physicalClick(page, page.getByRole('button', { name: 'Checkout' }));

  await expect(page).toHaveURL(/checkout-step-one/);
  await pause(page);

  await checkout.fillInfo('Jane', 'Doe', '90210');

  await checkout.continue();

  await expect(page).toHaveURL(/checkout-step-two/);
  await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  await expect(page.locator('.summary_total_label')).toContainText('Total:');
  await pause(page);

  await checkout.finish();

  await expect(page).toHaveURL(/checkout-complete/);
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await pause(page);
});
