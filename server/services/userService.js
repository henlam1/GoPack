import User from "../models/userModel.js";

class UserService {
  async getUsers() {
    return await User.find();
  }

  async addUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async updateUser(userId, data){
    const updatedUser = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    return updatedUser;
  }
  
  async deleteUser(userId) {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  }
}

export default new UserService();
