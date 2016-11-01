import {Component, OnInit} from "@angular/core";
import * as template from './audio.component.pug';
import {Observable} from "rxjs";
import {Hall} from "../../shared/models/hall.model";
import {getSelectedHall} from "../halls/hall.reducer";
import {AppState} from "../app.state";
import {Store} from "@ngrx/store";


@Component({
    template: template()
})
export class AudioComponent implements OnInit{
    public hall$: Observable<Hall>;
    constructor(
        private store: Store<AppState>
    ) {
        this.hall$ = <Observable<Hall>>this.store.let(getSelectedHall);
    }

    ngOnInit(){

    }
}