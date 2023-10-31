import express, { Express } from 'express';
import http from 'http';
import ServerRouter from './Server.router.interface.js';
import createDebug from 'debug';
import cors from 'cors';
import { dbConnect } from './db/db.connect.js';
import { SocketServer } from './web.socket/socket.server.js';


const routes = [
 { endpoint: '/create', method: 'POST' },
 { endpoint: '/history', method: 'GET' },
 { endpoint: '/state=:state', method: 'GET' },
];

const debug = createDebug('CL-Kitchen');
export default class ExpressServer {
  app: Express;
  server: http.Server;
  socketServer: SocketServer;

  constructor(private routers: ServerRouter[]) {
    this.app = express();
    this.config();
    this.routes();

    this.server = http.createServer(this.app);
    this.socketServer = new SocketServer(this.server);
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
      this.server.listen(port, () => {
        debug(
          `Server running on post ${port}`,
          mongoose.connection.db.databaseName
        );
      });
    });
  }
}