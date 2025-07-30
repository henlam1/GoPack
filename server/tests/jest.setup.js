import {
  startMemoryDb,
  stopMemoryDb,
  clearMemoryDb,
} from '../test-utils/memoryDb.js';

beforeAll(async () => await startMemoryDb());
afterAll(async () => await stopMemoryDb());
afterEach(async () => await clearMemoryDb());
