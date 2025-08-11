import connectDB from './config/db.js';
import { getEnv } from './config/env.js';
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

// start the Express server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
