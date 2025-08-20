import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: 30,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },
  ],
  packingList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PackingList',
    required: [true, 'Packing list reference is required'],
  },
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
