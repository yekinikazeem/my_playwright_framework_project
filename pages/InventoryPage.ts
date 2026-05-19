import { Page } from '@playwright/test';
import { physicalClick } from '../tests/helpers/physicalClick';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addItemToCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName }).first();
    await physicalClick(this.page, item.locator('button'));
  }

  async openItemDetails(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName }).first();
    await physicalClick(this.page, item.locator('.inventory_item_name'));
  }

  async addCurrentItemToCart() {
    await physicalClick(this.page, this.page.getByRole('button', { name: 'Add to cart' }));
  }

  async removeItemFromCart(itemName: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: itemName }).first();
    await physicalClick(this.page, item.locator('button'));
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if (await badge.count() === 0) return 0;
    const text = await badge.textContent();
    return Number(text?.trim() || 0);
  }

  async openCart() {
    await physicalClick(this.page, this.page.locator('.shopping_cart_link'));
  }

  async getItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }
}
