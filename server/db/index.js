import pkg from 'pg';
import dotenv from 'dotenv';
// Logger
import logger from '../logger/index.js';
// Bring in the ability to create the 'require' method
import { createRequire } from 'module';

const require = createRequire(import.meta.url); // construct the require method
const env = require('../default-env.json');

dotenv.config();
const { Client } = pkg;

const data = {};
let client;

if (process.env.NODE_ENV === 'development') {
  try {
    client = new Client({
      host: process.env.HOST,
      user: process.env.USER,
      port: process.env.PORT_DB,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
    });
  } catch (error) {
    logger.error('Database connection in DB config', error);
  }
} else {
  try {
    const cred = env.VCAP_SERVICES['my-post-db'][0].credentials;
    client = new Client({
      host: cred.hostname,
      user: cred.username,
      port: data.port,
      password: data.password,
      database: cred.dbname,
      ssl: {
        rejectUnauthorized: false,
        ca: cred.sslrootcert,
      },
    });
  } catch (error) {
    logger.error('Database connection in DB config', error);
  }
}

export default client;
