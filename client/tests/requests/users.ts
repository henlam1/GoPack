export const createUser = async (page, data) => {
  await page.request.post('http://localhost:5050/api/users', {
    data: data,
  });
};
