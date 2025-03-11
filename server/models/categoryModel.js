import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  packingList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PackingList",
  },
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
