import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { LoginPage } from '../../pageObjects/public/LoginPage';
import { register } from '../../setup/register.setup';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await register(page);
});

test('login form should authenticate user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillCredentials('test', 'testing1!');
  await loginPage.submit();
  await expect(page).toHaveURL('/home');
});

// Per-file serial control
// test.describe.serial('Login Flow', () => {
// });
