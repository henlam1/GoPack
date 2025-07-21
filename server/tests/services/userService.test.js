import UserService from "../../services/UserService";
import { insertMockPackingList, insertMockUser, insertMockUsers } from "../helpers/insertMockData";

describe("User service operations", () => {
  beforeEach(async () => {
    await insertMockUsers();
  });

  it("gets all users", async () => {
    const allUsers = await UserService.getUsers();
    expect(allUsers).toHaveLength(3);
  });

  it("gets user by id", async () => {
    const mockUser = await insertMockUser();
    const res = await UserService.getUserById(mockUser._id);
    expect(res._id).toEqual(mockUser._id);
  });

  it("gets user by username", async () => {
    const mockUser = await insertMockUser({ username: "JohnDoe"});
    const res = await UserService.getUserByUsername("JohnDoe");
    expect(res._id).toEqual(mockUser._id);
  });

  it("gets user by email", async () => {
    const mockUser = await insertMockUser({ username: "johnDoe@gmail.com"});
    const res = await UserService.getUserByUsername("johnDoe@gmail.com");
    expect(res._id).toEqual(mockUser._id);
  });

  it("adds a new user", async () => {
    await insertMockUser();
    const allUsers = await UserService.getUsers();
    expect(allUsers).toHaveLength(4);
  });

  it("updates a user by id", async () => {
    const mockUser = await insertMockUser();
    const updatedUser = await UserService.updateUser(mockUser._id, {
      username: "Henry",
      password: mockUser.password,
    });
    expect(updatedUser.username).toEqual("Henry");
  });

  it("deletes a user by id", async () => {
    const mockUser = await insertMockUser();
    const deletedUser = await UserService.deleteUser(mockUser._id);
    expect(deletedUser).toBeTruthy();
  });

  it("adds a packing list by id", async () => {
    const packingList = await insertMockPackingList();
    let user = await insertMockUser();
    user = await UserService.addPackingList(user._id, packingList._id);
    expect(user.packingLists).toHaveLength(1);
    expect(user.packingLists[0]).toStrictEqual(packingList._id);
  });

  it("removes a packing list by id", async () => {
    const packingList = await insertMockPackingList();
    let user = await insertMockUser({ packingLists: [packingList] });
    user = await UserService.removePackingList(user._id, packingList._id);
    expect(user.packingLists).toHaveLength(0);
  });
});
