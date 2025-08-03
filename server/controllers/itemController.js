import tryCatch from '../utils/tryCatch.js';
import ItemService from '../services/itemService.js';

export const getItems = tryCatch(async (req, res) => {
  const items = await ItemService.getItems();
  res.status(200).json(items);
});

export const getItemById = tryCatch(async (req, res) => {
  const { itemId } = req.params;
  const item = await ItemService.getItemById(itemId);
  res.status(200).json(item);
});

export const addItem = tryCatch(async (req, res) => {
  const newItem = await ItemService.addItem(req.body);
  res.status(201).json(newItem);
});

export const updateItem = tryCatch(async (req, res) => {
  const { itemId } = req.params;
  const updatedItem = await ItemService.updateItem(itemId, req.body);
  res.status(200).json(updatedItem);
});

export const deleteItem = tryCatch(async (req, res) => {
  const { itemId } = req.params;
  const deletedItem = await ItemService.deleteItem(itemId);
  res.status(200).json(deletedItem);
});
