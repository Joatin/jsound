import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import { PolymerElement } from '@vaadin/angular2-polymer';


@NgModule({
    declarations: [
        PolymerElement('paper-drawer-panel'),
        PolymerElement('paper-header-panel'),
        PolymerElement('paper-icon-button'),
        PolymerElement('paper-toolbar'),
        PolymerElement('paper-menu'),
        PolymerElement('paper-item'),
        PolymerElement('paper-card'),
        PolymerElement('paper-button'),
        PolymerElement('paper-input'),
        PolymerElement('iron-icon'),
        PolymerElement('paper-fab'),
        PolymerElement('paper-dialog'),
        PolymerElement('paper-dialog-scrollable'),
    ]
})
export class PolymerModule{}