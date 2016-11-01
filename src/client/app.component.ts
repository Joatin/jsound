import {Component, OnInit} from '@angular/core';
import * as template from './app.component.pug';
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {getLoggedIn} from "./auth/auth.reducer";
import {LogoutAction} from "./auth/auth.actions";
import {AppState} from "./app.state";
import {LoadAction} from "./halls/hall.actions";



@Component({
    selector: 'my-app',
    template: template()
})
export class AppComponent {
    public isLoggedIn$: Observable<boolean>;

    constructor(
        private store: Store<AppState>
    ){
        this.isLoggedIn$ = <Observable<boolean>>this.store.let(getLoggedIn);
    }

    logout(){
        this.store.dispatch(new LogoutAction());
    }
}