import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  packingLists: [{ type: mongoose.Schema.Types.ObjectId, ref: "PackingList" }],
});

module.exports = mongoose.model("User", UserSchema);
