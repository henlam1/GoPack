import { Page } from '@playwright/test';

export class CreatePage {
  constructor(private page: Page) {}

  /** Navigate to the private home page */
  async goto() {
    await this.page.goto('/packing-lists/new');
  }

  /** Fill in the creation form
   * @param {string} name - The packing list's username
   * @param {string} startDate - The packing list's start date
   * @param {string} endDate - The packing list's end date
   * @param {string} destination - The packing list's destination
   * @param {string} description - The packing list's description
   * @return {void}
   */
  async fillForm(name, startDate, endDate, destination, description) {
    await this.page.getByLabel('Name').fill(name);
    await this.page.getByLabel('Start Date').fill(startDate);
    await this.page.getByLabel('End Date').fill(endDate);
    await this.page.getByLabel('Destination').fill(destination);
    await this.page.getByLabel('Description').fill(description);
  }

  /** Submit the form */
  async submit() {
    await this.page
      .getByRole('button', { name: 'Create Packing List' })
      .click();
  }
}
