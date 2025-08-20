import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    match: [/.+@.+\..+/, 'Email must be valid'],
    unique: true,
    immutable: true,
  },
  password: { type: String, required: [true, 'Password is required'] },
  packingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PackingList' }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
