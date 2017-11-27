import { 
  Component, 
  OnInit, 
  OnDestroy,
  ViewChild, 
  ViewContainerRef, 
  ElementRef } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GrCompanyService } from '../../../services'
import { PersonalService } from '../../../../Public/Personal/personal.service';

import { AddEditCompanyService } from '../add-edit-company/add-edit-company.service';

import { animations } from '../../../../Public/Animations/index'

import { CompanyAuditData } from './companyAuditData'
import { CompanyAuditDetailService } from './company-audit-detail/company-audit-detail.service'
import { Conf } from './company-audit-detail/company-audit-detail.data'

import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { AdminService } from '../../../Admin.service'
import { GrMenuListService } from '../../../services/grLogin/grMenuList.service'

@Component({
  selector: 'app-company-audit',
  templateUrl: './company-audit.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    '../../../pages/page.common.scss',
    './compant-audit.component.new.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class CompanyAuditComponent implements OnInit,OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
  @ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

  public flyLeftData: any;
  public allCheck: boolean;

  public headerData: any = {
    headerText: '',
    backLink: '',
  };

  public menuDataOnly:any
  public menuRight:any
  //表头
  public titleArr: Array<string>
  //企业列表
  public companyList: Array<any>
  //详情数据
  public showDetailData: any
  public isLoading: boolean
  public rangeVal:string
  public searchNameTemp:string
  //搜索参数（总控制台）
  public userSearchParams:{
    range:number|string;
    other:string;
  }
  public pboxEmit:any

  //分页组件参数
  public pageParam:any
  //分页请求参数
  public pageRequestParam:any

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public grCompanyService: GrCompanyService,
    public personalService: PersonalService,
    public addEditCompanyService: AddEditCompanyService,
    public companyAuditDetailService: CompanyAuditDetailService,
    public riccioPboxService: RiccioPboxService,
    public adminService:AdminService,
    public grMenuListService:GrMenuListService,
    public riccioLoadingService:RiccioLoadingService
  ) {
    this.allCheck = false
    this.titleArr = new CompanyAuditData().titleData
    this.companyList = []
    this.showDetailData = new CompanyAuditData().showDetailData
    this.menuDataOnly = {}
    this.menuRight = []
    this.rangeVal = '审核中'

    this.userSearchParams = {
      range:1,
      other:''
    }
    this.searchNameTemp = this.userSearchParams.other

    this.flyLeftData = {
      showText: [
      ],
      ids: [],
      status: 1,
      isShow: false,
      number: 0
    }
    this.pageParam = {
      pboxData:[20,50,100]
    }
    this.pageRequestParam = {
      app_id:0,
      rows:this.pageParam.pboxData[0],
      page:1,
      name:this.userSearchParams.other,
      status:this.userSearchParams.range
    } 
  }

  ngOnInit() {
    //监听pbox
    this.pboxEmit = this.riccioPboxService.getEmit().subscribe(v => {
      //范围
      if(v.type === 'auditRange'){
        v.data.value === 0?this.userSearchParams.range='':this.userSearchParams.range=v.data.value
        this.pageRequestParam.status = this.userSearchParams.range
        this.rangeVal = v.data.name
        this.fnGetCompanyAuditList()
      }
      // this.opStatusBatch(v.data.ids, v.data.status)
    })

    //监听详情的回调
    this.companyAuditDetailService.feedbackObj.subscribe(v=>{
      this.fnGetCompanyAuditList()
    })

    this.getMenus()
    this.fnGetCompanyAuditList()
  }

  ngOnDestroy(){
    this.pboxEmit.unsubscribe()
  }

  /**
   * 处理分页数据
   * @param e 组件传回数据
   */
  public fnPagination(e:any){
    this.pageRequestParam.page = e.page
    this.pageRequestParam.rows = e.rows
    this.fnGetCompanyAuditList()
  }

  /**
   * 获取tab
   */
  public getMenus(){
    this.activatedRoute.params.subscribe(res => {
      let RouteMenu = this.grMenuListService.FnActiveRouterMenu('company/list');
      Object.assign(this.menuDataOnly, {
        title: RouteMenu.name,
        data: RouteMenu
      })
      this.menuRight = this.menuDataOnly.data['chilren'] ? [...this.menuDataOnly.data['chilren'].filter(e => e['is_left'] == 2)] : [];
    })
  }

  /**
   * 显示企业认证详情数据
   * @param list 企业id
   * @author GR-05
   */
  public fnShowDetail(id: string) {
    this.postComAuditInfo(id,(detail)=>{
      if(detail){
        let editConf: Conf = {
          top: 56,
          expectClick: this.clickTb,
          detail:detail
        }
        this.companyAuditDetailService.SetDetailConfSbj(editConf)
      }
    })
  }

  /**
   * 获取企业认证详情
   * @param id 认证id 
   * @param cb 回调
   */
  public postComAuditInfo(id:string,cb:(detail:any)=>void){
    this.riccioLoadingService.setLoading({
      message:'获取认证详情中'
    })
    this.grCompanyService.postComAuditInfo({
      id:id
    }).subscribe(res=>{
      this.riccioLoadingService.closeLoading()
      if(res.status === 1){
        cb(res.data)
      }
    })
  }

  /**
   * 获取企业认证列表
   * @param type 认证状态
   * @param name 检索字段
   * @author GR-05
   * @check GR-03
   */
  public fnGetCompanyAuditList(): void {
    this.isLoading = true
    this.grCompanyService.postComAuditList(this.pageRequestParam)
      .subscribe(res => {
        if(res.status === 1){
          this.isLoading = false
          this.companyList = [...res.data.data]
          this.pageParam.total = res.data.total
          this.companyList.map(e => e['isCheck'] = false)
          name!==null?this.searchNameTemp = name:{}
        }
      })
  }

  /**
   * 显示筛选范围
   * @param e 点击事件
   * @param el 点击元素
   */
  public fnRange(e:MouseEvent,el:any){
    let position = this.adminService.getElPosition(this.rangeBtn)
    this.riccioPboxService.setSubject({
      genre: 'option',
      el: el,
      position: {
          top: position.top + this.rangeBtn.nativeElement.offsetHeight + 5,
          left:position.left,
          width: this.rangeBtn.nativeElement.offsetWidth
      },
      type:'auditRange',
      data: [
        {name:'全部',value:0},
        {name:'审核中',value:1},
        {name:'已认证',value:2},
        {name:'未通过',value:3}
      ]
    })
  }

  /**
   * 按键搜索企业
   */
  public fnKeySearchCom(e:KeyboardEvent){
    if(e.keyCode === 13){
      this.searchCom()
    }
  }

  /**
   * 失焦搜索企业
   */
  public fnBlurSearchCom(){
    this.searchCom()
  }


  /**
   * 搜索企业
   */
  public searchCom(){
    if(this.searchNameTemp == this.userSearchParams.other){
      this.isLoading = false
    }
    else{
      this.pageRequestParam.name = this.userSearchParams.other
      this.fnGetCompanyAuditList()
    }
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
      // type:'audit',
      data: {
        title: type === '1' ? '确定启用所选成员？' : '确定禁用所选成员',
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
         status:status
      }))
    }
    this.adminService.opListBatch(
      statusBatch,
      '批量操作中',
      '批量操作完成',
      ()=>{
        this.allCheck = false
        this.flyLeftData.isShow = false
      }
    )
  }

  /**
   * 加载logo失败事件
   * @param list 企业数据 
   */
  public noImg(list:any){
    list['noImg'] = true
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



  //点击搜索的事件
  public FnnameChange(value: string): void {
    // this.fnGetModelCompany(this.routerType, value)
  }

  public FnBackLink(): void {
    window.history.back();
  }

  //修改企业
  public FneditCompany(list: any): void {
    this.addEditCompanyService.companybol = 'edit';
    this.addEditCompanyService.data = list;
    this.personalService.showViewData('add-edit-company', true);
  }
}
