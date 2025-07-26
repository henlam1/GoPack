import { NotFoundError } from '../middleware/errors/errorClasses.js';
import PackingList from '../models/packingListModel.js';
import CategoryService from './CategoryService.js';
import UserService from './UserService.js';

class PackingListService {
  async getPackingLists() {
    return await PackingList.find();
  }

  async getPackingListById(packingListId) {
    const packingList = await PackingList.findById(packingListId);
    if (!packingList) throw new NotFoundError();
    return packingList;
  }

  async addPackingList(data) {
    const newList = new PackingList(data);
    return await newList.save();
  }

  async updatePackingList(packingListId, data) {
    const updatedPackingList = await PackingList.findByIdAndUpdate(
      packingListId,
      data,
      {
        new: true,
      },
    );
    if (!updatedPackingList) throw new NotFoundError();
    return updatedPackingList;
  }

  async deletePackingList(packingListId) {
    // Delete categories
    const packingList = await PackingList.findById(packingListId);
    if (!packingList) throw new NotFoundError();
    packingList.categories.forEach(async (categoryId) => {
      await CategoryService.deleteCategory(categoryId);
    });

    // Remove packing list from user
    await UserService;

    // Delete packing list
    const deletedPackingList =
      await PackingList.findByIdAndDelete(packingListId);
    return deletedPackingList;
  }

  async addCategory(packingListId, categoryId) {
    const result = await PackingList.findByIdAndUpdate(
      packingListId,
      {
        $push: { categories: categoryId },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError();
    return result;
  }

  async removeCategory(packingListId, categoryId) {
    const result = await PackingList.findByIdAndUpdate(
      packingListId,
      {
        $pull: { categories: categoryId },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError();
    return result;
  }
}

export default new PackingListService();
