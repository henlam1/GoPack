// lambda.js
import serverlessExpress from '@codegenie/serverless-express';
import { app, ensureDBConnection } from './lambdaServer.js';

export const handler = async (event, context) => {
  // Ensure DB connection before handling request
  await ensureDBConnection();

  // Handle the request via serverlessExpress
  return serverlessExpress({ app })(event, context);
};
