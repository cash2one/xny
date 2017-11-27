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

@Component({
    selector: 'app-bsby-service-keywords',
    templateUrl: './keywords.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../../../Public/theme/apps-common/table.scss',
        '../../../BsbyService/bsbyService.common.scss',
        './keywords.component.scss'
    ]
})
export class KeywordsComponent implements OnInit {

    constructor(
        public router:Router,
        public route:ActivatedRoute
    ) {
    }

    ngOnInit() {
        // this.router.navigate(['../list',2],{relativeTo:this.route})
    }
}