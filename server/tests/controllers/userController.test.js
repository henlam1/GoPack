import request from "supertest";
import testApp from "../testApp";
import { insertMockUser, insertMockUsers } from "../helpers/insertMockData";
import { buildMockUser, buildObjectId } from "../helpers/buildMockData";

describe("GET /users", () => {
  it("should return all users", async () => {
    await insertMockUsers();
    const res = await request(testApp).get("/api/users");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
  });
  it("should return user by id", async () => {
    const mockUser = await insertMockUser({ username: "John" });
    const mockId = mockUser._id.toString();
    const res = await request(testApp).get(`/api/users/${mockId}`);
    const resUser = res.body;
    expect(res.status).toBe(200);
    expect(resUser._id).toBe(mockId);
  });
  it("should return not found error", async () => {
    const mockId = buildObjectId();
    const res = await request(testApp).get(`/api/users/${mockId}`);
    expect(res.status).toBe(404);
  });
});

describe("POST /users", () => {
  it("should create a new user", async () => {
    const mockUser = await buildMockUser({ username: "Jane" });
    const res = await request(testApp).post(`/api/users`).send(mockUser);
    const newUser = res.body;
    expect(res.status).toBe(201);
    expect(newUser.username).toBe("Jane");
  });
});

describe("PATCH /users", () => {
  it("should update an user by id", async () => {
    const mockUser = await insertMockUser();
    const mockId = mockUser._id.toString();
    const res = await request(testApp)
      .patch(`/api/users/${mockId}`)
      .send({ username: "Updated username" });
    const updatedUser = res.body;
    expect(res.status).toBe(200);
    expect(updatedUser._id).toBe(mockId);
    expect(updatedUser.username).toBe("Updated username");
  });
});

describe("DELETE /users", () => {
  it("should delete an user by id", async () => {
    const mockUser = await insertMockUser();
    const mockId = mockUser._id.toString();
    const res = await request(testApp).delete(`/api/users/${mockId}`);
    const deletedUser = res.body;
    expect(res.status).toBe(200);
    expect(deletedUser._id).toBe(mockId);
    const search = await request(testApp).get(`/api/users/${mockId}`);
    expect(search.status).toBe(404);
  });
});
