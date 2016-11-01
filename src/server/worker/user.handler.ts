import {Database} from "../shared/database/database";
import {Logger} from "../shared/logger/logger";
import {Handler} from "./handler";


export class UserHandler extends Handler {

    constructor(
        private database: Database,
        private logger: Logger
    ){
        super();
    }

    public init(socket: any): void{
        socket.on('user', this.handleUser(socket));
    }

    private handleUser(socket): (data, response) => void{
        let userId = socket.authToken.userId;
        return (data, response) => {
            let observable = this.database.users.getUserById(userId);

            observable.first().subscribe((user)=>{
                response(null, user);
            });
            if(data.observe){
                let subscription = observable.subscribe((user)=>{
                    socket.emit('user', user);
                });
                socket.on('user.stop', ()=>{
                    subscription.unsubscribe();
                    socket.off('user.stop');
                });
            }
        }
    }
}