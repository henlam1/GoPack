import { Page } from '@playwright/test';
import { LoginPage } from '../pageObjects/public/LoginPage';
import { testUser } from '../fixtures/users';

export async function login(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillCredentials(testUser.email, testUser.password);
  await loginPage.submit();
}
