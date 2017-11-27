import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter,
    Renderer2
} from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Subscription } from 'rxjs/Subscription'
import { animations } from '@gr-public/Animations/index'

import { SceneService } from './scene.service'
import { SceneData, PostData, SceneOb, PostSearchData } from './scene.data'
import { DatePickerConfig } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.data'
import { GrProductService } from '../../services/grManagement/grProduct.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioPopDatePickerService } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.service'
import { GrDateToolService } from '../../../../ApiServices/grDateTool/dateTool.service'
import { GrUserService } from '../../services/grManagement/grUser.service'
import { GrSceneService } from '../../services/grManagement/grScene.service'

@Component({
    selector: 'bsby-scene',
    templateUrl: './scene.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../bsbyService.common.scss',
        '../../../../Public/theme/apps-common/table.scss',
        './scene.component.scss'
    ],
    animations: [animations.rightIn]
})
export class SceneComponent implements OnInit, OnDestroy {
    @ViewChild('startTimeFEl') startTimeFEl: ElementRef;
    @ViewChild('startTimeSEl') startTimeSEl: ElementRef;
    @ViewChild('endTimeFEl') endTimeFEl: ElementRef;
    @ViewChild('endTimeSEl') endTimeSEl: ElementRef;

    @Output() emitScene: EventEmitter<{
        type: string;
        data?: PostData;
    }>
    @Output() emitSearch: EventEmitter<PostSearchData>

    //点击事件
    public clickHandler: any
    //配置
    public sceneConf: SceneOb

    //监听调用场景服务
    public sceneObj: Subscription
    //日期组件监听
    public datePObj: Subscription
    //是否显示
    public isShow: boolean
    //产品列表loading
    public productLoadingType: string
    //状态选项
    public status: any[]
    // 产品列表
    public products: any[]
    //筛选过后提交的数据
    public postData: PostData
    //需要及时搜索的数据
    public postSearchData: PostSearchData
    //数据显示
    public sceneShow: {
        executor: {
            active: boolean,
            name: string
        };
        service: {
            active: boolean,
            name: string
        };
    }
    //选择负责人组件数据
    public selectExcData: {
        data: any;
        isShow: boolean;
        nextPage: string;
        page: number;
        header: string;
        title: string;
        roleId?: number;
    }
    //选择客服组件数据
    public selectServiceData: {
        data: any;
        isShow: boolean;
        nextPage: string;
        page: number;
        header: string;
        title: string;
        roleId?: number;
    }
    //是否显示输入场景名
    public showSname: boolean
    //添加（编辑）按钮标示
    public btnFlag: {
        status: boolean;
        name: string;
        mainName: string;
    }

    constructor(
        private renderer: Renderer2,
        private ele: ElementRef,
        private sceneService: SceneService,
        private grProductService: GrProductService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioPopDatePickerService: RiccioPopDatePickerService,
        private grDateToolService: GrDateToolService,
        private grUserService: GrUserService,
        private grSceneService: GrSceneService
    ) {
        this.emitScene = new EventEmitter<{
            type: 'add'
        }>()
        this.emitSearch = new EventEmitter<PostSearchData>()
        this.init()
        this.resolveExcData()
        this.resolveServiceData()
        this.resolveClick(true)
    }

    ngOnInit() {
        this.sceneObj = this.sceneService.sceneObs.subscribe(res => {
            this.sceneConf = res
            this.isShow = true
            this.initAfterConf()
        })
        this.datePObj = this.riccioPopDatePickerService.emitObs.subscribe(res => {
            this.resolveDate(res)
        })
    }

    ngOnDestroy() {
        this.sceneObj ? this.sceneObj.unsubscribe() : {}
        this.datePObj ? this.datePObj.unsubscribe() : {}
    }

