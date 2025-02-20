import mongoose from "mongoose";

const packingListSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
});

const PackingList = mongoose.model("PackingList", packingListSchema);
export default PackingList;
