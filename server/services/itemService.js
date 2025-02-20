import Item from "../models/itemModel";

class ItemService {
  async getItems() {
    return await Item.find();
  }

  async addItem(data) {
    const newItem = new Item(data);
    return await newItem.save();
  }
}

export default new ItemService();
