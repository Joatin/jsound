import {HallRepository} from "./hall.repository";
import {RethinkDatabase} from "./rethink-database";
import {Hall} from "../../../shared/models/hall.model";
import {Observable, Observer} from "rxjs";
import * as rethink from 'rethinkdb';
import {OperationObservable} from "./operation.observable";
import {Cursor} from "rethinkdb";


export class RethinkHallRepository implements HallRepository {
    public constructor(
        private database: RethinkDatabase
    ) {}

    public insertHall(hall: Hall): Observable<Hall>{
        return Observable.create<Hall>((observer: Observer<Hall>)=> {
            rethink.table('halls').insert(hall).run(this.database.connection, (error, result)=> {
                if(error){
                    observer.error(error);
                }else{
                    observer.next(result);
                    observer.complete();
                }
            });
        });

    }

    public getHalls(): Observable<Hall>{
        return OperationObservable.create<Cursor>(this.database.connection ,rethink.table('halls').changes({
            includeInitial: true
        })).flatMap((cursor: Cursor)=>{
            return Observable.create<{type: string, value: Hall}>((observer: Observer<Hall>)=>{
                cursor.each((error: Error, row: Hall)=>{
                    if(error){
                        observer.error(error);
                    }else{
                        observer.next(row);
                    }
                });
            }).map((value: {old_val: Hall, new_val: Hall})=>{
                if(value.new_val && value.old_val){
                    return {type: 'change', value: value.new_val};
                }else if(!value.new_val && value.old_val){
                    return {type: 'remove', value: value.old_val.id};
                }else if(value.new_val && !value.old_val){
                    return {type: 'insert', value: value.new_val};
                }
            });

        });
    }

    public getHallById(id: string): Observable<Hall> {
        return OperationObservable.create<Cursor>(this.database.connection, rethink.table('halls').get(id || 0).changes({
            includeInitial: true
        })).flatMap((cursor: Cursor)=>{
            return Observable.create<{type: string, value: Hall}>((observer: Observer<Hall>)=>{
                cursor.each((error: Error, row: Hall)=>{
                    if(error){
                        observer.error(error);
                    }else{
                        observer.next(row);
                    }
                });
            }).map((value: {old_val: Hall, new_val: Hall})=>{
                if(value.new_val && value.old_val){
                    return {type: 'change', value: value.new_val};
                }else if(!value.new_val && value.old_val){
                    return {type: 'remove', value: value.old_val.id};
                }else if(value.new_val && !value.old_val){
                    return {type: 'insert', value: value.new_val};
                }
            });

        });
    }
}