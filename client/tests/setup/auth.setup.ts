// client/tests/setup/auth.setup.ts
import { chromium } from '@playwright/test';

/**
 * Tried to save login state, but my application needs React state to redirect
 * users to the private routes
 */
async function auth() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/login');

  // Fill in the form
  await page.getByText('username').fill('test');
  await page.getByText('password').fill('testing1!');

  // Click the login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Wait for redirect or welcome message
  await page.waitForURL('**/home');

  // Save session
  await page
    .context()
    .storageState({ path: './tests/setup/storageState.json' });

  await browser.close();
}

export default auth;
