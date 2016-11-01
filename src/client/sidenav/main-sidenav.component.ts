import {Component} from "@angular/core";
import * as template from './main-sidenav.component.pug';
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Observable} from "rxjs";
import {getSelectedHallId, getSelectedHall} from "../halls/hall.reducer";
import {Hall} from "../../shared/models/hall.model";


@Component({
   template: template(),
   selector: 'main-sidenav'
})
export class MainSidenavComponent{
   private hallId$: Observable<string>;
   private hall$: Observable<Hall>;
   constructor(
       private store: Store<AppState>
   ) {
      this.hallId$ = <Observable<string>>this.store.let(getSelectedHallId);
      this.hall$ = <Observable<Hall>>this.store.let(getSelectedHall);

   }
}