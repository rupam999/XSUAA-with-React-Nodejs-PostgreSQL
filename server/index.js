import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';
import dotenv from 'dotenv';
// Error Handler for Dev
import errorHandler from 'errorhandler';
// Logger
import logger from './logger/index.js';
import morgan from 'morgan';
// XSUAA Auth
import { JWTStrategy } from '@sap/xssec';
import xsenv from '@sap/xsenv';
import passport from 'passport';
// Routes
import { dummyData } from './routes/dummy.js';
// DB
import client from './db/index.js';

try {
  client.connect();
  logger.info('DB CONNECTED');
} catch (err) {
  logger.error('Database connection error', err);
}

const app = express();
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** **************CROS*************** */
app.use(
  cors({
    origin: '*',
  }),
);
app.options('*', cors());

/** **************DOTENV*************** */
dotenv.config({
  path: path.join(__dirname, '.env'),
});

/** **************REQUEST LOG*************** */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan(
      ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms',
      {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
          flags: 'a',
        }),
      },
    ),
  );
}

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

/** **************ADD PRODUCTION AUTH XSUAA*************** */
if (process.env.NODE_ENV !== 'development') {
  passport.use(
    new JWTStrategy(xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa),
  );

  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));
}

// Serve our static build files
app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

/** **************DEFAULT API ENDPOINT*************** */
app.use('/api', router);

/** **************DEVELOPMENT SERVER ERROR HANDLER*************** */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
}

app.listen(app.get('port'), () => {
  logger.info(
    `Node.js App is running at http://localhost:${app.get('port')} in ${app.get(
      'env',
    )} server`,
  );
  logger.info('Press CTRL-C to stop\n');
});

/** ************************************************************ */
/** **********************ALL Routes*************************** */
/** ********************************************************** */
dummyData(router);

// Serving react on routes unused by previous routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
});

export default app;
