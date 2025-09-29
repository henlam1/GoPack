import { Page } from '@playwright/test';

export class PackingListDetailsPage {
  constructor(private page: Page) {}

  /** Fill in the creation form
   * @param {string} name - The category's name
   * @return {void}
   */
  async fillForm(name: string) {
    await this.page.getByPlaceholder('Category Name').fill(name);
  }

  /** Submit the form */
  async submit() {
    await this.page.getByRole('button', { name: 'Add Category' }).click();
  }
}
