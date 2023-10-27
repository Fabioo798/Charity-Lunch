import { Server, Socket } from 'socket.io';
import http from 'http';

export class SocketServer {
  private io: Server;

  constructor(server: http.Server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.on('connection', this.handleConnection.bind(this));
  }

  private handleConnection(socket: Socket) {
    console.log('A user connected');

    // Example event handler: Broadcast a message to all connected clients
    socket.on('orderStateChanged', ({id, state }) => {
      this.io.emit('orderStateChanged', {id, state});
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  }
}