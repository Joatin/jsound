import {Observable, Subscriber} from "rxjs";
import {Connection, Operation, CreateResult} from "rethinkdb";
import {TeardownLogic} from "rxjs/Subscription";

export class OperationObservable<T> extends Observable<T> {

    public static create<T>(connection: Connection, operation: Operation<string[] | CreateResult>){
        return new OperationObservable<T>(connection, operation);
    }

    constructor(
        private connection: Connection,
        private operation: Operation<string[] | CreateResult>
    ) {
        super();
    }

    _subscribe(subscriber: Subscriber<T>): TeardownLogic {
        this.operation.run(this.connection, (error: Error, data: T): void => {
            if(error){
                subscriber.error(error);
            }else {
                subscriber.next(data);
                subscriber.complete();
            }
        });
        return null;
    }
}