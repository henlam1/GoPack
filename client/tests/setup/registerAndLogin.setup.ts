import { register } from './register.setup';
import { login } from './login.setup';
import { Page } from '@playwright/test';

export async function registerAndLogin(page: Page) {
  await register(page);
  await login(page);
}
