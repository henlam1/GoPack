const apiBaseUrl =
  import.meta.env.VITE_REACT_APP_URL || "http://localhost:5050";

export const apiRoutes = {
  packingLists: {
    base: `${apiBaseUrl}/api/packing_lists`,
    getAll: `${apiBaseUrl}/api/packing_lists`,
    getById: (id: string) => `${apiBaseUrl}/api/packing_lists/${id}`,
    create: `${apiBaseUrl}/api/packing_lists`,
    update: (id: string) => `${apiBaseUrl}/api/packing_lists/${id}`,
    delete: (id: string) => `${apiBaseUrl}/api/packing_lists/${id}`,
  },
  categories: {
    base: `${apiBaseUrl}/api/categories`,
    getAll: `${apiBaseUrl}/api/categories`,
    getById: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
    create: `${apiBaseUrl}/api/categories`,
    update: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
    delete: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
  },
  items: {
    base: `${apiBaseUrl}/api/items`,
    getAll: `${apiBaseUrl}/api/items`,
    getById: (id: string) => `${apiBaseUrl}/api/items/${id}`,
    create: `${apiBaseUrl}/api/items`,
    update: (id: string) => `${apiBaseUrl}/api/items/${id}`,
    delete: (id: string) => `${apiBaseUrl}/api/items/${id}`,
  },
  users: {
    base: `${apiBaseUrl}/api/users`,
    login: `${apiBaseUrl}/api/users/login`,
  },
};
