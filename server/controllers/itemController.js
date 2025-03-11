import tryCatch from "../utils/tryCatch.js";
import ItemService from "../services/itemService.js";

export const getItems = tryCatch(async (req, res, next) => {
  const items = await ItemService.getItems();
  res.status(200).json({ items: items });
});

export const addItem = tryCatch(async (req, res, next) => {
  const newItem = await ItemService.addItem(req.body);
  res.status(201).json({
    message: "Item added",
    item: newItem,
  });
});

export const updateItem = tryCatch(async (req, res, next) => {
  const { itemId } = req.params;
  const updatedItem = await ItemService.updateItem(itemId, req.body);
  res.status(200).json({
    message: "Item updated",
    item: updatedItem,
  });
});

export const deleteItem = tryCatch(async (req, res, next) => {
  const { itemId } = req.params;
  const deletedItem = await ItemService.deleteItem(itemId);
  res.status(200).json({
    message: "Item deleted",
    item: deletedItem,
  });
});
