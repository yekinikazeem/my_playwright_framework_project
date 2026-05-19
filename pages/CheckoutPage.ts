import { Page } from '@playwright/test';
import { humanInput } from '../tests/helpers/humanInput';
import { physicalClick } from '../tests/helpers/physicalClick';

export class CheckoutPage {
  constructor(private page: Page) {}

  async gotoStepOne() {
    await this.page.goto('/checkout-step-one.html');
  }

  async fillInfo(firstName: string, lastName: string, postalCode: string) {
    await humanInput(this.page, this.page.locator('#first-name'), firstName);
    await this.page.waitForTimeout(2000);

    await humanInput(this.page, this.page.locator('#last-name'), lastName);
    await this.page.waitForTimeout(2000);

    await humanInput(this.page, this.page.locator('#postal-code'), postalCode);
    await this.page.waitForTimeout(2000);
  }

  async continue() {
    await physicalClick(this.page, this.page.locator('input#continue, button#continue, button.continue_button'));
  }

  async finish() {
    await physicalClick(this.page, this.page.getByRole('button', { name: 'Finish' }));
  }

  async getConfirmationHeader(): Promise<string | null> {
    return this.page.locator('.complete-header').textContent();
  }
}
