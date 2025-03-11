const apiBaseUrl = process.env.REACT_APP_API_URL || "http://localhost:5050";

export const apiRoutes = {
  packingLists: {
    base: `${apiBaseUrl}/api/packing_lists`,
    getById: (id: string) => `${apiBaseUrl}/api/packing_lists/${id}`,
  },
  categories: {
    base: `${apiBaseUrl}/api/categories`,
  },
  items: {
    base: `${apiBaseUrl}/api/items`,
  },
  users: {
    base: `${apiBaseUrl}/api/users`,
  },
};
