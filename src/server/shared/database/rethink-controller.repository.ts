import {ControllerRepository} from "./controller.repository";
import {RethinkRepository, ChangeSet} from "./rethink.repository";
import {Connection, row} from "rethinkdb";
import {Observable} from "rxjs";
import {Controller} from "../../../shared/models/controller.model";


export class RethinkControllerRepository extends RethinkRepository implements ControllerRepository{

    constructor(
        connection: Connection
    ){
        super({
            connection: connection,
            table: 'controllers'
        });
    }

    public getControllerByControllerId(controllerId: string): Observable<ChangeSet<Controller>>{
        return this.runChanges<Controller>(this.getTable().filter(row('controllerId').eq(controllerId)));
    }

    public getControllerByControllerIdOnce(controllerId: string): Observable<Controller>{
        return this.run<Controller>(this.getTable().filter(row('controllerId').eq(controllerId)));
    }
}