import ItemService from "../../services/ItemService";
import { insertMockItem, insertMockItems } from "../helpers/insertMockData";

describe("Item service operations", () => {
  beforeEach(async () => {
    await insertMockItems();
  });
  it("gets all items", async () => {
    const allItems = await ItemService.getItems();
    expect(allItems).toHaveLength(3);
  });
  it("gets item by id", async () => {
    const mockItem = await insertMockItem();
    const res = await ItemService.getItemById(mockItem._id);
    expect(res._id).toEqual(mockItem._id);
  });
  it("adds a new item", async () => {
    await insertMockItem();
    const allItems = await ItemService.getItems();
    expect(allItems).toHaveLength(4);
  });
  it("updates a item by id", async () => {
    const mockItem = await insertMockItem();
    const updatedItem = await ItemService.updateItem(mockItem._id, {
      name: "Shampoo",
      quantity: "20",
    });
    expect(updatedItem.name).toEqual("Shampoo");
    expect(updatedItem.quantity).toEqual(20);
  });
  it("deletes a item by id", async () => {
    const mockItem = await insertMockItem();
    const deletedItem = await ItemService.deleteItem(mockItem._id);
    expect(deletedItem).toBeTruthy();
    const search = await ItemService.getItemById(mockItem._id);
    expect(search).toBeFalsy();
  });
});
