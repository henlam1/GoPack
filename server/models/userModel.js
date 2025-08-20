import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, immutable: true },
  password: { type: String },
  packingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PackingList' }],
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);
export default User;
