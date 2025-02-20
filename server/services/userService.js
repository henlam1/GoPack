import User from "../models/userModel";

class UserService {
  async getUsers() {
    return await User.find();
  }

  async addUser(data) {
    const user = new User(data);
    return await user.save();
  }
}

export default new UserService();
