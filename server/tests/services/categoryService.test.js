import CategoryService from '../../services/categoryService';
import {
  insertMockCategory,
  insertMockCategories,
  insertMockItem,
  insertMockPackingList,
  insertMockItems,
} from '../helpers/insertMockData';

describe('Category service operations', () => {
  beforeEach(async () => {
    await insertMockCategories();
  });

  it('gets all categories', async () => {
    const allCategories = await CategoryService.getCategories();
    expect(allCategories).toHaveLength(3);
  });

  it('gets category by id', async () => {
    const mockCategory = await insertMockCategory();
    const res = await CategoryService.getCategoryById(mockCategory._id);
    expect(res._id).toEqual(mockCategory._id);
  });

  it('adds a new category', async () => {
    await insertMockCategory();
    const allCategories = await CategoryService.getCategories();
    expect(allCategories).toHaveLength(4);
  });

  it('updates a category by id', async () => {
    const mockCategory = await insertMockCategory();
    const updatedCategory = await CategoryService.updateCategory(
      mockCategory._id,
      { name: 'Essentials' },
    );
    expect(updatedCategory.name).toEqual('Essentials');
  });

  it('deletes a category by id', async () => {
    // Link packing list and item
    let packingList = await insertMockPackingList();
    const category = await insertMockCategory({ packingList: packingList._id });

    // Delete category
    const deletedCategory = await CategoryService.deleteCategory(category._id);
    expect(deletedCategory).toBeTruthy();
  });

  it('adds an item by id', async () => {
    // Link packing list and item
    let packingList = await insertMockPackingList();
    let category = await insertMockCategory({ packingList: packingList._id });
    const item = await insertMockItem();

    category = await CategoryService.addItem(category._id, item._id);
    expect(category.items).toHaveLength(1);
    expect(category.items[0]).toStrictEqual(item._id);
  });

  it('removes an item by id', async () => {
    // Link packing list and item
    let packingList = await insertMockPackingList();
    const item = await insertMockItem();
    let category = await insertMockCategory({
      packingList: packingList._id,
      items: [item],
    });

    category = await CategoryService.removeItem(category._id, item._id);
    expect(category.items).toHaveLength(0);
  });

  it('updates the number of packed items', async () => {
    const packingList = await insertMockPackingList();
    const category = await insertMockCategory({
      packingList: packingList._id,
    });
    await insertMockItems(undefined, {
      packed: false,
      category: category._id,
    });

    const res = await CategoryService.updatePackedItems(
      category._id.toString(),
      2,
    );
    expect(res.packedItems).toBe(2);
  });

  it('marks all items as packed', async () => {
    const packingList = await insertMockPackingList();
    const category = await insertMockCategory({
      packingList: packingList._id,
    });
    await insertMockItems(5, {
      packed: false,
      category: category._id,
    });
    const res = await CategoryService.markAllPacked(
      category._id.toString(),
      true,
    );
    expect(res.updatedItems).toBe(5);
  });
});
