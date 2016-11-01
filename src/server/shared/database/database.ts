import {UserRepository} from "./user.repository";
import {Observable} from "rxjs";
import {Seeder} from "./seeder";
import {HallRepository} from "./hall.repository";

export interface Database {
    databaseName: string;
    users: UserRepository;
    halls: HallRepository,
    connect(seeders?: Seeder[]): Observable<void>
}