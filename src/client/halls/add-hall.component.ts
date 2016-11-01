import {Component, Input, Output, EventEmitter} from "@angular/core";
import * as template from './add-hall.component.pug';
import {Hall} from "../../shared/models/hall.model";


@Component({
    template: template(),
    selector: 'add-hall'
})
export class AddHallComponent{
    @Input()
    public opened: boolean;
    @Input()
    public model: Hall;
    @Output() open = new EventEmitter<void>();
    @Output() close = new EventEmitter<boolean>();
    @Output() modelChange = new EventEmitter<Hall>();

    public change(){
        let newModel: Hall = Object.assign({}, this.model);
        this.modelChange.emit(newModel);
    }
}