    /**
     * 处理点击事件
     * @param flag 关闭或打开监听
     */
    public resolveClick(flag: boolean) {
        if (flag) {
            this.clickHandler = this.renderer.listen(document, 'click', (e) => {
                //此组件之外点击
                if (this.sceneConf && this.sceneConf.expectClick) {
                    if (!this.sceneConf.expectClick.nativeElement.contains(e.target)) {
                        if (!this.ele.nativeElement.contains(e.target)) {
                            this.close()
                        }
                    }
                } else {
                    if (!this.ele.nativeElement.contains(e.target)) {
                        this.close()
                    }
                }
            })
        } else {
            if (this.clickHandler) {
                this.clickHandler()
            }
        }
    }

    /**
     * 暂时关闭点击监听(或者用于打开监听)
     * @author GR-05
     */
    public temporarilyClick() {
        this.resolveClick(false)
        setTimeout(() => {
            this.resolveClick(true)
        }, 200)
    }

    /**
     * 初始化
     * @author GR-05
     */
    init() {
        this.status = new SceneData().status
        this.postData = new PostData()
        this.postSearchData = new PostSearchData()
        this.products = [
            { name: '全部', value: 0, active: true }
        ]
        this.productLoadingType = 'show'
        this.showSname = false
        this.sceneShow = {
            executor: {
                active: false,
                name: '未选择负责人'
            },
            service: {
                active: false,
                name: '未选择客服'
            }
        }
    }

    /**
     * 处理提交按钮
     * @param active:状态
     * @author GR-05
     */
    public resolveBtnFlag(active: boolean) {
        if (this.sceneConf.type == 'add') {
            if (active) {
                this.btnFlag = {
                    status: true,
                    name: '添加',
                    mainName: '添加新场景'
                }
            } else {
                this.btnFlag = {
                    status: false,
                    name: '添加中...',
                    mainName: '添加新场景'
                }
            }
        } else if (this.sceneConf.type == 'edit') {
            if (active) {
                this.btnFlag = {
                    status: true,
                    name: '更新',
                    mainName: '更新场景'
                }
            } else {
                this.btnFlag = {
                    status: false,
                    name: '更新中...',
                    mainName: '更新场景'
                }
            }
        }
    }

    /**
     * 获取对应配置后初始化
     * @author GR-05
     */
    initAfterConf() {
        this.postData = new PostData()
        this.postSearchData = new PostSearchData()
        this.sceneConf.showExc == undefined ? this.sceneConf.showExc = true : {}
        this.postData.action = this.sceneConf.action
        this.postSearchData.action = this.sceneConf.action
        if (this.sceneConf.type == 'add') {
            //添加场景
            this.btnFlag = {
                status: true,
                name: '添加',
                mainName: '添加新场景'
            }
            this.getProductList()
        } else if (this.sceneConf.type == 'edit') {
            //修改场景
            this.postData = Object.assign(this.postData, JSON.parse(JSON.stringify(this.sceneConf.sceneData)))
            this.postSearchData = Object.assign(this.postSearchData, JSON.parse(JSON.stringify(this.sceneConf.sceneData)))
            this.postSearchData.name = ''
            this.btnFlag = {
                status: true,
                name: '更新',
                mainName: '更新场景'
            }
            this.resolveEdit()
        }
        this.resolveSceneShow()
    }

    /**
     * 处理编辑模式下的数据映射
     * @author GR-05
     */
    public resolveEdit() {
        //状态
        if (this.postData.status) {
            this.status.forEach(statu => {
                if (statu['value'] == this.postData.status) {
                    statu['active'] = true
                } else {
                    statu['active'] = false
                }
            })
        } else {
            this.status[0]['active'] = true
        }

        //产品
        this.getProductList(() => {
            if (this.postData.product_id) {
                this.products[0]['active'] = false
                this.products.forEach(product => {
                    if (product['value'] == this.postData.product_id) {
                        product['active'] = true
                    }
                })
            } else {
                this.products[0]['active'] = true
            }
        })

        //执行人员
        if (this.postData.executor_userid) {
            this.sceneShow.executor = {
                active: true,
                name: this.postData.executor_name
            }
        }
        //客服人员
        if (this.postData.service_userid) {
            this.sceneShow.service = {
                active: true,
                name: this.postData.service_name
            }
        }
    }

