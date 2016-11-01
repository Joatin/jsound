import {type} from "../util";
import {Action} from "@ngrx/store";


export const ActionTypes = {
    LOGIN: type('[Auth] Login'),
    LOGIN_SUCCESS: type('[Auth] Login success'),
    LOGIN_FAIL: type('[Auth] Login fail'),
    LOGOUT: type('[Auth] Logout'),
    LOGOUT_SUCCESS: type('[Auth] Logout success'),
    LOGOUT_FAIL: type('[Auth] Logout fail')
};

export class LoginAction implements Action {
    type = ActionTypes.LOGIN;
    constructor(public payload: {username: string, password: string}) {}
}

export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;
}

export class LoginFailAction implements Action {
    type = ActionTypes.LOGIN_FAIL;
}

export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;
}

export class LogoutSuccessAction implements Action {
    type = ActionTypes.LOGOUT_SUCCESS;
}

export class LogoutFailAction implements Action {
    type = ActionTypes.LOGOUT_FAIL;
}

export type Actions
= LoginAction
| LoginSuccessAction
| LoginFailAction
    | LogoutAction
    | LogoutSuccessAction
    | LogoutFailAction;