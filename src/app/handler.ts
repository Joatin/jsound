import { injectable } from 'inversify';
import { Socket } from './socket';

@injectable()
export abstract class Handler {

  constructor(private socket: Socket) {
    // nothing here yet
  }
}
