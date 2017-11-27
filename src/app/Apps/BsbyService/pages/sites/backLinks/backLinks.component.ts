import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { BsbyService } from '../../../bsbyService.service'

@Component({
    selector: 'app-bsby-service-site-backLinks',
    templateUrl: './backLinks.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './backLinks.component.scss'
    ]
})
export class BackLinksComponent implements OnInit {

    //路由监听
    public routeObj:Subscription

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private bsbyService:BsbyService
    ) {
    }

    ngOnInit() {
        this.routeObj = this.route.params.subscribe(v => {
            this.bsbyService.setSiteRouteInfo({
                siteId:v.siteid
            })
        })
    }
}