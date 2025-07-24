// tests/auth/login.spec.ts
import { test } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";

test("login form should authenticate user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.fillCredentials("test", "testing1!");
  await loginPage.submit();
  await loginPage.assertRedirect();
});
