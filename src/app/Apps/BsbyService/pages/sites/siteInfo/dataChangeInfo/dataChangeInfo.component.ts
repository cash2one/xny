import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Input
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

@Component({
    selector: 'site-datachange-info',
    templateUrl: './dataChangeInfo.component.html',
    styleUrls: [
        './dataChangeInfo.component.scss'
    ]
})
export class DataChangeInfoComponent implements OnInit {

    @Input() dataChangeInfo:any

    constructor(
    ) {
    }

    ngOnInit() {
        this.resolveDataChange()
    }

    /**
     * 处理数据（上升下降）
     *  @author  GR-05
     */
    public resolveDataChange(){
        if(this.dataChangeInfo.seo_after && this.dataChangeInfo.seo_begin){
            this.dataChangeInfo.seo_after.baiduFlag = this.dataChangeInfo.seo_after.baidu - this.dataChangeInfo.seo_begin.baidu
            this.dataChangeInfo.seo_after.baidu_linkFlag = this.dataChangeInfo.seo_after.baidu_link - this.dataChangeInfo.seo_begin.baidu_link
            this.dataChangeInfo.seo_after.s360Flag = this.dataChangeInfo.seo_after.s360 - this.dataChangeInfo.seo_begin.s360
            this.dataChangeInfo.seo_after.baidu_prFlag = this.dataChangeInfo.seo_after.baidu_pr - this.dataChangeInfo.seo_begin.baidu_pr
        }
    }
}