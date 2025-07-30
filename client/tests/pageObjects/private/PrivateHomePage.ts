import { Page } from '@playwright/test';

export class PrivateHomePage {
  constructor(private page: Page) {}

  /** Navigate to the private home page */
  async goto() {
    await this.page.goto('/home');
  }

  /** Navigate to the packing list creation page */
  async goToCreatePage() {
    await this.page.getByRole('link', { name: 'Add Packing List' }).click();
  }

  /** Navigate to the upcoming packing lists page */
  async goToUpcomingPage() {
    await this.page.getByRole('link', { name: 'Upcoming' }).click();
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
