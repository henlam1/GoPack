import { Page } from '@playwright/test';

export class EditPage {
  constructor(private page: Page) {}

  /** Navigate to the private home page */
  async goto(id: string) {
    await this.page.goto(`/packing-lists/edit/${id}`);
  }

  /** Fill in the creation form
   * @param {string} name - The packing list's username
   * @param {string} startDate - The packing list's start date
   * @param {string} endDate - The packing list's end date
   * @param {string} destination - The packing list's destination
   * @param {string} description - The packing list's description
   * @return {void}
   */
  async fillForm(
    name: string,
    startDate: string,
    endDate: string,
    destination: string,
    description: string,
  ) {
    await this.page.getByLabel('Name').fill(name);
    await this.page.getByLabel('Start Date').fill(startDate);
    await this.page.getByLabel('End Date').fill(endDate);
    await this.page.getByLabel('Destination').fill(destination);
    await this.page.getByLabel('Description').fill(description);
  }

  /** Fill in the name field
   * @param {string} name - The packing list's username
   * @return {void}
   */
  async editName(name: string) {
    await this.page.getByLabel('Name').fill(name);
  }

  /** Submit the form */
  async submit() {
    await this.page.getByRole('button', { name: 'Edit Packing List' }).click();
  }
}
