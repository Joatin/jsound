import { inject, injectable } from 'inversify';
import * as socketio from 'socket.io';
import * as socketioJwt from 'socketio-jwt';
import { Logger } from './logger';
import { Socket } from './socket';

const socketioJwtOptions = {
  secret: process.env.AUTH_SECRET || 'cJdknY2x27NKeWkmw19YDE0ZvwQZN156',
  timeout: 15000 // 15 seconds to send the authentication message
};

@injectable()
export class Application {

  private server;

  constructor(
    @inject(Logger) private logger: Logger,
    @inject('Factory<Socket>') private socketFactory: (socket: any) => Socket
  ) {}

  public start() {
    this.logger.info('Starting application');

    this.server = socketio(3100, {
      serveClient: false
    });

    this.server.on('connection', socketioJwt.authorize(socketioJwtOptions));
    this.server.on('authenticated', this.handleAuthenticated.bind(this));
  }

  private handleAuthenticated(socket: any) {
    this.logger.info('hello! ' + JSON.stringify(socket.decoded_token));
    this.socketFactory(socket).init();
  }
}
