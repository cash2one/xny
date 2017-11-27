import { Component, OnInit,Input,OnChanges,SimpleChanges,ElementRef,OnDestroy,ViewChild,Output,EventEmitter } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { companyData }		from './companyData'
import { postEditOrAddData }	from './companyData'
	
import { GrCompanyInfoService }    from '../../../../ApiServices/grCompanyInfo/grCompanyInfo.service'
import { GrAdminServices }		from '../../services'
import { GrCompanyService }		from '../../services'
import { RiccioPboxService }		from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioNotificationsService }  from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-company-edit-add',
  templateUrl: './company-edit-add.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./company-edit-add.component.scss']
})
export class CompanyEditAddComponent implements OnInit {

  @ViewChild('nameEl')  public nameEl:ElementRef
  @ViewChild('membersNameEl')  public membersNameEl:ElementRef
  @Input() public companyData:companyData
  @Input() public type:string
  @Input() public companyId:string|number
  @Output() public emitClose:EventEmitter<string>
  @Output() public emitSuccess:EventEmitter<string>
  @Output() public closeOtherPbox:EventEmitter<string>

  public btnType:boolean

  public pboxRX$:Subscription

  /**
   * 需要提交的添加和编辑的数据id
   * @type {postEditOrAddData}
   */
  public postEditOrAddData:postEditOrAddData

  /**
   * pbox选项的数组数据
   * @type {any[]}
   */
  public pboxOptionData:any[]

  /**
   * 选择公司名称的数组数据
   * @type {any[]}
   */
  public companyNameItem:any[]

  /**
   * 选择会员组的数组数据
   * @type {any[]}
   */
  public memberNameItem:any[]

  /**
   * 所选中的标签
   * @type {any}
   */
  public checkEl:any

  public inputType:string

