import test, { expect } from '@playwright/test';
import { PrivateHomePage } from '../../pageObjects/private/PrivateHomePage';
import { resetDb } from '../../requests/memoryDb';
import { createPackingList } from '../../setup/createPackingList.setup';
import { registerAndLogin } from '../../setup/registerAndLogin.setup';
import { PackingListDetailsPage } from '../../pageObjects/private/PackingListDetailsPage';
import { testCategory } from '../../fixtures/categories';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await registerAndLogin(page);
  const privateHomePage = new PrivateHomePage(page);
  await privateHomePage.goToCreatePage();
  await createPackingList(page);

  const detailsPage = new PackingListDetailsPage(page);
  await detailsPage.fillForm(testCategory.name);
  await detailsPage.submit();
});

test('create a new category', async ({ page }) => {
  const detailsPage = new PackingListDetailsPage(page);
  await detailsPage.fillForm('Medicine');
  await detailsPage.submit();
  await expect(page.getByText('Medicine')).toBeVisible();
});
