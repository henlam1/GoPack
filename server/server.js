import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import getEnv from './config/env.js';
import app from './app.js';
import { startMemoryDb } from './test-utils/memoryDb.js';

const { isTest } = getEnv();

// Connect to DB
if (isTest) {
  // Mongo memory db
  await startMemoryDb();
} else {
  // Connect to Mongo Atlas
  await connectDB();
}

// Start server only if not running in Lambda environment
const isLambda = Boolean(
  process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.LAMBDA_TASK_ROOT,
);
if (!isLambda) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server listening on port ${PORT} (env=${process.env.NODE_ENV || 'development'})`,
    );
  });
}

export default app;
