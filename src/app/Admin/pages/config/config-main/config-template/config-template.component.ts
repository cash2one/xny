import {
  Component,
  ViewChild,
  ViewContainerRef,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

import { configTemplateData, AddOrEditList, TestListData } from './configTemplateData'
import { RiccioModalService } from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioMoadlData } from '../../../../../Public/riccio-modal/riccio-modalData'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'

import { GrConfigService } from '../../../../services'
import { ConfigMainService } from '../config-main.service'
import { PersonalService } from '../../../../../Public/Personal/personal.service'
import { ShowDetailService } from '../../../../show-detail/show-detail.service'
import { Conf } from '../../../../show-detail/show-detail.data'
import { AdminService } from '../../../../Admin.service'

import { animations } from '../../../../../Public/Animations/index'

@Component({
  selector: 'app-config-template',
  templateUrl: './config-template.component.html',
  styleUrls: [
    '../../../../Admin.component.scss',
    // './config-template.component.scss',
    '../../../page.common.scss',
    './config-template.component.new.scss'
  ],
  animations: [
    animations.flyTop,
    animations.rightIn
  ]
})
export class ConfigTemplateComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;

  public DriveList: Array<string>;
  public TemplateData: Array<any>;
  public FlyLeftData: any;
  public AllCheck: boolean;
  public ShowConfirm: any;
  public ShowEditConf: Conf
  public ModalShow: string
  
  public isLoading:boolean
  //标示是添加还是修改（同用一个模版）
  public modalShowIsAddOrEdit: any
  //存储模版详情用于显示
  public ShowTplList: Array<any>
  public AddOrEditList: AddOrEditList

  public addEditFormShow: boolean

  //测试模版展示数据
  public testListData: TestListData
  //测试模版发送数据
  public testSendData: TestListData
  //存放测试参数键值对
  public testParmData: any
  public testBtnName: string
  public pboxObj:any
  public modalObj:any

  //分页组件参数
  public pageParam:any
  //分页请求参数
  public pageRequestParam:any

  constructor(
    public grConfigService: GrConfigService,
    public personalService: PersonalService,
    public riccioModalService: RiccioModalService,
    public riccioNotificationsService: RiccioNotificationsService,
    public riccioPboxService: RiccioPboxService,
    public riccioLoadingService: RiccioLoadingService,
    public eleRef: ElementRef,
    public showDetailService: ShowDetailService,
    public configMainService:ConfigMainService,
    public adminService:AdminService
  ) {
    this.AllCheck = false;
    this.FlyLeftData = new configTemplateData().FlyLeftData
    this.DriveList = new configTemplateData().titleData;
    this.TemplateData = new configTemplateData().templateListData;
    this.ShowTplList = new configTemplateData().showDetailData
    this.AddOrEditList = new configTemplateData().addOrEditList
    this.modalShowIsAddOrEdit = new configTemplateData().addOrEditFlag
    this.testBtnName = "发送"
    this.ShowConfirm = {
      isShow: false,
      menu_id: '',
      position: {
        left: 0,
        top: 0
      }
    }
    this.pageParam = {
      pboxData:[20,50,100]
    }
    this.pageRequestParam = {
      rows:this.pageParam.pboxData[0],
      page:1
    } 
  }

  ngOnInit() {
    //删除列表项
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
      if(v.type === 'smsTplDel'){
        this.deleteListBatch(v.data.ids)
      }else if(v.type === 'smsTplDelOne'){
        this.delTpl(v.data)
      }
    })

    //监听模态关闭
    this.modalObj = this.riccioModalService.getEmit().subscribe(v => {
      if (v.type === 'close') {
        this.addEditFormShow = false
      }
    })

    this.FnGetMailList();
  }

  ngOnDestroy(){
    this.pboxObj.unsubscribe()
    this.modalObj.unsubscribe()
  }

  ngAfterViewInit() {
  }

  /**
   * 处理分页数据
   * @param e 组件传回数据
   */
  public fnPagination(e:any){
    this.pageRequestParam.page = e.page
    this.pageRequestParam.rows = e.rows
    this.FnGetMailList()
  }

  // 模版详情点击监听
  public detailClick(e) {
    // 编辑
    if (e.flag === 1) {
      this.FnDoEdit(null, e.main)
    } else if (e.flag === 2) {
      this.fnShowDel(e.event,e.main)
      // this.FnShowConfirm(e.event, e.main)
    }
  }

  //获取当前短信模板列表的方法
  public FnGetMailList(): void {
    this.isLoading = true
    this.grConfigService.getSmsTplList(this.pageRequestParam)
      .subscribe(res => {
        this.isLoading = false
        if (res.status === 1) {
          this.TemplateData = [...res.data.data];
          this.pageParam.total = res.data.total
          this.TemplateData.map((e) => {
            e['isCheck'] = false
            e['isRefresh'] = false
          })
        }
      })
  }

  //点击添加模版列表
  public FnShowAddTemplate(): void {
    this.AddOrEditList = new configTemplateData().addOrEditList
    this.addEditFormShow = true
    this.ModalShow = 'temp_add_edit'
    this.modalShowIsAddOrEdit.flag = 'add'
    let modalData: any = {
      header: '添加模版',
      size: 600,
      noBtn: true
    }
    this.riccioModalService.setSubject(modalData)
  }

  /**
   * 点击行的时候显示详情
   * @param list 单行数据
   */
  public fnShowDetail(list: any): void {
    this.ShowTplList.forEach((v, i, src) => {
      if (v['flag'] === "status") {
        src[i].value = (list[src[i].flag] == 1 ? '审核中' : list[src[i].flag] == 2 ? '已通过' : '未通过')
      } else {
        src[i].value = list[src[i].flag]
      }
    })
    let editConf: Conf = {
      title: list['name'],
      showList: this.ShowTplList,
      top: 54,
      expectClick: this.clickTb,
      activeList: list
    }
    this.showDetailService.SetDetailConfSbj(editConf)
  }

  /**
   * 展开模版测试及数据前置处理
   * @param e 点击事件
   * @param list 模版单行数据
   */
  public FnShowTest(e: MouseEvent, list: any): void {
    e ? e.stopPropagation() : {}
    //通过审核的才能发送测试
    if (list['status'].toString() !== '2') {
      this.riccioNotificationsService.setSubject({
        text: '审核通过才可测试',
        status: 'danger'
      })
    }
    else {
      this.testListData = {
        id: list['id'],
        name: list['name'],
        tpl_id: list['tpl_id'],
        mobile: null,
        data: this.configMainService.ResolveParmeToCtrl(list.parme),
        mobileValid: true
      }
      this.testParmData = {}
      let tempParms = this.configMainService.ResolveParmeToCtrl(list.parme)
      tempParms.forEach(v => {
        this.testParmData[v['name']] = null
      })
      this.ModalShow = 'temp_test'
      let modalData: any = {
        header: '发送测试',
        size: 600,
        noBtn: true
      }
      this.riccioModalService.setSubject(modalData)
    }
  }

  /**
   * 发送短信测试
   * @author GR-05
   * @check GR-03
   */
  public fnSendTest() {
    if (this.fnMobileBlur()) {
      this.testSendData = {
        id: this.testListData.id,
        tpl_id: this.testListData.tpl_id,
        mobile: this.testListData.mobile,
        data: this.testParmData
      }
      this.testBtnName = "测试中..."
      this.grConfigService.postSmsTplTest(this.testSendData).subscribe(res => {
        this.testBtnName = "发送"
        this.riccioModalService.setSubject({})
        this.riccioNotificationsService.setSubject({
          text: res.message,
          status: 'success'
        })
      })
    }else{
      this.riccioNotificationsService.setSubject({
        text: '手机格式不正确',
        status: 'danger'
      })
    }
  }

  /**
   * 验证手机号
   * @author GR-05
   */
  public fnMobileBlur(): boolean {
    if (this.testListData.mobile === null || this.testListData.mobile.toString().length !== 11) {
      this.testListData.mobileValid = false
    } else {
      this.testListData.mobileValid = this.adminService.validMobile(this.testListData.mobile.toString())
    }
    return this.testListData.mobileValid
  }

  /**
   * 更新全部短信模版状态  /待分页
   * @author GR-05
   * @check GR-03
   */
  public fnRefreshAllTplStatus() {
    this.TemplateData.forEach((list) => {
      this.FnRefreshTplStatus(null, list, true)
    })
  }

  /**
   * 更新短信模版状态
   * @param e 点击事件
   * @param list 模版单行数据
   * @param isAll 表示是否全部刷新
   * @author GR-05
   * @check GR-03
   */
  public FnRefreshTplStatus(e: MouseEvent, list: any, isAll: boolean) {
    e ? e.stopPropagation() : {}
    if (isAll) {
      //全部刷新，忽略已通过的
      if (list['status'].toString() !== '2') {
        list['isRefresh'] = true
        this.grConfigService.postSmsStatus({
          tpl_id: list['tpl_id']
        })
          .subscribe((res) => {
            list['status'] = res.data[list['tpl_id']]
            list['isRefresh'] = false
          })
      }
    } else {
      list['isRefresh'] = true
      this.grConfigService.postSmsStatus({
        tpl_id: list['tpl_id']
      })
        .subscribe((res) => {
          list['status'] = res.data[list['tpl_id']]
          list['isRefresh'] = false
        })
    }
  }

  /**
   * 点击全选时的事件
   * @param bool 是否全选标示
   * @author GR-03
   * @check GR-05
   */
  public fnCheckAll(bool: boolean): void {
    this.AllCheck = bool;
    this.FlyLeftData.ids = []
    this.TemplateData.map(e => e['isCheck'] = bool);
    this.FlyLeftData.isShow = this.SwitchCheck(this.TemplateData) === true ? true : false;
  }

  /**
   * 选中一行模版信息
   * @param list 模版信息数据
   * @param e 点击事件
   * @author GR-03
   * @check GR-05
   */
  public fnCheckUser(list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    list.isCheck = !list.isCheck;
    this.FlyLeftData.ids = []
    this.FlyLeftData.isShow = this.SwitchCheck(this.TemplateData) === true ? true : false;
    if (this.FlyLeftData.number === this.TemplateData.length) {
      this.AllCheck = true
    }
    else {
      this.AllCheck = false
    }
  }

  /**
   * 删除选中的列表项
   * @author GR-05
   * @check GR-03
   */
  public fnDeleteCheck(el: ElementRef) {
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: "0px",
        top: '10px',
        width: '200px'
      },
      type:'smsTplDel',
      data: {
        title: '确定删除所选项？',
        button: '删除',
        delID: this.FlyLeftData
      }
    })
  }

  //判断当前的列表是否有被选中的某一条，有则显示滑块
  public SwitchCheck(list: any): boolean {
    let bool = false;
    list.forEach(e => {
      if (e.isCheck === true) {
        this.FlyLeftData.ids.push(e['id'])
        this.FlyLeftData.number = list.filter(el => el['isCheck'] === true).length
        bool = true;
      }
    })
    return bool
  }

  /**
   * 展开短信模版编辑
   * @param e 行点击事件
   * @param list 模版单行数据
   * @author GR-05
   * @check GR-03
   */
  public FnDoEdit(e: MouseEvent, list: any) {
    e ? e.stopPropagation() : {}
    this.addEditFormShow = true
    this.ModalShow = 'temp_add_edit'
    this.modalShowIsAddOrEdit.flag = "edit"
    this.AddOrEditList = {
      id: list.id,
      name: list.name,
      signature: list.signature,
      parme: list.parme ? list.parme.split("<br>").join("\n") : null,
      content: list.content
    }
    let modalData: any = {
      header: '编辑模版',
      size: 600,
      noBtn: true
    }
    this.riccioModalService.setSubject(modalData)
  }

  /**
   * 保存或编辑短信模版
   * @author GR-05
   * @check GR-03
   */
  public FnTempAddOrEdit() {
    let keys = Object.keys(this.AddOrEditList)
    //提交的数据
    let data: any = {}
    keys.forEach((key) => {
      let value = this.AddOrEditList[key]
      if (value !== null) {
        if (key === 'id') {
          data[key] = value
        }
        else if (key !== 'parme') {
          data[key] = value.replace(/\s+/g, "")
        }
        else {
          data[key] = value.split("\n").join("<br>").replace(/\s+/g, "")
        }
      } else {
        data[key] = null
      }
    })

    //添加
    if (this.modalShowIsAddOrEdit.flag === "add") {
      this.modalShowIsAddOrEdit.btnName = "添加中..."
      this.grConfigService.postSmsTplAdd(data).subscribe(v => {
        this.addOrEditAfter(v)
      })
    } else {
      //编辑
      this.modalShowIsAddOrEdit.btnName = "更新中..."
      this.grConfigService.postSmsTplEdit(data).subscribe(v => {
        this.addOrEditAfter(v)
      })
    }
  }

  /**
   * 添加或编辑模版完成后的动作
   * @param res 响应
   */
  public addOrEditAfter(res:any){
    this.modalShowIsAddOrEdit.btnName = "保存"
    if (res.status === 1) {
      this.riccioNotificationsService.setSubject({
        text: res.message,
        status: 'success'
      })
      this.FnGetMailList()
    }
    this.addEditFormShow = false
    this.riccioModalService.setSubject({})
  }

  /**
   * 显示删除
   */
  public fnShowDel(e:MouseEvent,list:any){
    e?e.stopPropagation():{}
    this.riccioPboxService.setSubject({
        genre: 'delete',
        position: {
          left: e.clientX,
          top: e.clientY,
          width: 200
        },
        type:'smsTplDelOne',
        data: {
          title: '确定删除所选项？',
          button: '删除',
          delID: list.id
        }
      })
  }

  //显示是否删除的弹出窗口
  public FnShowConfirm(e: MouseEvent, list: any): void {
    e.stopPropagation()
    this.ShowConfirm.isShow = !this.ShowConfirm.isShow;
    this.ShowConfirm.menu_id = list.id
    this.ShowConfirm.position = {
      left: e.clientX - 660,
      top: e.layerY
    }
  }

  /**
   * 批量删除短信模版
   * @param ids 模版列表id数组
   * @author GR-05
   * @check GR-03
   */
  public deleteListBatch(ids: Array<any>) {
    let deleteBatch = []
    for (let item in ids) {
      deleteBatch.push(this.grConfigService.postSmsTplDel({ id: ids[item] }))
    }
    this.riccioLoadingService.setLoading({
      message: '批量删除模版中...'
    })
    Observable.forkJoin(deleteBatch).subscribe(res => {
      let result: boolean
      for (let item in res) {
        if (res[item]['status'] !== 1) {
          result = false
        } else {
          result = true
        }
      }
      this.riccioLoadingService.closeLoading()
      if (result) {
        this.riccioNotificationsService.setSubject({
          text: '批量删除成功',
          status: 'success'
        })
      } else {
        this.riccioNotificationsService.setSubject({
          text: '请求完成，但可能有些数据删除出错',
          status: 'danger'
        })
      }
      this.FlyLeftData.isShow = false
      this.FnGetMailList()
    })
  }

  /**
   * 删除模版
   * @param id 模版id 
   */
  public delTpl(id:number){
    this.riccioLoadingService.setLoading({
      message:'删除中'
    })
    this.grConfigService.postSmsTplDel({
      id:id
    }).subscribe(res=>{
      this.riccioLoadingService.closeLoading()
      if(res.status === 1){
        this.riccioNotificationsService.setSubject({
          status:'success',
          text:'删除成功'
        })
        this.FnGetMailList()
      }
    })
  }


  //删除规则的事件
  public FnDeleteMenu(): void {
    this.grConfigService.postSmsTplDel({ id: this.ShowConfirm.menu_id })
      .subscribe(res => {
        this.ShowConfirm.isShow = !this.ShowConfirm.isShow;
        if (res.status === 1) {
          this.personalService.showPromptSmall('删除成功', 'success', { 'right': '50%', 'top': '30%' })
        } else if (res.status === 0) {
          this.personalService.showPromptSmall('删除失败', 'danger', { 'right': '50%', 'top': '30%' })
        }
      }, error => {
      })
  }
}
