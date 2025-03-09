import Category from "../models/categoryModel.js";

class CategoryService {
  async getCategories() {
    return await Category.find();
  }
  async addCategory(data) {
    const newCategory = new Category(data);
    return await newCategory.save();
  }
}

export default new CategoryService();
