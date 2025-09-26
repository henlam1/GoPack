import tryCatch from '../utils/tryCatch.js';
import CategoryService from '../services/categoryService.js';
import ItemService from '../services/itemService.js';

export const getCategories = tryCatch(async (req, res) => {
  const categories = await CategoryService.getCategories();
  res.status(200).json(categories);
});

export const getCategoryById = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const category = await CategoryService.getCategoryById(categoryId);
  res.status(200).json(category);
});

export const addCategory = tryCatch(async (req, res) => {
  const newCategory = await CategoryService.addCategory(req.body);
  res.status(201).json(newCategory);
});

export const updateCategory = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const updatedCategory = await CategoryService.updateCategory(
    categoryId,
    req.body,
  );
  res.status(200).json(updatedCategory);
});

export const deleteCategory = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const deletedCategory = await CategoryService.deleteCategory(categoryId);
  res.status(200).json(deletedCategory);
});

export const markAllPacked = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const { packed } = req.body;
  const update = await CategoryService.markAllPacked(categoryId, packed);
  res.status(200).json(update);
});

export const getCategoryItems = tryCatch(async (req, res) => {
  const { categoryId } = req.params;
  const items = await ItemService.getItemsByCategory(categoryId);
  res.status(200).json(items);
});
