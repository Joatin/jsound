import {Component} from "@angular/core";
import * as template from './login.component.pug';
import {Store} from "@ngrx/store";
import {LoginAction} from "./auth.actions";

interface AppState {
    counter: number;
}


@Component({
    template: template()
})
export class LoginComponent {
    public username: string = '';
    public password: string = '';

    constructor(
        private store: Store<AppState>
    ) {}

    login() {
        this.store.dispatch(new LoginAction({username: this.username, password: this.password}));
    }
}