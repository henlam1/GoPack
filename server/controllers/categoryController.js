import tryCatch from "../utils/tryCatch.js";
import categoryService from "../services/categoryService.js";

export const getCategories = tryCatch(async (req, res, next) => {
  const categories = await categoryService.getCategories();
  res.status(200).json({ categories: categories });
});

export const addCategory = tryCatch(async (req, res, next) => {
  const newCategory = await categoryService.addCategory(req.body);
  res.status(201).json({
    message: "Category added",
    category: newCategory,
  });
});
