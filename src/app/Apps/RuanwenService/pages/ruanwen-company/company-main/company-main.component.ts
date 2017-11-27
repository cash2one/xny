import { Component, OnInit,ElementRef,OnDestroy,ViewChild} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { GrAdminServices }		from '../../../services'
import { RiccioModalService }			from '../../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioPboxService }		from '../../../../../Public/riccio-pbox/riccio-pbox.service'
import { GrCompanyService }		from '../../../services'
import { RiccioNotificationsService }		from '../../../../../Public/riccio-notifications/riccio-notifications.service'

import { tableTitle }		from './tableTitle'
import { companyData }		from '../../../common/company-edit-add/companyData'

@Component({
  selector: 'app-company-main',
  templateUrl: './company-main.component.html',
  styleUrls: ['../../../../../Public/theme/apps-common/common.scss','../../../../../Public/theme/apps-common/table.scss','./company-main.component.scss']
})
export class CompanyMainComponent implements OnInit {

  /**
   * 表格头部标题
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 企业列表
   * @type {any[]}
   */
  public companyItem:any[]

  /**
   * loading效果标志位
   * @type {string}
   */
  public loadingType:string

  /**
   * 分页总数
   * @type {[type]}
   */
  public pageTotal:string|number

  /**
   * 公司名称和会员组信息
   * @type {companyData}
   */
  public companyGroup:companyData

  /**
   * 搜索的公司名称
   * @type {string}
   */
  public searchCompany:string

  /**
   * pbox的可订阅对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  public modalRX$:Subscription

  /**
   * 显示编辑还是添加的标志位置
   * @type {string}
   */
  public editAddType:string

  /**
   * 选中的公司企业ID
   * @type {[type]}
   */
  public companyId:number|string

  /**
   * 是否显示pbox组件
   * @type {boolean}
   */
  public showPbox:boolean

  /**
   * 会员组的检索字段
   * @type {string}
   */
  public membersNameSearch:string

  constructor(
  	public grAdminServices:GrAdminServices,
  	public riccioModalService:RiccioModalService,
  	public grCompanyService:GrCompanyService,
  	public riccioNotificationsService:RiccioNotificationsService,
  	public riccioPboxService:RiccioPboxService
  ) { 
  	this.tableTitle = new tableTitle().data
  	this.companyGroup = new companyData()
  	this.loadingType = 'show'
  	this.searchCompany = ''
  	this.editAddType = ''
    this.showPbox = true
    this.membersNameSearch = ''

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{

  		if(res['type']=='delete'){
  			this.handleDel(res['data'])
  		}else if(res['type']=='member_name'){
        this.membersNameSearch = res['data']['name']=='无'?'':res['data']['name']
      }

  	})

  	this.modalRX$ = this.riccioModalService.getEmit().subscribe(res=>{
  		this.editAddType = ''
      this.showPbox = true
  	})

  }

  ngOnInit() {
  	this.fnGetCompanyItem(this.searchCompany)
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  	this.modalRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取企业列表
   * @param     [param]
   * @return    [return]
   * @param     {string}    name [description]
   */
  public fnGetCompanyItem(name:string='',page:string|number = 1):void{
  	this.loadingType = 'show'
  	this.grCompanyService.getAdminCenterList({
  		'name':name,
      'page':page,
      'member_name':this.membersNameSearch
  	}).subscribe(res=>{
  		this.loadingType = 'hide'
  		if(res.status===1){
  			this.companyItem = [...res['data']['data']]
  			this.pageTotal = res['data']['total']

  			if(this.companyItem.length==0) this.loadingType = 'empty'

  		}
  	},error=>{
  		throw new Error(error)
  	})

  }


  /**
   * @author GR-03
   * @copyright 点击删除按钮显示pbox删除提示
   * @param     [param]
   * @return    [return]
   * @param     {any}        data   [description]
   * @param     {ElementRef} dataEl [description]
   */
  public fnDelCompany(data:any,dataEl:ElementRef,event:MouseEvent):void{

  	this.riccioPboxService.setSubject({

  		'genre':'delete',
  		'el':dataEl,
  		'type':'delete',
  		'data':{
  			'title':'删除提示',
  			'content':'是否删除 '+data['company_name']+' 会员',
  			'button':'确认',
  			'delID':data
  		},
  		'position':{
  			'left':event.clientX-150,
  			'top':event.clientY,
  			'width':300
  		}

  	})	

  }


  /**
   * @author GR-03
   * @copyright 处理删除的事件
   * @param     [param]
   * @return    [return]
   */
  public handleDel(data:any):void{
  	this.grCompanyService.postAdminCenterDel({
  		'id':data['id']
  	}).subscribe(res=>{
  		if(res.status===1){
  			this.riccioNotificationsService.setSubject({text:'删除成功'})
  			this.fnGetCompanyItem(this.searchCompany)
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 点击添加企业会员弹出选择框
   * @param     [param]
   * @return    [return]
   */
  public fnAddCompany(type:string,data:any = {}):void{

  	let modalFn = (s:string)=>{
	  	this.riccioModalService.setSubject({
	  		'header':s=='add'?'添加企业会员':'编辑企业会员',
	  		'size':600,
	  		'noBtn':true,
	  		'type':s,
	  		'data':''
	  	})
  	}

  	if(type==='add'){
  		modalFn('add')
  		this.editAddType = 'add'
		this.companyGroup  = new companyData()
  	}else if(type==='edit'){
  		modalFn('edit')
  		this.editAddType = 'edit'
      this.companyId = data['id']
  		this.companyGroup  = new companyData({
        'name':data['company_name'],
        'member_name':data['member_name']
      })
  	}

  }

  /**
   * @author GR-03
   * @copyright 关闭时图
   * @param     [param]
   * @return    [return]
   */
  public fnEmitCloseEditAdd(value:string):void{
  	if(value==='close'){
  		this.riccioModalService.setSubject({})
  	}
  }

  /**
   * @author GR-03
   * @copyright 接收分页组件返回的数据
   * @param     [param]
   * @return    [return]
   */
  public fnEmitPage(data:any):void{
    this.fnGetCompanyItem(this.searchCompany,data['page'])
  }


  /**
   * @author GR-03
   * @copyright 显示pbox组件
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} dataEl [description]
   */
  public fnShowPboxMembers(dataEl:any):void{

    this.grAdminServices.getAdminMemberList({
      'name':''
    }).subscribe(res=>{
      if(res.status===1){
        let data = [{'id':0,'name':'无'},...res['data']['data']]

        let client = dataEl.getBoundingClientRect()

        this.riccioPboxService.setSubject({
          'genre':'option',
          'el':dataEl,
          'type':'member_name', 
          'position':{
            'left':client.left,
            'top':client.top+50,
            'width':160
          },
          'data':data
        })
      }
    },error=>{ 
      throw new Error(error)
    })

  }


}
	