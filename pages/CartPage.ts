import { Page } from '@playwright/test';
import { physicalClick } from '../tests/helpers/physicalClick';

export class CartPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/cart.html');
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.cart_item .inventory_item_name').allTextContents();
  }

  async removeItem(itemName: string) {
    const item = this.page.locator('.cart_item').filter({ hasText: itemName }).first();
    await physicalClick(this.page, item.locator('button'));
  }

  async proceedToCheckout() {
    await physicalClick(this.page, this.page.locator('button.checkout_button, #checkout'));
  }
}
