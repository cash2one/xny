import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core'

@Component({
    selector: 'app-console-message',
    templateUrl: './message.component.html',
    styleUrls: [
        '../../Console.component.scss',
        './message.component.scss'
    ]
})
export class MessagesComponent implements OnInit {

    constructor() {}

    ngOnInit() {

    }

}
