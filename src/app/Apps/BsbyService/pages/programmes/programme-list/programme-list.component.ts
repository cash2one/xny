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

import { ProgrammesListData } from './programme-list.data'
import { GrProgrammeService } from '../../../services/grManagement/grProgramme.service'
import { ProgrammesService } from './programme.service'

@Component({
    selector: 'app-bsby-service-programme-list',
    templateUrl: './programme-list.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../bsbyService.common.scss',
        './programme-list.component.scss'
    ]
})
export class ProgrammeListComponent implements OnInit,OnDestroy {

    //表头数据
    public programmeListTitles: string[]
    //loading
    public loadingType: string
    //方案列表
    public programmeList: any[]
    //标题
    public title:string
    //标题监听
    public titleObj:Subscription

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public grProgrammeService: GrProgrammeService,
        public programmesService:ProgrammesService
    ) {
        this.programmeListTitles = new ProgrammesListData().programmeListTitles
        this.title = '执行方案列表'
    }

    ngOnInit() {
        this.getProgrammeList()
        this.titleObj =  this.programmesService.pTitleObs.subscribe(res=>{
            this.title = res
        })
    }

    ngOnDestroy(){
        this.titleObj?this.titleObj.unsubscribe():{}
    }

    /**
     * 获取所有方案
     * @author GR-05
     */
    public getProgrammeList() {
        this.loadingType = 'show'
        this.grProgrammeService.getProgrammeList({}).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.programmeList = res.data.total > 0?this.resolveProList(res.data.data):[]
            }
        })
    }

    /**
     * 处理获取的方案列表
     * @param list 响应
     * @author GR-05
     */
    public resolveProList(list: any[]): any[] {
        let tempList = []
        let tempSiteId: number
        let result = []

        let cid = list[0]['cid']
        list.forEach((pro, index) => {
            if (pro['cid'] == cid) {
                tempList.push(pro)
            }
        })
        result = result.concat(this.resolveOneCom(tempList))
        tempList = []

        list = JSON.parse(JSON.stringify(list.filter(pro => pro['cid'] != cid)))
        if(list.length > 0){
            result = result.concat(this.resolveProList(list))
        }

        return result
    }


    /**
     * 处理一个公司下的数据（给第一个数据加总数）
     * @author GR-05
     */
    public resolveOneCom(oneComList: any[]): any[] {
        oneComList = JSON.parse(JSON.stringify(oneComList))
        oneComList[0]['com_count'] = oneComList.length
        return oneComList
    }
}