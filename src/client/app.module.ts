import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {RouterStoreModule, routerReducer} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent }   from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {DashboardComponent} from "./dashboard.component";
import {MainSidenavComponent} from "./sidenav/main-sidenav.component";
import {HallListComponent} from "./halls/hall-list.component";
import {HallComponent} from "./halls/hall.component";
import * as socketCluster from 'socketcluster-client';
import {LoginComponent} from "./auth/login.component";
import {AuthService} from "./auth/auth.service";
import {AuthGuard} from "./auth/auth-guard.service";
import {HttpModule, JsonpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthEffects} from "./auth/auth.effects";
import {authReducer} from "./auth/auth.reducer";
import {hallReducer} from "./halls/hall.reducer";
import {AddHallComponent} from "./halls/add-hall.component";
import {HallEffects} from "./halls/hall.effects";
import {HallService} from "./halls/hall.service";
import {HallWelcomeComponent} from "./halls/hall-welcome.component";
import {HallSettingsComponent} from "./halls/hall-settings.component";
import {AudioComponent} from "./audio/audio.component";
import {ControllerSettingsComponent} from "./halls/settings/controller-settings.component";
import {PolymerModule} from "./polymer.module";
import {HallModule} from "./halls/hall.module";

const socket = socketCluster.connect({port: 8000});

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        StoreModule.provideStore({
            router: routerReducer,
            auth: authReducer,
            hall: hallReducer
        }, {
            router: {
                path: window.location.pathname + window.location.search
            }
        }),
        AppRoutingModule,
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
        EffectsModule.run(AuthEffects),
        EffectsModule.run(HallEffects),
        PolymerModule,
        HallModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        MainSidenavComponent,
        LoginComponent,
        AddHallComponent,
        HallSettingsComponent,
        AudioComponent
    ],
    providers: [
        AuthService,
        AuthGuard,
        HallService,
        {provide: 'socket', useValue: socket}
    ],
    bootstrap: [ AppComponent ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}