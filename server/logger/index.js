import dotenv from 'dotenv';
import { localEnvironmentLogger } from './localEnvironmentLogger.js';
import { productionEnvironmentLogger } from './productionEnvironmentLogger.js';

dotenv.config();

let logger = null;

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV === 'development') {
  logger = localEnvironmentLogger();
}

if (process.env.NODE_ENV !== 'development') {
  logger = productionEnvironmentLogger();
}

export default logger;
