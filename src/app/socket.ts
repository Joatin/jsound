import { multiInject, inject, injectable } from 'inversify';
import { Handler } from './handler';
const sockets = {};

@injectable()
export class Socket {

  private _isConnected: boolean = true;

  public get isConnected(): boolean {
    return this._isConnected;
  }

  public constructor(
    @inject("socket") private socket: any,
    @multiInject(Handler) handlers: Handler[]
  ) {}

  public init(): void {
    this.socket.on('getdata', () => {
      // console.log("getdata");
    });
  }

}
