import { Application } from 'express';
import http from 'http';

import logger from '../helpers/Logger';
import { Parameters } from '../helpers/Parameters';
import { Bootstrap } from './bootstrap.interface';

export default class implements Bootstrap {
  constructor(private readonly app: Application) {}

  initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);

      const PORT = Parameters.PORT;

      server
        .listen(PORT)
        .on('listening', () => {
          logger.info(`Server running at http://localhost:${PORT}`);
          resolve(true);
        })
        .on('error', (err) => {
          reject(err);
          process.exit(1);
        });
    });
  }
}
