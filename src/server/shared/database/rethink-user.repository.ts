import {UserRepository} from "./user.repository";
import {Observable} from "rxjs";
import {User} from "../../../shared/models/user.model";
import {RethinkRepository, ChangeSet} from "./rethink.repository";
import {Connection} from "rethinkdb";
import {row} from "rethinkdb";


export class RethinkUserRepository extends RethinkRepository implements UserRepository {
    public constructor(
        private connection: Connection
    ) {
        super({
            connection: connection,
            table: 'users'
        });
    }

    public getUsersByUsername(username: string): Observable<User>{
        return this.run<User>(this.getTable().filter(row('username').eq(username)));
    }

    public getUserById(userId: string): Observable<ChangeSet<User>>{
        return this.runChanges<User>(this.getTable().get(userId));
    }
}