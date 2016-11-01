import {Handler} from "./handler";
import {Logger} from "../shared/logger/logger";
import {Database} from "../shared/database/database";


export class HallHandler extends Handler {
    constructor(
        private database: Database,
        private logger: Logger
    ){
        super();
    }


    init(socket: any): void {
        socket.on('halls.add', this.handleAddHall(socket));
    }

    private handleAddHall(socket){
        return (data, respond)=> {
            this.logger.debug('handleAddHall', data);
            this.database.halls.insertHall(data).subscribe((result)=>{
                respond(null, data);
            }, (error)=> {
                this.logger.warn(error);
                respond(error);
            });
        }
    }

}