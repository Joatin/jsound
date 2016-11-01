import {Injectable} from "@angular/core";
import {
    ActionTypes, AddHallSuccessAction, AddHallFailAction, LoadHallsUpdateAction, LoadSelectedHallUpdateAction
} from "./hall.actions";
import {HallService} from "./hall.service";
import {Store, Action} from "@ngrx/store";
import {AppState} from "../app.state";
import {Effect, Actions} from "@ngrx/effects";
import {Observable} from "rxjs";


@Injectable()
export class HallEffects {
    constructor(
        private actions$: Actions,
        private hallService: HallService,
        private store: Store<AppState>
    ) {}

    @Effect()
    addHall$: Observable<Action> = this.actions$
        .ofType(ActionTypes.ADD_HALL)
        .switchMap((action)=>{
            return this.hallService.addHall(action.payload)
                .map((res) => {
                    return new AddHallSuccessAction()
                })
                .catch(() => {
                    return Observable.of(new AddHallFailAction())
                })
        });

    @Effect()
    loadHalls$: Observable<Action> = this.actions$
        .ofType(ActionTypes.LOAD_HALLS)
        .switchMap((action)=>{
            return this.hallService.getHalls()
                .map((res: any) => {
                    return new LoadHallsUpdateAction(res);
                });
        });

    @Effect()
    loadCurrentHall$: Observable<Action> = this.actions$
        .ofType(ActionTypes.SELECTED_HALL_CHANGE)
        .switchMap((action)=>{
            return this.hallService.getHallById(action.payload)
                .map((res: any) => {
                    return new LoadSelectedHallUpdateAction(res);
                });
        });
}