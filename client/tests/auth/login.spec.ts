// tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';

test('login form should authenticate user', async ({ page }) => {
  // Navigate to the login page
  await page.goto('http://localhost:5173/login');

  // Fill in the form
  await page.getByText("username").fill('test');
  await page.getByText("password").fill('testing1!');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Assert that we redirected to dashboard
  await expect(page).toHaveURL('http://localhost:5173/home');
});
