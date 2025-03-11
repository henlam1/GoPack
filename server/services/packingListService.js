import PackingList from "../models/packingListModel.js";

class PackingListService {
  async getPackingLists() {
    return await PackingList.find();
  }
  
  async addPackingList(data) {
    const newList = new PackingList(data);
    return await newList.save();
  }
  
  async updatePackingList(packingListId, data) {
    const updatedPackingList = await PackingList.findByIdAndUpdate(packingListId, data, {
      new: true,
    });
    return updatedPackingList;
  }
  
  async deletePackingList(packingListId) {
    const deletedPackingList = await PackingList.findByIdAndDelete(packingListId);
    return deletedPackingList;
  }
}

export default new PackingListService();
