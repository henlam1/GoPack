import request from "supertest";
import testApp from "../testApp";
import {
  insertMockCategory,
  insertMockItem,
  insertMockItems,
} from "../helpers/insertMockData";
import { createMockItem, createObjectId } from "../helpers/createMockData";

describe("GET /items", () => {
  it("should return all items", async () => {
    await insertMockItems();
    const res = await request(testApp).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it("should return item by id", async () => {
    const mockItem = await insertMockItem({ name: "Toothbrush" });
    const mockId = mockItem._id.toString();
    const res = await request(testApp).get(`/api/items/${mockId}`);
    const resItem = res.body;
    expect(res.status).toBe(200);
    expect(resItem._id).toBe(mockId);
    expect(resItem.name).toBe("Toothbrush");
  });
  it("should return not found error", async () => {
    const mockId = createObjectId();
    const res = await request(testApp).get(`/api/items/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe("POST /items", () => {
  it("should create a new item", async () => {
    const category = await insertMockCategory();
    const mockItem = await createMockItem({
      name: "Apple",
      quantity: 10,
      category: category._id,
    });
    const res = await request(testApp).post(`/api/items/`).send(mockItem);
    const newItem = res.body;
    expect(res.status).toBe(201);
    expect(newItem.name).toBe("Apple");
    expect(newItem.quantity).toBe(10);
  });
});

describe("PATCH /items", () => {
  it("should update an item by id", async () => {
    const mockItem = await insertMockItem();
    const mockId = mockItem._id.toString();
    const res = await request(testApp)
      .patch(`/api/items/${mockId}`)
      .send({ name: "Updated name" });
    const updatedItem = res.body;
    expect(res.status).toBe(200);
    expect(updatedItem._id).toBe(mockId);
    expect(updatedItem.name).toBe("Updated name");
  });
  it("should return not found error", async () => {
    const mockId = createObjectId();
    const res = await request(testApp).patch(`/api/items/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe("DELETE /items", () => {
  it("should delete an item by id", async () => {
    const category = await insertMockCategory();
    const mockItem = await insertMockItem({ category: category._id });
    const mockId = mockItem._id.toString();
    const res = await request(testApp).delete(`/api/items/${mockId}`);
    const deletedItem = res.body;
    expect(res.status).toBe(200);
    expect(deletedItem._id).toBe(mockId);
    const search = await request(testApp).get(`/api/items/${mockId}`);
    expect(search.status).toBe(404);
  });
  it("should return not found error", async () => {
    const mockId = createObjectId();
    const res = await request(testApp).delete(`/api/items/${mockId}`);
    expect(res.status).toBe(404);
  });
});
