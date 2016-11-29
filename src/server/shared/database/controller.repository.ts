import {Hall} from "../../../shared/models/hall.model";
import {Observable} from "rxjs";
import {Controller} from "../../../shared/models/controller.model";
import {ChangeSet} from "./rethink.repository";

export interface ControllerRepository {

    getControllerByControllerId(controllerId: string): Observable<ChangeSet<Controller>>;
    getControllerByControllerIdOnce(controllerId: string): Observable<Controller>;
}