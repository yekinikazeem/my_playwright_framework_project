import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { pause } from './helpers/pause';

test('Complete purchase flow from login to finish', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.loginAsStandardUser();
  await pause(page);

  // Ensure inventory loaded, open first item details, and add it from there.
  const items = await inventory.getItemNames();
  expect(items.length).toBeGreaterThan(0);
  const first = items[0];

  await inventory.openItemDetails(first);
  await expect(page).toHaveURL(/inventory-item/);
  await pause(page);

  await inventory.addCurrentItemToCart();
  expect(await inventory.getCartCount()).toBeGreaterThan(0);
  await pause(page);

  await inventory.openCart();
  const cartItems = await cart.getItemNames();
  expect(cartItems).toContain(first);
  await pause(page);

  await cart.proceedToCheckout();
  await expect(page).toHaveURL(/checkout-step-one/);
  await pause(page);

  await checkout.fillInfo('Yekini', 'Kazeem', '90210');
  await pause(page);

  await checkout.continue();
  await expect(page).toHaveURL(/checkout-step-two/);
  await pause(page);

  await checkout.finish();

  const header = await checkout.getConfirmationHeader();
  expect(header?.toUpperCase() || '').toContain('THANK YOU');
  await pause(page);
});
