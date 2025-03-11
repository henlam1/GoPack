import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String },
  quantity: { type: Number },
  packed: { type: Boolean },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
