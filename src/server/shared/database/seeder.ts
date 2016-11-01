import {Observable} from "rxjs";

export interface Seeder {
    seed(): Observable<void>;
}