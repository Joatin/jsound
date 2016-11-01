
import {Logger} from "../shared/logger/logger";
import {Database} from "../shared/database/database";
import {AuthHandler} from "./auth.handler";
import {HallHandler} from "./hall.handler";
import {ScWorker, ISocketClusterWorker} from "./sc-worker";


export class Worker extends ScWorker{
    private scServer: any;

    public static create(
        scWorker: ISocketClusterWorker,
        logger: Logger,
        authHandler: AuthHandler,
        hallHandler: HallHandler,
        database: Database
    ): Worker{
        return new Worker(scWorker, logger, authHandler, hallHandler, database);
    }

    private constructor(
        private scWorker: ISocketClusterWorker,
        private logger: Logger,
        private authHandler: AuthHandler,
        private hallHandler: HallHandler,
        private database: Database
    ){
        super(scWorker, logger, database);
        this.scServer = this.scWorker.scServer;
    }

    protected onReady(){
        this.logger.info('started worker');
    }

    protected onConnect(socket){
        /*
         Attach some modules to the socket object - Each one decorates the socket object with
         additional features or business logic.
         */

        // Authentication logic
        //authentication.attach(scServer, socket);

        this.logger.info('connecting');
        // this.authHandler.init(socket);
        // this.hallHandler.init(socket);
    }
}