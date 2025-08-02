import { Page } from '@playwright/test';

export async function resetDb(page: Page) {
  await page.request.post('http://localhost:5050/api/test-db/reset');
}
