import request from "supertest";
import testApp from "../testApp";
import {
  insertMockCategory,
  insertMockCategories,
} from "../helpers/insertMockData";
import { createMockCategory, createObjectId } from "../helpers/createMockData";

describe("GET /categories", () => {
  it("should return all categories", async () => {
    await insertMockCategories();
    const res = await request(testApp).get("/api/categories");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it("should return category by id", async () => {
    const mockCategory = await insertMockCategory({ name: "Clothes" });
    const mockId = mockCategory._id.toString();
    const res = await request(testApp).get(`/api/categories/${mockId}`);
    const resCategory = res.body;
    expect(res.status).toBe(200);
    expect(resCategory._id).toBe(mockId);
    expect(resCategory.name).toBe("Clothes");
  });
  it("should return not found error", async () => {
    const mockId = createObjectId();
    const res = await request(testApp).get(`/api/categories/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe("POST /categories", () => {
  it("should create a new category", async () => {
    const mockCategory = await createMockCategory({ name: "Apples" });
    const res = await request(testApp)
      .post(`/api/categories`)
      .send(mockCategory);
    const newCategory = res.body;
    expect(res.status).toBe(201);
    expect(newCategory.name).toBe("Apples");
  });
});

describe("PATCH /categories", () => {
  it("should update an category by id", async () => {
    const mockCategory = await insertMockCategory();
    const mockId = mockCategory._id.toString();
    const res = await request(testApp)
      .patch(`/api/categories/${mockId}`)
      .send({ name: "Updated name" });
    const updatedCategory = res.body;
    expect(res.status).toBe(200);
    expect(updatedCategory._id).toBe(mockId);
    expect(updatedCategory.name).toBe("Updated name");
  });
});

describe("DELETE /categories", () => {
  it("should delete an category by id", async () => {
    const mockCategory = await insertMockCategory();
    const mockId = mockCategory._id.toString();
    const res = await request(testApp).delete(`/api/categories/${mockId}`);
    const deletedCategory = res.body;
    expect(res.status).toBe(200);
    expect(deletedCategory._id).toBe(mockId);
    const search = await request(testApp).get(`/api/categories/${mockId}`);
    expect(search.status).toBe(404);
  });
});
