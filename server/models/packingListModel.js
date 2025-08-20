import mongoose from 'mongoose';

const packingListSchema = new mongoose.Schema({
  // Core Fields
  name: { type: String, required: true, trim: true, maxLength: 30 },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
  // Trip Details
  startDate: { type: Date },
  endDate: { type: Date },
  destination: { type: String, trim: true, maxLength: 30 },
  description: { type: String, trim: true, maxLength: 150 },
  // Life Cycle
  status: {
    type: String,
    enum: ['active', 'trashed', 'completed'],
    default: 'active',
  },
  createdAt: { type: Date, default: Date.now },
});

const PackingList = mongoose.model('PackingList', packingListSchema);
export default PackingList;
