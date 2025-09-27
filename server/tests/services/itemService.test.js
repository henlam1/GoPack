import ItemService from '../../services/itemService';
import {
  insertMockCategory,
  insertMockItem,
  insertMockItems,
  insertMockPackingList,
} from '../helpers/insertMockData';

describe('Item service operations', () => {
  beforeEach(async () => {
    await insertMockItems();
  });
  it('gets all items', async () => {
    const allItems = await ItemService.getItems();
    expect(allItems).toHaveLength(3);
  });
  it('gets item by id', async () => {
    const mockItem = await insertMockItem();
    const res = await ItemService.getItemById(mockItem._id);
    expect(res._id).toEqual(mockItem._id);
  });
  it('gets item by category', async () => {
    const category = await insertMockCategory();
    await insertMockItems(4, { category: category._id });
    const res = await ItemService.getItemsByCategory(category._id);
    expect(res).toHaveLength(4);
  });
  it('adds a new item', async () => {
    await insertMockItem();
    const allItems = await ItemService.getItems();
    expect(allItems).toHaveLength(4);
  });
  it('updates a item by id', async () => {
    const mockItem = await insertMockItem();
    const updatedItem = await ItemService.updateItem(mockItem._id, {
      name: 'Shampoo',
      quantity: '20',
    });
    expect(updatedItem.name).toEqual('Shampoo');
    expect(updatedItem.quantity).toEqual(20);
  });
  it('deletes a item by id', async () => {
    // Link packing list, category, and item
    let packingList = await insertMockPackingList();
    let category = await insertMockCategory({ packingList: packingList._id });
    const item = await insertMockItem({ category: category._id });
    category.items.push(item._id);

    // Delete item
    const deletedItem = await ItemService.deleteItem(item._id);
    expect(deletedItem).toBeTruthy();
  });
});
