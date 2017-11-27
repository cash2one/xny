import { Component, OnInit,Input,OnChanges,SimpleChanges,ElementRef,OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { RiccioPboxService }		from '../../../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }		from '../../../../../../Public/riccio-notifications/riccio-notifications.service'
		
import { tableTitle }		from './tableTitle'
import { searchAllCompanyMembers }    from './searchAllCompanyMembers'
  
import { GrMembersService }			from '../../../../../services'
import { GrAppsService }		from '../../../../../services' 

@Component({
  selector: 'app-apps-info-members',
  templateUrl: './apps-info-members.component.html',
  styleUrls: ['../../../../../Console.component.scss','./apps-info-members.component.scss']
})
export class AppsInfoMembersComponent implements OnInit {

  @Input() public appsId:number|string
  @Input() public modelName:string

  /**
   * 是否显示选择成员的标志位
   * @type {boolean}
   */
  public membersIsShow:boolean

  /**
   * 表格头部标题
   * @type {string[]}
   */
  public tableTitle:string[]

  /**
   * 应用成员列表数据
   * @type {any[]}
   */
  public appsMembersItem:any[]

  /**
   * 公司全体员工数据
   * @type {any[]}
   */
  public companyAllMembersData:any[]


  /**
   * 右边的该应用的全体员工
   * @type {any[]}
   */
  public rightAppsMembersItem:any[]

  /**
   * 选择成员组件的loading效果分别对应的字段
   * @type {string}
   */
  public membersLoading:string

  /**
   * 获取全体公司成员的对象数据
   * @type {searchAllCompanyMembers}
   */
  public searchAllCompanyMembers:searchAllCompanyMembers

  /**
   * 分页组件的总数量
   * @type {[type]}
   */
  public pageTotal:number|string

  /**
   * loading效果标志位
   * @type {string}
   */
  public tableLoadingType:string

  /**
   * pbox组件的可订阅对象
   * @type {Subscription}
   */
  public pboxRX$:Subscription

  constructor(
  	public grAppsService:GrAppsService,
  	public grMembersService:GrMembersService,
  	public riccioPboxService:RiccioPboxService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) { 

    this.searchAllCompanyMembers = new searchAllCompanyMembers()
  	this.membersLoading = 'loading'
  	this.membersIsShow = false
  	this.tableTitle = new tableTitle().data
  	this.rightAppsMembersItem = []
    this.companyAllMembersData = []
    this.tableLoadingType = 'show'
    this.pageTotal = 0

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{

  		if(res['type']==='delete'){
  			this.handleDelete(res['data'])
  		}

  	})

  }

  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges){
  	if(changes['appsId']){ 
  		if(this.appsId!==''){
			this.fnGetAppsMembersItem(this.appsId)
  		}
  	}
  }

  ngOnDestroy(){

  	this.pboxRX$.unsubscribe()

  }



  /**
   * @author GR-03
   * @copyright 获取应用成员列表
   * @param     [param]
   * @return    [return]
   */
  public fnGetAppsMembersItem(ID:number|string,rows:number=20):void{

    if(rows==20) this.tableLoadingType = 'show'

  	this.grAppsService.getAppUserList({
  		'app_id':ID,
  		'name':'',
  		'rows':rows
  	}).subscribe(res=>{
      this.tableLoadingType = 'hide'
  		if(res.status===1){

  			if(rows===1000){
  				this.rightAppsMembersItem = [...res['data']['data']]
  			}else {
	  			this.appsMembersItem = [...res['data']['data']]

          if(this.appsMembersItem.length==0) this.tableLoadingType = 'empty'

          this.pageTotal = res['data']['total']
  			}

  		}
  	},error=>{
  		throw new Error(error)
  	})

  }

  /**
   * @author GR-03
   * @copyright 显示pbox组件的删除提示
   * @param     [param]
   * @return    [return]
   * @param     {any}        data  [description]
   * @param     {ElementRef} El    [description]
   * @param     {MouseEvent} event [description]
   */
  public fnPboxDel(data:any,El:ElementRef,event:MouseEvent):void{

    this.riccioPboxService.setSubject({

      'genre':'delete',
      'el':El,
      'type':'delete',
      'position':{
        'left':event.clientX-150,
        'top':event.clientY,
        'width':300
      },
      'data':{
        'title':'移除提示',
        'content':"是否移除 "+data['real_name'],
        'button':'确认',
        'delID':data
      }

    })

  }

  /**
   * @author GR-03
   * @copyright 处理删除的操作
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public handleDelete(data:any):void{

  	this.grAppsService.postAppUserDel({
  		'app_id':this.appsId,
  		'user_ids':[data['id']]
  	}).subscribe(res=>{
  		if(res.status===1){
  			this.riccioNotificationsService.setSubject({text:'删除成功'})
  			this.fnGetAppsMembersItem(this.appsId)
  		}
  	},error=>{
  		throw new Error(error)
  	})

  }

  /**
   * @author GR-03
   * @copyright 添加成员
   * @param     [param]
   * @return    [return]
   */
  public addMembers():void{

    this.searchAllCompanyMembers = new searchAllCompanyMembers()

    this.companyAllMembersData.length = 0

  	this.membersIsShow = true

  	this.fnGetCompanyAllMembersData()

  	this.fnGetAppsMembersItem(this.appsId,1000)


  }

  /**
   * @author GR-03
   * @copyright 获取公司全体正常员工的数据
   * @param     [param]
   * @return    [return]
   */
  public fnGetCompanyAllMembersData(type:string='normal',data:any=''):void{

    switch (type) {
      case "page":
        this.searchAllCompanyMembers['page'] = data
        break;
      
      case "search":
        this.searchAllCompanyMembers['page'] = 1
        this.searchAllCompanyMembers['name'] = data
        break;

      default:break;
    }

  	this.membersLoading = 'loading'
  	this.grMembersService.postNoConsoleUser({
  		...this.searchAllCompanyMembers,
      'app_id':this.appsId
  	}).subscribe(res=>{
  		if(res.status===1){
  			
        if(type==='normal'||type==='search')  this.companyAllMembersData = [...res['data']['data']]

        if(type==='page') this.companyAllMembersData = [...this.companyAllMembersData,...res['data']['data']]

  			if(res['data']['next_page_url']!=null){

  				this.membersLoading = 'normal'

  			}else {
  				this.membersLoading = 'hide'
  			}

  		}
  	},error=>{
  		throw new Error(error)
  	})

  }


  /**
   * @author GR-03
   * @copyright 点击保存返回右侧所有数据
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEmitRightData(data:any):void{

    this.grAppsService.postAppUserAdd({
      'app_id':this.appsId,
      'user_ids':data.map(e=>e['id'])
    }).subscribe(res=>{
      if(res.status===1){
        this.riccioNotificationsService.setSubject({text:'添加成功'})
        this.fnGetAppsMembersItem(this.appsId,20)
      }
    },error=>{
      throw new Error(error)
    })

  }

  public fnOutputPageValue(e:any){
    
  }

}
