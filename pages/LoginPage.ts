import { Page } from '@playwright/test';
import { humanInput } from '../tests/helpers/humanInput';
import { physicalClick } from '../tests/helpers/physicalClick';

export class LoginPage {

  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {

    await humanInput(this.page, this.page.locator('#user-name'), username);
    await this.page.waitForTimeout(2000);

    await humanInput(this.page, this.page.locator('#password'), password);
    await this.page.waitForTimeout(2000);

    await physicalClick(this.page, this.page.locator('#login-button'));
  }

  async loginAsStandardUser() {
    await this.login('standard_user', 'secret_sauce');
  }
}
