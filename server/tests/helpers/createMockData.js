import mongoose from 'mongoose';

export const createMockItem = (overrides = {}) => {
  return {
    name: 'item',
    quantity: 5,
    packed: true,
    category: new mongoose.Types.ObjectId(),
    ...overrides,
  };
};

export const createMockCategory = (overrides = {}) => {
  return {
    name: 'category',
    items: [],
    packingList: new mongoose.Types.ObjectId(),
    ...overrides,
  };
};

export const createMockPackingList = (overrides = {}) => {
  return {
    name: 'packingList',
    startDate: '2025-7-25',
    endDate: '2025-7-25',
    destination: '',
    description: '',
    categories: [],
    user: new mongoose.Types.ObjectId(),
    ...overrides,
  };
};

export const createMockUser = (overrides = {}) => {
  return {
    username: 'test',
    email: 'jest_test@gmail.com',
    password: 'testing1!',
    packingLists: [],
    ...overrides,
  };
};

export const createObjectId = () => {
  return new mongoose.Types.ObjectId();
};
