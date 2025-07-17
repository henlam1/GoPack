import User from "../../models/userModel";
import { buildMockUser } from "../helpers/buildMockData";

const mockUser = buildMockUser();

describe("User model CRUD operations", () => {
  it("create a new user", async () => {
    const user = await User.create(mockUser);
    expect(user.username).toBe("test");
    expect(user.email).toBe("jest_test@gmail.com");
    expect(user.password).toBe("test1!");
    expect(user.packingLists).toHaveLength(0);
  });
  it("find a user", async () => {
    const user = await User.create(mockUser);
    const found = await User.findById(user._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.email).toBe("jest_test@gmail.com");
    }
  });
  it("update a user", async () => {
    const user = await User.create(mockUser);
    const updated = await User.findByIdAndUpdate(
      user._id,
      {
        username: "updated username",
      },
      { new: true }
    );
    expect(updated).not.toBeNull();
    if (updated) {
      expect(updated.username).toBe("updated username");
    }
  });
  it("delete a user", async () => {
    const user = await User.create(mockUser);
    await User.findByIdAndDelete(user._id);
    const found = await User.findById(user._id);
    expect(found).toBeNull();
  });
});