    /**
     * 设置显示
     * @author GR-05
     */
    public resolveSceneShow() {
        if (!this.sceneConf.showExc) {
            this.sceneShow.executor = {
                active: true,
                name: this.sceneConf.excName
            }
        }
    }

    /**
     * 处理选择执行人员数据
     * @author GR-05
     */
    public resolveExcData() {
        this.selectExcData = {
            data: null,
            isShow: false,
            nextPage: 'loading',
            page: 1,
            header: '选择执行负责人',
            title: '执行负责人'
        }
    }

    /**
     * 处理选择客服数据
     * @author GR-05
     */
    public resolveServiceData() {
        this.selectServiceData = {
            data: null,
            isShow: false,
            nextPage: 'loading',
            page: 1,
            header: '选择客服人员',
            title: '客服人员'
        }
    }

    /**
     * 关闭
     * @author GR-05
     */
    public close() {
        this.init()
        this.resolveExcData()
        this.resolveServiceData()
        this.isShow = false
    }

    /**
     * 取消输入场景名
     * @author GR-05
     */
    public fnCancleSname() {
        this.temporarilyClick()
        this.showSname = false
    }

    /**
     * 显示输入场景名
     * @author GR-05
     */
    public fnShowSname() {
        this.temporarilyClick()
        this.showSname = true
    }

    /**
     * 获取产品列表
     * @param cb:回调
     * @author GR-05
     */
    public getProductList(cb?: () => void) {
        this.productLoadingType = 'show'
        this.grProductService.getProductList({}).subscribe(res => {
            this.productLoadingType = 'hide'
            if (res.status === 1) {
                this.products = [
                    { name: '全部', value: 0, active: true }
                ]
                res.data.data.forEach(product => {
                    this.products.push({
                        name: product.name,
                        value: product.id,
                        active: false
                    })
                })
                cb ? cb() : {}
            }
        })
    }

    /**
     * 选中选项
     * @param type 类型
     * @param data 数据 
     * @author GR-05
     */
    public fnSelectOption(type: string, data: any) {
        if (type == 'statu') {
            //状态
            this.status.map(statu => statu['active'] = false)
            data['active'] = true
            this.postData.status = data['value']
            this.postSearchData.status = data['value']
            this.emitSearch.emit(this.postSearchData)
        } else if (type == 'product') {
            //产品
            this.products.map(product => product['active'] = false)
            data['active'] = true
            this.postData.product_id = data['value']
            this.postSearchData.product_id = data['value']
            this.emitSearch.emit(this.postSearchData)
        }
    }

    /**
     * 显示日期选择组件
     * @param type 
     * @author GR-05
     */
    public fnShowDate(type: string) {
        let position
        let el: ElementRef
        let date: Date
        switch (type) {
            case 'start_f':
                position = this.startTimeFEl.nativeElement.getBoundingClientRect()
                el = this.startTimeFEl
                date = this.postData.starttime[0] ? new Date(this.postData.starttime[0]) : new Date()
                break
            case 'start_s':
                position = this.startTimeSEl.nativeElement.getBoundingClientRect()
                el = this.startTimeSEl
                date = this.postData.starttime[1] ? new Date(this.postData.starttime[1]) : new Date()
                break
            case 'end_f':
                position = this.endTimeFEl.nativeElement.getBoundingClientRect()
                el = this.endTimeFEl
                date = this.postData.endtime[0] ? new Date(this.postData.endtime[0]) : new Date()
                break
            case 'end_s':
                position = this.endTimeSEl.nativeElement.getBoundingClientRect()
                el = this.endTimeSEl
                date = this.postData.endtime[1] ? new Date(this.postData.endtime[1]) : new Date()
                break
        }
        let dateConfig: DatePickerConfig = {
            style: {
                left: position.left,
                top: position.top + position.height,
                width: 400
            },
            type: type,
            expectClick: el,
            date: date
        }
        this.resolveClick(false)
        this.riccioPopDatePickerService.setDp(dateConfig)
    }

