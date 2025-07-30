export async function resetDb(page) {
  await page.request.post('http://localhost:5050/api/test-db/reset');
}
