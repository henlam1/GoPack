import PackingList from "../models/packingListModel.js";

class PackingListService {
  async getPackingLists() {
    return await PackingList.find();
  }

  async getPackingListById(packingListId) {
    return await PackingList.findById(packingListId);
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
      }
    );
    return updatedPackingList;
  }

  async deletePackingList(packingListId) {
    const deletedPackingList = await PackingList.findByIdAndDelete(
      packingListId
    );
    return deletedPackingList;
  }

  async addCategory(packingListId, categoryId) {
    const result = await PackingList.findByIdAndUpdate(packingListId, {
      $push: { categories: categoryId },
    });
    return result;
  }

  async removeCategory(packingListId, categoryId) {
    const result = await PackingList.findByIdAndUpdate(packingListId, {
      $pull: { categories: categoryId },
    });
    return result;
  }
}

export default new PackingListService();
