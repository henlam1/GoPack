import { NotFoundError } from '../middleware/errors/errorClasses.js';
import PackingList from '../models/packingListModel.js';
import CategoryService from './categoryService.js';
import UserService from './userService.js';

class PackingListService {
  async getPackingLists(filter) {
    return await PackingList.find(filter);
  }

  async getPackingListById(packingListId) {
    const packingList = await PackingList.findById(packingListId);
    if (!packingList) throw new NotFoundError('Packing list not found');
    return packingList;
  }

  async addPackingList(data) {
    const newList = new PackingList(data);
    // await UserService.addPackingList(data.user, newList._id);
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
    if (!updatedPackingList) throw new NotFoundError('Packing list not found');
    return updatedPackingList;
  }

  async deletePackingList(packingListId) {
    // Delete categories
    const packingList = await PackingList.findById(packingListId);
    if (!packingList) throw new NotFoundError('Packing list not found');
    for (const categoryId of packingList.categories) {
      await CategoryService.deleteCategory(categoryId);
    }

    // Remove packing list from user
    await UserService.removePackingList(packingList.user, packingList._id);

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
    if (!result) throw new NotFoundError('Packing list not found');
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
    if (!result) throw new NotFoundError('Packing list not found');
    return result;
  }
}

export default new PackingListService();