    /**
     * 处理日期选择
     * @param res 
     * @author GR-05
     */
    public resolveDate(res: any) {
        switch (res.type) {
            case 'start_f':
                if(!(res.date == '')){
                    this.postData.starttime[0] = this.postSearchData.starttime[0] = this.grDateToolService.resolveDate(res.date.toLocaleDateString())
                }else{
                    this.postData.starttime[0] = this.postSearchData.starttime[0] = null
                }
                this.resolveDateCommon()
                break
            case 'start_s':
                if(!(res.date == '')){
                    this.postData.starttime[1] = this.postSearchData.starttime[1] = this.grDateToolService.resolveDate(res.date.toLocaleDateString())
                }else{
                    this.postData.starttime[1] = this.postSearchData.starttime[1] = null
                }
                this.resolveDateCommon()
                break
            case 'end_f':
                if(!(res.date == '')){
                    this.postData.endtime[0] = this.postSearchData.endtime[0] = this.grDateToolService.resolveDate(res.date.toLocaleDateString())
                }else{
                    this.postData.endtime[0] = this.postSearchData.endtime[0] = null
                }
                this.resolveDateCommon()
                break
            case 'end_s':
                if(!(res.date == '')){
                    this.postData.endtime[1] = this.postSearchData.endtime[1] = this.grDateToolService.resolveDate(res.date.toLocaleDateString())
                }else{
                    this.postData.endtime[1] = this.postSearchData.endtime[1] = null
                }
                this.resolveDateCommon()
                break
            case 'close':
                //关闭日期组件
                this.resolveClick(true)
                return
        }
    }

