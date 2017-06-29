import { injectable } from 'inversify';
import * as Joi from 'joi';
import { Socket } from '../socket/socket';
import { SocketManager } from '../socket/socket.manager';

@injectable()
export abstract class Handler {

  /**
   *
   * @returns {string} The name of the event
   */
  public get event(): string {
    return this.eventName;
  }

  public get schema(): Joi.Schema {
    return this.dataSchema;
  }

  constructor(
    private eventName: string,
    private dataSchema: Joi.Schema
  ) {
    // nothing here yet
  }

  public abstract handle<T, R>(data: T, socket: Socket, manager: SocketManager): R;
}
