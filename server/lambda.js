// lambda.js
import serverlessExpress from '@codegenie/serverless-express';
import app from './app.js';

exports.handler = serverlessExpress({ app });
