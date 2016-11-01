import {Observable, Observer, Subscription} from "rxjs";
import {Logger} from "../shared/logger/logger";
import * as Joi from 'joi';
import {Schema} from "joi";

export interface HandlerParams<T> {
    data: T,
    respond: (error: Error | string, message?: Object) => void;
}

export abstract class ScSocket {
    private validateCallback = Observable.bindNodeCallback(Joi.validate);

    private subscriptions: Subscription[] = [];

    protected get authToken(): Object{
        return this.scSocket.authToken;
    }

    constructor(private scSocket: any,
                private logger: Logger) {
        this.scSocket.on('disconnect', this.wrap(this.handleOnDestroy));
    }

    /**
     * Registers an event handler.
     * @param event The event to listen for
     * @param [handle] The handler that takes care of the event. The value returned from the observable is then responded.
     * @returns {Observable<HandlerParams<T>>} An observable. This observable is cold, so it needs to be subscribed to
     * before any action is taken.
     */
    public on<T>(event: string, handle?: (data: T)=>Observable<string>): Observable<T> {
        let baseObservable =  Observable.create<HandlerParams<T>>((observer: Observer<HandlerParams<T>>)=> {
            let callback = ((data, respond)=> {
                observer.next({data, respond});
            }).bind(this);
            this.scSocket.on(event, callback);
            return () => {
                this.scSocket.off(event, callback);
            }
        });
        if (handle) {
            handle = handle.bind(this);
            return baseObservable.flatMap((handler: HandlerParams<T>)=> {
                return handle(handler.data)
                    .map((result: any)=> {
                        handler.respond(null, result);
                        return result;
                    }).catch((error: Error)=> {
                        this.logger.debug('on observable', error.message);
                        handler.respond(error.message);
                        return Observable.of(null);
                    });
            });
        } else {
            return baseObservable.map((params: HandlerParams<T>)=>{
                return params.data;
            })
        }
    }

    public onEmit<T, R>(event: string, dataCallback:(data: R)=> Observable<Object>): Observable<T> {
        let startEvent = event + '.start';
        let stopEvent = event + '.stop';
        let baseObservable =  Observable.create<HandlerParams<T>>((observer: Observer<HandlerParams<T>>)=> {
            let callCounter: Number = 0;
            let subscription: Subscription = null;
            let startCallback = ((data: R)=> {
                callCounter += 1;
                if(callCounter === 1) {
                    subscription = dataCallback(data).subscribe((data: T)=>{
                        this.scSocket.emit(event, data);
                        observer.next(data);
                    });
                }
            }).bind(this);
            let stopCallback = (()=> {
                callCounter -= 1;
                if (callCounter === 0) {
                    subscription.unsubscribe();
                }else if (callCounter < 0) {
                    callCounter = 0;
                }
            }).bind(this);
            this.scSocket.on(startEvent, startCallback);
            this.scSocket.on(stopEvent, stopCallback);
            return () => {
                this.scSocket.off(startEvent, startCallback);
                this.scSocket.off(stopEvent, stopCallback);
                if(subscription && !subscription.closed){
                    subscription.unsubscribe();
                }
            }
        });

        return baseObservable;
    }

    public subscribe<T>(observable: Observable<T>, onNext?: (data: T)=>void, onError?: (error: Error)=>void, onComplete?: ()=>void) {
        let sub = observable.subscribe(onNext, onError, onComplete);
        this.subscriptions.push(sub);
        return sub;
    }

    public emit(event: string, data: Observable<Object>): Subscription {
        let sub = data.subscribe((result)=>{
            this.scSocket.emit(event, result);
        });
        this.subscriptions.push(sub);
        return sub;
    }

    protected validate<T>(data: T, schema: Schema): Observable<T> {
        return this.validateCallback(data, schema);
    }

    private wrap(method: any) {
        let self = this;
        return (...args: any[])=> {
            return method.call(self, ...args);
        }
    }

    public init(): void {
    }

    protected setAuthToken(param: Object): void {
        this.logger.debug('Auth token', param);
        this.scSocket.setAuthToken(param);
    }

    private handleOnDestroy() {
        this.logger.info('Socket disconnected', {socketId: this.scSocket.id});
        if (this.onDestroy) {
            this.onDestroy();
        }
        this.subscriptions.forEach((value: Subscription)=>{
            if(!value.closed){
                value.unsubscribe();
            }
        });
        this.subscriptions = [];
        this.scSocket = null;
        this.logger = null;
    }

    onDestroy?(): void;
}