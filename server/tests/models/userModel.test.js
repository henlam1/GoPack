import User from "../../models/userModel";

const mockUser = {
  username: "test",
  email: "test@gmail.com",
  password: "test1!",
  packingLists: [],
};

describe("User model CRUD operations", () => {
  // CREATE
  it("should create a new user", async () => {
    const user = await User.create(mockUser);
    expect(user.username).toBe("test");
    expect(user.email).toBe("test@gmail.com");
    expect(user.password).toBe("test1!");
    expect(user.packingLists).toHaveLength(0);
  });
  // READ
  it("should find a user", async () => {
    const user = await User.create(mockUser);
    const found = await User.findById(user._id);
    expect(found).not.toBeNull();
    if (found) {
      expect(found.email).toBe("test@gmail.com");
    }
  });
  // UPDATE
  it("should update a user", async () => {
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
  // DELETE
  it("should delete a user", async () => {
    const user = await User.create(mockUser);
    await User.findByIdAndDelete(user._id);
    const found = await User.findById(user._id);
    expect(found).toBeNull();
  });
});
