import mongoose from "mongoose";

export const buildMockItem = (overrides = {}) => {
  return {
    name: "item",
    quantity: 5,
    packed: true,
    category: new mongoose.Types.ObjectId(),
    ...overrides
  };
};

export const buildMockCategory = (overrides = {}) => {
  return {
    name: "category",
    items: [],
    packingList: new mongoose.Types.ObjectId(),
    ...overrides
  };
};

export const buildMockPackingList = (overrides = {}) => {
  return {
    name: "packingList",
    categories: [],
    user: new mongoose.Types.ObjectId(),
    ...overrides
  };
};

export const buildMockUser = (overrides = {}) => {
  return {
    username: "test",
    email: "jest_test@gmail.com",
    password: "test1!",
    packingLists: [],
    ...overrides
  };
};
