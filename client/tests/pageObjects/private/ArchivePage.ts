import { Page } from '@playwright/test';

export class ArchivePage {
  constructor(private page: Page) {}

  /** Navigate to the archived page */
  async goto() {
    await this.page.goto('/packing-lists/archived');
  }

  /** Navigate to the private home page */
  async goToPrivateHomePage() {
    await this.page.goto('/home');
  }

  /** Navigate to the packing list creation page */
  async goToCreatePage() {
    await this.page.getByRole('link', { name: 'Add Packing List' }).click();
  }

  /** Navigate to the trashed packing lists page */
  async goToTrashPage() {
    await this.page.getByRole('link', { name: 'Trash' }).click();
  }

  /** Navigate to the public home page */
  async goToHomePage() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
  }
}
