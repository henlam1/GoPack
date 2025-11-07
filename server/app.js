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

// Configure allowed origins
const allowedOrigins = [
  'http://gopack-frontend.s3-website-us-east-1.amazonaws.com',
  'http://localhost:5173',
];

// Strip deployment basePath
// strip a deployment basePath added by API Gateway (e.g. /gopack-backend)
app.use((req, res, next) => {
  const prefix = '/gopack-backend';
  if (req.url.startsWith(prefix)) {
    req.url = req.url.slice(prefix.length) || '/';
  }
  return next();
});

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser tools / same-origin where origin is undefined
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, origin);
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Debug options
// app.options('*', (req, res) => {
//   console.log('OPTIONS origin:', req.headers.origin);
//   res.header('Access-Control-Allow-Origin', req.headers.origin || '');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//   return res.sendStatus(204);
// });

// use built-in handler for OPTIONS
app.options('*', cors());

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
