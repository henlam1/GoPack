import { Page } from '@playwright/test';
import { apiRoutes } from '../../src/routes/apiRoutes';

export async function resetDb(page: Page) {
  await page.request.post(apiRoutes.tests.reset);
}
