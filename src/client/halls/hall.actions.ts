import {type} from "../util";
import {Action} from "@ngrx/store";
import {Hall} from "../../shared/models/hall.model";


export const ActionTypes = {
    LOAD_HALLS: type('[Hall] Load halls'),
    LOAD_HALLS_STOP: type('[Hall] Load halls stop'),
    LOAD_HALLS_UPDATE: type('[Hall] Load halls update'),
    ADD_HALL: type('[Hall] Add hall'),
    ADD_HALL_SUCCESS: type('[Hall] Add hall success'),
    ADD_HALL_FAIL: type('[Hall] Add hall fail'),
    REMOVE_HALL: type('[Hall] Remove hall'),
    REMOVE_HALL_SUCCESS: type('[Hall] Remove hall success'),
    REMOVE_HALL_FAIL: type('[Hall] Remove hall fail'),
    ADD_HALL_MODAL_OPEN: type('[Hall] Add hall modal open'),
    ADD_HALL_MODAL_CHANGE: type('[Hall] Add hall modal change'),
    ADD_HALL_MODAL_RESET: type('[Hall] Add hall modal reset'),
    ADD_HALL_MODAL_CLOSE: type('[Hall] Add hall modal close'),
    SELECTED_HALL_CHANGE: type('[Hall] Selected hall change'),
    LOAD_SELECTED_HALL_UPDATE: type('[Hall] Load selected hall update'),
};

export class LoadHallsAction implements Action {
    type = ActionTypes.LOAD_HALLS;
}

export class LoadHallsStopAction implements Action {
    type = ActionTypes.LOAD_HALLS_STOP;
}

export class LoadHallsUpdateAction implements Action {
    type = ActionTypes.LOAD_HALLS_UPDATE;
    constructor(public payload: {type: string, value: Hall}) {}
}

export class AddHallAction implements Action {
    type = ActionTypes.ADD_HALL;
    constructor(public payload: Hall) {}
}

export class AddHallSuccessAction implements Action {
    type = ActionTypes.ADD_HALL_SUCCESS;
}

export class AddHallFailAction implements Action {
    type = ActionTypes.ADD_HALL_FAIL;
}

export class AddHallModalOpenAction implements Action {
    type = ActionTypes.ADD_HALL_MODAL_OPEN;
}

export class AddHallModalChangeAction implements Action {
    type = ActionTypes.ADD_HALL_MODAL_CHANGE;
    constructor(public payload: Hall) {}
}

export class AddHallModalResetAction implements Action {
    type = ActionTypes.ADD_HALL_MODAL_RESET;
}

export class AddHallModalCloseAction implements Action {
    type = ActionTypes.ADD_HALL_MODAL_CLOSE;
}

export class SelectedHallChangeAction implements Action {
    type = ActionTypes.SELECTED_HALL_CHANGE;
    constructor(public payload: string) {}
}

export class LoadSelectedHallUpdateAction implements Action {
    type = ActionTypes.LOAD_SELECTED_HALL_UPDATE;
    constructor(public payload: {type: string, value: Hall}) {}
}

export type Actions
= LoadHallsAction
| LoadHallsStopAction
| LoadHallsUpdateAction
    | AddHallModalOpenAction
    | AddHallModalChangeAction
    | AddHallModalResetAction
    | AddHallModalCloseAction
    | AddHallAction
    | AddHallSuccessAction
    | AddHallFailAction
    | SelectedHallChangeAction
    | LoadSelectedHallUpdateAction;