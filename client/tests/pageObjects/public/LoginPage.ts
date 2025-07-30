import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  /** Navigate to the login page */
  async goto() {
    await this.page.goto('/login');
  }

  /** Fill in the login form
   * @param {string} username - The user's username
   * @param {string} password - The user's password
   * @return {void}
   */
  async fillCredentials(username: string, password: string) {
    await this.page.getByText('username').fill(username);
    await this.page.getByText('password').fill(password);
  }

  /** Submit the form */
  async submit() {
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
