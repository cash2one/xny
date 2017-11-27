import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { animations } from '@gr-public/Animations/index'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { CustomerOpFc, PostData, CustomerOpTypes, ICustomerConf, CuListTitles } from './customer-op.data'
import { CustomerOpService } from './customer-op.service'
import { BsbyService } from '../../bsbyService.service'
import { GrCompanyInfoService } from '@gr-api-service/grCompanyInfo/grCompanyInfo.service'
import { GrCustomerService } from '../../services/grManagement/grCustomer.service'

enum AddTypes {
    SELECTFROM,
    ADDNEW
}
let animation = {
    heightScroll: trigger('heightScroll', [
        state('in', style({ transform: 'translateY(0px)' })),
        transition('void => *', [
            animate(300, keyframes([
                style({ opacity: 0.2, transform: 'translateY(-50px)'}),
                style({ opacity: 0.6, transform: 'translateY(-20px)'}),
                style({ opacity: 1, transform: 'translateY(-5px)'})
            ]))
        ])
    ])
}
@Component({
    selector: 'bsby-customer-op',
    templateUrl: './customer-op.component.html',
    styleUrls: [
        '../../../../Public/theme/apps-common/common.scss',
        '../../../../Public/theme/apps-common/table.scss',
        '../../bsbyService.common.scss',
        './customer-op.component.scss'
    ],
    animations: [
        animations.flyIn,
        animation.heightScroll
    ]
})
export class CustomerOpComponent implements OnInit, OnDestroy {

    //显示企业行业控件
    @ViewChild('showInd') showInd: ElementRef;
    //显示企业规模控件
    @ViewChild('showScale') showScale: ElementRef;
    //显示企业省份控件
    @ViewChild('showProvince') showProvince: ElementRef;
    //显示企业城市控件
    @ViewChild('showCity') showCity: ElementRef;
    //显示企业地区控件
    @ViewChild('showArea') showArea: ElementRef;

    public pboxObj: any

    // 操作类型
    public opType: CustomerOpTypes
    //表单控件集合
    public ctrlKeys: CustomerOpFc
    //服务订阅
    public customerOpObs: any
    //表单
    public customerOpForm: FormGroup
    //添加或编辑的数据模型
    public customerOpData: PostData
    //企业下拉 处理数据
    public companyShow: {
        industry: string;
        scale: string;
        location: {
            province: string,
            city: string,
            area: string
        }
    }
    //提交按钮状态
    public submitBtn: {
        text: string;
        status: boolean
    }

    headerTitle: string
    isShow: boolean

    //添加客户类型
    addTypes: AddTypes = AddTypes.SELECTFROM

    //选择已有企业时的搜索参数
    searchParam: {
        page: number,
        rows: number,
        name: string
    }
    loadingType: string
    //表头
    customerListTitle: any[]
    //已有客户列表
    customerList: any[]
    //选中的客户
    activeCustomer: any
    //已有企业总数
    comsTotal:number

    constructor(
        public builder: FormBuilder,
        public customerOpService: CustomerOpService,
        public riccioLoadingService: RiccioLoadingService,
        public riccioPboxService: RiccioPboxService,
        public riccioNotificationsService: RiccioNotificationsService,
        public bsbyService: BsbyService,
        public grCompanyInfoService: GrCompanyInfoService,
        public grCustomerService: GrCustomerService
    ) {
        this.resolveCtrlKeys()
        this.customerOpData = new PostData()
        this.resolveCompanyShow()
        this.resolveSubmitBtn()
        this.headerTitle = '添加客户'
        this.isShow = false
        this.searchParam = {
            page: 1,
            rows: 20,
            name: ''
        }
        this.loadingType = 'show'
        this.customerListTitle = new CuListTitles().data
        this.comsTotal = 0
    }

