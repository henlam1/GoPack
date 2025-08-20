import tryCatch from '../utils/tryCatch.js';
import PackingListService from '../services/packingListService.js';
import dayjs from 'dayjs';

export const getPackingLists = tryCatch(async (req, res) => {
  const { status, filter } = req.query;
  const query = {};

  if (req.user) {
    query.user = req.user.userId;
  }

  if (status) {
    query.status = status;
  }

  if (filter === 'upcoming') {
    query.startDate = { $gte: dayjs().format('YYYY-MM-DD') };
    query.status = 'active';
  }

  if (filter === 'trashed') {
    query.status = 'trashed';
  }

  console.log(query);
  const packingLists = await PackingListService.getPackingLists(query);
  res.status(200).json(packingLists);
});

export const getPackingListById = tryCatch(async (req, res) => {
  const { packingListId } = req.params;
  const packingList =
    await PackingListService.getPackingListById(packingListId);
  res.status(200).json(packingList);
});

export const addPackingList = tryCatch(async (req, res) => {
  const packingList = req.body;
  packingList.user = req.user.userId;
  const newPackingList = await PackingListService.addPackingList(packingList);
  res.status(201).json(newPackingList);
});

export const updatePackingList = tryCatch(async (req, res) => {
  const { packingListId } = req.params;
  const updatedPackingList = await PackingListService.updatePackingList(
    packingListId,
    req.body,
  );
  res.status(200).json(updatedPackingList);
});

export const deletePackingList = tryCatch(async (req, res) => {
  const { packingListId } = req.params;
  const deletedPackingList =
    await PackingListService.deletePackingList(packingListId);
  res.status(200).json(deletedPackingList);
});
