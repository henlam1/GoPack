import Category from "../../models/categoryModel";
import mongoose from "mongoose";

const mockItemId = new mongoose.Types.ObjectId();
const mockPackingListId = new mongoose.Types.ObjectId();
const mockCategory = {
  name: "category",
  items: [],
  packingList: mockPackingListId,
};

beforeEach(async () => {
  await Category.deleteMany();
});

describe("Category model CRUD operations", () => {
  // CREATE
  it("should create a new category", async () => {
    const category = await Category.create(mockCategory);
    expect(category.name).toBe("category");
    expect(category.items).toHaveLength(0);
    expect(category.packingList).toBeInstanceOf(mongoose.Types.ObjectId);
  });
  // READ
  it("should find a category", async () => {
    const category = await Category.create(mockCategory);
    const found = await Category.findById(category._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.name).toBe("category");
    }
  });
  // UPDATE
  it("should update a category", async () => {
    const category = await Category.create(mockCategory);
    const updated = await Category.findByIdAndUpdate(
      category._id,
      {
        items: [mockItemId]
      },
      { new: true }
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.items).toHaveLength(1);
    }
  });
  // DELETE
  it("should delete a category", async () => {
    const category = await Category.create(mockCategory);
    await Category.findByIdAndDelete(category._id);
    const found = await Category.findById(category._id);
    expect(found).toBeNull();
  });
});