    ngOnInit() {
        this.resolveForm()
        this.getAllCustomerList()
        this.customerOpObs = this.customerOpService.cOpObs.subscribe(v => {
            this.resolveCustomerObs(v)
        })
        this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
            this.resolveComOp(v)
        })
    }

    ngOnDestroy() {
        this.pboxObj ? this.pboxObj.unsubscribe() : {}
    }

    /**
     * 处理监听
     * @param v 监听到的配置数据
     * @author GR-05 
     */
    resolveCustomerObs(v: ICustomerConf) {
        this.opType = v.type
        let modalData: any
        if (v.type === CustomerOpTypes.ADD) {
            this.headerTitle = '添加客户'
            this.getAllCustomerList()
        } else if (v.type === CustomerOpTypes.EDIT && v.data) {
            this.headerTitle = '编辑客户'
            this.resolveEditData(v.data)
        }
        this.isShow = true
    }

    /**
     * 处理编辑数据
     * @param data 编辑的客户数据
     */
    resolveEditData(data: any) {
        let user = data.user_info
        let company = data.company_info
        this.customerOpData = {
            cid: company.id,
            mobile: user.mobile,
            name: user.name,
            real_name: user.real_name,
            email: user.email ? user.email : '',
            qq: user.qq ? user.qq : '',
            sex: user.sex,
            password: '',
            company_name: company.name,
            industry: company.industry_data.id,
            scale: company.scale_data.id,
            location: {
                province: company.location_data && company.location_data.province ? company.location_data.province.id : null,
                city: company.location_data && company.location_data.city ? company.location_data.city.id : null,
                area: company.location_data && company.location_data.area ? company.location_data.area.id : null,
            }
        }
        this.companyShow = {
            industry: company.industry_data.name,
            scale: company.scale_data.name,
            location: {
                province: company.location_data && company.location_data.province ? company.location_data.province.name : null,
                city: company.location_data && company.location_data.city ? company.location_data.city.name : null,
                area: company.location_data && company.location_data.area ? company.location_data.area.name : null,
            }
        }
    }

    /**
     * 网络操作动作
     * @author GR-05
     */
    fnOpCustomer() {
        //通过验证
        if (this.customerOpForm.valid) {
            this.submitBtn = {
                text: this.opType == CustomerOpTypes.ADD ? '添加中...' : '更新中...',
                status: false
            }

            if (this.opType === CustomerOpTypes.ADD) {
                this.grCustomerService.postCustomerAdd(this.customerOpData).subscribe(res => {
                    this.resolveSubmitBtn()
                    if (res.status === 1) {
                        this.opCustomerSuccess()
                    }
                })
            } else if (this.opType === CustomerOpTypes.EDIT) {
                this.grCustomerService.postCustomerEdit(this.customerOpData).subscribe(res => {
                    this.resolveSubmitBtn()
                    if (res.status === 1) {
                        this.opCustomerSuccess()
                    }
                })
            }
        }
    }

    /**
     * 操作成功后的动作
     * @author GR-05
     */
    opCustomerSuccess() {
        this.riccioNotificationsService.setSubject({
            text: this.opType == CustomerOpTypes.ADD ? '添加成功' : '更新成功',
            status: 'success'
        })
        this.customerOpService.setEmit(true)
        //一系列初始化
        this.close()
    }

    /**
     * 处理初始化公司下拉项显示
     * @author GR-05
     */
    resolveCompanyShow() {
        this.companyShow = {
            industry: '',
            scale: '',
            location: {
                province: '',
                city: '',
                area: ''
            }
        }
    }

    /**
     * 处理初始化提交按钮
     */
    resolveSubmitBtn() {
        this.submitBtn = {
            text: '提交',
            status: true
        }
    }

    /**
     * 处理控件及其验证
     * @author GR-05
     */
    resolveCtrlKeys() {
        let checkMobile = this.checkMobile.bind(this)
        let checkEmail = this.checkEmail.bind(this)
        let checkQQ = this.checkQQ.bind(this)
        let checkPassword = this.checkPassword.bind(this)
        this.ctrlKeys = {
            mobile: new FormControl('', [
                Validators.required,
                Validators.minLength(11),
                Validators.maxLength(11),
                checkMobile
            ]),
            name: new FormControl('', [
                Validators.required,
                Validators.minLength(1)
            ]),
            password: new FormControl('', [
                checkPassword
            ]),
            real_name: new FormControl('', [
                Validators.required,
                Validators.minLength(2)
            ]),
            sex: new FormControl(''),
            qq: new FormControl('', [
                checkQQ
            ]),
            email: new FormControl('', [
                checkEmail
            ]),
            company_name: new FormControl('', [
                Validators.required
            ])
        }
    }

    /**
     * 初始化表单
     * @author GR-05
     */
    resolveForm() {
        this.customerOpForm = this.builder.group({
            mobile: this.ctrlKeys.mobile,
            name: this.ctrlKeys['name'],
            password: this.ctrlKeys.password,
            real_name: this.ctrlKeys.real_name,
            sex: this.ctrlKeys.sex,
            qq: this.ctrlKeys.qq,
            email: this.ctrlKeys.email,
            company_name: this.ctrlKeys.company_name
        })
    }

    /**
     * 验证密码（添加模式和编辑模式）
     * @param password 
     */
    checkPassword(password: FormControl) {
        if (this.opType === CustomerOpTypes.ADD) {
            if (this.bsbyService.removeEmpty(password.value).length < 6) {
                return { emailError: true }
            } else {
                return null
            }
        } else if (this.opType === CustomerOpTypes.EDIT) {
            if (this.bsbyService.removeEmpty(password.value).length == 0) {
                return null
            } else if (this.bsbyService.removeEmpty(password.value).length < 6
                && this.bsbyService.removeEmpty(password.value).length > 0) {
                return { emailError: true }
            }
        }
    }

    /**
     * 验证手机
     * @param mobile 手机控件
     * @author GR-05
     */
    checkMobile(mobile: FormControl) {
        let mobileResult = this.bsbyService.validMobile(mobile.value)
        return mobileResult ? null : { mobileError: true };
    }

    /**
     * 验证邮箱（没输入时不用验证）
     * @param email 邮箱控件
     * @author GR-05
     */
    checkEmail(email: FormControl) {
        let emailResult = this.bsbyService.validEmail(email.value)
        if (this.bsbyService.removeEmpty(email.value).length == 0) {
            return null
        } else {
            return emailResult ? null : { emailError: true }
        }
    }

    /**
     * 验证qq （没输入不用验证）
     * @param qq qq控件
     * @author GR-05
     */
    checkQQ(qq: FormControl) {
        if (this.bsbyService.removeEmpty(qq.value).length == 0) {
            return null
        } else {
            let result = true
            if (qq.value.indexOf('0') === 0 || qq.value.length < 5) {
                result = false
            }
            return result ? null : { qqError: true }
        }
    }

    /**
     * 显示pbox
     * @param ele 显示位置参考物
     * @param el 点击冒泡参考物
     * @param data pbox 数据
     * @param type pbox 类型
     * @author GR-05
     */
    public showPbox(ele: ElementRef, el: any, data: Array<any>, type: string) {
        let position = ele.nativeElement.getBoundingClientRect()
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: position.top,
                left: position.left,
                width: ele.nativeElement.offsetWidth
            },
            type: type,
            data: data
        })
    }

    /**
     * 显示所有企业行业
     * @param el 点击元素
     * @author GR-05
     */
    public showComInd(el: any) {
        this.riccioLoadingService.setLoading({
            message: '拉取所有行业信息中'
        })
        this.grCompanyInfoService.getIndustryList().subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.bsbyService.showPbox(
                    this.showInd,
                    el,
                    res.data,
                    'comManaInd'
                )
            }
        })
    }

    /**
     * 显示所有行业规模
     * @param el 点击元素
     * @author GR-05
     */
    public showComScale(el: any) {
        this.riccioLoadingService.setLoading({
            message: '拉取所有行业规模中'
        })
        this.grCompanyInfoService.getCompanyScaleList().subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.bsbyService.showPbox(
                    this.showScale,
                    el,
                    res.data,
                    'comManaScale'
                )
            }
        })
    }

    /**
     * 获取所有省份
     * @param el 点击元素
     * @author GR-05
     */
    public showComProvince(el: any) {
        this.riccioLoadingService.setLoading({
            message: '拉取省份中'
        })
        this.grCompanyInfoService.getCompanyAreaList(0).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                res.data.forEach((v, i, arr) => {
                    arr[i]['name'] = arr[i]['areaname']
                })
                this.bsbyService.showPbox(
                    this.showProvince,
                    el,
                    res.data,
                    'comManaProvince'
                )
            }
        })
    }

    /**
     * 获取省份对应城市
     * @param el  点击元素
     * @author GR-05 
     */
    public showComCity(el: any) {
        let parentid = this.customerOpData.location.province
        if (parentid == null) {
            this.riccioNotificationsService.setSubject({
                status: 'danger',
                text: '必须先选择省份'
            })
        } else {
            this.riccioLoadingService.setLoading({
                message: '获取对应城市中'
            })
            this.grCompanyInfoService.getCompanyAreaList(parentid).subscribe(res => {
                this.riccioLoadingService.closeLoading()
                if (res.status === 1) {
                    res.data.forEach((v, i, arr) => {
                        arr[i]['name'] = arr[i]['areaname']
                    })
                    this.bsbyService.showPbox(
                        this.showCity,
                        el,
                        res.data,
                        'comManaCity'
                    )
                }
            })
        }
    }

    /**
     * 获取省份对应城市
     * @param el 
     */
    public showComArea(el: any) {
        let parentid = this.customerOpData.location.city
        if (parentid == null) {
            this.riccioNotificationsService.setSubject({
                status: 'danger',
                text: '必须先选择城市'
            })
        } else {
            this.riccioLoadingService.setLoading({
                message: '获取对应地区中'
            })
            this.grCompanyInfoService.getCompanyAreaList(parentid).subscribe(res => {
                this.riccioLoadingService.closeLoading()
                if (res.status === 1) {
                    res.data.forEach((v, i, arr) => {
                        arr[i]['name'] = arr[i]['areaname']
                    })
                    this.bsbyService.showPbox(
                        this.showArea,
                        el,
                        res.data,
                        'comManaArea'
                    )
                }
            })
        }
    }

    /**
     * 监听并处理企业数据的选择
     * @param v pbox回传
     */
    public resolveComOp(v: any) {
        switch (v.type) {
            case 'comManaInd':
                //企业行业
                this.companyShow.industry = v.data.name
                this.customerOpData.industry = v.data.id
                break
            case 'comManaScale':
                //企业规模
                this.companyShow.scale = v.data.name
                this.customerOpData.scale = v.data.id
                break
            case 'comManaProvince':
                //企业省份
                this.companyShow.location.province = v.data.name
                this.customerOpData.location.province = v.data.id
                break
            case 'comManaCity':
                //企业城市
                this.companyShow.location.city = v.data.name
                this.customerOpData.location.city = v.data.id
                break
            case 'comManaArea':
                // 企业地区
                this.companyShow.location.area = v.data.name
                this.customerOpData.location.area = v.data.id
                break
        }
    }

    close() {
        //添加企业数据 
        this.customerOpForm.reset(new PostData())
        this.resolveCompanyShow()
        this.isShow = false
        //选择企业数据
        this.customerList = []
        this.activeCustomer = null
        this.comsTotal = 0
        if (this.opType == CustomerOpTypes.EDIT) {
            this.customerOpService.close()
        }
    }

    /**
     * 添加模式
     * @param flag 
     * @author GR-05 
     */
    addType(flag: number) {
        switch (flag) {
            case 0:
                this.addTypes = AddTypes.SELECTFROM
                break
            case 1:
                this.addTypes = AddTypes.ADDNEW
                break
        }
    }

    /**
     * 获取已有企业列表
     * @author GR-05 
     */
    getAllCustomerList() {
        this.loadingType = 'show'
        this.grCustomerService.getCustomerAllList(this.searchParam).subscribe(res => {
            if (res.status === 1) {
                this.customerList = res.data.data
                this.comsTotal = res.data.total
                if (this.customerList.length > 0) {
                    this.loadingType = 'hide'
                } else {
                    this.loadingType = 'empty'
                }
            } else {
                this.loadingType = 'hide'
            }
        })
    }

    /**
     * 选择已有企业
     * @param com 
     * @author GR-05  
     */
    fnSelectCom(com:any){
        this.activeCustomer = com
    }

    /**
     * 添加企业（从已有选择）
     * @author GR-05  
     */
    fnAddExCom(){
        if(this.activeCustomer){
            this.submitBtn = {
                text: '添加中...',
                status: false
            }
            this.grCustomerService.postCustomerAdd({
                type:'in',
                cid:this.activeCustomer.id
            }).subscribe(res => {
                this.resolveSubmitBtn()
                if (res.status === 1) {
                    this.opCustomerSuccess()
                }
            })
        }
    }
}