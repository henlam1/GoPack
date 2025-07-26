import PackingListService from '../../services/PackingListService';
import {
  insertMockCategory,
  insertMockPackingList,
  insertMockPackingLists,
  insertMockUser,
} from '../helpers/insertMockData';

describe('Packing list service operations', () => {
  beforeEach(async () => {
    await insertMockPackingLists();
  });

  it('gets all packing lists', async () => {
    const allPackingLists = await PackingListService.getPackingLists();
    expect(allPackingLists).toHaveLength(3);
  });

  it('gets packing list by id', async () => {
    const mockPackingList = await insertMockPackingList();
    const res = await PackingListService.getPackingListById(
      mockPackingList._id,
    );
    expect(res._id).toEqual(mockPackingList._id);
  });

  it('adds a new packing list', async () => {
    await insertMockPackingList();
    const allPackingLists = await PackingListService.getPackingLists();
    expect(allPackingLists).toHaveLength(4);
  });

  it('updates a packing list by id', async () => {
    const mockPackingList = await insertMockPackingList();
    const updatedPackingList = await PackingListService.updatePackingList(
      mockPackingList._id,
      { name: 'Europe Trip' },
    );
    expect(updatedPackingList.name).toEqual('Europe Trip');
  });

  it('deletes a packing list by id', async () => {
    // Link user and packing list
    let user = await insertMockUser();
    const packingList = await insertMockPackingList({ user: user._id });

    // Delete packing list
    const deletedPackingList = await PackingListService.deletePackingList(
      packingList._id,
    );
    expect(deletedPackingList).toBeTruthy();
  });

  it('adds a category by id', async () => {
    const category = await insertMockCategory();
    let packingList = await insertMockPackingList();
    packingList = await PackingListService.addCategory(
      packingList._id,
      category._id,
    );
    expect(packingList.categories).toHaveLength(1);
    expect(packingList.categories[0]).toStrictEqual(category._id);
  });

  it('removes a category by id', async () => {
    const category = await insertMockCategory();
    let packingList = await insertMockPackingList({ categories: [category] });
    packingList = await PackingListService.removeCategory(
      packingList._id,
      category._id,
    );
    expect(packingList.categories).toHaveLength(0);
  });
});
