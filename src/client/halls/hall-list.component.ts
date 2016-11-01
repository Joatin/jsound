import {Component, OnInit, OnDestroy} from "@angular/core";
import * as template from './hall-list.component.pug';
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Hall} from "../../shared/models/hall.model";
import {getHalls, getIsAddHallModalOpen, getAddHallForm} from "./hall.reducer";
import {
    AddHallModalOpenAction, AddHallModalCloseAction, AddHallModalChangeAction,
    AddHallModalResetAction, AddHallAction, LoadHallsAction, LoadHallsStopAction
} from "./hall.actions";


@Component({
    template: template()
})
export class HallListComponent implements OnInit, OnDestroy{

    public halls$: Observable<Hall[]>;
    public addHallOpened$: Observable<boolean>;
    public addHallModel$: Observable<Hall>;

    constructor (
        private store: Store<AppState>
    ) {
        this.halls$ = <Observable<Hall[]>>this.store.let(getHalls);
        this.addHallOpened$ = <Observable<boolean>>this.store.let(getIsAddHallModalOpen);
        this.addHallModel$ = <Observable<Hall>>this.store.let(getAddHallForm);
    }

    ngOnInit(){
        this.store.dispatch(new LoadHallsAction())
    }

    public modalOpen(){
        this.store.dispatch(new AddHallModalOpenAction());
    }

    public modalClose(save: boolean){
        if(save){
            this.addHallModel$.first().subscribe((model)=>{
                this.store.dispatch(new AddHallAction(model));
                this.store.dispatch(new AddHallModalCloseAction());
            });
        }else{
            this.store.dispatch(new AddHallModalCloseAction());
            this.store.dispatch(new AddHallModalResetAction());
        }

    }

    public modelChange(hall: Hall) {
        this.store.dispatch(new AddHallModalChangeAction(hall));
    }

    ngOnDestroy(){
        this.store.dispatch(new LoadHallsStopAction())
    }
}