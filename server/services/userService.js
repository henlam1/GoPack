import { NotFoundError } from "../middleware/errors/errorClasses.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserService {
  async getUsers() {
    return await User.find();
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError();
    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }

  async addUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = new User(data);
    return await user.save();
  }

  async updateUser(userId, data) {
    if (data.password != null) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!updatedUser) throw new NotFoundError();
    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new NotFoundError();
    return deletedUser;
  }

  async addPackingList(userId, packingListId) {
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $push: { packingLists: packingListId },
      },
      { new: true }
    );
    if (!result) throw new NotFoundError();
    return result;
  }

  async removePackingList(userId, packingListId) {
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { packingLists: packingListId },
      },
      { new: true }
    );
    if (!result) throw new NotFoundError();
    return result;
  }
}

export default new UserService();
