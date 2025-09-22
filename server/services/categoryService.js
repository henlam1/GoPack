import { NotFoundError } from '../middleware/errors/errorClasses.js';
import Category from '../models/categoryModel.js';
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
}

export default new CategoryService();
