import Category from "../models/categoryModel.js";

class CategoryService {
  async getCategories() {
    return await Category.find();
  }
  
  async addCategory(data) {
    const newCategory = new Category(data);
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
}

export default new CategoryService();
