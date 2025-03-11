import User from "../models/userModel.js";

class UserService {
  async getUsers() {
    return await User.find();
  }

  async addUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async updateUser(data){
    const { filter, update } = data;
    const updatedUser = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    return updatedUser;
  }
  
  async deleteUser(data) {
    const { filter } = data;
    const deletedUser = await User.findOneAndDelete(filter);
    return deletedUser;
  }
}

export default new UserService();
