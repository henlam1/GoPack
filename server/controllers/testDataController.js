import tryCatch from '../utils/tryCatch.js';
import mongoose from 'mongoose';
import { clearMemoryDb } from '../test-utils/memoryDb.js';

export const resetDb = tryCatch(async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    console.warn('Mongo not connected during reset');
    return res.status(500).send('MongoDB not connected');
  }

  await clearMemoryDb();
  res.status(200).send({ message: 'Database cleared' });
});
