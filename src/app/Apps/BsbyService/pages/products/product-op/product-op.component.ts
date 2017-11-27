import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ViewContainerRef,
    ElementRef,
    Output,
    EventEmitter
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'

import { ProductOpFc,PostData } from './product-op.data'
import { ProductsService } from '../products.service'

@Component({
    selector: 'app-bsby-service-product-op',
    templateUrl: './product-op.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './product-op.component.scss'
    ]
})
export class ProductOpComponent implements OnInit,OnDestroy {

    @Output() productFormEmit:EventEmitter<any> = new EventEmitter<any>()

    //服务监听
    public pObj:Subscription
    //modal监听
    public modalObj:Subscription
    //监听服务组件关闭
    public closeObj:Subscription

    //表单控件
    public ctrlProduct:ProductOpFc
    //产品添加表单
    public productForm:FormGroup
    //组件配置
    public productOpConfig:{
        type:string,
        data?:any
    }
    //产品数据
    public productData:PostData
    //按钮状态
    public submitBtn : {
        text:string;
        status:boolean;
    }

    constructor(
        public builder:FormBuilder,
        public productsService:ProductsService,
        public riccioModalService:RiccioModalService
    ) {
        this.init()
        this.initSubmitBtn()
    }

    ngOnInit() {
        this.resolveForm()
        this.pObj = this.productsService.pOpObs.subscribe(res => {
            this.resolvePObj(res)
        })
        this.closeObj = this.productsService.closeObs.subscribe(res=>{
            this.reset()
        })
        this.modalObj = this.riccioModalService.getEmit().subscribe(res=>{
            if(res.type == 'close'){
                this.reset()
            }
        })
    }

    ngOnDestroy(){
        this.pObj?this.pObj.unsubscribe():{}
        this.closeObj?this.closeObj.unsubscribe():{}
        this.modalObj?this.modalObj.unsubscribe():{}
    }

    init(){
        this.productData = new PostData()
        this.resolveCtrl()
    }

    initSubmitBtn(){
        this.submitBtn = {
            text:'添加',
            status:true
        }
    }
    /**
     * 处理表单控件
     * @author GR-05
     */
    resolveCtrl(){
        this.ctrlProduct = {
            name: new FormControl('', [
                Validators.required
            ]),
            core_num:new FormControl(''),
            long_num:new FormControl(''),
            brand_num:new FormControl(''),
            role:new FormControl('')
        }
    }

    /**
     * 处理表单
     * @author GR-05
     */
    resolveForm(){
        this.productForm = this.builder.group({
            name:this.ctrlProduct.name,
            core_num:this.ctrlProduct.core_num,
            long_num:this.ctrlProduct.long_num,
            brand_num:this.ctrlProduct.brand_num,
            role:this.ctrlProduct.role
        })
    }

    /**
     * 处理监听结果
     * @param res 
     * @author GR-05
     */
    resolvePObj(res:any){
        this.productOpConfig = res
        let modalData: any
        if (res.type === 'add') {
            modalData = {
                header: '添加产品',
                size: 600,
                noBtn: true
            }
            this.submitBtn.text = '添加'
        }else if(res.type === 'edit'){
            modalData = {
                header: '更新产品',
                size: 600,
                noBtn: true
            }
            this.productData = {
                name:res.data['name'],
                core_num:res.data['core_num'],
                long_num:res.data['long_num'],
                brand_num:res.data['brand_num'],
                role:res.data['role']
            }
            this.submitBtn.text = '更新'
        }
        this.riccioModalService.setSubject(modalData)
    }

    /**
     * 回传表单
     * @author GR-05
     */
    public fnEmitProductForm(){
        if(this.productForm.valid){
            this.submitBtn = {
                text:this.productOpConfig.type=='add'?'添加中...':'更新中...',
                status:false
            }
            this.productData.role = this.productData.role.replace(/\n|\r\n/g,',')
            this.productFormEmit.emit({
                type:this.productOpConfig.type,
                data:this.productData
            })
        }
    }

    /**
     * 重置组件
     * @author GR-05
     */
    public reset(){
        this.initSubmitBtn()
        this.productForm.reset(new PostData())
        this.riccioModalService.setSubject({})
    }
}