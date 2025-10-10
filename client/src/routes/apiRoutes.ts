const isVite =
  typeof import.meta != 'undefined' && typeof import.meta.env !== 'undefined';

const apiBaseUrl = isVite
  ? import.meta.env.VITE_REACT_APP_URL
  : process.env.VITE_REACT_APP_URL;

export const apiRoutes = {
  packingLists: {
    base: `${apiBaseUrl}/api/packing-lists`,
    getAll: `${apiBaseUrl}/api/packing-lists`,
    getActive: `${apiBaseUrl}/api/packing-lists?status=active`,
    getTrashed: `${apiBaseUrl}/api/packing-lists?status=trashed`,
    getArchived: `${apiBaseUrl}/api/packing-lists?status=archived`,
    getById: (id: string) => `${apiBaseUrl}/api/packing-lists/${id}`,
    create: `${apiBaseUrl}/api/packing-lists`,
    update: (id: string) => `${apiBaseUrl}/api/packing-lists/${id}`,
    delete: (id: string) => `${apiBaseUrl}/api/packing-lists/${id}`,
    getCategories: (id: string) =>
      `${apiBaseUrl}/api/packing-lists/${id}/categories`,
  },
  categories: {
    base: `${apiBaseUrl}/api/categories`,
    getAll: `${apiBaseUrl}/api/categories`,
    getById: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
    create: `${apiBaseUrl}/api/categories`,
    update: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
    delete: (id: string) => `${apiBaseUrl}/api/categories/${id}`,
    markAllPacked: (id: string) =>
      `${apiBaseUrl}/api/categories/${id}/mark-all-packed`,
    getItems: (id: string) => `${apiBaseUrl}/api/categories/${id}/items`,
    suggest: `${apiBaseUrl}/api/categories/suggest`,
    commit: `${apiBaseUrl}/api/categories/commit`,
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
    logout: `${apiBaseUrl}/api/users/logout`,
    hydrate: `${apiBaseUrl}/api/users/hydrate`,
  },
  tokens: {
    base: `${apiBaseUrl}/api/tokens`,
    refresh: `${apiBaseUrl}/api/tokens/refresh`,
  },
  tests: {
    reset: `${apiBaseUrl}/api/test-db/reset`,
  },
};
