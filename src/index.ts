import 'reflect-metadata';

import { app } from './app';
import DatabaseBootstrap from './bootstrap/Database.bootstrap';
import RedisBootstrap from './bootstrap/Redis.bootstrap';
import ServerBootstrap from './bootstrap/Server.bootstrap';
import logger from './helpers/Logger';

const server = new ServerBootstrap(app);
const database = new DatabaseBootstrap();
const redis = new RedisBootstrap();

(async () => {
  try {
    logger.log('info', 'Starting server...');
    const listPromises = [
      server.initialize(),
      database.initialize(),
      redis.initialize(),
    ];
    await Promise.all(listPromises);
    logger.info('Database is ready!');
  } catch (error) {
    logger.error(error);
    database.close();
    redis.close();
    process.exit(1);
  }
})();
