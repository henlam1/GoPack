// lambdaServer.js
import dotenv from 'dotenv';
dotenv.config();

import getEnv from './config/env.js';
import app from './app.js';
import connectDB from './config/db.js';
import { startMemoryDb } from './test-utils/memoryDb.js';

const { isTest } = getEnv();

// Cached DB connection for Lambda reuse
let cachedDb = null;

export async function ensureDBConnection() {
  if (cachedDb) return cachedDb;

  if (isTest) {
    cachedDb = await startMemoryDb();
  } else {
    cachedDb = await connectDB();
  }

  return cachedDb;
}

// Only start Express server if NOT running in Lambda
const isLambda = Boolean(
  process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT,
);

if (!isLambda) {
  await ensureDBConnection();
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server listening on port ${PORT} (env=${process.env.NODE_ENV || 'development'})`,
    );
  });
}

export { app };
