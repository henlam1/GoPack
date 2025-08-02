import { expect, test } from '@playwright/test';
import { resetDb } from '../../requests/memoryDb';
import { registerAndLogin } from '../../setup/registerAndLogin.setup';
import { createPackingList } from '../../setup/createPackingList.setup';
import { PrivateHomePage } from '../../pageObjects/private/PrivateHomePage';
import { CreatePage } from '../../pageObjects/private/CreatePage';
import { getTodayDate } from '../../../src/utils/stringHelpers';
import { testPackingList } from '../../fixtures/packingLists';

test.beforeEach(async ({ page }) => {
  await resetDb(page);
  await registerAndLogin(page);
  const privateHomePage = new PrivateHomePage(page);
  await privateHomePage.goToCreatePage();
  await createPackingList(page);
  await privateHomePage.goto();
});

test('create a new packing list', async ({ page }) => {
  const createPage = new CreatePage(page);
  await createPage.goto();
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

test('read packing list details', async ({ page }) => {
  await expect(page.getByText(testPackingList.name)).toBeVisible();
  await page.getByRole('button', { name: 'View' }).first().click();
  await expect(
    page.getByText(`${testPackingList.name} Packing List`),
  ).toBeVisible();
});

test('delete packing list', async ({ page }) => {
  await expect(page.getByText(testPackingList.name)).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).first().click();
  await expect(
    page.getByText(`${testPackingList.name} Packing List`),
  ).not.toBeVisible();
});
