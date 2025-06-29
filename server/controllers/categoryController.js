import tryCatch from "../utils/tryCatch.js";
import CategoryService from "../services/CategoryService.js";

export const getCategories = tryCatch(async (req, res, next) => {
  const categories = await CategoryService.getCategories();
  res.status(200).json(categories);
});

export const getCategoryById = tryCatch(async (req, res, next) => {
  const { categoryId } = req.params;
  const category = await CategoryService.getCategoryById(categoryId);
  res.status(200).json(category);
});

export const addCategory = tryCatch(async (req, res, next) => {
  const newCategory = await CategoryService.addCategory(req.body);
  res.status(201).json(newCategory);
});

export const updateCategory = tryCatch(async (req, res, next) => {
  const { categoryId } = req.params;
  const updatedCategory = await CategoryService.updateCategory(
    categoryId,
    req.body
  );
  res.status(200).json(updatedCategory);
});

export const deleteCategory = tryCatch(async (req, res, next) => {
  const { categoryId } = req.params;
  const deletedCategory = await CategoryService.deleteCategory(categoryId);
  res.status(200).json(deletedCategory);
});
