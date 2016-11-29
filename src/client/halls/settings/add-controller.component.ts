import {Component, OnInit} from "@angular/core";
import * as template from './add-controller.component.pug';
import {Observable} from "rxjs";
import {Hall} from "../../../shared/models/hall.model";


@Component({
    selector: 'add-controller',
    template: template()
})
export class AddControllerComponent implements OnInit{
    constructor(
    ) {
    }

    ngOnInit(){

    }
}