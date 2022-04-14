import pkg from 'pg';

import { createRequire } from 'module';
import logger from '../logger/index.js';
// Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const env = require('../default-env.json');

const { Client } = pkg;

const data = {};

try {
  const cred = env.VCAP_SERVICES['my-post-db'][0].credentials;
  data.host = cred.hostname;
  data.port = cred.port;
  data.database = cred.dbname;
  data.user = cred.username;
  data.password = cred.password;
  data.ca = cred.sslrootcert;
} catch (error) {
  logger.error('Database connection in DB config', error);
}

const client = new Client({
  host: data.host,
  user: data.user,
  port: data.port,
  password: data.password,
  database: data.database,
  ssl: {
    rejectUnauthorized: false,
    ca: data.ca,
  },
});

export default client;
