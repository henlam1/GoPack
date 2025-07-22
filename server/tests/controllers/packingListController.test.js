import request from "supertest";
import testApp from "../testApp";
import {
  insertMockPackingList,
  insertMockPackingLists,
} from "../helpers/insertMockData";
import { createMockPackingList, createObjectId } from "../helpers/createMockData";

describe("GET /packing_lists", () => {
  it("should return all packing_lists", async () => {
    await insertMockPackingLists();
    const res = await request(testApp).get("/api/packing_lists");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it("should return packing list by id", async () => {
    const mockPackingList = await insertMockPackingList({
      name: "Europe Trip",
    });
    const mockId = mockPackingList._id.toString();
    const res = await request(testApp).get(`/api/packing_lists/${mockId}`);
    const resPackingList = res.body;
    expect(res.status).toBe(200);
    expect(resPackingList._id).toBe(mockId);
    expect(resPackingList.name).toBe("Europe Trip");
  });
  it("should return not found error", async () => {
    const mockId = createObjectId();
    const res = await request(testApp).get(`/api/packing_lists/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe("POST /packing_lists", () => {
  it("should create a new packing list", async () => {
    const mockPackingList = await createMockPackingList({ name: "Asia Trip" });
    const res = await request(testApp)
      .post(`/api/packing_lists`)
      .send(mockPackingList);
    const newPackingList = res.body;
    expect(res.status).toBe(201);
    expect(newPackingList.name).toBe("Asia Trip");
  });
  it("should create a validation error", async () => {
    const mockPackingList = await createMockPackingList({ name: "" });
    const res = await request(testApp)
      .post(`/api/packing_lists`)
      .send(mockPackingList);
    expect(res.status).toBe(400);
  });
});

describe("PATCH /packing_lists", () => {
  it("should update an packing list by id", async () => {
    const mockPackingList = await insertMockPackingList();
    const mockId = mockPackingList._id.toString();
    const res = await request(testApp)
      .patch(`/api/packing_lists/${mockId}`)
      .send({ name: "Updated packing_lists" });
    const updatedPackingList = res.body;
    expect(res.status).toBe(200);
    expect(updatedPackingList._id).toBe(mockId);
    expect(updatedPackingList.name).toBe("Updated packing_lists");
  });
});

describe("DELETE /packing_lists", () => {
  it("should delete an packing list by id", async () => {
    const mockPackingList = await insertMockPackingList();
    const mockId = mockPackingList._id.toString();
    const res = await request(testApp).delete(`/api/packing_lists/${mockId}`);
    const deletedPackingList = res.body;
    expect(res.status).toBe(200);
    expect(deletedPackingList._id).toBe(mockId);
    const search = await request(testApp).get(`/api/packing_lists/${mockId}`);
    expect(search.status).toBe(404);
  });
});
