import * as rethink from 'rethinkdb';
import {Database} from "./database";
import {Logger} from "../logger/logger";
import {Observable, Observer} from "rxjs";
import {Connection} from "rethinkdb";
import {UserRepository} from "./user.repository";
import {RethinkUserRepository} from "./rethink-user.repository";
import {Seeder} from "./seeder";
import {HallRepository} from "./hall.repository";
import {RethinkHallRepository} from "./rethink-hall.repository";
import * as _ from 'underscore';
import {CreateResult} from "rethinkdb";
import {OperationObservable} from "./util/operation.observable";
import {ControllerRepository} from "./controller.repository";
import {RethinkControllerRepository} from "./rethink-controller.repository";


export class RethinkDatabase implements Database {

    public connection: Connection;
    public databaseName: string;

    private userRepository: UserRepository;
    private hallRepository: HallRepository;
    private controllerRepository: ControllerRepository;

    public constructor(private options: {host: string, port: number, db?: string},
                       private logger: Logger,) {
        this.databaseName = options.db || 'test';
    }

    public get users(): UserRepository {
        return this.userRepository;
    }

    public get halls(): HallRepository {
        return this.hallRepository;
    }

    public get controllers(): ControllerRepository {
        return this.controllerRepository;
    }

    public connect(seeders?: Seeder[]): Observable<void> {
        let connect = Observable.bindNodeCallback(rethink.connect);
        let observable = connect({host: 'localhost', port: 28015});
        return observable.map((connection: Connection) => {
            this.connection = connection;
            this.userRepository = new RethinkUserRepository(this.connection);
            this.hallRepository = new RethinkHallRepository(this.connection);
            this.controllerRepository = new RethinkControllerRepository(this.connection);
            return connection;
        })
            .flatMap(()=> {
                return this.createTables();
            })
            .flatMap(() => {
                if (seeders) {
                    let seedObservables = seeders.map((seeder: Seeder)=> {
                        return seeder.seed();
                    });
                    return Observable.forkJoin(...seedObservables);
                } else {
                    return Observable.of(null);
                }
            });
    }

    private createTables() {
        let obs = OperationObservable.create(this.connection, rethink.db(this.databaseName).tableList());
        return obs.flatMap((tables: string[])=> {
            return Observable.forkJoin(
                this.createTable(tables, 'users'),
                this.createTable(tables, 'halls'),
                this.createTable(tables, 'congregations'),
                this.createTable(tables, 'controllers')
            )
        });
    }

    private createTable(tables: string[], table: string): Observable<CreateResult> {
        if (!_.contains(tables, table)) {
            return OperationObservable.create(this.connection, rethink.db(this.databaseName).tableCreate(table));
        } else {
            return Observable.of(null);
        }
    }
}