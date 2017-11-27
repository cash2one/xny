import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  OnDestroy
} from '@angular/core'

import { animations } from '../../../../Public/Animations/index'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'

import { GrCompanyService } from '../../../services/grCompany/grCompany.service'
import { AdminService } from '../../../Admin.service'
import { CompanyOp } from './companyOpData'
import { CompanyOpService } from './company-op.service'

@Component({
  selector: 'app-company-op',
  templateUrl: './company-op.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    '../../../pages/page.common.scss',
    './company-op.component.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class CompanyOpComponent implements OnInit, OnDestroy {
  @ViewChild('showInd', { read: ElementRef }) showInd: ElementRef;
  @ViewChild('showScale', { read: ElementRef }) showScale: ElementRef;
  @ViewChild('showProvince', { read: ElementRef }) showProvince: ElementRef;
  @ViewChild('showCity', { read: ElementRef }) showCity: ElementRef;
  @ViewChild('showArea', { read: ElementRef }) showArea: ElementRef;

  public pboxObj: any
  public comOpObs: any

  //标示添加还是编辑
  public opType: string
  public isShowCharge: boolean
  //添加企业数据
  public addComData: any
  //添加企业按钮状态
  public addComBtn: {
    show: string,
    valid: boolean
  }
  public type:string;
  constructor(
    public riccioPboxService: RiccioPboxService,
    public riccioLoadingService: RiccioLoadingService,
    public riccioNotificationsService: RiccioNotificationsService,
    public riccioModalService: RiccioModalService,
    public grCompanyService: GrCompanyService,
    public adminService: AdminService,
    public companyOpService: CompanyOpService
  ) {
    this.addComData = new CompanyOp().addComData
    this.addComBtn = {
      show: '保存',
      valid: false
    }
  }

  ngOnInit() {
    //监听多选
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
      this.resolveOp(v)
    })
    this.comOpObs = this.companyOpService.copObs.subscribe(v => {
      this.type = v.type;
      if (v.type === 'add') {
        this.opType = 'add'
        let modalData: any = {
          header: '添加企业',
          size: 550,
          noBtn: true
        }
        this.addComData = new CompanyOp().addComData
        this.riccioModalService.setSubject(modalData)
      } else if (v.type === 'edit') {
        this.opType = 'edit'
        let modalData: any = {
          header: '编辑企业',
          size: 550,
          noBtn: true
        }
        this.resolveEdit(v.data)
        this.riccioModalService.setSubject(modalData)
      }else if(v.type === 'changeStatus'){
        this.opType = 'changeStatus'
        let modalData: any = {
          header: `确认${v.word}企业？`,
          btn: {
            name : v.word,
            status: 'danger'
          },
          type : 'selectStatus'
        }
        this.riccioModalService.setSubject(modalData)
      }
    })
  }

  ngOnDestroy() {
    this.pboxObj.unsubscribe()
    this.comOpObs.unsubscribe()
  }

  /**
   * 点击显示选择企业负责人
   */
  public fnShowComCharge(flag: boolean) {
    this.isShowCharge = flag
  }

  /**
   * 处理用户添加的动作
   * @param type pbox传回数据（包含修改的信息以及类型）
   * @author GR-05
   */
  public resolveOp(v: any) {
    if (v.type === 'comManaInd') {
      //添加企业 - 行业
      this.addComData.comInd.value = v.data.id
      this.addComData.comInd.show = v.data.name
    } else if (v.type === 'comManaScale') {
      //添加企业 - 规模
      this.addComData.comScale.value = v.data.id
      this.addComData.comScale.show = v.data.name
    } else if (v.type === 'comManaProvince') {
      //添加企业 - 省份
      if (v.data.id !== this.addComData.comLocation.value.province.value) {
        //清空城市和地区
        this.addComData.comLocation.value.city.value = null
        this.addComData.comLocation.value.city.show = null

        this.addComData.comLocation.value.area.value = null
        this.addComData.comLocation.value.area.show = null
      }
      this.addComData.comLocation.value.province.value = v.data.id
      this.addComData.comLocation.value.province.show = v.data.name
    } else if (v.type === 'comManaCity') {
      //添加企业 - 城市
      if (v.data.id !== this.addComData.comLocation.value.city.value) {
        //清空地区
        this.addComData.comLocation.value.area.value = null
        this.addComData.comLocation.value.area.show = null
      }
      this.addComData.comLocation.value.city.value = v.data.id
      this.addComData.comLocation.value.city.show = v.data.name
    } else if (v.type === 'comManaArea') {
      //添加企业 - 地区
      this.addComData.comLocation.value.area.value = v.data.id
      this.addComData.comLocation.value.area.show = v.data.name
    }
  }

  /**
   * 捕获企业负责人选择结果
   * @param user 负责人信息
   */
  public fnComUserChange(user: any) {
    if (user) {
      this.addComData.comUser.value = user.id
      if (user.id && !user.name) {
        this.addComData.comUser.show = '未知姓名'
      } else {
        this.addComData.comUser.show = user.name
      }
      this.fnUserChange()
    }
  }

  /**
   * 修改企业赋值
   * @param comData 企业信息
   */
  public resolveEdit(comData: any) {
    this.addComData.comId.value = comData.id
    this.addComData.comName.value = comData.name
    this.addComData.comUser.value = comData.user_id
    this.addComData.comUser.show = comData.real_name
    this.addComData.comInd.value = comData.industry
    this.addComData.comInd.show = comData.industry_name
    this.addComData.comScale.value = comData.scale
    this.addComData.comScale.show = comData.scale_name
    this.addComData.comLocation.value.province.value = comData.location_data.province.id
    this.addComData.comLocation.value.province.show = comData.location_data.province.name
    this.addComData.comLocation.value.city.value = comData.location_data.city.id
    this.addComData.comLocation.value.city.show = comData.location_data.city.name
    this.addComData.comLocation.value.area.value = comData.location_data.area.id
    this.addComData.comLocation.value.area.show = comData.location_data.area.name

    this.addComData.comName.valid = true
    this.addComData.comUser.valid = true
    this.addComBtn = {
      show: '更新',
      valid: true
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
    let position = this.adminService.getElPosition(ele)
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
   * 添加企业数据更改事件
   */
  public fnComDataChange(): boolean {
    let comName = this.addComData.comName.value
    let comUser = this.addComData.comUser.value
    let result = false
    if (comName != null && comName.length > 0 && comUser != null) {
      this.addComBtn = {
        show: '保存',
        valid: true
      }
      this.addComData.comName.valid = true
      this.addComData.comUser.valid = true
      result = true
    } else {
      this.addComBtn = {
        show: '保存',
        valid: false
      }
      comName == null || comName == '' ? this.addComData.comName.valid = false : this.addComData.comName.valid = true
      comUser == null ? this.addComData.comUser.valid = false : this.addComData.comUser.valid = true
      result = false
    }
    return result
  }

  /**
   * 用户名更改事件
   */
  public fnNameChange(){
    let comName = this.addComData.comName.value
    if (comName != null && comName.length > 0 ) {
      if(this.addComData.comName.valid && this.addComData.comUser.valid){
        this.addComBtn = {
          show: '保存',
          valid: true
        }
      }
      this.addComData.comName.valid = true
    } else {
      this.addComBtn = {
        show: '保存',
        valid: false
      }
      comName == null || comName == '' ? this.addComData.comName.valid = false : this.addComData.comName.valid = true
    }
  }

  /**
   * 负责人更改事件
   */
  public fnUserChange(){
    let comUser = this.addComData.comUser.value
    if (comUser != null) {
      if(this.addComData.comUser.valid && this.addComData.comUser.valid){
        this.addComBtn = {
          show: '保存',
          valid: true
        }
      }
      this.addComData.comUser.valid = true
    } else {
      this.addComBtn = {
        show: '保存',
        valid: false
      }
      comUser == null ? this.addComData.comUser.valid = false : this.addComData.comUser.valid = true
    }
  }

  /**
   * 显示所有企业行业
   */
  public showComInd(el: any) {
    this.riccioLoadingService.setLoading({
      message: '拉取所有行业信息中'
    })
    this.grCompanyService.getIndustryList().subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        this.showPbox(
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
   * @param el
   */
  public showComScale(el: any) {
    this.riccioLoadingService.setLoading({
      message: '拉取所有行业规模中'
    })
    this.grCompanyService.getCompanyScaleList().subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        this.showPbox(
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
   * @param el
   */
  public showComProvince(el: any) {
    this.riccioLoadingService.setLoading({
      message: '拉取省份中'
    })
    this.grCompanyService.getCompanyAreaList(0).subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        res.data.forEach((v, i, arr) => {
          arr[i]['name'] = arr[i]['areaname']
        })
        this.showPbox(
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
   * @param el
   */
  public showComCity(el: any) {
    let parentid = this.addComData.comLocation.value.province.value
    if (parentid == null) {
      this.riccioNotificationsService.setSubject({
        status: 'danger',
        text: '必须先选择省份'
      })
    } else {
      this.riccioLoadingService.setLoading({
        message: '获取对应城市中'
      })
      this.grCompanyService.getCompanyAreaList(parentid).subscribe(res => {
        this.riccioLoadingService.closeLoading()
        if (res.status === 1) {
          res.data.forEach((v, i, arr) => {
            arr[i]['name'] = arr[i]['areaname']
          })
          this.showPbox(
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
    let parentid = this.addComData.comLocation.value.city.value
    if (parentid == null) {
      this.riccioNotificationsService.setSubject({
        status: 'danger',
        text: '必须先选择城市'
      })
    } else {
      this.riccioLoadingService.setLoading({
        message: '获取对应地区中'
      })
      this.grCompanyService.getCompanyAreaList(parentid).subscribe(res => {
        this.riccioLoadingService.closeLoading()
        if (res.status === 1) {
          res.data.forEach((v, i, arr) => {
            arr[i]['name'] = arr[i]['areaname']
          })
          this.showPbox(
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
   * 操作企业主体
   */
  public fnOpCompany() {
    if (this.opType === 'add') {
      // 添加
      if (this.fnComDataChange()) {
        let data = this.beforeOp()
        this.grCompanyService.postCompanyAdd(data).subscribe(res => {
          this.afterOp(res)
        })
      }
    }else if(this.opType === 'edit'){
      if(this.fnComDataChange()){
        let data = this.beforeOp()
        this.grCompanyService.postCompanyEdit(data).subscribe(res=>{
          this.afterOp(res)
        })
      }
    }
  }

  /**
   * 请求之前的数据处理
   * @author GR-05
   * @return 处理后的数据，用于请求体
   */
  public beforeOp(): any {
    this.addComBtn = {
      valid: false,
      show: this.opType === 'add' ? '添加中...' : '更新中...'
    }
    let data = {
      id:this.addComData.comId.value,
      name: this.addComData.comName.value,
      user_id: this.addComData.comUser.value,
      industry: this.addComData.comInd.value,
      scale: this.addComData.comScale.value,
      location: {
        province: this.addComData.comLocation.value.province.value,
        city: this.addComData.comLocation.value.city.value,
        area: this.addComData.comLocation.value.area.value,
      }
    }
    return data
  }

  /**
   * 请求后的数据处理
   * @author GR-05
   * @param res 响应体
   */
  public afterOp(res:any) {
    this.addComBtn = {
      valid: true,
      show: '保存'
    }
    if (res.status === 1) {
      this.riccioNotificationsService.setSubject({
        status: 'success',
        text: this.opType ==='add'?'添加成功':'更新成功'
      })
      this.companyOpService.setEmit(true)
      this.riccioModalService.setSubject({})
    } else {
      this.riccioNotificationsService.setSubject({
        status: 'danger',
        text: res.message
      })
    }
  }

}
