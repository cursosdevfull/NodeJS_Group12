import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import multer from 'multer';

import RedisBootstrap from './bootstrap/Redis.bootstrap';
import { HandlersErrors } from './helpers/Errors';
import { authRoutes } from './modules/auth/interfaces/http/auth.routes';
import { userRoutes } from './modules/user/interfaces/http/user.routes';

class App {
  app: Application;

  constructor() {
    this.app = express();
    this.init();
    this.handleHealthCheck();
    this.handleMiddlewares();
    this.handleWebSiteHTML();
    this.handleRoutes();
    this.handleErrors();
  }

  init() {
    multer({
      limits: {
        fileSize: 8000000,
      },
    });
  }

  handleHealthCheck() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('OK');
    });

    this.app.get('/health', (req: Request, res: Response) => {
      res.send('OK');
    });

    this.app.get('/healthz', (req: Request, res: Response) => {
      res.send('OK');
    });

    this.app.get('/healthcheck', (req: Request, res: Response) => {
      res.send('OK');
    });
  }

  handleWebSiteHTML() {
    this.app.use('/html', express.static('public/web'));
  }

  handleMiddlewares() {
    const corsOptions = {
      origin: ['http://localhost:3000', 'http://localhost:3001'],
    };

    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.set('view engine', 'ejs');
    this.app.set('views', 'src/views');

    this.app.get('/ejs', (req: Request, res: Response) => {
      res.render('home', { username: 'Sergio' });
    });
  }

  handleRoutes() {
    this.app.use('/user', userRoutes);
    this.app.use('/auth', authRoutes);
    this.app.get('/invalidate-cache', (req: Request, res: Response) => {
      RedisBootstrap.clear();
      res.send('Cache cleared');
    });
  }

  handleErrors() {
    this.app.use(HandlersErrors.notFound);
    this.app.use(HandlersErrors.generic);
  }
}

const app = new App().app;

export { app };
