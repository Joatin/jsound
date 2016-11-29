import {UserRepository} from "./user.repository";
import {Observable} from "rxjs";
import {Seeder} from "./seeder";
import {HallRepository} from "./hall.repository";
import {ControllerRepository} from "./controller.repository";

export interface Database {
    databaseName: string;
    users: UserRepository;
    halls: HallRepository;
    controllers: ControllerRepository;
    connect(seeders?: Seeder[]): Observable<void>;
}