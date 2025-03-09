import tryCatch from "../utils/tryCatch.js";
import packingListService from "../services/packingListService.js";

export const getPackingLists = tryCatch(async (req, res, next) => {
  const packingLists = await packingListService.getPackingLists();
  res.status(200).json({
    packingLists: packingLists,
  });
});

export const addPackingList = tryCatch(async (req, res, next) => {
  const newPackingList = await packingListService.addPackingList(req.body);
  res.status(201).json({
    message: "Packing list added",
    packingList: newPackingList,
  });
});
