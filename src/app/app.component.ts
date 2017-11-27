import { Component, OnInit } from '@angular/core';
import {
    ActivatedRoute,
    Router,
    Resolve,
    ActivatedRouteSnapshot,
    NavigationStart,
    NavigationEnd
} from '@angular/router';

import { environment } from '../environments/environment'

import { LoginService } from './Public/Login/Login.service';
import { AppService } from './app.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.scss',
        './app.common.scss'
    ]
})
export class AppComponent {

    public windowUrl: any

    constructor(
        public loginService: LoginService,
        public router: Router,
        public appService: AppService,
        public activatedRoute: ActivatedRoute
    ) {
        this.windowUrl = this.appService.iconUrls.common
    }

    ngOnInit() {
    }
}
