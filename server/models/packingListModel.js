import mongoose from "mongoose";

const packingListSchema = new mongoose.Schema({
  name: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const PackingList = mongoose.model("PackingList", packingListSchema);
export default PackingList;
