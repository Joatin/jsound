import {ScSocket, HandlerParams} from "./sc-socket";
import {Logger} from "../shared/logger/logger";
import {Subscription, Observable, Observer} from "rxjs";
import {CredentialsSchema} from "../shared/schemas/credentials.schema";
import {User} from "../../shared/models/user.model";
import {Database} from "../shared/database/database";
import {createHmac} from "crypto";
import {Hall} from "../../shared/models/hall.model";
import {HallSchema} from "../shared/schemas/hall.schema";


const Events = {
    LOGIN: 'login',
    HALLS: 'halls',
    GET_HALL: 'hall.get',
    ADD_HALL: 'halls.add',
};

export class Socket extends ScSocket {

    constructor(socket: any,
                private logger: Logger,
                private database: Database) {
        super(socket, logger);
    }

    public init(): void {
        this.subscribe(this.on(Events.LOGIN, this.onLogin));
        this.subscribe(this.on(Events.ADD_HALL, this.onAddHall));
        this.subscribe(this.onEmit<Hall>(Events.HALLS, (data)=>{
            return this.database.halls.getHalls().do((obj)=>{
                this.logger.debug('sending hall', obj);
            })
        }));
        this.subscribe(this.onEmit<Hall>(Events.GET_HALL, (data: string)=>{
            return this.database.halls.getHallById(data).do((obj)=>{
                this.logger.debug('sending single hall', obj);
            })
        }));

    }

    private setupPublications(){
        let token = this.authToken;
        this.logger.info('Setting up subscriptions for user', {token: token});
        this.emit(Events.HALLS, this.database.halls.getHalls().do((data)=>{
            this.logger.debug('sending hall', data);
        }));
    }

    private onLogin(credentials: {username: string, password: string}): Observable<string> {
        this.logger.info('login called');
        return this.validate(credentials, CredentialsSchema)
            .flatMap((cred)=> {
                return this.database.users.getUsersByUsername(cred.username).first()
                    .catch(()=> {
                        return Observable.throw(new Error('No user found'));
                    })
                    .flatMap((user: User)=> {
                        return Observable.create((observer: Observer<string>) => {
                            let password = createHmac('sha256', 'secretsecret')
                                .update(cred.password)
                                .digest('hex');
                            if (user.password === password) {
                                this.setAuthToken({username: cred.username, userId: user.id});
                                observer.next(null);
                                observer.complete();
                            } else {
                                observer.error(new Error('Invalid password'));
                            }
                        });

                    })
            });
    }

    private onAddHall(data: Hall){
        return this.validate(data, HallSchema)
            .flatMap((hall: Hall)=>{
                return this.database.halls.insertHall(hall)
                    .catch(()=> {
                        return Observable.throw(new Error('Could not insert hall'));
                    })
            })
    }
}
