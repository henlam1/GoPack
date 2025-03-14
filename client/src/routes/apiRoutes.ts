const apiBaseUrl = import.meta.env.VITE_REACT_APP_URL || "http://localhost:5050";

export const apiRoutes = {
  packingLists: {
    base: `${apiBaseUrl}/api/packing_lists`,
    getById: (id: string) => `${apiBaseUrl}/api/packing_lists/${id}`,
    create: `${apiBaseUrl}/api/packing_lists`,
  },
  categories: {
    base: `${apiBaseUrl}/api/categories`,
  },
  items: {
    base: `${apiBaseUrl}/api/items`,
    getAll: `${apiBaseUrl}/api/items`,
    getById: (id: string) => `${apiBaseUrl}/api/items/${id}`,
    create: `${apiBaseUrl}/api/items/`,
    update: (id: string) => `${apiBaseUrl}/api/items/${id}`,
  },
  users: {
    base: `${apiBaseUrl}/api/users`,
  },
};
