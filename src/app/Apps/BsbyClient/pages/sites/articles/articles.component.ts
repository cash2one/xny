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

import { BsbyService } from '../../../bsbyClient.service'

@Component({
    selector: 'app-bsby-service-site-articles',
    templateUrl: './articles.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyClient/bsbyClient.common.scss',
        './articles.component.scss'
    ]
})
export class ArticlesComponent implements OnInit {

    //路由监听
    public routeObj:Subscription

    constructor(
        public router:Router,
        public route:ActivatedRoute,
        public bsbyService:BsbyService
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