import { NotFoundError } from '../middleware/errors/errorClasses.js';
import Item from '../models/itemModel.js';
import CategoryService from './CategoryService.js';

class ItemService {
  async getItems() {
    return await Item.find();
  }

  async getItemById(itemId) {
    const item = await Item.findById(itemId);
    if (!item) throw new NotFoundError();
    return item;
  }

  async addItem(data) {
    const newItem = new Item(data);
    await CategoryService.addItem(data.category, newItem._id);
    return await newItem.save();
  }

  async updateItem(itemId, data) {
    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });
    if (!updatedItem) throw new NotFoundError();
    return updatedItem;
  }

  async deleteItem(itemId) {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) throw new NotFoundError();
    await CategoryService.removeItem(deletedItem.category, itemId);
    return deletedItem;
  }
}

export default new ItemService();
