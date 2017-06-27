import * as socketio from 'socket.io';
import * as socketioJwt from 'socketio-jwt';
import { Socket } from './socket';
import { injectable, inject } from 'inversify';
import { Logger } from './logger';

@injectable()
export class Application {

  private server;

  constructor(
    @inject(Logger) private logger: Logger
  ) {
  }

  public start() {
    this.logger.info('Starting application');
    this.server = socketio(3100, {
      serveClient: false
    });

    this.server.on('connection', socketioJwt.authorize({
        secret: process.env.AUTH_SECRET || 'cJdknY2x27NKeWkmw19YDE0ZvwQZN156',
        timeout: 15000 // 15 seconds to send the authentication message
      }))
      .on('authenticated', (socket: any) => {
        //this socket is authenticated, we are good to handle more events from it.
        this.logger.info('hello! ' + JSON.stringify(socket.decoded_token));
        Socket.initializeSocket(socket);
      });
  }
}
