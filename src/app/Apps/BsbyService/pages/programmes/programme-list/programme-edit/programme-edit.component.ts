import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef
} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'
import { UEditorComponent } from 'ngx-ueditor'

import { ProgrammeEditData, ProgrammeFc, PostData } from './programme-edit.data'
import { BsbyService } from '../../../../bsbyService.service'
import { GrProgrammeService } from '../../../../services/grManagement/grProgramme.service'
import { ProgrammesService } from '../programme.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

@Component({
    selector: 'app-bsby-service-all-programme-edit',
    templateUrl: './programme-edit.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../../Public/theme/apps-common/table.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
        '../../programmes.component.scss',
        './programme-edit.component.scss'
    ]
})
export class ProgrammeEditComponent implements OnInit, OnDestroy {
    @ViewChild('contentUed') contentUed: UEditorComponent;

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
    //编辑loading
    public editLoadingType: string
    //编辑器配置
    public ueditorConf:any

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public builder: FormBuilder,
        public bsbyService: BsbyService,
        public grProgrammeService: GrProgrammeService,
        public programmesService:ProgrammesService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioNotificationsService: RiccioNotificationsService
    ) {
        this.initData()
        this.editLoadingType = 'show'
    }

    ngOnInit() {
        this.programmesService.setPTitle('编辑方案')
        this.routeObj = this.route.params.subscribe(v => {
            v.programmeid ? this.programmeId = v.programmeid : {}
            v.siteid ? this.siteId = v.siteid : {}
            if(!this.programmeId || !this.siteId){
                this.editLoadingType = 'hide'
            }else{
                this.resolveForm()
                this.getProgrammeInfo()
            }
        })
    }

    ngOnDestroy() {
        this.routeObj ? this.routeObj.unsubscribe() : {}
    }

    /**
     * 编辑器初始化后监听其focus
     * @author GR-05
     */
    uedReady(){
        this.contentUed.addListener('focus', () => {
            this.fnChangeContentTouch()
        })
    }

    /**
     * 手动设置touch
     * @author GR-05
     */
    public fnChangeContentTouch(){
        this.ctrlProgramme.content.markAsTouched()
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
            ])
        }
    }

    /**
     * 处理表单
     *  @author GR-05
     */
    resolveForm() {
        this.programmeForm = this.builder.group({
            title: this.ctrlProgramme.title,
            content: this.ctrlProgramme.content
        })
    }


    /**
     * 提交方案表单
     * @author GR-05
     */
    public fnOpProgramme() {
        if (this.programmeForm.valid) {
            this.riccioLoadingService.setLoading({
                message: '修改中'
            })
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