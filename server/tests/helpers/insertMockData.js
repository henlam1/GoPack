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
  const insertedItem = await Item.insertOne(item);

  // If items belong to a category, push them to category.items
  if (overrides.category) {
    await Category.updateOne(
      { _id: overrides.category },
      { $push: { items: insertedItem._id } },
    );
  }

  return insertedItem;
};

export const insertMockItems = async (count = 3, overrides = {}) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(createMockItem({ name: `Item ${i + 1}`, ...overrides }));
  }
  const insertedItems = await Item.insertMany(items);

  // If items belong to a category, push them to category.items
  if (overrides.category) {
    await Category.updateOne(
      { _id: overrides.category },
      { $push: { items: { $each: insertedItems.map((i) => i._id) } } },
    );
  }

  return insertedItems;
};

export const insertMockCategory = async (overrides = {}) => {
  const category = createMockCategory(overrides);
  const insertedCategory = await Category.insertOne(category);

  // If items belong to a packing list, push them to packingList.categories
  if (overrides.packingList) {
    await PackingList.updateOne(
      { _id: overrides.packingList },
      { $push: { categories: insertedCategory._id } },
    );
  }

  return insertedCategory;
};

export const insertMockCategories = async (count = 3, overrides = {}) => {
  const categories = [];
  for (let i = 0; i < count; i++) {
    categories.push(
      createMockCategory({ name: `Category ${i + 1}`, ...overrides }),
    );
  }
  const insertedCategories = await Category.insertMany(categories);

  // If items belong to a packing list, push them to packingList.categories
  if (overrides.packingList) {
    await PackingList.updateOne(
      { _id: overrides.packingList },
      {
        $push: { categories: { $each: insertedCategories.map((c) => c._id) } },
      },
    );
  }

  return insertedCategories;
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
