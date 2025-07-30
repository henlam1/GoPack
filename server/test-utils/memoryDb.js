import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

/**
 * Starts up an in-memory MongoDB instance and connects mongoose to it.
 */
export const startMemoryDb = async (index = '0') => {
  mongoServer = await MongoMemoryServer.create({
    instance: { dbName: `testdb_worker${index}` },
  });
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  console.log(`Memory MongoDB running at ${uri}`);
};

/**
 * Starts up an in-memory MongoDB instance for individual workers and connects mongoose to it.
 */
export async function startIsolatedMemoryDb() {
  const workerIndex = process.env.TEST_WORKER_INDEX || '0';
  const mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: `testdb_worker${workerIndex}`,
    },
  });

  const uri = mongoServer.getUri();
  // Use this URI in your Express server setup
  return { uri, mongoServer };
}

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
