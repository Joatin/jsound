import { Observable } from 'rxjs';

export abstract class SocketManager {

  public abstract connect(): Observable<void>;
}
