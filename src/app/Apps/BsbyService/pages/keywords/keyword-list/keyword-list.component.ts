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

import { KeywordListData } from './keyword-list.data'
import { GrKeywordService } from '../../../services/grManagement/grKeyword.service'

@Component({
    selector: 'app-bsby-service-keyword-list',
    templateUrl: './keyword-list.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        '../keywords.component.scss',
        './keyword-list.component.scss'
    ]
})
export class KeywordListComponent implements OnInit {

    //表头
    public keywordListTitles: string[]
    //表格loading
    public loadingType:string

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public grKeywordService:GrKeywordService
    ) {
        this.keywordListTitles = new KeywordListData().keywordListTitles
    }

    ngOnInit() {
    }
}