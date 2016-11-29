import {Observable, Observer} from "rxjs";
import {Cursor, Operation, Connection, Table, WriteResult} from "rethinkdb";
import {CursorObservable} from "./util/cursor.observable";
import * as rethink from 'rethinkdb';
import {Hall} from "../../../shared/models/hall.model";


export interface ChangeSet<T>{
    type: string,
    value: T
}

export class RethinkRepository {
    private tableName: string;
    private connection: Connection;

    constructor(options: {connection: Connection, table: string}) {
        this.tableName = options.table;
        this.connection = options.connection;
    }

    protected run<T>(operation: Operation<Cursor>): Observable<T> {
        return CursorObservable.create(this.connection, operation);
    }

    protected run<T>(operation: Operation<WriteResult>): Observable<T> {
        return Observable.create<Hall>((observer: Observer<Hall>)=> {
            operation.run(this.connection, (error, result)=> {
                if (error) {
                    observer.error(error);
                } else {
                    observer.next(result);
                    observer.complete();
                }
            });
        });
    }

    protected runChanges<T>(operation: Operation<Cursor>, options?: {}): Observable<ChangeSet<T>> {
        let opts: any = options || {};
        opts.includeInitial = opts.includeInitial || true;
        return CursorObservable.create(this.connection, (<any>operation).changes(opts))
            .map((value: {old_val: T, new_val: T}): ChangeSet<T> => {
                if (value.new_val && value.old_val) {
                    return {type: 'change', value: value.new_val};
                } else if (!value.new_val && value.old_val) {
                    return {type: 'remove', value: value.old_val.id};
                } else if (value.new_val && !value.old_val) {
                    return {type: 'insert', value: value.new_val};
                }
            });
    }

    protected getTable(): Table {
        return rethink.table(this.tableName);
    }
}