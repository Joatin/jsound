import {Seeder} from "./seeder";
import {RethinkDatabase} from "./rethink-database";
import {Observable, Observer} from "rxjs";
import * as rethink from 'rethinkdb';
import {createHmac} from "crypto";


export class UserSeeder implements Seeder {

    constructor(
        public database: RethinkDatabase
    ) {}

    public seed(): Observable<void> {
        return this.createUsersTable();
    }

    private createUsersTable(){
        return Observable.create((observer: Observer) => {
            let password = createHmac('sha256', 'secretsecret')
                .update('password')
                .digest('hex');
            rethink.table('users').insert({
                username: 'root',
                password: password,
                firstName: 'Joatin',
                lastName: 'Granlund'
            }).run(this.database.connection, (error: Error) => {
                if(error){
                    observer.error(error);
                }else{
                    observer.next(null);
                    observer.complete();
                }
            });
        })
    }

}