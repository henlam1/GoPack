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

const Category = mongoose.model("Category", categorySchema);
export default Category;
