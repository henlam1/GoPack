import tryCatch from "../utils/tryCatch.js";
import PackingListService from "../services/packingListService.js";

export const getPackingLists = tryCatch(async (req, res, next) => {
  const packingLists = await PackingListService.getPackingLists();
  res.status(200).json(packingLists);
});

export const getPackingListById = tryCatch(async (req, res, next) => {
  const { packingListId } = req.params;
  const packingList = await PackingListService.getPackingListById(
    packingListId
  );
  res.status(200).json(packingList);
});

export const addPackingList = tryCatch(async (req, res, next) => {
  const newPackingList = await PackingListService.addPackingList(req.body);
  res.status(201).json(newPackingList);
});

export const updatePackingList = tryCatch(async (req, res, next) => {
  const { packingListId } = req.params;
  const updatedPackingList = await PackingListService.updatePackingList(
    packingListId,
    req.body
  );
  res.status(200).json(updatedPackingList);
});

export const deletePackingList = tryCatch(async (req, res, next) => {
  const { packingListId } = req.params;
  const deletedPackingList = await PackingListService.deletePackingList(
    packingListId
  );
  res.status(200).json(deletedPackingList);
});
