import {Hall} from "../../../shared/models/hall.model";
import {Observable} from "rxjs";

export interface HallRepository {
    insertHall(hall: Hall): Observable<Hall>;

    getHalls(): Observable<Hall>;
    getHallById(id: string): Observable<Hall>;
}