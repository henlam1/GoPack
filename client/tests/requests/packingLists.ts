export const createPackingList = async (page, data) => {
  await page.request.post('http://localhost:5050/api/packing_lists', {
    data: data,
  });
};
