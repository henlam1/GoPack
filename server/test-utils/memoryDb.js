import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

/**
 * Starts up an in-memory MongoDB instance and connects mongoose to it.
 */
export const startMemoryDb = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

/**
 * Disconnects mongoose and stops the in-memory MongoDB instance.
 */
export const stopMemoryDb = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};

/**
 * Clears all collections in the memory DB. Useful for test cleanup.
 */
export const clearMemoryDb = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
