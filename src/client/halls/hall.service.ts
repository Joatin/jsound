import {Injectable, Inject, NgZone} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Observer, Observable} from "rxjs";
import {Hall} from "../../shared/models/hall.model";


@Injectable()
export class HallService {

    constructor(
        @Inject('socket') private socket: any,
                private zone: NgZone,
                private store: Store<AppState>
    ){}

    public getHalls(): Observable<Hall>{
        return Observable.create((observer: Observer)=>{
            this.socket.emit('halls.start');
            this.socket.on('halls',(data)=>{
                this.zone.run(()=>{
                    observer.next(data);
                });
            });
            return ()=> {
                this.socket.emit('halls.stop');
            }
        });
    }

    public getHallById(id: string): Observable<Hall>{
        return Observable.create((observer: Observer)=>{
            this.socket.emit('hall.get.start', id);
            this.socket.on('hall.get',(data)=>{
                this.zone.run(()=>{
                    observer.next(data);
                });
            });
            return ()=> {
                this.socket.emit('hall.get.stop');
            }
        });
    }

    public addHall(hall: Hall): Observable<Hall> {
        console.log('addHall');
        return Observable.create<Hall>((observer: Observer<Hall>) => {
            this.socket.emit('halls.add', hall, (error: Error, data: Hall)=>{
                this.zone.run(()=>{
                    if(error){
                        observer.error(error);
                    }else{
                        observer.next(data);
                        observer.complete();
                    }
                });
            });
        });
    }
}