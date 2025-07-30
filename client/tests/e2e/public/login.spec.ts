import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { createUser } from '../../requests/users';
import { testUser } from '../../fixtures/users';
import { LoginPage } from '../../pageObjects/public/LoginPage';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await createUser(page, testUser);
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
