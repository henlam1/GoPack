import { expect, Page } from "@playwright/test";

export class RegisterPage {
  constructor(private page: Page) {}

  /** Navigate to the register page */
  async goto() {
    await this.page.goto("/register");
  }

  /** Fill in the register form
   * @param {string} username - The user's username
   * @param {string} password - The user's password
   * @param {string} email - The user's email
   * @return {void}
   */
  async fillCredentials(username: string, password: string, email: string) {
    await this.page.getByText("username").fill(username);
    await this.page.getByText("password").fill(password);
    await this.page.getByText("email").fill(email);
  }

  /** Submit the form */
  async submit(){
    await this.page.getByRole("button", { name: "Register" }).click();
  }

  /** Assert register redirection to the login page */
  async assertRedirect() {
    await expect(this.page).toHaveURL('/login');
  }
}
