import { Page } from '@playwright/test';
import { testPackingList } from '../fixtures/packingLists';
import { CreatePage } from '../pageObjects/private/CreatePage';

export async function createPackingList(page: Page) {
  const createPage = new CreatePage(page);
  await createPage.goto();
  await createPage.fillForm(
    testPackingList.name,
    testPackingList.startDate,
    testPackingList.endDate,
    testPackingList.destination,
    testPackingList.description,
  );
  await createPage.submit();
}
