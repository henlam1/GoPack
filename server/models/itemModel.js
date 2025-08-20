import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
    maxLength: 30,
  },
  quantity: {
    type: Number,
    required: [true, 'Item quantity is required'],
    min: 1,
    max: 99,
  },
  packed: {
    type: Boolean,
    required: [true, 'Packed status is required'],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category reference is required'],
  },
  createdAt: { type: Date, default: Date.now },
});

const Item = mongoose.model('Item', itemSchema);
export default Item;
