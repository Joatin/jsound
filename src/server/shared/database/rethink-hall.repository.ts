import {HallRepository} from "./hall.repository";
import {Hall} from "../../../shared/models/hall.model";
import {Observable} from "rxjs";
import {RethinkRepository, ChangeSet} from "./rethink.repository";
import {Connection} from "rethinkdb";


export class RethinkHallRepository extends RethinkRepository implements HallRepository {
    public constructor(
        connection: Connection
    ) {
        super({
            connection: connection,
            table: 'halls'
        });
    }

    public insertHall(hall: Hall): Observable<Hall>{
        return this.run<Hall>(this.getTable().insert(hall));
    }

    public getHalls(): Observable<ChangeSet<Hall>>{
        return this.runChanges<Hall>(this.getTable());
    }

    public getHallById(id: string): Observable<ChangeSet<Hall>> {
        return this.runChanges<Hall>(this.getTable().get(id || 0));
    }
}