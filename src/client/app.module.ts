import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { PolymerElement } from '@vaadin/angular2-polymer';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        PolymerElement('paper-drawer-panel'),
        PolymerElement('paper-header-panel'),
        PolymerElement('paper-icon-button'),
        PolymerElement('paper-toolbar')
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }