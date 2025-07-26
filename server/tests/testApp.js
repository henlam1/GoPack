import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorHandler from '../middleware/errors/errorHandler.js';
import { Router } from 'express';
import packingListRoutes from '../routes/packingListRoutes.js';
import categoryRoutes from '../routes/categoryRoutes.js';
import itemRoutes from '../routes/itemRoutes.js';
import userRoutes from '../routes/userRoutes.js';
import tokenRoutes from '../routes/tokenRoutes.js';

const app = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:5173'], // Can be an array
    credentials: true, // Critical for cookies
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);
app.use(express.json());
app.use(cookieParser());

// Test router
const router = Router();
router.use('/packing_lists', packingListRoutes);
router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/users', userRoutes);
router.use('/tokens', tokenRoutes);
app.use('/api', router);
app.use(errorHandler);

export default app;
