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

import { ProgrammesListAllData } from './programme-all.data'
import { PageData } from '../../../../bsbyService.data'
import { GrProgrammeService } from '../../../../services/grManagement/grProgramme.service'
import { ProgrammesService } from '../programme.service'

@Component({
    selector: 'app-bsby-service-programme-list-all',
    templateUrl: './programme-all.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../bsbyService.common.scss',
        './programme-all.component.scss'
    ]
})
export class ProgrammeListAllComponent implements OnInit {

    //表头数据
    public programmeListTitles: string[]
    //loading
    public loadingType: string
    //方案列表
    public programmeList: any[]

    // 分页
    public pageData: PageData
    //搜索关键词
    public searchParam:{
        name:string
    }

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public grProgrammeService: GrProgrammeService,
        public programmesService: ProgrammesService
    ) {
        this.programmeListTitles = new ProgrammesListAllData().programmeListTitles
        this.pageData = new PageData()
        this.searchParam = {
            name:''
        }
    }

    ngOnInit() {
        this.getProgrammeList()
        this.programmesService.setPTitle('执行方案列表')
    }

    /**
     * 获取所有方案
     * @author GR-05
     */
    public getProgrammeList() {
        this.loadingType = 'show'
        this.grProgrammeService.getProgrammeList({
            page: this.pageData.page,
            rows: this.pageData.rows,
            ...this.searchParam
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.pageData.total = res.data.total
                res.data.total == 0 ? 
                    this.loadingType = 'empty' : 
                        this.programmeList = this.resolveProList(res.data.data)
            }
        })
    }

    /**
     * 处理分页
     * @param page 
     * @author GR-05 
     */
    public fnPagination(page:any){
        this.pageData.page = page.page
        this.pageData.rows = page.rows
        this.getProgrammeList()
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
        if (list.length > 0) {
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