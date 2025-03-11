import Item from "../models/itemModel.js";

class ItemService {
  async getItems() {
    return await Item.find();
  }

  async addItem(data) {
    const newItem = new Item(data);
    return await newItem.save();
  }

  async updateItem(data) {
    const { filter, update } = data;
    const updatedItem = await Item.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedItem;
  }

  async deleteItem(data) {
    const { filter } = data;
    const deletedItem = await Item.findOneAndDelete(filter);
    return deletedItem;
  }
}

export default new ItemService();
