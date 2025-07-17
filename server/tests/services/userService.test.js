import UserService from "../../services/UserService";
import { insertMockUser, insertMockUsers } from "../helpers/insertMockData";

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
    console.log(updatedUser);
    expect(updatedUser.username).toEqual("Henry");
  });

  it("deletes a user by id", async () => {
    const mockUser = await insertMockUser();
    const deletedUser = await UserService.deleteUser(mockUser._id);
    expect(deletedUser).toBeTruthy();
    const search = await UserService.getUserById(mockUser._id);
    expect(search).toBeFalsy();
  });
});
