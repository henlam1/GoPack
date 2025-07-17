import User from "../models/userModel.js";
import bcrypt from "bcrypt";

class UserService {
  async getUsers() {
    return await User.find();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async addUser(data) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = new User(data);
    return await user.save();
  }

  async updateUser(userId, data) {
    console.log(data);
    if (data.password != null) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    return updatedUser;
  }

  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ username: username });
    console.log(user, username);
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email });
    return user;
  }
}

export default new UserService();
