import tryCatch from "../utils/tryCatch.js";
import CategoryService from "../services/categoryService.js";

export const getCategories = tryCatch(async (req, res, next) => {
  const categories = await CategoryService.getCategories();
  res.status(200).json({ categories: categories });
});

export const addCategory = tryCatch(async (req, res, next) => {
  const newCategory = await CategoryService.addCategory(req.body);
  res.status(201).json({
    message: "Category added",
    category: newCategory,
  });
});

export const updateCategory = tryCatch(async (req, res, next) => {
  const { categoryId } = req.params;
  const updatedCategory = await CategoryService.updateCategory(categoryId, req.body);
  res.status(200).json({
    message: "Category updated",
    Category: updatedCategory,
  });
});

export const deleteCategory = tryCatch(async (req, res, next) => {
  const { categoryId } = req.params;
  const deletedCategory = await CategoryService.deleteCategory(categoryId);
  res.status(200).json({
    message: "Category deleted",
    item: deletedCategory,
  });
});