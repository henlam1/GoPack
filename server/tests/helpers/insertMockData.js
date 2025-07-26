import Category from '../../models/categoryModel';
import Item from '../../models/itemModel';
import PackingList from '../../models/packingListModel';
import User from '../../models/userModel';
import {
  createMockCategory,
  createMockItem,
  createMockPackingList,
  createMockUser,
} from './createMockData';

export const insertMockItem = async (overrides = {}) => {
  const item = createMockItem(overrides);
  return await Item.insertOne(item);
};

export const insertMockItems = async (count = 3, overrides = {}) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(createMockItem({ name: `Item ${i + 1}`, ...overrides }));
  }
  return await Item.insertMany(items);
};

export const insertMockCategory = async (overrides = {}) => {
  const category = createMockCategory(overrides);
  return await Category.insertOne(category);
};

export const insertMockCategories = async (count = 3, overrides = {}) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push(
      createMockCategory({ name: `Category ${i + 1}`, ...overrides }),
    );
  }
  return await Category.insertMany(categories);
};

export const insertMockPackingList = async (overrides = {}) => {
  const packingList = createMockPackingList(overrides);
  return await PackingList.insertOne(packingList);
};

export const insertMockPackingLists = async (count = 3, overrides = {}) => {
  const packingLists = [];
  for (let i = 0; i < count; i++) {
    packingLists.push(
      createMockPackingList({ name: `PackingList ${i + 1}`, ...overrides }),
    );
  }
  return await PackingList.insertMany(packingLists);
};

export const insertMockUser = async (overrides = {}) => {
  const user = createMockUser(overrides);
  return await User.insertOne(user);
};

export const insertMockUsers = async (count = 3, overrides = {}) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(
      createMockUser({
        username: `User ${i + 1}`,
        email: `jest_test${i + 1}@gmail.com`,
        ...overrides,
      }),
    );
  }
  return await User.insertMany(users);
};
