import { NotFoundError } from '../middleware/errors/errorClasses.js';
import Category from '../models/categoryModel.js';
import Item from '../models/itemModel.js';
import promptBuilder from '../utils/promptBuilder.js';
import { createAIService, generateSuggestions } from './aiService.js';
import ItemService from './itemService.js';
import PackingListService from './packingListService.js';

class CategoryService {
  async getCategories() {
    return await Category.find();
  }

  async getCategoryById(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) throw new NotFoundError('Category not found');
    return category;
  }

  async getCategoriesByPackingList(packingListId) {
    return await Category.find({ packingList: packingListId });
  }

  async addCategory(data) {
    const newCategory = new Category(data);
    await PackingListService.addCategory(data.packingList, newCategory._id);
    return await newCategory.save();
  }

  async updateCategory(categoryId, data) {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
    });
    if (!updatedCategory) throw new NotFoundError('Category not found');
    return updatedCategory;
  }

  async deleteCategory(categoryId) {
    // Clear items
    const category = await Category.findById(categoryId);
    if (!category) throw new NotFoundError('Category not found');
    for (const itemId of category.items) {
      await ItemService.deleteItem(itemId);
    }

    // Remove category from packing list
    await PackingListService.removeCategory(category.packingList, categoryId);

    // Delete category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    return deletedCategory;
  }

  async addItem(categoryId, itemId) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: { items: itemId },
        $inc: { totalItems: 1 },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('Category not found');

    // Update packing list total items
    const { packingList } = result;
    await PackingListService.updateTotalItems(packingList, 1);

    return result;
  }

  async addItems(categoryId, itemIds) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      {
        $push: { items: { $each: itemIds } },
        $inc: { totalItems: itemIds.length },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('Category not found');

    // Update packing list total items
    const { packingList } = result;
    await PackingListService.updateTotalItems(packingList, itemIds.length);

    return result;
  }

  async removeItem(categoryId, itemId) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: { items: itemId },
        $inc: { totalItems: -1 },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('Category not found');

    // Update packing list total items
    const { packingList } = result;
    await PackingListService.updateTotalItems(packingList, -1);

    return result;
  }

  async updatePackedItems(categoryId, value) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      {
        $inc: { packedItems: value },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('Category not found');

    // Update packing list values
    const { packingList } = result;
    await PackingListService.updatePackedItems(packingList, value);

    return result;
  }

  async markAllPacked(categoryId, packed) {
    const result = await Item.updateMany(
      { category: categoryId },
      { $set: { packed } },
    );

    const changedPackedCount = packed
      ? result.modifiedCount
      : -result.modifiedCount;

    await this.updatePackedItems(categoryId, changedPackedCount);
    return { updatedItems: changedPackedCount };
  }

  async suggestCategories(data) {
    const prompt = promptBuilder.suggestCategories(data);
    const ai = createAIService();
    const suggestions = await generateSuggestions(ai, prompt);
    return suggestions;
  }

  async commitCategories(data) {
    const { packingListId, suggestions } = data;
    const newCategories = [];

    for (const [categoryName, items] of Object.entries(suggestions)) {
      // Create one category at a time
      const newCategory = await Category.create({
        name: categoryName,
        packingList: packingListId,
      });
      newCategories.push(newCategory);

      // Create items per category in bulk
      const newItems = await Item.insertMany(
        items.map((i) => ({ ...i, packed: false, category: newCategory._id })),
      );

      // Add all the items to our category
      const itemIds = newItems.map((item) => item._id);
      await this.addItems(newCategory._id, itemIds);
    }

    // Add the new categories to our packing list
    const categoryIds = newCategories.map((category) => category._id);
    await PackingListService.addCategories(packingListId, categoryIds);

    return newCategories;
  }
}

export default new CategoryService();
