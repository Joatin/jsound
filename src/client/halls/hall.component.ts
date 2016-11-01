import {Component, OnInit, OnDestroy} from "@angular/core";
import * as template from './hall.component.pug';
import {ActivatedRoute, Params} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {SelectedHallChangeAction} from "./hall.actions";
import {Subscription} from "rxjs";


@Component({
    template: template()
})
export class HallComponent implements OnInit, OnDestroy{

    private paramSubscription: Subscription = null;
    constructor(
        private route: ActivatedRoute,
        private store: Store<AppState>
    ) {}

    ngOnInit(){
        this.paramSubscription = this.route.params.subscribe((params: Params)=>{
            let id = params['hallId'];
            this.store.dispatch(new SelectedHallChangeAction(id));
        })
    }

    ngOnDestroy(){
        this.paramSubscription.unsubscribe();
        this.store.dispatch(new SelectedHallChangeAction(null));
    }
}