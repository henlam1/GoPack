import CategoryService from '../../services/CategoryService';
import {
  insertMockCategory,
  insertMockCategories,
  insertMockItem,
  insertMockPackingList,
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
    const item = await insertMockItem();
    let category = await insertMockCategory();
    category = await CategoryService.addItem(category._id, item._id);
    expect(category.items).toHaveLength(1);
    expect(category.items[0]).toStrictEqual(item._id);
  });

  it('removes an item by id', async () => {
    const item = await insertMockItem();
    let category = await insertMockCategory({ items: [item] });
    category = await CategoryService.removeItem(category._id, item._id);
    expect(category.items).toHaveLength(0);
  });
});
