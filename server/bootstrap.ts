import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import logger from './config/logger';

export let bootstrapApp = () => {
  logger.info('Boostrapping the application');

  dotenv.config({ path: './server/config/env/dev' });

  const port = process.env.MYSQL_PORT
    ? parseInt(process.env.MYSQL_PORT, 10)
    : 3306;

  createConnection({
    database: process.env.MYSQL_SCHEMA,
    host: process.env.MYSQL_HOST,
    password: process.env.MYSQL_PASSWORD,
    port,
    synchronize: true,
    type: 'mysql',
    username: process.env.MYSQL_USER
  });

  logger.info('Finished bootstrapping the application');
};
