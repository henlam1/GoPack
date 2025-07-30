import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { registerAndLogin } from '../../setup/registerAndLogin.setup';
import { PrivateHomePage } from '../../pageObjects/private/PrivateHomePage';
import { CreatePage } from '../../pageObjects/private/CreatePage';
import { getTodayDate } from '../../../src/utils/stringHelpers';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await registerAndLogin(page);
});

test('create a new packing list', async ({ page }) => {
  // Go to create packing list page
  const privateHomePage = new PrivateHomePage(page);
  await privateHomePage.goToCreatePage();

  // Create packing list
  const createPage = new CreatePage(page);
  await createPage.fillForm(
    'packingList',
    getTodayDate(),
    getTodayDate(),
    'Europe',
    'We are going to Italy',
  );

  // Assert redirection to packing list details
  const [response] = await Promise.all([
    page.waitForResponse(
      (res) =>
        res.url().includes('/api/packing_lists') &&
        res.request().method() === 'POST',
    ),
    createPage.submit(),
  ]);

  const data = await response.json();
  const packingListId = data._id;

  await expect(page).toHaveURL(
    `http://localhost:5173/packing-lists/${packingListId}`,
  );
});
