import {Injectable} from "@angular/core";
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {ActionTypes, LoginSuccessAction, LoginFailAction, LogoutSuccessAction, LogoutFailAction} from "./auth.actions";
import {Store} from "@ngrx/store";
import {go} from "@ngrx/router-store";

interface AppState {
    counter: number;
}

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store<AppState>
    ) { }

    @Effect() login$ = this.actions$
        .ofType(ActionTypes.LOGIN)
        .switchMap((action) => {
                return this.authService.login(action.payload)
                    .map((res) => {
                        this.store.dispatch(go(['/dashboard']));
                        return new LoginSuccessAction()
                    })
                    .catch(() => {
                        return Observable.of(new LoginFailAction())
                    })
            }
        );

    @Effect() logout$ = this.actions$
        .ofType(ActionTypes.LOGOUT)
        .switchMap((action) => {
                return this.authService.logout()
                    .map((res) => {
                        this.store.dispatch(go(['/login']));
                        return new LogoutSuccessAction()
                    })
                    .catch(() => {
                        return Observable.of(new LogoutFailAction())
                    })
            }
        );
}