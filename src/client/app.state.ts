import {AuthState} from "./auth/auth.reducer";
import {RouterState} from "@ngrx/router-store";
import {HallState} from "./halls/hall.reducer";


export interface AppState {
    router: RouterState;
    auth: AuthState;
    hall: HallState;
}