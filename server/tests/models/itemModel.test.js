import Item from "../../models/itemModel";
import mongoose from "mongoose";

const mockCategoryId = new mongoose.Types.ObjectId();
const mockItem = {
  name: "item",
  quantity: 5,
  packed: true,
  category: mockCategoryId,
};

describe("Item model CRUD operations", () => {
  // CREATE
  it("should create a new item", async () => {
    const item = await Item.create(mockItem);
    expect(item.name).toBe("item");
    expect(item.quantity).toBe(5);
    expect(item.packed).toBe(true);
    expect(item.category).toBeInstanceOf(mongoose.Types.ObjectId);
  });
  // READ
  it("should find a item", async () => {
    const item = await Item.create(mockItem);
    const found = await Item.findById(item._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.name).toBe("item");
    }
  });
  // UPDATE
  it("should update a item", async () => {
    const item = await Item.create(mockItem);
    const updated = await Item.findByIdAndUpdate(
      item._id,
      {
        quantity: 10,
      },
      { new: true }
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.quantity).toBe(10);
    }
  });
  // DELETE
  it("should delete a item", async () => {
    const item = await Item.create(mockItem);
    await Item.findByIdAndDelete(item._id);
    const found = await Item.findById(item._id);
    expect(found).toBeNull();
  });
});
