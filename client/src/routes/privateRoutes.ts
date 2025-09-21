const privateRoutes = {
  home: '/home',
  packingLists: {
    create: '/packing-lists/new',
    details: (id: string) => `/packing-lists/${id}`,
    edit: (id: string) => `/packing-lists/${id}/edit`,
    archived: '/packing-lists/archived',
    trash: '/packing-lists/trash',
  },
};

export default privateRoutes;
