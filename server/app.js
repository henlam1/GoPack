// app.js
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import errorHandler from './middleware/errors/errorHandler.js';
import getEnv from './config/env.js';

const app = express();
const { isProd, isDev, isTest } = getEnv();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure allowed origins via env (comma-separated) or fallback per env
const envOrigins =
  process.env.ALLOWED_ORIGINS ||
  // (isProd ? 'https://gopack-client.onrender.com' : 'http://localhost:5173');
  (isProd
    ? 'http://gopack-frontend.s3-website-us-east-1.amazonaws.com/'
    : 'http://localhost:5173');

const allowedOrigins = envOrigins.split(',').map((s) => s.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow tools like curl or server-to-server (no origin)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin))
        return callback(null, true);
      return callback(new Error('CORS blocked by policy'), false);
    },
    credentials: true,
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Environment-specific logging / settings
if (isProd) {
  app.use((req, res, next) => {
    console.log(`PROD MODE: ${req.method} ${req.url}`);
    next();
  });
  app.set('trust proxy', 1);
} else if (isDev) {
  app.use((req, res, next) => {
    console.log(`DEV MODE: ${req.method} ${req.url}`);
    next();
  });
} else if (isTest) {
  app.use((req, res, next) => {
    // minimal noisy logs in tests
    next();
  });
}

// Routes and error handler
app.use('/api', routes);
app.use(errorHandler);

export default app;
