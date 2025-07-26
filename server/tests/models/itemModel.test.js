import mongoose from 'mongoose';
import Item from '../../models/itemModel';
import { createMockItem } from '../helpers/createMockData';

const mockItem = createMockItem();

describe('Item model CRUD operations', () => {
  it('create a new item', async () => {
    const item = await Item.create(mockItem);
    expect(item.name).toBe('item');
    expect(item.quantity).toBe(5);
    expect(item.packed).toBe(true);
    expect(item.category).toBeInstanceOf(mongoose.Types.ObjectId);
  });
  it('find a item', async () => {
    const item = await Item.create(mockItem);
    const found = await Item.findById(item._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.name).toBe('item');
    }
  });
  it('update a item', async () => {
    const item = await Item.create(mockItem);
    const updated = await Item.findByIdAndUpdate(
      item._id,
      {
        quantity: 10,
      },
      { new: true },
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.quantity).toBe(10);
    }
  });
  it('delete a item', async () => {
    const item = await Item.create(mockItem);
    await Item.findByIdAndDelete(item._id);
    const found = await Item.findById(item._id);
    expect(found).toBeNull();
  });
});
