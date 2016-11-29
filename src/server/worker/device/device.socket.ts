import {ScSocket} from "../sc-socket";
import {Logger} from "../../shared/logger/logger";
import {Database} from "../../shared/database/database";
import {Observable, Observer} from "rxjs";
import * as uuid from 'node-uuid';
import {ClientCredentialsSchema} from "./device-credentials.schema";
import {Controller} from "../../../shared/models/controller.model";
import {createHmac} from "crypto";

const Events = {
    GET_ID: 'device.getId',
    LOGIN: 'device.login'
};
export class DeviceSocket extends ScSocket {

    constructor(
        socket: any,
        private logger: Logger,
        private database: Database
    ) {
        super(socket, logger);
        logger.debug('Created device socket');
    }

    public init(): void {
        this.subscribe(this.on(Events.GET_ID, this.onGetId));
        this.subscribe(this.on(Events.LOGIN, this.onLogin));
    }

    private onGetId(): Observable<string>{
        let id = uuid.v4();
        this.logger.debug(id);
        return Observable.of(id);
    }

    private onLogin(data): Observable<string> {
        this.logger.info('device login called');
        return this.validate(data, ClientCredentialsSchema)
            .flatMap((credentials: {controllerId: string, controllerSecret: string})=> {
                return this.database.controllers.getControllerByControllerId(credentials.controllerId).first()
                    .catch(()=> {
                        return Observable.throw(new Error('No controller found'));
                    })
                    .flatMap((controller: Controller)=> {
                        return Observable.create((observer: Observer<string>) => {
                            let password = createHmac('sha256', 'secretsecret')
                                .update(credentials.controllerSecret)
                                .digest('hex');
                            if (controller.controllerSecret === password) {
                                this.setAuthToken({controllerId: controller.controllerId});
                                observer.next(null);
                                observer.complete();
                            } else {
                                observer.error(new Error('Invalid controller secret'));
                            }
                        });

                    })
            });
    }
}