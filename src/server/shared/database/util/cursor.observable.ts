import {Observable, Subscriber} from "rxjs";
import {Connection, Operation, Cursor} from "rethinkdb";
import {TeardownLogic} from "rxjs/Subscription";

export class CursorObservable<T> extends Observable<T> {

    public static create<T>(connection: Connection, operation: Operation<Cursor>){
        return new CursorObservable<T>(connection, operation);
    }

    constructor(
        private connection: Connection,
        private operation: Operation<Cursor>
    ) {
        super();
    }

    _subscribe(subscriber: Subscriber<T>): TeardownLogic {
        let cancel = false;
        this.operation.run(this.connection, (error: Error, cursor: Cursor): void => {
            if(error){
                subscriber.error(error);
            }else{
                cursor.each((err: Error, row: T)=>{
                    if(!cancel){
                        if(err){
                            subscriber.error(err);
                        }else{
                            subscriber.next(row);
                        }
                    }else{
                        return false;
                    }
                }, ()=>{
                    subscriber.complete();
                });
            }
        });
        return ()=>{
            cancel = true;
        };
    }
}