import { Component, OnInit, ViewChild, ViewContainerRef, ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { GrCompanyService } from '../../../services'
import { GrAppcenterService } from '../../../services/grAppcenter/grAppcenter.service'
import { PersonalService } from '../../../../Public/Personal/personal.service';

import { AddEditCompanyService } from '../add-edit-company/add-edit-company.service';

import { animations } from '../../../../Public/Animations/index'

import { ComPanyData } from './comPanyData'
import { ShowDetailService } from '../../../show-detail/show-detail.service'
import { Conf } from '../../../show-detail/show-detail.data'
import { BreadCrumbData } from '../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'

import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { AdminService } from '../../../Admin.service'
import { GrMenuListService } from '../../../services/grLogin/grMenuList.service'

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrls: [
    '../../../Admin.component.scss',
    '../../../pages/page.common.scss',
    './compant-main.component.new.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class CompanyMainComponent implements OnInit,OnDestroy {
  @ViewChild('clickTb', { read: ViewContainerRef }) clickTb: ViewContainerRef;
  @ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

  public flyLeftData: any;
  public allCheck: boolean;

  public appID: number;

  public headerData: any = {
    headerText: '',
    backLink: '',
  };

  public menuDataOnly:any
  public menuRight:any
  //应用类型 console   admin  。。
  public routerType: string;
  //类型 0应用管理企业控制台进    1 总控制台进
  public routerRule: number | string;
  //表头
  public titleArr: Array<string>
  //企业列表
  public companyList: Array<any>
  //详情数据
  public showDetailData: any
  public isLoading: boolean
  //显示范围文字
  public rangeVal:string
  //搜索参数
  public searchParam: string
  public searchNameTemp:string
  //搜索参数（总控制台）
  public userSearchParams:{
    range:number;
    other:string;
  }
  public pboxObj:any

  // 选择企业组件数据
  public selectComData:any
  // 选择企业提示的名称
  public addComName:string
  public modalType:string
  public modalObj:any
  public breadData:BreadCrumbData[]
  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public grCompanyService: GrCompanyService,
    public grAppcenterService:GrAppcenterService,
    public personalService: PersonalService,
    public addEditCompanyService: AddEditCompanyService,
    public showDetailService: ShowDetailService,
    public riccioPboxService: RiccioPboxService,
    public adminService:AdminService,
    public grMenuListService:GrMenuListService,
    public riccioLoadingService:RiccioLoadingService,
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioModalService:RiccioModalService
  ) {

    this.routerType = ''
    this.searchParam = ''
    this.allCheck = false
    this.titleArr = new ComPanyData().titleData
    this.companyList = []
    this.showDetailData = new ComPanyData().showDetailData
    this.menuDataOnly = {}
    this.menuRight = []
    this.rangeVal = '正常企业'
    this.selectComData = {}
    this.userSearchParams = {
      range:1,
      other:''
    } 
    this.searchNameTemp = this.userSearchParams.other

    // 组件创建完成后就开始获取详情数据
    this.activatedRoute.params.subscribe(res => {
      this.routerType = res.model;
      this.appID = res.app_id;
      this.routerRule = res.type;
      this.fnGetModelCompany(this.routerType, '')
      this.resolveBread()
    })

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
  }

  ngOnInit() {
    //监听多选
    this.pboxObj = this.riccioPboxService.getEmit().subscribe(v => {
      if(v.type === 'comMain'){
        this.opStatusBatch(v.data.ids, v.data.status)
      }else if (v.type === 'mainRange'){
        this.rangeVal = v.data.name
        this.userSearchParams.range = v.data.value
        this.fnRangeSearch()
      }
    })
    //监听modal
    this.modalObj = this.riccioModalService.getEmit().subscribe(v=>{
      if(v.type == 'addCom'){
        //添加企业
        let cid = [v.data.id]
        this.addComPost(cid)
      }
    })

    this.adminService.setSecondMenu(false)
    
    this.getMenus()
  }

  ngOnDestroy(){
    this.pboxObj.unsubscribe()
    this.modalObj.unsubscribe()
  }

  public resolveBread(){
    this.breadData = [
      {name:'应用管理',routerLink:'/Admin/appcenter/list'}
    ]
    if(this.routerRule == 0){
      this.breadData.push({
        name:new ComPanyData().modelNames[this.routerType],
        routerLink:`/Admin/appcenter/${this.routerType}`
      })
    }
    this.breadData.push({
      name:'企业管理'
    })
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
   * 显示企业数据
   * @param list 企业数据
   * @author GR-05
   */
  public fnShowDetail(list: any) {
    this.showDetailData.forEach((v, i, arr) => {
      if(arr[i].flag === 'status'){
        arr[i].value = list[arr[i].flag] == '1'?'正常':'禁用'
      }else if(arr[i].flag === 'logo'){
        arr[i].img = true
        arr[i].icoType = 'com'
      }else{
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
      type:'comMain',
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
         app_id:this.appID,
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
        this.fnGetModelCompany(this.routerType, '')
      }
    )
  }

  /**
   * 选择企业
   */
  public fnSelectCom(){
    this.selectComData.isShow = true
    this.selectComData.name = ''
    this.selectComData.page = 1
    this.selectComData.data = []
    this.selectComData.existData = JSON.parse(JSON.stringify(this.companyList))
    this.getAllCom()
  }

  /**
   * 添加企业 请求全部企业
   * @author GR-05
   */
  public getAllCom(){
    this.selectComData.nextPage = 'loading'
    this.grCompanyService.getCompanyList({
      rows:20,
      page:this.selectComData.page
    }).subscribe(res=>{
      let data = res['data']['data']
      let total = res['data']['total']
      if(res.status === 1 && data.length > 0){
        this.selectComData.data = this.selectComData.data.concat(data)
        let cutLength = this.resolveComLeft()
        this.selectComData.tempData = this.selectComData.data
        if(total - this.selectComData.data.length - cutLength > 0){
          this.selectComData.nextPage = 'normal'
        }else{
          this.selectComData.nextPage = 'hide'
        }
      }else{
        this.selectComData.nextPage = 'hide'
      }
    })
  }

  /**
   * 处理添加企业左边数据
   * @author GR-05
   * @return 过滤数据量
   */
  public resolveComLeft():number{
    let result = 0
    this.selectComData.existData.forEach(right => {
       this.selectComData.data = this.selectComData.data.filter(left=>{
         left['id'] == right['id']?result +=1 :{}
         return left['id'] != right['id']
       })
    })
    return result
  }
  
  /**
   * 选择企业组件关闭事件
   */
  public fnSelectComClose(){
    this.selectComData.isShow = false
    this.selectComData.existData = []
  }

  /**
   * 选择企业组件搜索事件
   */
  public fnSearchSingleCom(value:string){
    if (value && value.trim().length !== 0) {
			this.selectComData.data = this.selectComData.data.filter(item => {
				if (item['name']) {
					return item['name'].indexOf(value) != -1
				}
			})
		} else if (value == '') {
			this.selectComData.data = this.selectComData.tempData
		}
  }

  /**
   * 
   * 添加权限人点击加载更多
   * @author GR-05
   */
  public fnMoreCom(flag:boolean){
    if(flag){
      this.selectComData.page += this.selectComData.page
      this.getAllCom()
    }
  }

  /**
   * 添加企业动作
   */
  public addCom(data:any){
    this.modalType = 'addCom'
    if(data){
      this.addComName = data.name
      this.riccioModalService.setSubject({
        size: 600,
        header: '提示',
        type: 'addCom', 
        data:data,
        btn: {
          name: '确认添加',
          status: 'success'
        }
      })
    }
  }

  /**
   * 企业分配应用主体
   * @param cid 企业id数组
   */
  public addComPost(cid:any[]){
    this.riccioLoadingService.setLoading({
      message:'分配企业中'
    })
    this.grAppcenterService.postAppAddCom({
      cid:cid,
      app_id:this.appID
    }).subscribe(res=>{
      this.riccioLoadingService.closeLoading()
      if(res.status === 1){
        this.riccioNotificationsService.setSubject({
          status:'success',
          text:'分配成功'
        })
        this.selectComData.isShow = false
        this.fnRangeSearch()
      }
    })
  }

  /**
   * 搜索企业
   */
  public fnSearchCom(e?:KeyboardEvent){
    if(this.routerRule == 0){
      //应用管理进入
      if(this.searchParam != '' && this.searchParam != null){
        this.fnGetModelCompany(this.routerType, this.searchParam)
      }else{
        this.fnGetModelCompany(this.routerType, '')
      }
    }else if( this.routerRule == 1){
      //总控制中心进入
      if(e.keyCode === 13){
        this.fnRangeSearch()
      }
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
      this.fnRangeSearch()
    }
  }

  //总控制中心 模式 点击选项搜索
  public fnRangeSearch(){
    this.isLoading = true
    this.grCompanyService.postCompanyListApp({
      app_id:this.appID,
      name:this.userSearchParams.other
    }).subscribe(res=>{
      this.isLoading = false
      if(res.status === 1){
        if(this.userSearchParams.other !== this.searchNameTemp){
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
      type:'mainRange',
      data: [
        {name:'全部企业',value:0},
        {name:'正常企业',value:1},
        {name:'禁用企业',value:2}
      ]
    })
  }

  /**
   * 搜索成员后的数据处理(options)
   * @param res 响应
   * @author GR-05
   * @check GR-03
   */
  public resolveSearch(res:any){
    let result = res
    if(this.userSearchParams.range.toString() === '1'){
      //正常
      result = result.filter(item => item['status'] == 1)
    }else if(this.userSearchParams.range.toString() === '2' ){
      //禁用
      result = result.filter(item => item['status'] == 2)
    }
    this.companyList = result
    this.companyList.map(e=>{
      e['isCheck'] = false
    })
  }

  /**
   * 加载logo失败事件
   * @param list 企业数据 
   */
  public noImg(list:any){
    list['noImg'] = true
  }

  //进入相应管理
  public fnGoManag(str: string, list: any, e: MouseEvent): void {
    e ? e.stopPropagation() : {}
    if (str === 'menu') {
      this.router.navigate(['/Admin/menu/list', 'model', this.routerType, 'cid', list['id'], 'status', '1'])
    }
    else if (str === 'rule') {
      this.router.navigate(['/Admin/role/list', 'model', this.routerType, 'cid', list['id']])
    }
    else if (str === 'members' && this.routerType === 'Console') {
      this.router.navigate(['/Admin/members/list', 'model', this.routerType, 'cid', list['id']])
    }
    else if (str === 'members' && this.routerType != 'Console') {
      this.router.navigate(['/Admin/members/member_app', 'model', this.routerType, 'cid', list['id'],'appid',this.appID])
    }
  }

  //根据model的名称来判断id用以获取应用企业列表
  public fnGetModelCompany(type: string, name: string): void {
    this.isLoading = true
    let companyObj = {
      'app_id': this.appID,
      'name': name
    }

    if (this.routerRule == 0) {
      switch (type) {
        case "Project":
          this.headerData.headerText = '应用管理 ／ 项目管理 ／ '
          break;
        case "Console":
          this.headerData.headerText = '应用管理 ／ 企业控制台 ／ '
          break;
        default: break;

      }
    } else {
      this.headerData.headerText = '企业中心 / '
    }

    this.grCompanyService.postCompanyListApp(companyObj)
      .subscribe(res => {
        this.isLoading = false
        this.companyList = [...res.data.data];
        this.companyList.map(e => e['isCheck'] = false)
        name !== null?this.searchNameTemp = name:{}
      })
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
    this.fnGetModelCompany(this.routerType, value)
  }



  //添加企业
  public FnAddCompany(): void {
    console.log('asdasdasdsd')
    this.addEditCompanyService.companybol = 'add';
    if (this.routerRule == 1) this.personalService.showViewData('add-edit-company', true)
    else console.log('asdasdasdsd')
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
