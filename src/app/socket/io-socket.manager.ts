import { inject, injectable } from 'inversify';
import { Observable, Observer } from 'rxjs';
import { TYPES } from '../../inversify.config';
import { Logger } from '../logger/logger';
import { Socket } from './socket';
import { SocketManager } from './socket.manager';

@injectable()
export class IoSocketManager implements SocketManager {

  constructor(
    @inject(Logger) private logger: Logger,
    @inject('Factory<Socket>') private socketFactory: () => Socket,
    @inject('PORT') private port: number,
    @inject('AuthorizationHandler') private authHandler: () => void,
    @inject(TYPES.socketio) private socketio: SocketIOStatic
  ) {}

  public connect(): Observable<void> {
    return Observable.create((observer: Observer<void>) => {
      const server = this.socketio(this.port, {
        serveClient: false,
        wsEngine: 'uws'
      } as any);

      this.logger.info('Connected the socket io server to port: ' + this.port);

      server.on('connection', this.authHandler);
      server.on('authenticated', this.handleAuthenticated.bind(this));

      this.logger.info('Listening for connections');

      observer.next(null);

      return () => {
        server.close(() => {
          this.logger.info('Server closed');
        });
      };
    });
  }

  private handleAuthenticated(socket: SocketIO.Socket) {
    this.logger.verbose('Client authenticated with socket id: ' + socket.id);
    this.socketFactory().init(socket);
  }

}
