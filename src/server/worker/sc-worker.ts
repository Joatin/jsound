
import {Logger} from "../shared/logger/logger";
import {Socket} from "./socket";
import {Database} from "../shared/database/database";
export interface ISocketClusterWorker {
    id: number;
    on(event: string, handler: () => void): void;
    scServer: ISocketClusterServer;
}

export interface ISocketClusterServer {
    on(event: string, handler: (socket?) => void): void;
}

export abstract class ScWorker {

    public get id(): number {
        return this.scWorker.id;
    }

    constructor(
        private scWorker: ISocketClusterWorker,
        private logger: Logger,
        private database: Database
    ){
        this.logger.info('Setting up worker');
        this.scWorker.on('error', this.wrap(this.handleError));
        this.scWorker.on('notice', this.wrap(this.handleNotice));
        this.scWorker.on('ready', this.wrap(this.handleReady));
        this.scWorker.on('exit', this.wrap(this.handleExit));
        this.scWorker.on('masterMessage', this.wrap(this.handleMasterMessage));
        this.scWorker.scServer.on('connection', this.wrap(this.handleOnConnection));
    }

    private wrap(method: any){
        let self = this;
        return (...args: any[])=> {
            method.call(self, ...args);
        }
    }

    private handleError(){
        this.logger.error('handleError error');
        if(this.onError){
            this.onError();
        }
    }

    private handleNotice(){
        this.logger.warn('handleNotice notice');
        if(this.onNotice){
            this.onNotice();
        }
    }

    private handleReady(){
        this.logger.info('handleReady called');
        if(this.onReady){
            this.onReady();
        }
    }

    private handleExit(){
        this.logger.warn('handleExit exit');
        if(this.onExit){
            this.onExit();
        }
    }

    private handleMasterMessage(){
        this.logger.warn('handleMasterMessage');
        if(this.onMasterMessage){
            this.onMasterMessage();
        }
    }


    private handleOnConnection(socket) {
        this.logger.debug('new connection');
        let sock = new Socket(socket, this.logger, this.database);
        sock.init();
        if(this.onConnect){
            this.onConnect(sock);
        }
    }

    onError?(): void;
    onNotice?(): void;
    onReady?(): void;
    onExit?(): void;
    onMasterMessage?(): void;

    onConnect?(socket): void;
}