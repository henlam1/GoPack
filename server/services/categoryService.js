import { NotFoundError } from "../middleware/errors/errorClasses.js";
import Category from "../models/categoryModel.js";
import ItemService from "./ItemService.js";
import PackingListService from "./PackingListService.js";

class CategoryService {
  async getCategories() {
    return await Category.find();
  }

  async getCategoryById(categoryId) {
    const category = await Category.findById(categoryId);
    if (!category) throw new NotFoundError();
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
    if (!updatedCategory) throw new NotFoundError();
    return updatedCategory;
  }

  async deleteCategory(categoryId) {
    // Clear items
    const category = await Category.findById(categoryId);
    if (!category) throw new NotFoundError();
    category.items.forEach(async (itemId) => {
      await ItemService.deleteItem(itemId);
    });

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
      },
      { new: true }
    );
    if (!result) throw new NotFoundError();
    return result;
  }

  async removeItem(categoryId, itemId) {
    const result = await Category.findByIdAndUpdate(
      categoryId,
      {
        $pull: { items: itemId },
      },
      { new: true }
    );
    if (!result) throw new NotFoundError();
    return result;
  }
}

export default new CategoryService();
