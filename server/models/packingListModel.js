import mongoose from 'mongoose';

const packingListSchema = new mongoose.Schema({
  name: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  destination: { type: String },
  description: { type: String },
  status: {
    type: String,
    enum: ['active', 'trashed', 'completed'],
    default: 'active',
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const PackingList = mongoose.model('PackingList', packingListSchema);
export default PackingList;
