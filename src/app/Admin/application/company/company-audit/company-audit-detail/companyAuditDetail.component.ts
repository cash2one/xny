import { 
    Component,
    Input,
    OnInit,
    OnDestroy,
    EventEmitter,
    Output,
    HostListener,
    ElementRef,
    AfterViewInit,
    ViewContainerRef
} from '@angular/core'

import { RiccioPboxService } from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService } from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioBrowseService } from '../../../../../Public/riccio-browse/riccio-browse.service'

import { CompanyAuditDetailService } from './company-audit-detail.service'
import { animations } from '../../../../../Public/Animations/index'
import { Conf,ShowDetail } from './company-audit-detail.data'

import { GrCompanyService } from '../../../../services/grCompany/grCompany.service'

@Component({
    selector:'company-audit-detail',
    templateUrl:'./companyAuditDetail.componnet.html',
    styleUrls:[
        './companyAuditDetail.component.scss'
    ],
    animations:[
        animations.rightIn
    ]
})
export class CompanyAuditDetailComponent implements OnInit,OnDestroy{
    public isShow:boolean;
    //配置数据
    public confData:Conf;
    //显示数据
    public detailData:any
    //展示字段及判断字段
    public showDetailData:any
    public rightBool:boolean = false
    //模态框
    public modalShow:boolean
    //驳回信息
    public rejectVal:string

    //一些订阅
    public pboxObj:any
    public pboxEmit:any
    public modalObj:any
    public browObj:any

    @Output() onEmit = new EventEmitter<{
        flag:number,
        main:any
    }>();

    constructor(
        public companyAuditDetailService:CompanyAuditDetailService,
        public eleRef:ElementRef,
        public grCompanyService:GrCompanyService,
        public riccioPboxService:RiccioPboxService,
        public riccioLoadingService:RiccioLoadingService,
        public riccioNotificationsService:RiccioNotificationsService,
        public riccioModalService:RiccioModalService,
        public riccioBrowseService:RiccioBrowseService
    ){
        this.confData = new Conf()
        this.showDetailData = new ShowDetail().showDetailData
        this.companyAuditDetailService.GetDetailConfOb().subscribe((config)=>{
            this.confData = Object.assign(this.confData,config)
            this.detailData = this.confData.detail
            this.isShow=true
        })
    }

    ngOnInit(){
        this.pboxEmit = this.riccioPboxService.getEmit().subscribe(v=>{
            //通过
            if(v.type == 'pass'){
                this.passAudit()
            }
        })
        //订阅取消
        this.pboxObj = this.riccioPboxService.getSubject().subscribe(v=>{
            if(Object.keys(v).length === 1 && v.type == 'pass'){
                this.rightBool = true
            }
        })
        //订阅modal打开关闭事件
        this.modalObj = this.riccioModalService.getSubject().subscribe(v=>{
            if(Object.keys(v).length === 0){
                this.rightBool = true
            }
        })

        //订阅图片查看组件关闭事件
        this.browObj = this.riccioBrowseService.getEmit().subscribe(v=>{
            if(v.type == 'close'){
                this.rightBool = true
            }
        })
    }

    ngOnDestroy(){
        this.pboxEmit.unsubscribe()
        this.pboxObj.unsubscribe()
        this.modalObj.unsubscribe()
        this.browObj.unsubscribe()
    }

    @HostListener('document:click', ['$event'])
    ClickListen(e){
        if(this.rightBool === true){
            this.isShow = true
            this.rightBool = false
        }
        //此组件之外点击
        else if(this.confData.expectClick){
            if(!this.confData.expectClick.element.nativeElement.contains(e.target)){
                if(!this.eleRef.nativeElement.contains(e.target)){
                    this.isShow=false
                }
            }
        }else{
            if(!this.eleRef.nativeElement.contains(e.target)){
                this.isShow=false
            }
        }
    }

    /**
     * 点击通过验证弹窗
     */
    public fnPass(e:MouseEvent,el:any){
        if(this.detailData.status == 2){
            return
        }else{
            this.riccioPboxService.setSubject({
                genre: 'delete',
                el: el,
                position: {
                    left: e.clientX,
                    top: e.clientY,
                    width: 250
                },
                type:'pass',
                data: {
                    title: '确定通过认证？',
                    button: '通过'
                }
            })
        }
    }

    /**
     * 通过认证
     */
    public passAudit(){
        this.riccioLoadingService.setLoading({
            message:'通过认证中'
        })
        let data= {
            company_id:this.detailData.company_id,
            status:2
        }
        this.grCompanyService.postComAuditing(data).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.isShow =  false
                this.riccioNotificationsService.setSubject({
                    type:'success',
                    text:'认证成功'
                })
                this.companyAuditDetailService.setFeedback()
            }
        })
    }

    /**
     * 驳回弹框
     */
    public fnReject(){
        if(this.detailData.status == 2){
            return
        }else{
            let modalData: any = {
                header: '驳回认证',
                size: 500,
                noBtn: true
            }
            this.riccioModalService.setSubject(modalData)
        }
    }

    /**
     * 驳回认证
     */
    public rejectAudit(){
        if(this.rejectVal == '' && this.rejectVal == null){
            return
        }else{
            this.riccioLoadingService.setLoading({
                message:'驳回认证中'
            })
            let data={
                company_id:this.detailData.company_id,
                status:3,
                content:this.rejectVal
            }
            this.grCompanyService.postComAuditing(data).subscribe(res=>{
                this.riccioLoadingService.closeLoading()
                if(res.status === 1){
                    this.isShow = false
                    this.riccioModalService.setSubject({})
                    this.riccioNotificationsService.setSubject({
                        type:'success',
                        text:'驳回成功'
                    })
                    this.companyAuditDetailService.setFeedback()
                }
            })
        }
    }

    /**
     * 显示更多操作
     */
    public fnMore(e:MouseEvent,el:any){
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                left: e.clientX,
                top: e.clientY + 10,
                width: 100
            },
            type:'more',
            data: [{name:'编辑'}]
        })
    }

    /**
     * 显示大图
     * @param src 图片资源
     */
    public fnShowImg(src:string){
        this.riccioBrowseService.setSubject({
            src:src
        })
    }
}