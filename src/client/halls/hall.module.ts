import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../auth/auth-guard.service";
import {HallComponent} from "./hall.component";
import {AudioComponent} from "../audio/audio.component";
import {ControllerSettingsComponent} from "./settings/controller-settings.component";
import {HallWelcomeComponent} from "./hall-welcome.component";
import {HallListComponent} from "./hall-list.component";
import {BrowserModule} from "@angular/platform-browser";
import {AddControllerComponent} from "./settings/add-controller.component";


const routes: Routes = [
    { path: 'halls', canActivate: [AuthGuard], children: [
        {path: ':hallId', component: HallComponent, children: [
            {path: 'audio', component: AudioComponent},
            {path: 'settings', children: [
                {path: '', component: ControllerSettingsComponent}
            ]},
            {path: '', component: HallWelcomeComponent},
        ]},
        {path: '', component: HallListComponent}
    ]
    }
];
@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        HallComponent,
        ControllerSettingsComponent,
        HallWelcomeComponent,
        HallListComponent,
        AddControllerComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    exports: [
        RouterModule
    ]
})
export class HallModule {}