import express, { Express } from 'express';
import ServerRouter from './Server.router.interface.js';
import createDebug from 'debug';
import cors from 'cors';
import { dbConnect } from './db/db.connect.js';

const debug = createDebug('CL-Store');

const routes = [
  { endpoint: '/quantity', method: 'PATCH' },
  { endpoint: '/ingredients', method: 'GET' },
];

export default class ExpressServer {
  app: Express;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {
    this.app.use(express.json());
    this.app.use(cors({ origin: '*' }));
  }

  routes(): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.app.get('/', (req, res, _next) => {
      res.json(routes);
    });
    this.routers.forEach((router) => {
      this.app.use(router.path, router.router);
    });
  }

  start(port: number): void {
    dbConnect().then((mongoose) => {
      this.app.listen(port, '0.0.0.0',  () => {
        debug(
          `Server running on post ${port}`,
          mongoose.connection.db.databaseName
        );
      });
    });
  }
}