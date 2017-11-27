import {
    Component,
    OnInit
} from '@angular/core'

@Component({
    selector: 'app-bsby-service-sites',
    templateUrl: './sites.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../../../Public/theme/apps-common/table.scss',
        '../../../BsbyService/bsbyService.common.scss',
        './sites.component.scss'
    ]
})
export class SitesComponent implements OnInit {

    constructor(
    ) {}

    ngOnInit() {
    }
}