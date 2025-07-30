import 'dotenv/config';
import app from './app.js';
import { startMemoryDb } from './test-utils/memoryDb.js';

// Connect DB
await startMemoryDb();

// start the Express server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Test server listening on port ${PORT}`);
});

export default app;
