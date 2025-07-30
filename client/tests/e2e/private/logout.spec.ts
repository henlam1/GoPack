import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { registerAndLogin } from '../../setup/registerAndLogin.setup';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await registerAndLogin(page);
});

test('logout should logout user', async ({ page }) => {
  await page.getByRole('link', { name: 'Logout' }).first().click();
  await expect(page).toHaveURL('http://localhost:5173/');
});
