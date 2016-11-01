import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./dashboard.component";
import {MainSidenavComponent} from "./sidenav/main-sidenav.component";
import {HallListComponent} from "./halls/hall-list.component";
import {HallComponent} from "./halls/hall.component";
import {LoginComponent} from "./auth/login.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {HallWelcomeComponent} from "./halls/hall-welcome.component";
import {HallSettingsComponent} from "./halls/hall-settings.component";
import {AudioComponent} from "./audio/audio.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'halls', canActivate: [AuthGuard], children: [
            {path: ':hallId', component: HallComponent, children: [
                {path: 'audio', component: AudioComponent},
                {path: 'settings', component: HallSettingsComponent},
                {path: '', component: HallWelcomeComponent},
            ]},
            {path: '', component: HallListComponent}
        ]
    }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}