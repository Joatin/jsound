import {Worker} from './worker';
import {WinstonLogger} from "../shared/logger/winston-logger";
import {RethinkDatabase} from "../shared/database/rethink-database";
import {AuthHandler} from "./auth.handler";
import {UserSeeder} from "../shared/database/user.seeder";
import {HallHandler} from "./hall.handler";
import {ISocketClusterWorker} from "./sc-worker";

export function run(scWorker: ISocketClusterWorker) {
    let database = new RethinkDatabase({ host: 'localhost', port: 28015 }, new WinstonLogger('database'));
    database.connect([
        new UserSeeder(database)
    ]).subscribe(()=>{
        let worker = Worker.create(
            scWorker,
            new WinstonLogger('worker: ' + process.pid),
            new AuthHandler(
                database,
                new WinstonLogger('auth-handler')
            ),
            new HallHandler(
                database,
                new WinstonLogger('hall-handler')
            ),
            database
        );
    });
}