import {Actions, ActionTypes} from "./hall.actions";
import {Hall, getEmptyHall} from "../../shared/models/hall.model";
import {Observable} from "rxjs";
import {AppState} from "../app.state";
import * as _ from 'underscore';


export interface HallState {
    halls: Hall[];
    isAddHallModalOpen: boolean;
    addHallForm: Hall;
    isAddingHallLoading: boolean;
    isLoadingHalls: boolean;
    selectedHallId: string;
    selectedHall: Hall;
}

const initialState: HallState = {
    halls: [],
    isAddHallModalOpen: false,
    addHallForm: getEmptyHall(),
    isAddingHallLoading: false,
    isLoadingHalls: false,
    selectedHallId: null,
    selectedHall: null
};

export function hallReducer(state = initialState, action: Actions): HallState {
    switch (action.type){
        case ActionTypes.LOAD_HALLS: {
            return Object.assign({}, state, {
                isLoadingHalls: true
            });
        }
        case ActionTypes.LOAD_HALLS_UPDATE: {
            let data: {type: string, value: Hall} = action.payload;
            let halls = Object.assign([], state.halls);
            if(data.type === 'change'){
                for(let i = 0; i < halls.length; i++){
                    if(halls[i].id === data.value.id){
                        halls[i] = data.value;
                        return Object.assign({}, state, {
                            halls: halls
                        });
                    }
                }
                halls.push(data.value);
                return Object.assign({}, state, {
                    halls: halls
                });
            }else if(data.type === 'insert'){
                for(let i = 0; i < halls.length; i++){
                    if(halls[i].id === data.value.id){
                        halls[i] = data.value;
                        return Object.assign({}, state, {
                            halls: halls
                        });
                    }
                }
                halls.push(data.value);
                return Object.assign({}, state, {
                    halls: halls
                });

            }else if(data.type === 'remove'){
                halls = _.without(halls, _.findWhere(halls, {
                    id: data.value
                }));
                return Object.assign({}, state, {
                    halls: halls
                });
            }
            return Object.assign({}, state);
        }
        case ActionTypes.ADD_HALL: {
            return Object.assign({}, state, {
                isAddingHallLoading: true
            });
        }
        case ActionTypes.ADD_HALL_MODAL_OPEN: {
            return Object.assign({}, state, {
                isAddHallModalOpen: true
            });
        }
        case ActionTypes.ADD_HALL_MODAL_CHANGE: {
            return Object.assign({}, state, {
                addHallForm: Object.assign({}, action.payload)
            });
        }
        case ActionTypes.ADD_HALL_MODAL_RESET: {
            return Object.assign({}, state, {
                addHallForm: getEmptyHall()
            });
        }
        case ActionTypes.ADD_HALL_MODAL_CLOSE: {
            return Object.assign({}, state, {
                isAddHallModalOpen: false
            });
        }
        case ActionTypes.SELECTED_HALL_CHANGE: {
            if(action.payload){
                return Object.assign({}, state, {
                    selectedHallId: action.payload
                });
            }else{
                return Object.assign({}, state, {
                    selectedHallId: null,
                    selectedHall: null
                });
            }

        }
        case ActionTypes.LOAD_SELECTED_HALL_UPDATE: {
            let data: {type: string, value: Hall} = action.payload;
            if(data){
                if(data.type === 'change' || data.type === 'insert'){
                    return Object.assign({}, state, {
                        selectedHall: data.value
                    });
                }else if(data.type === 'remove'){
                    return Object.assign({}, state, {
                        selectedHall: null
                    });
                }
            }
            return Object.assign({}, state, {
                selectedHall: null
            });
        }
        default: {
            return state;
        }
    }
}

export function getHalls(state$: Observable<AppState>): Observable<Hall[]> {
    return state$.select((state: AppState) => {
        return state.hall.halls;
    });
}

export function getIsAddHallModalOpen(state$: Observable<AppState>): Observable<Hall[]> {
    return state$.select((state: AppState) => {
        return state.hall.isAddHallModalOpen;
    });
}

export function getAddHallForm(state$: Observable<AppState>): Observable<Hall[]> {
    return state$.select((state: AppState) => {
        return state.hall.addHallForm;
    });
}

export function getSelectedHall(state$: Observable<AppState>): Observable<Hall> {
    return state$.select((state: AppState) => {
        return state.hall.selectedHall;
    });
}

export function getSelectedHallId(state$: Observable<AppState>): Observable<string> {
    return state$.select((state: AppState) => {
        return state.hall.selectedHallId;
    });
}