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
