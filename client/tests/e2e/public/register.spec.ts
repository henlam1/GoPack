import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { RegisterPage } from '../../pageObjects/public/RegisterPage';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
});

test('register form should register user', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillCredentials('test', 'testing1!', 'test@gmail.com');
  await registerPage.submit();
  await expect(page).toHaveURL('/login');
});

/**
 * Notes
 * Multiple workers and parallel tests running will cause race conditions
 * This disrupts the process of clearing the database and keeping tests isolated
 * The first fix was to change the # of workers to 1
 */
