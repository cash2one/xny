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
    selector: 'app-bsby-service-demands',
    templateUrl: './demands.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../../../Public/theme/apps-common/table.scss',
        '../../../BsbyService/bsbyService.common.scss',
        './demands.component.scss'
    ]
})
export class DemandsComponent implements OnInit {

    constructor(
        public router:Router,
        public route:ActivatedRoute
    ) {
    }

    ngOnInit() {
        // this.router.navigate(['../list',2],{relativeTo:this.route})
    }
}