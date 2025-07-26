import PackingList from '../../models/packingListModel';
import mongoose from 'mongoose';
import { createMockPackingList } from '../helpers/createMockData';

const mockPackingList = createMockPackingList();

describe('PackingList model CRUD operations', () => {
  it('create a new packingList', async () => {
    const packingList = await PackingList.create(mockPackingList);
    expect(packingList.name).toBe('packingList');
    expect(packingList.categories).toHaveLength(0);
    expect(packingList.user).toBeInstanceOf(mongoose.Types.ObjectId);
  });
  it('find a packingList', async () => {
    const packingList = await PackingList.create(mockPackingList);
    const found = await PackingList.findById(packingList._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.name).toBe('packingList');
    }
  });
  it('update a packingList', async () => {
    const packingList = await PackingList.create(mockPackingList);
    const mockCategoryId = new mongoose.Types.ObjectId();
    const updated = await PackingList.findByIdAndUpdate(
      packingList._id,
      {
        categories: [mockCategoryId],
      },
      { new: true },
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.categories).toHaveLength(1);
    }
  });
  it('delete a packingList', async () => {
    const packingList = await PackingList.create(mockPackingList);
    await PackingList.findByIdAndDelete(packingList._id);
    const found = await PackingList.findById(packingList._id);
    expect(found).toBeNull();
  });
});
