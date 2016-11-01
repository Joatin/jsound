import {Injectable, Inject, NgZone} from "@angular/core";
import {Observable, BehaviorSubject, Observer} from "rxjs";
import {Store} from "@ngrx/store";
import {LoginSuccessAction, LoginFailAction} from "./auth.actions";
import {AppState} from "../app.state";


@Injectable()
export class AuthService {

    private authenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

    constructor(
        @Inject('socket') private socket: any,
        private zone: NgZone,
        private store: Store<AppState>
    ) {
        this.socket.on('connect', this.onConnect());

    }


    private onConnect(){
        return (status) => {
            this.zone.run(()=> {
                this.authenticatedSubject.next(status.isAuthenticated);
                if(status.isAuthenticated){
                    this.store.dispatch(new LoginSuccessAction());
                }else{
                    this.store.dispatch(new LoginFailAction());
                }
            });
        }
    }

    public isAuthenticated(): Observable<boolean> {
        return this.authenticatedSubject.asObservable();
    }

    public login(credentials: {username: string, password: string}): Observable<void>{
        return Observable.create((observer: Observer) => {
            this.socket.emit('login', credentials, (err) => {
                this.zone.run(()=> {
                    if (err) {
                        console.log(err);
                        observer.error(err);
                    } else {
                        this.authenticatedSubject.next(true);
                        observer.next(null);
                        observer.complete();
                    }
                });
            });
        });
    }

    public logout(): Observable<void>{
        return Observable.create((observer: Observer) => {
            this.socket.emit('logout', null, (err) => {
                this.zone.run(()=> {
                    if (err) {
                        console.log(err);
                        observer.error(err);
                    } else {
                        this.authenticatedSubject.next(false);
                        observer.next(null);
                        observer.complete();
                    }
                });
            });
        });
    }
}