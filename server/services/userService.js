import { NotFoundError } from '../middleware/errors/errorClasses.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import packingListService from './packingListService.js';

class UserService {
  async getUsers() {
    return await User.find();
  }

  async getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');
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
    if (!updatedUser) throw new NotFoundError('User not found');
    return updatedUser;
  }

  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) throw new NotFoundError('User not found');
    for (const packingListId of user.packingLists) {
      console.log('Deleting packing list: ', packingListId);
      await packingListService.deletePackingList(packingListId);
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) throw new NotFoundError('User not found');
    return deletedUser;
  }

  async addPackingList(userId, packingListId) {
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $push: { packingLists: packingListId },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('User not found');
    return result;
  }

  async removePackingList(userId, packingListId) {
    const result = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { packingLists: packingListId },
      },
      { new: true },
    );
    if (!result) throw new NotFoundError('User not found');
    return result;
  }
}

export default new UserService();
