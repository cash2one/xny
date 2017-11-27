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

import { appcenterMainData, AddOrEditList, TestListData } from './appcenterMainData'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioMoadlData } from '../../../../Public/riccio-modal/riccio-modalData'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'

import { GrAppcenterService } from '../../../services/grAppcenter/grAppcenter.service'
import { AddEditAppcenterService } from '../add-edit-appcenter/add-edit-appcenter.service'
import { AppcenterService } from '../appcenter.service'
import { ConfigMainService } from '../../config/config-main/config-main.service'
import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'

import { animations } from '../../../../Public/Animations/index'


@Component({
  selector: 'app-appcenter-main',
  templateUrl: './appcenter-main.component.html',
  styleUrls: [
    '../../../../Admin/Admin.component.scss',
    // './config-template.component.scss',
    '../../page.common.scss',
    './appcenter-main.component.new.scss'
  ],
  animations: [
    animations.flyTop,
    animations.rightIn
  ]
})
export class AppcenterMainComponent implements OnInit, AfterViewInit,OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;

  public titleList: Array<string>;
  public templateData: Array<any>;
  public ShowConfirm: any;
  public ShowEditConf: Conf
  public ModalShow: string
  public isLoading:boolean
  public isSort:string
  //标示是添加还是修改（同用一个模版）
  public modalShowIsAddOrEdit: any
  //存储模版详情用于显示
  public ShowTplList: Array<any>
  public AddOrEditList: AddOrEditList

  public addEditFormShow: boolean

  public pboxObj:any
  public modalObj:any

  //分页组件参数
  public pageParam:any
  //分页请求参数
  public pageRequestParam:any

  //刷新按钮刷新效果
  public refresh:boolean

  public showType:string


  constructor(
    public grAppcenterService: GrAppcenterService,
    public riccioModalService: RiccioModalService,
    public riccioNotificationsService: RiccioNotificationsService,
    public riccioPboxService: RiccioPboxService,
    public riccioLoadingService: RiccioLoadingService,
    public eleRef: ElementRef,
    public showDetailService: ShowDetailService,
    public configMainService: ConfigMainService,
    public appcenterService: AppcenterService,
    public addEditAppcenterService: AddEditAppcenterService
  ) {
    this.titleList = new appcenterMainData().titleData;
    this.templateData = new appcenterMainData().templateListData;
    this.ShowTplList = new appcenterMainData().showDetailData
    this.AddOrEditList = new appcenterMainData().addOrEditList
    this.modalShowIsAddOrEdit = new appcenterMainData().addOrEditFlag
    this.isLoading = true
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
    //监听状态操作
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
      if (v.type === 'appCenterStatus') {
        this.changeStatus(v.data.list, v.data.status)
      }
    })

    //监听模态关闭
    this.modalObj = this.riccioModalService.getEmit().subscribe(v => {
      if (v.type === 'close') {
        this.addEditFormShow = false
        this.showType = ''
      }
    })

    this.addEditAppcenterService.OkObj.subscribe(v=>{
      this.riccioModalService.setSubject({})
      this.fnGetAppList()
    })

    this.fnGetAppList()
  }

  ngAfterViewInit() {
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
    this.fnGetAppList()
  }

  /**
   * 获取所有应用列表
   */
  public fnGetAppList(): void {
    this.isLoading = true
    this.grAppcenterService.postAppList(this.pageRequestParam)
      .subscribe(res => {
        this.isLoading = false
        if (res.status === 1) {
          this.templateData = [...res.data.data];
          this.pageParam.total = res.data.total
          this.templateData.map((e) => {
            e['isCheck'] = false
            e['isRefresh'] = false
            e['orderTemp'] = e.listorder
            e['thumb'] = e['thumb']
            e['thumb_icon_show'] = window['fileurl'] + e['thumb_icon_40x40']
          })
        }
      })
  }

  public fnSortClick(list:any,e:MouseEvent){
    e?e.stopPropagation():{}
    this.isSort = list.id
  }

  /**
   * 弹出更改状态
   * @param id app
   * @param e 点击事件
   * @param el 点击元素
   * @author GR-05
   * @check GR-03
   */
  public fnChangeStatus(list: any, e: MouseEvent, el: ElementRef) {
    e ? e.stopPropagation() : {}
    this.riccioPboxService.setSubject({
      genre: 'option',
      el: el,
      position: {
        left: e.clientX,
        top: e.clientY,
        width: 200
      },
      type: 'appCenterStatus',
      data: [
        { name: '隐藏', status: 0, list: list },
        { name: '显示', status: 1, list: list },
        { name: '禁用', status: 2, list: list }
      ]
    })
  }

  /**
   * 修改状态
   * @param id app
   * @param status 状态
   * @author GR-05
   * @check GR-03 
   */
  public changeStatus(list: any, status: number) {
    this.riccioLoadingService.setLoading({
      message: '修改状态中'
    })
    this.grAppcenterService.postAppStatus({
      id: list.id,
      status: status
    }).subscribe(res => {
      if (res.status === 1) {
        this.riccioLoadingService.closeLoading()
        this.riccioNotificationsService.setSubject({
          text: '修改成功',
          type: 'success'
        })
        list.status = status
      }
    })
  }

  /**
   * 排序
   * @param list 应用数据
   */
  public fnSortMenu(list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    let orderTemp = list.listorder
    if(list.listorder !== list.orderTemp){
      this.riccioLoadingService.setLoading({
        message: '排序中'
      })
      this.refresh = true
      this.grAppcenterService.postAppEdit(list)
        .subscribe(res => {
          if (res.status === 1) {
            this.riccioLoadingService.closeLoading()
            setTimeout(()=>{
              this.refresh = false
            },2000)
            // this.riccioNotificationsService.setSubject({
            //   text: '排序成功',
            //   type: 'success'
            // })
            list.listorder = orderTemp
          }
        })
    }else{
      return
    }
  }

  /**
   * 点击行的时候显示详情
   * @param list 单行数据
   */
  public fnShowDetail(list: any): void {
    this.ShowTplList.forEach((v, i, src) => {
      if (v['flag'] === "status") {
        src[i].value = (list[src[i].flag] == 1 ? '显示' : list[src[i].flag] == 0 ? '隐藏' : '禁用')
      } else if (v['flag'] === "type") {
        src[i].value = (list[src[i].flag] == 0 ? '系统应用' : list[src[i].flag] == 1 ? '商业应用' : '定制应用')
      } else {
        src[i].value = list[src[i].flag]
      }
    })
    let editConf: Conf = {
      title: list['name'],
      showList: this.ShowTplList,
      top: 59,
      expectClick: this.clickTb,
      activeList: list,
      headBtn: false
    }
    this.showDetailService.SetDetailConfSbj(editConf)
  }

  /**
   * 显示编辑
   */
  public fnShowEdit(list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    this.addEditAppcenterService.symbol = 'edit';
    this.addEditAppcenterService.data = {...list};
    this.showType = 'add-edit-appcenter'
    this.riccioModalService.setSubject({
      header: '编辑应用',
      size: 650,
      type:'editApp',
      noBtn:true
    })
  }

  /**
   * 显示添加
   */
  public fnShowAdd():void{
    this.addEditAppcenterService.symbol = 'add';
    this.showType = 'add-edit-appcenter'
    this.riccioModalService.setSubject({
      header: '添加应用',
      size: 600,
      type:'addApp',
      noBtn:true
    })

  }

  /**
   * 图片加载失败
   * @param list 
   */
  public noImg(list:any){
    list['noImg'] = true
  }
}
