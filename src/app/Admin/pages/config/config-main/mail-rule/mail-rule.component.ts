import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

import { RiccioModalService } from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioLoadingService } from '../../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioPboxService } from '../../../../../Public/riccio-pbox/riccio-pbox.service'

import { GrConfigService } from '../../../../services'
import { AdminService } from '../../../../Admin.service'
import { PersonalService } from '../../../../../Public/Personal/personal.service'

import { ShowDetailService } from '../../../../show-detail/show-detail.service'
import { Conf } from '../../../../show-detail/show-detail.data'
import { ConfigMainService } from '../config-main.service'

import { MailRuleData, AddOrEditList } from './mailRuleData'

import { animations } from '../../../../../Public/Animations/index'

@Component({
  selector: 'app-mail-rule1',
  templateUrl: './mail-rule.component.html',
  styleUrls: [
    '../../../../Admin.component.scss',
    // './config-rule.component.scss',
    '../../../page.common.scss',
    './mail-rule.component.new.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class MailRuleComponent implements OnInit,OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
  @ViewChild('showBindTb', { read: ViewContainerRef }) showBindTb: ViewContainerRef;

  public TitleList: Array<string>;
  public ruleData: Array<any>;
  public FlyLeftData: any;
  public AllCheck: boolean;
  public ShowConfirm: any;

  public isLoading:boolean
  //模态类型
  public modalShow: string
  //用来重置表单验证
  public addEditFormShow: boolean
  //存放添加或编辑的数据
  public addOrEditList: AddOrEditList
  //存放标示添加或编辑的数据
  public modalShowIsAddOrEdit: any
  //用于详情组件显示的数据
  public showTplList: Array<any>
  //用于显示规则对应的模版信息
  public showTemData: Array<any>
  //绑定模版显示的表头
  public bindTempTitle: Array<string>
  //绑定时获取的全部模版列表
  public bindTempList: any
  //活动状态的规则id
  public activeRuleId: number
  //是否实例化ued
  public uedShow:boolean
  public ueditorConf:any
  public pboxObj:any
  public modalObj:any

  //分页组件参数
  public pageParam:any
  //分页请求参数
  public pageRequestParam:any

  constructor(
    private adminService:AdminService,
    public riccioModalService: RiccioModalService,
    public riccioNotificationsService: RiccioNotificationsService,
    public riccioLoadingService: RiccioLoadingService,
    public riccioPboxService: RiccioPboxService,
    public grConfigService: GrConfigService,
    public personalService: PersonalService,
    public showDetailService: ShowDetailService,
    public configMainService:ConfigMainService
  ) {
    this.AllCheck = false
    this.TitleList = new MailRuleData().titleData
    this.FlyLeftData = new MailRuleData().FlyLeftData
    this.ruleData = new MailRuleData().templateRuleData
    this.addOrEditList = new MailRuleData().addOrEditList
    this.modalShowIsAddOrEdit = new MailRuleData().addOrEditFlag
    this.showTplList = new MailRuleData().showDetailData
    this.showTemData = new MailRuleData().showTemDetailData
    this.bindTempTitle = new MailRuleData().bindTempTitle
    this.ueditorConf = this.adminService.uedConf()
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
      if(v.type === 'mailRuleOp' && v.data.ids){
        this.opListBatch(v.data.ids,v.data.opType)
      }else if(v.type === 'mailRuleDel'){
        this.delRule(v.data)
      }
    })

    //监听模态关闭
    this.modalObj = this.riccioModalService.getEmit().subscribe(v => {
      if (v.type === 'close') {
        this.addEditFormShow = false
        this.uedShow = false
      }
    })
    this.fnGetRuleList();
  }

  ngOnDestroy(){
    this.pboxObj.unsubscribe()
    this.modalObj.unsubscribe()
  }

  /**
   * 处理分页数据
   * @param e 组件传回数据
   */
  public fnPagination(e:any){
    this.pageRequestParam.page = e.page
    this.pageRequestParam.rows = e.rows
    this.fnGetRuleList()
  }

  /**
   * 模版详情点击监听
   * @param e 详情组件传过来数据
   */
  public detailClick(e) {
    // 编辑
    if (e.flag === 1) {
      this.fnShowEditRule(e.main,null)
    } else if (e.flag === 2) {
      this.fnShowConfirm(e.event,null, e.main)
    }
  }

  //获取当前短信规则列表的方法
  public fnGetRuleList(): void {
    this.isLoading = true
    this.grConfigService.getMailRuleList(this.pageRequestParam)
      .subscribe(res => {
        this.isLoading = false
        this.ruleData = [...res.data.data];
        this.AllCheck =false
        this.pageParam.total = res.data.total
        this.ruleData.map(e => {
          e['isCheck'] = false
          e['isHover'] = false
        })
      })
  }

  /**
   * 获取所有模版列表
   */
  public getAllTemp() {
    this.riccioLoadingService.setLoading({
      message: '获取所有模版中'
    })
    this.grConfigService.getMailList().subscribe(res => {
      if (res.status === 1) {
        this.riccioLoadingService.closeLoading()
        this.bindTempList = res.data
        this.modalShow = "rule_bind"
        this.addEditFormShow = true
        let modalData: any = {
          header: '绑定模版',
          size: 600,
          noBtn: true
        }
        this.riccioModalService.setSubject(modalData)
      }
    })
  }

  /**
   * 绑定规则模版
   * @param temp 模版数据
   */
  public fnRuleBind(temp: any) {
    this.riccioLoadingService.setLoading({
      message: '绑定模版中'
    })
    this.grConfigService.postMailTempBind({
      id: this.activeRuleId,
      tem_id: temp.id
    }).subscribe(res => {
      if (res.status === 1) {
        this.riccioLoadingService.closeLoading()
        this.riccioNotificationsService.setSubject({
          text: res.message,
          type: 'success'
        })
        this.ruleData.map(e => {
          //直接替换id
          if (e['id'] === this.activeRuleId) {
            e['tem_id'] = temp.id
            e['tem_name'] = temp.name
          }
        })
        this.riccioModalService.setSubject({})
      }
    })
  }

  /**
   * 列表hover事件，更换样式
   * @param list 列表数据
   * @param flag 标示 enter 还是 out
   * @author  gr-05
   * @check gr-03
   */
  public fnListHover(list: any, flag: boolean): void {
    list['isHover'] = flag
  }

  /**
   * 禁用或开启规则状态
   * @param list 规则数据
   * @param e 点击事件
   */
  public fnEnableRule(list: any, e: MouseEvent) {
    e ? e.stopPropagation() : {}
    let status = 0
    list.status === 0 ? status = 1 : status = 0
    this.riccioLoadingService.setLoading({
      message: list.status ? '禁用中' : '启用中'
    })
    this.grConfigService.postMailRuleStatus({
      id: list.id,
      status: status
    }).subscribe(res => {
      if (res.status === 1) {
        this.riccioLoadingService.closeLoading()
        list.status = status
      }
    })
  }

  /**
   * 查看规则绑定的模版
   * @param temId 
   */
  public fnSeeTemp(temId: number, e: MouseEvent) {
    e ? e.stopPropagation() : {}
    this.riccioLoadingService.setLoading({
      message: '搜寻模版中'
    })
    this.grConfigService.postMailTempInfo({
      id: temId
    }).subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        this.showTemData.forEach((v, i, src) => {
            src[i].value = res['data'][src[i].flag]
        })
        let editConf: Conf = {
          title: res['data']['name'],
          showList: this.showTemData,
          top: 54,
          expectClick: null,
          activeList: res['data'],
          headBtn: false
        }
        this.showDetailService.SetDetailConfSbj(editConf)
      }
    })
  }

  /**
   * 在绑定模版的时候查看模版
   * @param list 模版信息
   */
  public fnSeeBindTemp(list: any) {
    this.showTemData.forEach((v, i, src) => {
      if (v['flag'] === "status") {
        src[i].value = (list[src[i].flag] == 1 ? '审核中' : list[src[i].flag] == 2 ? '已通过' : '未通过')
      } else {
        src[i].value = list[src[i].flag]
      }
    })
    let editConf: Conf = {
      title: list.name,
      showList: this.showTemData,
      top: 0,
      expectClick: this.showBindTb,
      activeList: null,
      headBtn: false
    }
    this.showDetailService.SetDetailConfSbj(editConf)
  }

  /**
   * 打开添加规则模态
   * @author  GR-05
   * @check GR-03
   */
  public fnShowAddRule() {
    this.addOrEditList = new MailRuleData().addOrEditList
    this.modalShow = 'rule_add_edit'
    this.addEditFormShow = true
    this.modalShowIsAddOrEdit.flag = 'add'
    let modalData: any = {
      header: '添加邮件规则',
      size: 650,
      noBtn: true
    }
    this.openUed()
    this.riccioModalService.setSubject(modalData)
  }

  public openUed(){
    setTimeout(()=>{
      this.uedShow = true
    },100)
  }

  /**
   * 打开修改规则莫泰
   * @author GR-05
   * @check GR-03
   */
  public fnShowEditRule(list: any, e: MouseEvent) {
    e ? e.stopPropagation() : {}
    this.addOrEditList = {
      id: list['id'],
      name: list['name'],
      status: list['status'],
      value:list['value'],
      tem_id: list['tem_id'],
      note:list['note']
    }
    this.addEditFormShow = true
    this.modalShow = 'rule_add_edit'
    this.modalShowIsAddOrEdit.flag = 'edit'
    let modalData: any = {
      header: '修改邮件规则',
      size: 650,
      noBtn: true
    }
    this.openUed()
    this.riccioModalService.setSubject(modalData)
  }

  /**
   * 添加或编辑规则   提交
   * @author GR-05
   * @check GR-03
   */
  public fnRuleAddOrEdit() {
    if (
      (this.addOrEditList['name'] !== null || this.addOrEditList['name'].replace(/(^\s*)|(\s*$)/g, "") !== '') &&
      (this.addOrEditList['note'] !== null || this.addOrEditList['note'].replace(/(^\s*)|(\s*$)/g, "") !== '')
    ) {
      let data = {
        id: this.addOrEditList['id'],
        name: this.addOrEditList['name'],
        note: this.addOrEditList['note'],
        status: this.addOrEditList['status'],
        tem_id: this.addOrEditList['tem_id'],
        value: this.addOrEditList['value'] ? this.addOrEditList['value'] : null
      }
      console.log(data)
      //添加
      if (this.modalShowIsAddOrEdit.flag === 'add') {
        this.modalShowIsAddOrEdit.btnName = '添加中...'
        this.grConfigService.postMailRuleAdd(data).subscribe(v => {
          this.addOrEditAfter(v)
        })
      } else if (this.modalShowIsAddOrEdit.flag === 'edit') {
        this.modalShowIsAddOrEdit.btnName = '修改中.·..'
        this.grConfigService.postMailRuleEdit(data).subscribe(v => {
          this.addOrEditAfter(v)
        })
      }
    }
  }

  /**
   * 保存或编辑后公用的动作
   * @param res 响应
   * @author GR-05
   * @check GR-03
   */
  public addOrEditAfter(res: any) {
    this.modalShowIsAddOrEdit.btnName = '保存'
    if (res.status === 1) {
      this.riccioNotificationsService.setSubject({
        text: res.message,
        status: 'success'
      })
      this.fnGetRuleList()
    }
    this.addEditFormShow = false
    this.uedShow  =  false
    this.riccioModalService.setSubject({})
  }

  /**
   * 展开规则详情
   * @param list 单行数据
   * @author GR-05
   * @check GR-03
   */
  public fnShowDetail(list: any): void {
    this.showTplList.forEach((v, i, arr) => {
      if ((v.flag === 'tem_id' || v.flag === 'tem_name') && list['tem_id'] === null) {
        arr[i].value = '未绑定模版'
      } else {
        arr[i].value = list[arr[i].flag]
      }
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

  public delRule(id:number){
    this.riccioLoadingService.setLoading({
      message:'删除规则中'
    })
    this.grConfigService.postMailRuleDel({id:id}).subscribe(res=>{
      if(res.status === 1){
        this.riccioLoadingService.closeLoading()
        this.riccioNotificationsService.setSubject({
          type:'success',
          text:'删除成功'
        })
        this.fnGetRuleList()
      }
    })
  }

  /**
   * 触发模版绑定
   * @param ruleId 规则id
   * @param e 点击事件
   */
  public fnBindTemp(ruleId: number, e: MouseEvent) {
    e ? e.stopPropagation() : {}
    this.activeRuleId = ruleId
    this.getAllTemp()
  }

  public fnEditRule(liat: any, e: MouseEvent) {
    // console.log('sss')
  }

  //点击全选时的事件
  public FnCheckAll(bool: boolean): void {
    this.AllCheck = bool;
    this.FlyLeftData.ids = []
    this.ruleData.map(e => e['isCheck'] = bool);
    this.FlyLeftData.isShow = this.SwitchCheck(this.ruleData) === true ? true : false;
  }

  //选中的当前用户信息
  public FnCheckUser(list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    list.isCheck = !list.isCheck;
    this.FlyLeftData.ids = []
    this.FlyLeftData.isShow = this.SwitchCheck(this.ruleData) === true ? true : false;
    if (this.FlyLeftData.number === this.ruleData.length) {
      this.AllCheck = true
    }
    else {
      this.AllCheck = false
    }
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

  /**
   * 点击选择一个或多个项目时的选项
   * @param el 点击对象
   * @param type 操作类型 1删除  2禁用  3启用
   */
  public fnFlyCheck(el: ElementRef, type: number) {
    let title, button
    switch (type) {
      case 1:
        title = '确定删除所选项？'
        button = '删除'
        break
      case 2:
        title = '确定禁用所选项？'
        button = '禁用'
        break
      case 3:
        title='确定启用所选项？'
        button='启用'
        break
    }
    this.FlyLeftData['opType'] = type
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: "0px",
        top: '10px',
        width: '200px'
      },
      type:'mailRuleOp',
      data: {
        title: title,
        button: button,
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
      type:'mailRuleDel',
      data: {
        title: '确定删除所选项？',
        button: '删除',
        delID: list.id
      }
    })
  }

  /**
   * 批量操作规则
   * @param ids 模版列表id数组
   * @param type 操作类型 1删除 2禁用 3启用
   * @author GR-05
   * @check GR-03
   */
  public opListBatch(ids: Array<any>, type: number): void {
    let opBatch = []
    let loadingMessage,nofiMessage
    switch(type){
      case 1:
        loadingMessage = '批量删除规则中'
        nofiMessage = '批量删除成功'
        break
      case 2:
        loadingMessage = '批量禁用规则中'
        nofiMessage = '批量禁用成功'
        break
      case 3:
        loadingMessage = '批量启用规则中'
        nofiMessage = '批量启用成功'
        break
    }
    for (let item in ids) {
      switch (type) {
        case 1:
          opBatch.push(this.grConfigService.postMailRuleDel({ id: ids[item] }))
          break
        case 2:
          opBatch.push(this.grConfigService.postMailRuleStatus({
            id: ids[item],
            status: 0
          }))
          break
        case 3:
          opBatch.push(this.grConfigService.postMailRuleStatus({
            id: ids[item],
            status: 1
          }))
          break
      }
    }
    this.riccioLoadingService.setLoading({
      message: loadingMessage
    })
    Observable.forkJoin(opBatch).subscribe(res => {
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
          text: nofiMessage,
          status: 'success'
        })
      } else {
        this.riccioNotificationsService.setSubject({
          text: '请求完成，但可能有些数据操作出错',
          status: 'danger'
        })
      }
      this.FlyLeftData.isShow = false
      this.fnGetRuleList()
    })
  }
}
