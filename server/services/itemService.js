import { NotFoundError } from '../middleware/errors/errorClasses.js';
import Item from '../models/itemModel.js';
import CategoryService from './categoryService.js';

class ItemService {
  async getItems() {
    return await Item.find();
  }

  async getItemById(itemId) {
    const item = await Item.findById(itemId);
    if (!item) throw new NotFoundError('Item not found');
    return item;
  }

  async addItem(data) {
    const newItem = new Item(data);
    await CategoryService.addItem(data.category, newItem._id);
    return await newItem.save();
  }

  async updateItem(itemId, data) {
    // Find old item
    const oldItem = await Item.findById(itemId);
    if (!oldItem) throw new NotFoundError('Item not found');

    // Update new item
    const updatedItem = await Item.findByIdAndUpdate(itemId, data, {
      new: true,
    });
    if (!updatedItem) throw new NotFoundError('Item not found');

    // Check if packed status changed
    if (oldItem.packed !== updatedItem.packed) {
      const value = updatedItem.packed ? 1 : -1;
      await CategoryService.updatePackedItems(updatedItem.category, value);
    }
    return updatedItem;
  }

  async deleteItem(itemId) {
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem) throw new NotFoundError('Item not found');
    if (deletedItem.packed) {
      await CategoryService.updatePackedItems(deletedItem.category, -1);
    }
    await CategoryService.removeItem(deletedItem.category, itemId);
    return deletedItem;
  }
}

export default new ItemService();
