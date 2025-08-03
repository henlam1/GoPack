import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/testRoutes.js';
import errorHandler from './middleware/errors/errorHandler.js';

const testApp = express();

// Middleware
testApp.use(
  cors({
    origin: ['http://localhost:5173'], // Can be an array
    credentials: true, // Critical for cookies
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }),
);
testApp.use(express.json());
testApp.use(cookieParser());

// Test Routes
testApp.use('/api', routes);
testApp.use(errorHandler);

export default testApp;
