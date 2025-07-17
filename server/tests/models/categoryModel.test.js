import Category from "../../models/categoryModel";
import mongoose from "mongoose";
import { buildMockCategory } from "../helpers/buildMockData";

const mockCategory = buildMockCategory();

describe("Category model CRUD operations", () => {
  it("create a new category", async () => {
    const category = await Category.create(mockCategory);
    expect(category.name).toBe("category");
    expect(category.items).toHaveLength(0);
    expect(category.packingList).toBeInstanceOf(mongoose.Types.ObjectId);
  });
  it("find a category", async () => {
    const category = await Category.create(mockCategory);
    const found = await Category.findById(category._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.name).toBe("category");
    }
  });
  it("update a category", async () => {
    const category = await Category.create(mockCategory);
    const mockItemId = new mongoose.Types.ObjectId();
    const updated = await Category.findByIdAndUpdate(
      category._id,
      {
        items: [mockItemId],
      },
      { new: true }
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.items).toHaveLength(1);
    }
  });
  it("delete a category", async () => {
    const category = await Category.create(mockCategory);
    await Category.findByIdAndDelete(category._id);
    const found = await Category.findById(category._id);
    expect(found).toBeNull();
  });
});
