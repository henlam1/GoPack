import Item from "../models/itemModel.js";

class ItemService {
  async getItems() {
    return await Item.find();
  }

  async getItemById(itemId) {
    return await Item.findById(itemId);
  }

  async addItem(data) {
    const newItem = new Item(data);
    return await newItem.save();
  }

  async updateItem(itemId, data) {
    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });
    return updatedItem;
  }

  async deleteItem(itemId) {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    return deletedItem;
  }
}

export default new ItemService();
