import { 
  Component, 
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { UEditorComponent } from 'ngx-ueditor'

import { MailTemplateData,AddOrEditList,TestListData } from './mailTemplateData'
import { ShowDetailService } from '../../../../show-detail/show-detail.service'
import { Conf } from '../../../../show-detail/show-detail.data'

import { GrConfigService } from '../../../../services'
import { ConfigMainService } from '../config-main.service'
import { AdminService } from '../../../../Admin.service'
import { PersonalService } from '../../../../../Public/Personal/personal.service'
import { RiccioModalService } from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'

import { animations } from '../../../../../Public/Animations/index'

@Component({
  selector: 'app-mail-template',
  templateUrl: './mail-template.component.html',
  styleUrls: [
    '../../../../Admin.component.scss',
    // './mail-template.component.scss',
    '../../../page.common.scss',
    './main-template.component.new.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class MailTemplateComponent implements OnInit,OnDestroy {
   @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;

  public driveList: Array<string>;
  public templateData: Array<any>;
  public FlyLeftData: any;
  public AllCheck: boolean;

  public isLoading:boolean
  //详情显示数据
  public showTplList:Array<any>
  //添加获编辑表单的重置标示
  public addEditFormShow:boolean
  //判断模态表单的类型
  public modalShow:string
  //标示是添加还是编辑
  public modalShowIsAddOrEdit:any
  //添加或编辑的数据
  public addOrEditList:AddOrEditList
  //ueditor配置
  public ueditorConf:any
  //是否实例化 ued
  public uedshow:boolean
  public uedTestShow:boolean
  public uedFocus:boolean
  //测试展示数据
  public testListData:TestListData
  //测试发送数据
  public testSendData:TestListData
  //测试按钮文字
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
    public showDetailService:ShowDetailService,
    private adminService:AdminService,
    public riccioModalService:RiccioModalService,
    public configMainService:ConfigMainService,
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioPboxService:RiccioPboxService,
    public riccioLoadingService:RiccioLoadingService
  ) {
    this.AllCheck = false
    this.FlyLeftData = new MailTemplateData().FlyLeftData
    this.driveList = new MailTemplateData().titleData
    this.templateData = new MailTemplateData().templateListData
    this.showTplList = new MailTemplateData().showDetailData
    this.modalShowIsAddOrEdit = new MailTemplateData().addOrEditFlag
    this.ueditorConf = this.adminService.uedConf()
    this.uedFocus = true
    this.pageParam = {
      pboxData:[20,50,100]
    }
    this.pageRequestParam = {
      rows:this.pageParam.pboxData[0],
      page:1
    } 
  }

  ngOnInit() {
    
    //监听删除
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v=>{
      if(v.type === 'mailTplOp' && v.data.ids){
        this.deleteListBatch(v.data.ids)
      }else if(v.type === 'mailTplDel'){
        this.delMailTemp(v.data)
      }
    })

    this.modalObj = this.riccioModalService.getEmit().subscribe(v=>{
      //监听modal 关闭
      if(v.type === 'close'){
          this.addEditFormShow = false
          this.closeAllUed()
      }
    })


    this.fnGetMailList();
  }

  ngOnDestroy(){
    this.pboxObj.unsubscribe()
    this.modalObj.unsubscribe()
    this.closeAllUed()
  }

  /**
   * 关闭所有ued
   */
  public closeAllUed(){
    this.uedTestShow = false
    this.uedshow = false
  }

  /**
   * 处理分页数据
   * @param e 组件传回数据
   */
  public fnPagination(e:any){
    this.pageRequestParam.page = e.page
    this.pageRequestParam.rows = e.rows
    this.fnGetMailList()
  }

  /**
   * 点击显示模版详情
   * @param list 单个模版数据
   */
  public fnShowDetail(list:any){
    this.showTplList.forEach((v,i,arr)=>{
      arr[i].value = list[arr[i].flag]
    })
    let editConf: Conf = {
      title: list['name'],
      showList: this.showTplList,
      top: 54,
      expectClick: this.clickTb,
      activeList: list
    }
    this.showDetailService.SetDetailConfSbj(editConf)
  }

  /**
   * 显示编辑
   * @param e 点击事件
   * @param list 要编辑的数据
   */
  public fnShowEdit(e: MouseEvent, list: any) {
    e ? e.stopPropagation() : {}
    this.addEditFormShow = true
    this.modalShow = 'mail_add_edit'
    this.modalShowIsAddOrEdit.flag = "edit"
    this.addOrEditList = {
      id: list.id,
      name: list.name,
      alias: list.alias,
      title: list.title,
      parme: list.parme ? list.parme.split("<br>").join("\n") : null,
      content: list.content
    }
    let modalData: any = {
      header: '编辑邮件模版',
      size: 650,
      noBtn: true
    }
    this.openUed()
    this.riccioModalService.setSubject(modalData)
  }

  /**
   * 发送短信测试
   * @author GR-05
   * @check GR-03
   */
  public fnSendTest() {
    if (this.fnEmailBlur()) {
      this.testSendData = {
        id: this.testListData.id,
        email:this.testListData.email,
        content:this.testListData.content
      }
      this.testBtnName = "测试中..."
      this.grConfigService.postMailTest(this.testSendData).subscribe(res => {
        this.testBtnName = "发送"
        this.riccioModalService.setSubject({})
        this.riccioNotificationsService.setSubject({
          text: res.message,
          status: 'success'
        })
      })
    }else{
      this.riccioNotificationsService.setSubject({
        text: '邮箱格式不正确',
        status: 'danger'
      })
    }
  }

  /**
   * 验证邮箱
   * @author GR-05
   */
  public fnEmailBlur(): boolean {
    if (this.testListData.email === null) {
      this.testListData.emailValid = false
    } else {
      this.testListData.emailValid = this.validEmail(this.testListData.email.toString())
    }
    return this.testListData.emailValid
  }

  //验证邮箱
  public validEmail(email: string) {
    return  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
  }

  /**
   * 展开模版测试及数据前置处理
   * @param e 点击事件
   * @param list 模版单行数据
   */
  public fnShowTest(e: MouseEvent, list: any): void {
    e ? e.stopPropagation() : {}
    this.testListData = {
      id: list['id'],
      name:list['name'],
      email: null,
      content:list['content'],
      emailValid:true
    }
    this.testBtnName = '发送'
    this.modalShow = 'mail_test'
    let modalData: any = {
      header: '发送测试',
      size: 700,
      noBtn: true
    }
    this.openUed()
    this.riccioModalService.setSubject(modalData)
  }

  /**
   * 保存或编辑短信模版
   * @author GR-05
   * @check GR-03
   */
  public fnTempAddOrEdit() {
    let keys = Object.keys(this.addOrEditList)
    //提交的数据
    let data: any = {}
    keys.forEach((key) => {
      let value = this.addOrEditList[key]
      if (value !== null) {
        if (key === 'id') {
          data[key] = value
        }
        else if (key !== 'parme') {
          data[key] = value
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
      this.grConfigService.postMailAdd(data).subscribe(v => {
        this.addOrEditAfter(v)
      })
    } else {
      //编辑
      this.modalShowIsAddOrEdit.btnName = "更新中..."
      this.grConfigService.postMailEdit(data).subscribe(v => {
        this.addOrEditAfter(v)
      })
    }
  }

  /**
   * 添加或编辑模版完成后的动作
   * @param res 响应
   */
  public addOrEditAfter(res:any){
    this.closeAllUed()
    this.modalShowIsAddOrEdit.btnName = "保存"
    if (res.status === 1) {
      this.riccioNotificationsService.setSubject({
        text: res.message,
        status: 'success'
      })
      this.fnGetMailList()
    }
    this.addEditFormShow = false
    this.riccioModalService.setSubject({})
  }

  /**
   * 监听详情点击事件
   * @param e 组件发射数据
   * @author GR-05
   * @check GR-03 
   */
  public detailClick(e){
    if(e.flag === 1){
      //编辑
      this.fnShowEdit(null,e.main)
    }else if(e.flag === 2){
      //删除
       this.fnShowConfirm(e.event,null,e.main)
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
    this.templateData.map(e => e['isCheck'] = bool);
    this.FlyLeftData.isShow = this.SwitchCheck(this.templateData) === true ? true : false;
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
    this.FlyLeftData.isShow = this.SwitchCheck(this.templateData) === true ? true : false;
    if (this.FlyLeftData.number === this.templateData.length) {
      this.AllCheck = true
    }
    else {
      this.AllCheck = false
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
      deleteBatch.push(this.grConfigService.postMailTempDel({ id: ids[item] }))
    }
    this.configMainService.opListBatch(
      deleteBatch,
      '批量删除中',
      '批量删除成功',
      ()=>{
        this.FlyLeftData.isShow = false
        this.fnGetMailList()
      }
    )
  }

  /**
   * 删除模版
   * @param id 模版id
   * @author GR-05
   * @check GR-03
   */
  public delMailTemp(id:number){
    this.riccioLoadingService.setLoading({
      message:'删除中'
    })
    this.grConfigService.postMailTempDel({id:id}).subscribe(v=>{
      if(v.status ===1){
        this.riccioLoadingService.closeLoading()
        this.riccioNotificationsService.setSubject({
          text:'删除成功',
          status:'success'
        })
        this.fnGetMailList()
      }
    })
  }

  /**
   * 删除选中的列表项
   * @author GR-05
   * @check GR-03
   */
  public fnDeleteCheck(e:MouseEvent, el: ElementRef) {
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: e.clientX,
        top: e.clientY,
        width: '240'
      },
      type:'mailTplOp',
      data: {
        title: '确定删除所选项？',
        button: '删除',
        delID: this.FlyLeftData
      }
    })
  }

  //显示是否删除的弹出窗口
  public fnShowConfirm(e: MouseEvent, el:any,list: any): void {
    e?e.stopPropagation():{}
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: e.clientX,
        top: e.clientY,
        width: 240
      },
      type:'mailTplDel',
      data: {
        title: '确定删除所选项？',
        button: '删除',
        delID: list.id
      }
    })
  }

  //点击添加模版列表
  public fnShowAddTemplate(): void {
    this.addOrEditList = new MailTemplateData().addOrEditList
    this.addEditFormShow = true
    this.modalShow = 'mail_add_edit'
    this.modalShowIsAddOrEdit.flag = 'add'
    let modalData: any = {
      header: '添加模版',
      size: 650,
      noBtn: true
    }
    this.riccioModalService.setSubject(modalData)
    this.openUed()
  }

  /**
   * 延迟打开编辑器
   * 
   */
  public openUed(){
    setTimeout(()=>{
      this.uedshow = true
      this.uedTestShow = true
    },100)
  }

  //获取当前邮件模版列表的方法
  public fnGetMailList(): void {
    this.isLoading = true
    this.grConfigService.getMailList(this.pageRequestParam)
      .subscribe(res => {
        this.isLoading =false
        if (res.status === 1) {
          this.templateData = [...res.data];
          this.pageParam.total = res.data.total
          this.templateData.map(e => e['isCheck'] = false)
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
        return bool = true;
      }
    })

    return bool
  }
}
