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

import { ProductListData } from './product-list.data'
import { PageData } from '../../../bsbyService.data'
import { ProductsService } from '../products.service'
import { GrProductService } from '../../../services/grManagement/grProduct.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '@gr-public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'

@Component({
    selector: 'app-bsby-service-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: [
        '../../../../../Public/theme/apps-common/common.scss',
        '../../../../../Public/theme/apps-common/table.scss',
        '../../../../BsbyService/bsbyService.common.scss',
        './product-list.component.scss'
    ]
})
export class ProductListComponent implements OnInit, OnDestroy {

    //popup监听
    public popupObj: Subscription
    //pbox监听
    public pboxObj:Subscription
    //表头数据
    public productListTitles: string[]
    //loading
    public loadingType: string
    //产品列表
    public productList: any[]
    //活动状态中的产品数据
    public activeProduct: any
    //是否全选
    public isAllCheck: boolean

    //分页
    public pageData:PageData
    //搜索参数
    public searchParam:{
        name:string
    }

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        public productsService: ProductsService,
        public grProductService: GrProductService,
        public riccioNotificationsService: RiccioNotificationsService,
        public riccioPopUpRightService: RiccioPopUpRightService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioPboxService: RiccioPboxService
    ) {
        this.productListTitles = new ProductListData().productListTitles
        this.isAllCheck = false
        this.pageData = new PageData()
        this.searchParam = {
            name:''
        }
    }

    ngOnInit() {
        this.getProductList()
        this.popupObj = this.riccioPopUpRightService.getEmit().subscribe(res => {
            this.resolvePopup(res)
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(res=>{
            this.resolvePbox(res)
        })
    }

    ngOnDestroy() {
        this.popupObj ? this.popupObj.unsubscribe() : {}
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
    }

    /**
     * 显示操作产品组件
     *  @author GR-05
     */
    public fnAddProduct() {
        this.productsService.setPOp({
            type: 'add'
        })
    }

    /**
     * 处理popup监听
     * @param res
     * @author GR-05 
     */
    public resolvePopup(res: any) {
        if (res.type === 0) {
            //清空
            this.resetCheck()
        } else {
            let ids = []
            res.data.forEach(v => {
                ids.push(v['id'])
            })
            switch (res.type.id) {
                case 1:
                    //启用
                    this.changeProductStatu(ids, 1)
                    break
                case 2:
                    //禁用
                    this.changeProductStatu(ids, 2)
                    break
            }
        }
    }

    /**
     * 处理pbox
     * @param res 
     * @author GR-05 
     */
    public resolvePbox(res:any){
        switch(res.type){
            case 'productListDel':
                //删除
                this.delProduct(res.data)
                break
        }
    }

    /**
     * 切换产品状态
     * @param ids 产品id数组
     * @param status 状态
     * @author GR-05 
     */
    public changeProductStatu(ids: number[], status: number) {
        this.riccioLoadingService.setLoading({
            message: '切换状态中'
        })
        this.grProductService.postProductStatus({
            ids: ids,
            status: status
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '操作成功',
                    status: 'success'
                })
                this.getProductList()
                this.resetCheck()
                this.riccioPopUpRightService.setSubject({})
            }
        })
    }

    /**
     * 重置全选单选
     * @author GR-05 
     * 
     */
    public resetCheck() {
        this.isAllCheck = false
        this.productList.map(product => product['isCheck'] = false)
    }

    /**
     * 显示更新产品组件
     * @author GR-05
     */
    public fnShowEdit(product: any) {
        this.activeProduct = product
        this.productsService.setPOp({
            type: 'edit',
            data: this.activeProduct
        })
    }

    /**
     * 显示删除产品
     * @param product 产品数据
     * @param el 点击元素
     * @param e 点击事件
     * @author GR-05 
     */
    public fnShowDel(product: any, el: any, e: MouseEvent) {
        this.riccioPboxService.setSubject({
            genre: 'delete',
            position: {
                left: e.clientX - 100,
                top: e.clientY,
                width: 200
            },
            type: 'productListDel',
            data: {
                title: '确定删除此产品？',
                button: '删除',
                delID: product.id
            }
        })
    }

    /**
     * 删除产品
     * @param id 产品id
     * @author GR-05 
     */
    public delProduct(id:number){
        this.riccioLoadingService.setLoading({
            message:'删除产品中'
        })
        this.grProductService.postProductDel({
            id:id
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.riccioNotificationsService.setSubject({
                    text:'删除成功',
                    status:'success'
                })
                this.getProductList()
            }
        })
    }

    /**
     * 获取产品列表
     * @author GR-05
     */
    public getProductList() {
        this.loadingType = 'show'
        this.grProductService.getProductList({
            page:this.pageData.page,
            rows:this.pageData.rows,
            ...this.searchParam
        }).subscribe(res => {
            this.loadingType = 'hide'
            if (res.status === 1) {
                this.productList = res.data.data
                this.pageData.total = res.data.total
                res.data.total == 0 ? this.loadingType = 'empty':{}
                this.resolveProductList()
            }
        })
    }

    /**
     * 处理一下数据
     * @author GR-05
     */
    public resolveProductList() {
        this.productList.map(product => {
            product['isCheck'] = false
            product['role'] = product['role'].replace(/,/g,'\n')
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
        this.getProductList()
    }

    /**
     * 监听操作产品组件数据
     * @param data 
     * @author GR-05
     */
    public fnProductOpEmit(data: any) {
        if (data.type === 'add') {
            //添加
            let postData = {
                ...data.data
            }
            this.grProductService.postProductAdd(postData).subscribe(res => {
                this.productsService.close()
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({
                        text: '添加成功',
                        status: 'success'
                    })
                    this.getProductList()
                }
            })
        } else if (data.type === 'edit') {
            //更新
            let postData = {
                id: this.activeProduct.id,
                ...data.data
            }
            this.grProductService.postProductEdit(postData).subscribe(res => {
                this.productsService.close()
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({
                        text: '更新成功',
                        status: 'success'
                    })
                    this.getProductList()
                }
            })
        }
    }

    /**
     * 显示顶部多选组件
     * @param product 产品数据
     * @param flag 多选单选标示
     * @author GR-05
     */
    public fnShowPopUp(flag: string = "one", product: any = null): void {
        let obj = {
            'data': [...this.productList],
            'viewText': [
                { id: 1, name: '启用' },
                { id: 2, name: '禁用' }
            ]
        }
        if (flag === 'one') {
            product.isCheck = !product.isCheck;
            this.isAllCheck = this.productList.filter(e => e['isCheck'] == false).length == 0 ? true : false

        } else if (flag === 'all') {
            this.isAllCheck = !this.isAllCheck;
            this.productList.map(e => e['isCheck'] = this.isAllCheck)
        }

        this.riccioPopUpRightService.setSubject(obj)
    }
}