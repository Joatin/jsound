import {Database} from "../shared/database/database";
import {Logger} from "../shared/logger/logger";
import {User} from "../../shared/models/user.model";
import {createHmac} from "crypto";
import {Handler} from "./handler";
import {CredentialsSchema} from "../shared/schemas/credentials.schema";
import * as Joi from 'joi';


export class AuthHandler extends Handler {
    constructor(
        private database: Database,
        private logger: Logger
    ){
        super();
    }

    public init(socket: any): void{
        socket.on('login', this.handleLogin(socket));
        socket.on('logout', this.handleLogout(socket));
    }

    private handleLogin(socket: any): (credentials, respond) => void {
        return (data, respond): void =>{
            Joi.validate(data, CredentialsSchema, (error, credentials)=>{
                if(error){
                    this.logger.debug('handleLogin', error.message);
                    respond(new Error('Invalid parameters'));
                }else{
                    let responded = false;
                    this.database.users.getUsersByUsername(credentials.username).first().subscribe((user: User)=>{
                        let password = createHmac('sha256', 'secretsecret')
                            .update(credentials.password)
                            .digest('hex');
                        if(user.password === password){
                            socket.setAuthToken({username: credentials.username, userId: user.id});
                            responded = true;
                            respond();
                        }else{
                            responded = true;
                            respond(new Error('Invalid password'));
                        }
                    }, (error: Error)=>{
                        responded = true;
                        respond(error);
                    },  () => {
                        if(!responded){
                            respond(new Error('Username not found'));
                        }
                    });
                }
            });
        }
    }

    private handleLogout(socket: any): (arg, respond) => void {
        return (arg, respond): void =>{
            socket.deauthenticate();
            respond();
        }
    }
}