  constructor(
  	public grCompanyService:GrCompanyService,
  	public grAdminServices:GrAdminServices,
  	public riccioNotificationsService:RiccioNotificationsService,
  	public riccioPboxService:RiccioPboxService,
    public grCompanyInfoService:GrCompanyInfoService
  ) { 
  	this.btnType = true
  	this.pboxOptionData = []
  	this.memberNameItem = []
  	this.companyNameItem = []
    this.inputType = ''
  	this.postEditOrAddData = new postEditOrAddData()
  	this.companyData = new companyData()
  	this.emitClose = new EventEmitter<string>()
  	this.emitSuccess = new EventEmitter<string>()
    this.closeOtherPbox = new EventEmitter<string>()

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		let type = res['type']
  		if(type==='member'){
  			this.companyData['member_name'] = res['data']['name']
  			this.postEditOrAddData['member_id'] = +res['data']['id']
  		}else if(type==='company'){
			this.companyData['name'] = res['data']['name']
  			this.postEditOrAddData['cid'] = +res['data']['id']
  		}

  	})

  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){

  	this.btnType = true
  	if(changes['type']){

  		if(this.type=='edit'){
  			// this.fnGetCompanyList('edit')
  		}

  	}
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取企业组名称的函数
   * @param     [param]
   * @return    [return]
   */
  public fnGetCompanyList(pboxType:string,El:any = {},searchValue:string = ''):void{
  	this.pboxOptionData = []
  	this.grCompanyInfoService.postCompanyList({
      'model':'RuanwenService',
      'name':searchValue
    }).subscribe(res=>{
  		if(res.status===1){
  			this.companyNameItem = [...res['data']['data']]

  			if(pboxType!=='edit'){
	  			for(let e=0;e<this.companyNameItem.length;e++){
	  				this.pboxOptionData.push({
	  					'name':this.companyNameItem[e]['name'],
	  					'id':this.companyNameItem[e]['id']
	  				})
	  			}

		  		this.handlePboxData(this.pboxOptionData,pboxType,this.handleClient(this.nameEl),El)
  			}else if(pboxType==='edit'){
  				let arr = this.companyNameItem.filter(e=>e['id']==this.companyId)
  				if(arr.length>0){
  					this.postEditOrAddData = new postEditOrAddData(arr[0]['id'],arr[0]['member_id'])
  					this.companyData = new companyData({
  						'name':arr[0]['company_name'],
  						'member_name':arr[0]['member_name']
  					})
  				}
  			}


  		}
  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 获取会员组列表的函数
   * @param     [param]
   * @return    [return]
   */
  public fnGetMembersList(pboxType:string,El:any = {},searchValue:string = ''):void{
  	this.pboxOptionData  = []
  	this.grAdminServices.getAdminMemberList({
  		'name':searchValue
  	}).subscribe(res=>{
  		if(res.status===1){
  			this.memberNameItem = [...res['data']['data']]

  			if(pboxType!=='edit'){
	  			for(let e=0;e<this.memberNameItem.length;e++){
	  				this.pboxOptionData.push({
	  					'name':this.memberNameItem[e]['name'],
	  					'id':this.memberNameItem[e]['id']
	  				})
	  			}

		  		this.handlePboxData(this.pboxOptionData,pboxType,this.handleClient(this.membersNameEl),El)
  			}else if(pboxType==='edit'){
  				let arr = this.memberNameItem.filter(e=>e['name']==this.companyData['name'])
  				this.postEditOrAddData['member_id'] = arr.length>0?arr[0]['id']:''
  			}


  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  public fnShowPbox(type:string,dataEl:ElementRef):void{
    this.checkEl = dataEl
    this.inputType = type
    this.closeOtherPbox.emit('close')
  	if(type==='company'){
  		this.fnGetCompanyList(type,dataEl)
  	}else if(type==='member'){
  		this.fnGetMembersList(type,dataEl)
  	}

  }

  /**
   * @author GR-03
   * @copyright 处理pboxdata选项卡文件
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     data   [description]
   * @param     {string}    type   [description]
   * @param     {any}       client [description]
   */
  public handlePboxData(data:any[],type:string,client:any,El:ElementRef):void{
  		this.riccioPboxService.setSubject({
  			'genre':'option',
  			'el':El,
  			'type':type,
  			'data':data,
  			'position':{
  				'left':client.left,
  				'top':client.top+50,
  				'width':375
  			}
  		})	
  }

  /**
   * @author GR-03
   * @copyright 获取该元素相对于浏览器的位置
   * @param     [param]
   * @return    [return]
   * @param     {ElementRef} data [description]
   * @return    {ElementRef}      [description]
   */
  public handleClient(data:ElementRef):any{
  	return data.nativeElement.getBoundingClientRect()
  }

  /**
   * @author GR-03
   * @copyright 点击保存按钮
   * @param     [param]
   * @return    [return]
   * @param     {boolean}   value [description]
   */
  public fnAddOrder():void{
  	this.btnType = false
  	if(this.type === 'add'){

  		this.grCompanyService.postAdminCenterAdd({
  			...this.postEditOrAddData
  		}).subscribe(res=>{
  			this.btnType = true
  			if(res.status===1){
	  			this.riccioNotificationsService.setSubject({text:'添加成功'})
	  			this.closer()
	  			this.emitSuccess.emit('success')
  			}
  		},error=>{
  			throw new Error(error)
  		})


  	}else if(this.type === 'edit'){

  		this.grCompanyService.postAdminCenterEdit({
  			...this.postEditOrAddData
  		}).subscribe(res=>{
  			this.btnType = true
  			if(res.status===1){
	  			this.riccioNotificationsService.setSubject({text:'编辑成功'})
	  			this.closer()
	  			this.emitSuccess.emit('success')
  			}
  		},error=>{
  			throw new Error(error)
  		})

  	}

  }

  /**
   * @author GR-03
   * @copyright 关闭
   * @param     [param]
   * @return    [return]
   */
  public closer():void{
  	this.emitClose.emit('close')
    this.closeOtherPbox.emit('open')
  }

  /**
   * @author GR-03
   * @copyright 接受
   * @param     [param]
   * @return    [return]
   * @param     {string}    value [description]
   */
  public pboxEmitSearch(value:string):void{
    if(this.inputType === 'company'){
      this.fnGetCompanyList(this.type,this.checkEl,value)
    }else if(this.inputType === 'member'){
      this.fnGetMembersList(this.type,this.checkEl,value)
    }
  }

}
