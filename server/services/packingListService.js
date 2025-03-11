import PackingList from "../models/packingListModel.js";

class PackingListService {
  async getPackingLists() {
    return await PackingList.find();
  }
  
  async addPackingList(data) {
    const newList = new PackingList(data);
    return await newList.save();
  }
  
  async updatePackingList(data) {
    const { filter, update } = data;
    const updatedPackingList = await PackingList.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedPackingList;
  }
  
  async deletePackingList(data) {
    const { filter } = data;
    const deletedPackingList = await PackingList.findOneAndDelete(filter);
    return deletedPackingList;
  }
}

export default new PackingListService();
