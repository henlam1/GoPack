import Category from "../models/categoryModel.js";

class CategoryService {
  async getCategories() {
    return await Category.find();
  }
  
  async addCategory(data) {
    const newCategory = new Category(data);
    return await newCategory.save();
  }
  
  async updateCategory(data) {
    const { filter, update } = data;
    const updatedCategory = await Category.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedCategory;
  }
  
  async deleteCategory(data) {
    const { filter } = data;
    const deletedCategory = await Category.findOneAndDelete(filter);
    return deletedCategory;
  }
}

export default new CategoryService();
