import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    AfterViewInit
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { BsbyUeditorComponent } from '../../../../common/bsby-ueditor/bsby-ueditor.component'
import { Subscription } from 'rxjs/Subscription'

import { ProgrammeOpData, ProgrammeFc, PostData } from './programme-op.data'
import { BsbyService } from '../../../../bsbyService.service'
import { GrProgrammeService } from '../../../../services/grManagement/grProgramme.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { SitesService } from '../../sites.service'

@Component({
    selector: 'app-bsby-service-site-programme-op',
    templateUrl: './programme-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../programmes.component.scss',
        './programme-op.component.scss'
    ]
})
export class ProgrammeOpComponent implements OnInit, OnDestroy,AfterViewInit {
    @ViewChild('contentUed') contentUed: BsbyUeditorComponent;

    //路由监听
    public routeObj: Subscription
    //表单控件
    public ctrlProgramme: ProgrammeFc
    //方案表单
    public programmeForm: FormGroup
    //方案表单数据
    public programmeData: PostData
    //网站id
    public siteId: number
    //方案id
    public programmeId: number
    //网站详情
    public siteInfo: any
    //标示是添加还是编辑
    public opType: string
    //编辑模式下的loading
    public editLoadingType: string
    //模式下的头部文字
    public typeTitle: string
    //按钮文字
    public btnTitle: string
    //编辑器配置
    public ueditorConf: any

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public builder: FormBuilder,
        public bsbyService: BsbyService,
        public sitesService: SitesService,
        public grProgrammeService: GrProgrammeService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService
    ) {
        this.initData()
        this.editLoadingType = 'show'
        this.typeTitle = '添加执行方案'
        this.btnTitle = '添加'
    }

    ngOnInit() {
        this.siteId = this.bsbyService.siteInfo.siteId
        this.siteInfo = this.sitesService.getSiteInfo()
        this.programmeData.site_id = this.siteId
        this.routeObj = this.route.params.subscribe(v => {
            this.opType = v.type
            v.programmeid ? this.programmeId = v.programmeid : {}
            this.resolveOp()
            this.resolveForm()
            if (!this.siteInfo) {
                this.getSiteInfo()
            } else {
                this.programmeData.cid = this.siteInfo.cid
                this.opType == 'edit' ? this.getProgrammeInfo() : {}
            }
        })
    }

    ngAfterViewInit(){}

    ngOnDestroy() {
        this.routeObj ? this.routeObj.unsubscribe() : {}
    }

    initData() {
        this.ueditorConf = this.bsbyService.uedConf()
        this.programmeData = new PostData()
        this.programmeData = {
            site_id: null,
            cid: null,
            id: null,
            title: '',
            content: ''
        }
        this.resolveCtrl()
    }

    /**
     * 处理编辑和添加逻辑
     * @author GR-05
     */
    resolveOp() {
        if (this.opType == 'add') {
            this.editLoadingType = 'hide'
            this.typeTitle = '添加执行方案'
            this.btnTitle = '添加'
        } else if (this.opType == 'edit') {
            this.typeTitle = '编辑执行方案'
            this.btnTitle = '更新'
        }
    }

    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveCtrl() {
        this.ctrlProgramme = {
            title: new FormControl('', [
                Validators.required
            ]),
            content: new FormControl('', [
                Validators.required
            ]),
            vote: new FormControl('', [])
        }
    }

    /**
     * 处理表单
     *  @author GR-05
     */
    resolveForm() {
        this.programmeForm = this.builder.group({
            title: this.ctrlProgramme.title,
            content: this.ctrlProgramme.content,
            vote:this.ctrlProgramme.vote
        })
    }

    /**
     * 获取网站详情
     * @author GR-05
     */
    getSiteInfo() {
        this.sitesService.getSiteInfoDynamic(this.siteId).subscribe(res => {
            if (res.status === 1) {
                this.siteInfo = res.data
                this.programmeData.cid = this.siteInfo.cid
                if (this.opType == 'edit') {
                    this.getProgrammeInfo()
                }
            }
        })
    }

    /**
     * 提交方案表单
     * @author GR-05
     */
    public fnOpProgramme() {
        if (this.programmeForm.valid) {
            let message = this.opType == 'add' ? '添加中' : '修改中'
            this.riccioLoadingService.setLoading({
                message: message
            })
            if (this.opType == 'add') {
                this.grProgrammeService.postProgrammeAdd(this.programmeData).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status === 1) {
                        this.riccioNotificationsService.setSubject({
                            text: '操作成功',
                            status: 'success'
                        })
                        this.riccioNotificationsService.setSubject({
                            text: '请到方案列表中查看',
                            status: 'success'
                        })
                        this.programmeForm.reset(new PostData())
                        this.contentUed.clearUed()
                    }
                })
            } else if (this.opType == 'edit') {
                this.grProgrammeService.postProgrammeEdit(this.programmeData).subscribe(res => {
                    this.riccioLoadingService.closeLoading()
                    if (res.status === 1) {
                        this.riccioNotificationsService.setSubject({
                            text: '修改成功',
                            status: 'success'
                        })
                    }
                })
            }
        }
    }

    /**
     * 获取方案详情
     * @author GR-05
     */
    public getProgrammeInfo() {
        this.editLoadingType = 'show'
        this.grProgrammeService.postProgrammeInfo({
            id: this.programmeId,
            site_id: this.siteId
        }).subscribe(res => {
            this.editLoadingType = 'hide'
            if (res.status === 1) {
                this.programmeData = {
                    id: this.programmeId,
                    site_id: this.siteId,
                    title: res.data['title'],
                    content: res.data['content'],
                    vote: res.data['vote']
                }
            }
        })
    }
}