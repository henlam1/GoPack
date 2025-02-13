import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  packingList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackingList",
    required: true,
  },
  items: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  ],
});

module.exports = mongoose.model("Category", categorySchema);
