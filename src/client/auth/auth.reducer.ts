import * as auth from './auth.actions'
import {Observable} from "rxjs";
import {AppState} from "../app.state";


export interface AuthState {
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    isLoggingOut: boolean;
}

const initialState: AuthState = {
    isLoggedIn: false,
    isLoggingIn: false,
    isLoggingOut: false,
};

export function authReducer(state = initialState, action: auth.Actions): AuthState {
    switch (action.type) {
        case auth.ActionTypes.LOGIN: {
            return Object.assign({}, state, {
                isLoggingIn: true,
                isLoggingOut: false
            });
        }
        case auth.ActionTypes.LOGIN_SUCCESS: {
            return {
                isLoggedIn: true,
                isLoggingIn: false,
                isLoggingOut: false
            }
        }
        case auth.ActionTypes.LOGIN_FAIL: {
            return Object.assign({}, state, {
                isLoggingIn: false,
                isLoggingOut: false
            });
        }
        case auth.ActionTypes.LOGOUT: {
            return Object.assign({}, state, {
                isLoggingIn: false,
                isLoggingOut: true
            });
        }
        case auth.ActionTypes.LOGOUT_SUCCESS: {
            return {
                isLoggedIn: false,
                isLoggingIn: false,
                isLoggingOut: false
            }
        }
        case auth.ActionTypes.LOGOUT_FAIL: {
            return Object.assign({}, state, {
                isLoggingIn: false,
                isLoggingOut: false
            });
        }
        default: {
            return state;
        }
    }
}

export function getLoggedIn(state$: Observable<AppState>): Observable<boolean> {
    return state$.select(state => state.auth.isLoggedIn);
}

export function getLoggingIn(state$: Observable<AppState>): Observable<boolean> {
    return state$.select((state: AppState) => {
        return state.auth.isLoggingIn;
    });
}