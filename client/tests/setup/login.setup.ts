import { expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('http://localhost:5173/login');
  await page.getByLabel('Username').fill('test');
  await page.getByLabel('Password').fill('testing1!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:5173/home');
}

export default login;
