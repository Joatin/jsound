import { injectable, multiInject } from 'inversify';
import { Handler } from '../handler/handler';
import { Socket } from './socket';
import { SocketManager } from './socket.manager';

@injectable()
export class IoSocket implements Socket {

  constructor(
    @multiInject(Handler) private handlers: Handler[]
  ) {}

  public init(socket: SocketIO.Socket, manager: SocketManager): void {
      this.setupHandlers(socket, manager);
  }

  private setupHandlers(socket: SocketIO.Socket, manager: SocketManager) {
    this.handlers.forEach((handler: Handler) => {
      socket.on(handler.event, this.wrapHandler(handler, manager));
    });
  }

  private wrapHandler(handler: Handler, manager: SocketManager) {
    return (data: any, callback): void => {
      const validationResult = handler.schema.validate(data, {
        stripUnknown: true
      });
      if (validationResult.error === null) {
        const result = handler.handle(validationResult.value, this, manager);
        if (result) {
          callback(result);
        } else {
          callback();
        }
      } else {
        callback(validationResult.error);
      }
    };
  }

}
