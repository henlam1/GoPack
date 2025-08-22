const privateRoutes = {
  home: '/home',
  packingLists: {
    create: '/packing-lists/new',
    details: (id: string) => `/packing-lists/${id}`,
    edit: (id: string) => `/packing-lists/${id}/edit`,
    completed: '/packing-lists/completed',
    trash: '/packing-lists/trash',
  },
};

export default privateRoutes;
