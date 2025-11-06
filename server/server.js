import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import getEnv from './config/env.js';
import app from './app.js';
import { startMemoryDb } from './test-utils/memoryDb.js';

const { isTest } = getEnv();

// Connect to MongoDB if we're not testing
try {
  if (isTest) {
    await startMemoryDb();
  } else {
    await connectDB();
  }
} catch (err) {
  console.error('DB connection failed:', err);
  throw err; // ensure Lambda still fails, now logs show in CloudWatch
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
