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
    ViewContainerRef,
    Renderer
} from '@angular/core'

import { ConsumeShowDetailService } from './consume-show-detail.service'
import { animations } from '../../../../Public/Animations/index'
import { ConsumeShowDetailConf } from './consume-show-detail.data'

import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'

@Component({
    selector:'consume-show-detail',
    templateUrl:'./consume-show-detail.componnet.html',
    styleUrls:[
        './consume-show-detail.component.scss'
    ],
    animations:[
        animations.rightIn
    ]
})
export class ConsumeShowDetailComponent implements OnInit,OnDestroy{
    public isShow:boolean
    public detailData:ConsumeShowDetailConf

    //点击事件
    public clickHandler:any

    //订阅对象
    public modalObs:any
    public pboxObs:any


    constructor(
        public showDetailService:ConsumeShowDetailService,
        public eleRef:ElementRef,
        public renderer:Renderer,
        public riccioModalService:RiccioModalService,
        public riccioPboxService:RiccioPboxService
    ){
        this.detailData = new ConsumeShowDetailConf()
        this.showDetailService.GetDetailConfOb().subscribe((config)=>{
            this.detailData = Object.assign(this.detailData,config)
            this.isShow=true
        })
        this.resolveClick(true)
    }

    ngOnInit(){
        this.modalObs = this.riccioModalService.getSubject().subscribe(v=>{
            if(Object.keys(v).length === 0){
                setTimeout(()=>{
                    this.resolveClick(true)
                },400) 
            }
        })
        this.pboxObs = this.riccioPboxService.getEmit().subscribe(v=>{
            if(v.type === 'close'){
                setTimeout(()=>{
                    this.resolveClick(true)
                },400) 
            }
        })
    }

    ngOnDestroy(){
        this.modalObs.unsubscribe()
        this.pboxObs.unsubscribe()
    }

    /**
     * 处理点击事件
     * @param flag 关闭或打开监听
     */
    public resolveClick(flag:boolean){
        if(flag){
            this.clickHandler = this.renderer.listen(document,'click',(e)=>{
                //此组件之外点击
                if(this.detailData.expectClick){
                    if(!this.detailData.expectClick.element.nativeElement.contains(e.target)){
                        if(!this.eleRef.nativeElement.contains(e.target)){
                            this.isShow=false
                        }
                    }
                }else{
                    if(!this.eleRef.nativeElement.contains(e.target)){
                        this.isShow=false
                    }
                }
            })
        }else{
            if(this.clickHandler){
                this.clickHandler()
            }
        }
    }
}