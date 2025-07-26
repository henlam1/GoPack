// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import login from '../setup/login.setup';

test('logout should logout user', async ({ page }) => {
  // Login
  await login(page);

  // Assert that we redirected to dashboard
  await expect(page).toHaveURL('http://localhost:5173/home');

  await page.getByRole('link', { name: 'Logout' }).first().click();

  await expect(page).toHaveURL('http://localhost:5173/');
});
