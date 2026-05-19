import { test, expect, type TestInfo } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { attachArtifacts } from './helpers/attachArtifacts';

test.afterEach(async ({}, testInfo: TestInfo) => {
  await attachArtifacts(testInfo);
});

test('Valid Login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.goto();

  await loginPage.loginAsStandardUser();

  await expect(page).toHaveURL(/inventory/);
  await page.waitForTimeout(2000);
});
