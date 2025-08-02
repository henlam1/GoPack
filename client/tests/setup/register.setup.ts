import { Page } from '@playwright/test';
import { RegisterPage } from '../pageObjects/public/RegisterPage';
import { testUser } from '../fixtures/users';

export async function register(page: Page) {
  const registerPage = new RegisterPage(page);
  await registerPage.goto();
  await registerPage.fillCredentials(
    testUser.username,
    testUser.password,
    testUser.email,
  );
  await registerPage.submit();
}
