import {UserRepository} from "./user.repository";
import * as rethink from 'rethinkdb';
import {RethinkDatabase} from "./rethink-database";
import {Observer, Observable} from "rxjs";
import {User} from "../../../shared/models/user.model";
import {Cursor} from "rethinkdb";


export class RethinkUserRepository implements UserRepository {
    public constructor(
        private database: RethinkDatabase
    ) {}

    public getUsersByUsername(username: string): Observable<User>{
        return Observable.create((observer: Observer)=>{
            rethink.table('users').filter(rethink.row('username').eq(username)).
            run(this.database.connection, (err: Error, result: Cursor) => {
                if (err){
                    console.log('getUSerByUserName');
                    console.log(err);
                    observer.error(err);
                }else{
                    result.each<User>((error: Error, user: User)=>{
                        observer.next(user)
                    }, ()=>{
                        observer.complete();
                    })
                }
            });
        });

    }

    public getUserById(userId: string): Observable<User>{
        return Observable.create((observer: Observer) => {
            let cancel = false;
            rethink.table('users').get(userId).changes().run(this.database.connection, (error: Error, users: Cursor) => {
                if(error){
                    observer.error(error);
                }else{
                    users.each((err: Error, user: User)=>{
                        if(cancel){
                            return false;
                        }
                        if(error){
                            observer.error(error);
                        }else{
                            observer.next(user);
                        }
                    })
                }
            })
            return ()=>{
                cancel = true;
            }
        });
    }
}