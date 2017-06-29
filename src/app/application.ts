import { inject, injectable } from 'inversify';
import { Logger } from './logger/logger';
import { SocketManager } from './socket/socket.manager';

@injectable()
export class Application {

  constructor(
    @inject(Logger) private logger: Logger,
    @inject(SocketManager) private socketManager: SocketManager
  ) {}

  public start() {
    this.logger.info('Starting application');

    this.socketManager.connect().subscribe();
  }
}
