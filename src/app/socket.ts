import { inject, injectable, multiInject } from 'inversify';
import { Handler } from './handler';
const sockets = {};

@injectable()
export class Socket {

  private isConnectedHolder: boolean = true;

  public get isConnected(): boolean {
    return this.isConnectedHolder;
  }

  public constructor(
    @inject('socket') private socket: any,
    @multiInject(Handler) handlers: Handler[]
  ) {}

  public init(): void {
    this.socket.on('getdata', () => {
      // console.log("getdata");
    });
  }

}
