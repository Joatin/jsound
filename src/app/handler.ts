import { Socket } from './socket';
import { injectable } from 'inversify';

@injectable()
export abstract class Handler {

  constructor(socket: Socket) {

  }
}