    /**
     * 日期组件监听后的共同动作
     * @author GR-05
     */
    public resolveDateCommon() {
        this.temporarilyClick()
        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 获取执行负责人列表
     * @author GR-05
     */
    public getExcList(name: string = '') {
        this.selectExcData.nextPage = 'loading'
        this.selectExcData.data = []
        this.grUserService.getExcUser({
            name: name,
            type: this.sceneConf.action
        }).subscribe(res => {
            if (res.status == 1) {
                this.selectExcData.data = res.data
                if (res.data.length === 0) {
                    this.selectExcData.nextPage = 'empty'
                } else {
                    this.selectExcData.nextPage = 'hide'
                }
            }
        })
    }

    /**
     * 获取客服人员列表
     * @param name 
     * @author GR-05
     */
    public getServiceList(name: string = '') {
        this.selectServiceData.nextPage = 'loading'
        this.selectServiceData.data = []
        this.grUserService.getServiceUser({
            name: name
        }).subscribe(res => {
            if (res.status === 1) {
                this.selectServiceData.data = res.data
                if (res.data.length === 0) {
                    this.selectServiceData.nextPage = 'empty'
                } else {
                    this.selectServiceData.nextPage = 'hide'
                }
            }
        })
    }

    /**
     * 显示选择执行负责人
     * @author GR-05
     */
    public fnShowExc() {
        this.resolveClick(false)
        this.selectExcData.isShow = true
        this.getExcList()
    }

    /**
     * 初始化选择执行负责人数据
     * @author GR-05 
     */
    public fnSelectExcClose() {
        this.temporarilyClick()
        this.resolveExcData()
    }

    /**
     * 选择执行负责人搜索事件
     * @param name 
     * @author GR-05 
     */
    public fnSearchExc(name: string) {
        this.getExcList(name)
    }

    /**
     * 清空执行负责人（目前单选）
     * @author GR-05 
     */
    public fnDelExc() {
        this.temporarilyClick()
        this.postData.executor_userid = null
        this.postData.executor_name = ''
        this.postSearchData.executor_userid = null
        this.sceneShow.executor = {
            active: false,
            name: '未选择执行负责人'
        }
        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 监听选择执行负责人组件emit
     * @param data 
     * @author GR-05 
     */
    public fnAddExc(data: any) {
        this.postData.executor_userid = this.postSearchData.executor_userid = data['user_id']
        this.postData.executor_name = data['real_name']
        this.sceneShow.executor = {
            active: true,
            name: data['real_name']
        }
        this.resolveExcData()

        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 显示选择客服
     * @author GR-05
     */
    public fnShowService() {
        this.resolveClick(false)
        this.selectServiceData.isShow = true
        this.getServiceList()
    }

    /**
     * 初始化选择客服人员数据
     * @author GR-05 
     */
    public fnSelectServiceClose() {
        this.temporarilyClick()
        this.resolveServiceData()
    }

    /**
     * 监听选择客服人员组件搜索
     * @param name 
     * @author GR-05 
     */
    public fnSearchService(name: string) {
        this.getServiceList(name)
    }

    /**
     * 清空客服人员（目前单选）
     * @author GR-05 
     */
    public fnDelService() {
        this.temporarilyClick()
        this.postData.service_userid = null
        this.postData.service_name = ''
        this.postSearchData.service_userid = null
        this.sceneShow.service = {
            active: false,
            name: '未选择执行负责人'
        }
        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 监听选择客服人员组件emit
     * @param data 
     * @author GR-05 
     */
    public fnAddService(data: any) {
        this.postData.service_userid = this.postSearchData.service_userid = data['user_id']
        this.postData.service_name = data['real_name']
        this.sceneShow.service = {
            active: true,
            name: data['real_name']
        }
        this.resolveServiceData()
        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 添加场景，向父组件弹射数据
     * @author GR-05
     */
    public fnEmitData() {
        if (this.postData.name == '') {
            this.riccioNotificationsService.setSubject({
                text: '请输入场景名称',
                status: 'danger'
            })
        } else {
            this.resolveBtnFlag(false)
            if (this.sceneConf.type == 'add') {
                this.grSceneService.postSceneAdd(this.postData).subscribe(res => {
                    if (res.status == 1) {
                        this.riccioNotificationsService.setSubject({
                            text: '添加成功',
                            status: 'success'
                        })
                        this.resolveBtnFlag(true)
                        //添加成功通知父组件
                        this.emitScene.emit({
                            type: 'add'
                        })
                    } else {
                        this.resolveBtnFlag(true)
                    }
                })
            } else if (this.sceneConf.type == 'edit') {
                this.grSceneService.postSceneEdit(this.postData).subscribe(res => {
                    if (res.status == 1) {
                        this.riccioNotificationsService.setSubject({
                            text: '更新成功',
                            status: 'success'
                        })
                        this.resolveBtnFlag(true)
                        //添加成功通知父组件
                        this.emitScene.emit({
                            type: 'edit',
                            data: JSON.parse(JSON.stringify(this.postData))
                        })
                    } else {
                        this.resolveBtnFlag(true)
                    }
                })
            }
        }
    }

    /**
     * 监听搜索公司名或域名组件
     * @param value 
     * @author GR-05
     */
    public fnSearchCname() {
        this.emitSearch.emit(this.postSearchData)
    }

    /**
     * 清除全部条件
     * @author GR-05
     */
    public fnSceneClear() {
        this.init()
        this.fnSelectOption('statu', this.status[0])
        if (this.sceneConf.type == 'edit') {
            this.postData.name = this.sceneConf.sceneData.name
            this.postData.id = this.sceneConf.sceneData.id
        }
        if (this.sceneConf.showExc == false) {
            //固定执行负责人
            this.sceneShow.executor = {
                active: true,
                name: this.sceneConf.excName
            }
        }
        this.getProductList()
        this.emitSearch.emit(this.postSearchData)
    }
}