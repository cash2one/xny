import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

import { GrCompanyService } from '../../../services'
import { PersonalService } from '../../../../Public/Personal/personal.service';

import { AddEditCompanyService } from '../add-edit-company/add-edit-company.service';
import { ComRechargeService } from '../company-recharge/company-recharge.service'

import { animations } from '../../../../Public/Animations/index'

import { ComPanyData,RechargeFc,PostData } from './comPanyData'
import { ComRechargeData } from '../company-recharge/company-recharge.data'
import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'

import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { AdminService } from '../../../Admin.service'
import { GrMenuListService } from '../../../services/grLogin/grMenuList.service'
import { CompanyOpService } from '../company-op/company-op.service'

@Component({
  selector: 'app-company-manager',
  templateUrl: './company-manager.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    '../../../pages/page.common.scss',
    './compant-manager.component.new.scss'
  ],

  animations: [
    animations.flyTop
  ]
})
export class CompanyManagerComponent implements OnInit, OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
  @ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

  public flyLeftData: any;
  public allCheck: boolean;

  public appID: number;

  public headerData: any = {
    headerText: '',
    backLink: '',
  };

  public menuDataOnly: any
  public menuRight: any
  //表头
  public titleArr: Array<string>
  //企业列表
  public companyList: Array<any>
  //详情数据
  public showDetailData: any
  public isLoading: boolean
  //显示范围文字
  public rangeVal: string
  //搜索参数
  public searchParam: string
  public searchNameTemp: string
  public routerType: string
  //搜索参数（总控制台）
  public userSearchParams: {
    range: number;
    other: string;
  }
  public pboxObj: any
  public modalObj: any
  //分页组件参数
  public pageParam: any
  //分页请求参数
  public pageRequestParam: any

  //是否显示消费记录
  public isConsume: boolean

  //活动中的企业id
  public companyId: number


  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public grCompanyService: GrCompanyService,
    public personalService: PersonalService,
    public addEditCompanyService: AddEditCompanyService,
    public showDetailService: ShowDetailService,
    public riccioPboxService: RiccioPboxService,
    public adminService: AdminService,
    public grMenuListService: GrMenuListService,
    public riccioModalService: RiccioModalService,
    public riccioLoadingService: RiccioLoadingService,
    public riccioNotificationsService: RiccioNotificationsService,
    public companyOpService: CompanyOpService,
    private comRechargeService:ComRechargeService
  ) {
    this.appID = 0
    this.searchParam = ''
    this.allCheck = false
    this.routerType = 'admin'
    this.titleArr = new ComPanyData().titleData
    this.companyList = []
    this.showDetailData = new ComPanyData().showDetailData
    this.menuDataOnly = {}
    this.menuRight = []
    this.rangeVal = '正常企业'
    this.isConsume = false
    this.userSearchParams = {
      range: 1,
      other: ''
    }
    this.searchNameTemp = this.userSearchParams.other

    this.flyLeftData = {
      showText: [
        {
          name: '启用',
          type: '1'
        },
        {
          name: '禁用',
          type: '2'
        }
      ],
      ids: [],
      status: 1,
      isShow: false,
      number: 0
    }
    this.pageParam = {
      pboxData: [20, 50, 100]
    }
    this.pageRequestParam = {
      // app_id:0,
      rows: this.pageParam.pboxData[0],
      page: 1,
      name: this.userSearchParams.other,
      status: this.userSearchParams.range
    }
  }

  ngOnInit() {
    //监听多选
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
      if (v.type === 'comManager') {
        this.opStatusBatch(v.data.ids, v.data.status)
      } else if (v.type === 'mainRange') {
        this.rangeVal = v.data.name
        this.userSearchParams.range = v.data.value
        this.pageRequestParam.status = this.userSearchParams.range
        this.fnRangeSearch()
      } else if (v.type === 'comManaStatus') {
        this.fnChangeComStatus(v.data)
      } else if (v.type === 'selectMore') {
        this.fnSeleteMore(v.data.value);
      }
    })
    //模态框监听  cmf添加
    this.modalObj = this.riccioModalService.getEmit().subscribe(v => {
      if(v.type == 'selectStatus'){
        this.fnChangeComStatus(this.list)
      }
    })

    this.companyOpService.emitObs.subscribe(v => {
      if (v) {
        //添加或者修改企业成功
        this.fnRangeSearch()
      }
    })
    this.getMenus()
    this.fnRangeSearch()
  }

  ngOnDestroy() {
    this.pboxObj.unsubscribe();
    this.modalObj.unsubscribe();
  }

  /**
   * 处理分页数据
   * @param e 组件传回数据
   */
  public fnPagination(e: any) {
    this.pageRequestParam.page = e.page
    this.pageRequestParam.rows = e.rows
    this.fnRangeSearch()
  }

  /**
   * 获取tab
   */
  public getMenus() {
    this.activatedRoute.params.subscribe(res => {
      let RouteMenu = this.grMenuListService.FnActiveRouterMenu('company/list')
      Object.assign(this.menuDataOnly, {
        title: RouteMenu.name,
        data: RouteMenu
      })
      this.menuRight = this.menuDataOnly.data['chilren'] ? [...this.menuDataOnly.data['chilren'].filter(e => e['is_left'] == 2)] : [];
    })
  }

  /**
   * 显示企业数据
   * @param list 企业数据
   * @author GR-05
   */
  public fnShowDetail(list: any) {
    this.showDetailData.forEach((v, i, arr) => {
      if (arr[i].flag === 'status') {
        arr[i].value = list[arr[i].flag] == '1' ? '正常' : '禁用'
      } else {
        arr[i].value = list[arr[i].flag]
      }
    })
    let editConf: Conf = {
      title: list['name'],
      showList: this.showDetailData,
      top: 56,
      expectClick: this.clickTb,
      headBtn: false
    }
    this.showDetailService.SetDetailConfSbj(editConf)
  }

  /**
   *  操作选中的列表项
   * @author GR-05
   * @check GR-03
   */
  public fnChangeCheck(type: string, el: ElementRef, e: MouseEvent) {
    type === '1' ? this.flyLeftData.status = 1 : this.flyLeftData.status = 2
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: e.clientX,
        top: e.clientY,
        width: 250
      },
      type: 'comManager',
      data: {
        title: type === '1' ? '确定启用所选企业？' : '确定禁用所选企业',
        button: type === '1' ? '启用？' : '禁用',
        delID: this.flyLeftData
      }
    })
  }

  /**
   * 批量禁用启用企业
   * @param ids 企业列表id数组
   * @author GR-05
   * @check GR-03
   */
  public opStatusBatch(ids: Array<any>, status: number) {
    let statusBatch = []
    for (let item in ids) {
      statusBatch.push(this.grCompanyService.postCompanyStatu({
        id: ids[item],
        app_id: this.appID,
        status: status
      }))
    }
    this.adminService.opListBatch(
      statusBatch,
      '批量操作中',
      '批量操作完成',
      () => {
        this.allCheck = false
        this.flyLeftData.isShow = false
        this.fnGetModelCompany('')
      }
    )
  }

  /**
   * 显示切换状态
   */
  public fnShowChangeStatus(list: any, el?: any, e?: MouseEvent) {
    e.stopPropagation()
    let word = list.status === 1 ? '禁用' : '启用'
    this.riccioPboxService.setSubject({
      genre: 'delete',
      el: el,
      position: {
        left: e.clientX,
        top: e.clientY,
        width: 250
      },
      type: 'comManaStatus',
      data: {
        title: `确定${word}此企业？`,
        button: word,
        delID: list
      }
    })
  }

  /**
   * 切换状态
   * @param list 企业数据
   */
  public fnChangeComStatus(list: any) {
    this.riccioLoadingService.setLoading({
      message: '切换状态'
    })
    let status
    if (list && list.status === 1) {
      status = 2
    } else if (list && list.status === 2) {
      status = 1
    }
    this.grCompanyService.postCompanyStatu({
      id: list.id,
      app_id: this.appID,
      status: status
    }).subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        this.riccioNotificationsService.setSubject({
          status: 'success',
          text: '切换成功'
        })
        this.fnRangeSearch()
      }
    })
  }

  /**
   * 搜索企业
   */
  public fnSearchCom(e?: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.fnRangeSearch()
    }
  }

  /**
   * 失焦搜索企业
   */
  public fnBlurSearchCom() {
    this.searchCom()
  }


  /**
   * 搜索企业
   */
  public searchCom() {
    if (this.searchNameTemp == this.userSearchParams.other) {
      this.isLoading = false
    }
    else {
      this.pageRequestParam.name = this.userSearchParams.other
      this.fnRangeSearch()
    }
  }

  //总控制中心 模式 点击选项搜索
  public fnRangeSearch() {
    this.isLoading = true
    this.grCompanyService.getCompanyList(this.pageRequestParam).subscribe(res => {
      this.isLoading = false
      if (res.status === 1) {
        this.pageParam.total = res.data.total
        if (this.userSearchParams.other !== this.searchNameTemp) {
          this.searchNameTemp = this.userSearchParams.other
        }
        this.resolveSearch(res.data.data)
      }
    })
  }

  /**
   * 显示筛选范围
   * @param e 点击事件
   * @param el 点击元素
   */
  public fnRange(e: MouseEvent, el: any) {
    let position = this.adminService.getElPosition(this.rangeBtn)
    this.riccioPboxService.setSubject({
      genre: 'option',
      el: el,
      position: {
        top: position.top + this.rangeBtn.nativeElement.offsetHeight + 5,
        left: position.left,
        width: this.rangeBtn.nativeElement.offsetWidth
      },
      type: 'mainRange',
      data: [
        { name: '全部企业', value: 0 },
        { name: '正常企业', value: 1 },
        { name: '禁用企业', value: 2 }
      ]
    })
  }

  /**
   * 搜索成员后的数据处理(options)
   * @param res 响应
   * @author GR-05
   * @check GR-03
   */
  public resolveSearch(res: any) {
    let result = res
    if (this.userSearchParams.range.toString() === '1') {
      //正常
      result = result.filter(item => item['status'] == 1)
    } else if (this.userSearchParams.range.toString() === '2') {
      //禁用
      result = result.filter(item => item['status'] == 2)
    }
    this.companyList = result
    this.companyList.map(e => {
      e['isCheck'] = false,
        e['amount'] = `¥ ${e['amount']}`
      e['logo'] = window['fileurl'] + e['logo']
    })
  }

  /**
   * 加载logo失败事件
   * @param list 企业数据
   */
  public noImg(list: any) {
    list['noImg'] = true
  }


  //根据model的名称来判断id用以获取应用企业列表
  public fnGetModelCompany(name: string): void {
    this.isLoading = true
    let companyObj = {
      'app_id': this.appID,
      'name': name
    }

    this.grCompanyService.getCompanyList(companyObj)
      .subscribe(res => {
        this.isLoading = false
        this.companyList = [...res.data.data];
        this.companyList.map(e => e['isCheck'] = false)
        name !== null ? this.searchNameTemp = name : {}
      })
  }

  /**
   * 添加企业
   * @author GR-05
   */
  public fnAddCom() {
    this.companyOpService.setCOP({
      type: 'add'
    })
  }

  /**
   * 编辑企业
   * @param com 企业数据
   * @param e 点击事件
   */
  public fnEditCom(id: number | string, e?: MouseEvent) {
    e ? e.stopPropagation() : {}
    this.riccioLoadingService.setLoading({
      message: '拉取企业信息中'
    })
    this.grCompanyService.getCompanyInfo(id).subscribe(res => {
      this.riccioLoadingService.closeLoading()
      if (res.status === 1) {
        this.companyOpService.setCOP({
          type: 'edit',
          data: res.data
        })
      }
    })
  }

  /**
   * 显示消费记录
   * @param id  企业id
   * @param e 点击事件
   */
  public fnShowConsume(id: number, e?: MouseEvent) {
    e ? e.stopPropagation() : {}
    this.companyId = id
    this.isConsume = true
  }

  public fnConsoleEmit(e: any) {
    this.isConsume = false
  }


  //点击全选时的事件
  public fnCheckAll(bool: boolean): void {
    this.allCheck = bool;
    this.flyLeftData.ids = []
    this.companyList.map(e => e['isCheck'] = bool);
    this.flyLeftData.isShow = this.SwitchCheck(this.companyList) === true ? true : false;
  }

  //选中的当前用户信息
  public fnCheckUser(list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    list.isCheck = !list.isCheck;
    this.flyLeftData.ids = []
    this.flyLeftData.isShow = this.SwitchCheck(this.companyList) === true ? true : false;
    if (this.flyLeftData.number === this.companyList.length) {
      this.allCheck = true
    }
    else {
      this.allCheck = false
    };

  }

  //判断当前的列表是否有被选中的某一条，有则显示滑块
  public SwitchCheck(list: any): boolean {
    let bool = false;
    list.forEach(e => {
      if (e.isCheck === true) {
        this.flyLeftData.ids.push(e['id'])
        this.flyLeftData.number = list.filter(el => el['isCheck'] === true).length
        return bool = true;
      }
    })

    return bool
  }

  public FnBackLink(): void {
    window.history.back();
  }

  /**
     * 监听充值动作
     * @author GR-05
     */
  public fnRechargeEmit() {
    this.riccioModalService.setSubject({})
    this.fnRangeSearch()
  }

  /**
   * 显示充值组件
   * @author  gr-05
   */
  public fnShowRecharge(list:any,e:MouseEvent){
    e.stopPropagation()
    this.comRechargeService.setRecharge({
      amountNow: list.amount,
      cid:list.id
  })
  }

  //cmf 的添加
  public listId:number;
  public list:any;
  public isApplication:boolean = false;
  //点击弹出选择更多的下拉框
  public seleteMore(list:any,id:number,e: MouseEvent, el: any) {
    e.stopPropagation();    //阻止详细信息页的弹出
    this.list = list;
    this.listId = id;
    let word = list.status === 1 ? '禁用' : '启用'
    this.riccioPboxService.setSubject({
      genre: 'option',
      el: el,
      position: {
        top: e.clientY,
        left: e.clientX-200,
        width: 200
      },
      type: 'selectMore',
      data: [
        { name: '编辑', value: 0 },
        { name: '消费记录', value: 1 },
        { name: word, value: 2 },
        { name: '菜单管理', value: 3},
        { name: '权限管理', value: 4}
      ]
    })
  }

  //选择更多中各项的跳转
  fnSeleteMore(dataValue:string){
    if(dataValue == '0'){
      this.fnEditCom(this.listId)
    }else if(dataValue == '1'){
      this.fnShowConsume(this.listId)
    }else if(dataValue == '2'){
      this.fnChangeStatus(this.list);
    }else if(dataValue == '3'){
      this.router.navigate(['Admin/menu/list/model/Console/cid/'+ this.listId +'/status/1']);
    }else if(dataValue == '4'){
      this.router.navigate(['Admin/role/list/model/Console/cid/'+ this.listId]);
    }
  }

  //显示切换状态模态框
  public fnChangeStatus(list:any){
    let word = list.status === 1 ? '禁用' : '启用'
    this.companyOpService.setCOP({
      type : 'changeStatus',
      word : word,
      list : list
    })
  }

  //应用管理页面控制
  public fnShowApplication(id:number){

  }
}
