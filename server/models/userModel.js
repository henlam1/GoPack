import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  packingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "PackingList" }],
});

const User = mongoose.model("User", UserSchema);
export default User;
