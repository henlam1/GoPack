import { Router } from 'express';
import packingListRoutes from './packingListRoutes.js';
import categoryRoutes from './categoryRoutes.js';
import itemRoutes from './itemRoutes.js';
import userRoutes from './userRoutes.js';
import tokenRoutes from './tokenRoutes.js';
import testDataRoutes from './testDataRoutes.js';

const testRouter = Router();

testRouter.use('/packing_lists', packingListRoutes);
testRouter.use('/categories', categoryRoutes);
testRouter.use('/items', itemRoutes);
testRouter.use('/users', userRoutes);
testRouter.use('/tokens', tokenRoutes);
testRouter.use('/test-db', testDataRoutes);

export default testRouter;
