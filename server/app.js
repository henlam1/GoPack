import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import errorHandler from './middleware/errors/errorHandler.js';
import { getEnv } from './config/env.js';

const app = express();
const { isProd, isDev, isTest } = getEnv();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(
  cors({
    origin: isProd
      ? ['https://gopack-client.onrender.com']
      : ['http://localhost:5173'], // Can be an array
    credentials: true, // Critical for cookies
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Environment-specific logic
if (isProd) {
  app.use((req, res, next) => {
    console.log(`PROD MODE: ${req.method} ${req.url}`);
    next();
  });
}

if (isDev) {
  app.use((req, res, next) => {
    console.log(`DEV MODE: ${req.method} ${req.url}`);
    next();
  });
}

if (isTest) {
  app.use((req, res, next) => {
    console.log(`TEST MODE: ${req.method} ${req.url}`);
    next();
  });
}

// Routes
app.use('/api', routes);
app.use(errorHandler);

export default app;
