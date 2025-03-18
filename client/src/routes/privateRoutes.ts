const privateRoutes = {
  home: "/home",
  packingLists: {
    create: "packing-lists/new",
    details: (id: string) => `/packing-lists/${id}`,
    upcoming: "packing-lists/upcoming",
    trash: "packing-lists/trash"
  },
};

export default privateRoutes;
