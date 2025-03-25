import Category from "../models/categoryModel.js";
import PackingListService from "./packingListService.js";

class CategoryService {
  async getCategories() {
    return await Category.find();
  }

  async getCategoryById(categoryId) {
    return await Category.findById(categoryId);
  }

  async addCategory(data) {
    const newCategory = new Category(data);
    const packingList = await PackingListService.addCategory(
      data.packingList,
      newCategory._id
    );
    return await newCategory.save();
  }

  async updateCategory(categoryId, data) {
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, data, {
      new: true,
    });
    return updatedCategory;
  }

  async deleteCategory(categoryId) {
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    return deletedCategory;
  }

  async addItem(categoryId, itemId) {
    const result = await Category.findByIdAndUpdate(categoryId, {
      $push: { items: itemId },
    });
    return result;
  }

  async removeItem(categoryId, itemId) {
    const result = await Category.findByIdAndUpdate(categoryId, {
      $pull: { items: itemId },
    });
    return result;
  }
}

export default new CategoryService();
