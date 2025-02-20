import PackingList from "../models/packingListModel";

class PackingListService {
  async getPackingLists() {
    return await PackingList.find();
  }
  async addPackingList(data) {
    const newList = new PackingList(data);
    return await newList.save();
  }
}

export default new PackingListService();
