import { Component, OnInit,OnDestroy,ElementRef } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'

import { tableTitle }		from './tableTitle'
import { memberData }		from './members-edit-add/memberData'
import { write_price }    from './members-edit-add/memberData'

import { GrRuanwenServices }		from '../services'
import { RiccioModalService  }	from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioPboxService }		from '../../../../Public/riccio-pbox/riccio-pbox.service'

@Component({
  selector: 'app-ruanwen-members-set',
  templateUrl: './ruanwen-members-set.component.html',
  styleUrls: ['../../../../Public/theme/common/common.scss','./ruanwen-members-set.component.scss']
})
export class RuanwenMembersSetComponent implements OnInit {

  public tableTitle:string[]

  public memberItem:any[]

  public pboxRX$:Subscription

  public modelRX$:Subscription

  public editAddType:string

  public memberId:number|string

  public memberData:memberData

  public write_price:any[]

  public loadingType:string

  constructor(
  	public grRuanwenServices:GrRuanwenServices,
  	public riccioModalService:RiccioModalService,
  	public riccioPboxService:RiccioPboxService
  ) {
  	this.tableTitle = new tableTitle().data
  	this.memberData = new memberData()
    this.write_price = new write_price().data
  	this.editAddType = ''
  	this.loadingType = 'show'
  	this.memberId = ''

  	this.pboxRX$ = this.riccioPboxService.getEmit().subscribe(res=>{
  		let type = res['type']
  		if(type==='delete'){
  			this.handleDel(res['data'])
  		}
  	})

  	this.modelRX$ = this.riccioModalService.getEmit().subscribe(res=>{
  		console.log(res)
  		this.editAddType = ''
  	})


  }

  ngOnInit() {
  	this.fnGetMemberItem()
  }

  ngOnDestroy(){
  	this.pboxRX$.unsubscribe()
  	this.modelRX$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取会员组列表
   * @param     [param]
   * @return    [return]
   */
  public fnGetMemberItem():void{
  	this.loadingType = 'show'
  	this.grRuanwenServices.getAdminMemberList().subscribe(res=>{
 		this.loadingType = 'hide'
  		if(res.status===1){
  			this.memberItem = [...res['data']['data']]

  			if(this.memberItem.length==0) this.loadingType = 'empty'

  		}
  	},error=>{
  		throw new Error(error)
  	})
  }

  /**
   * @author GR-03
   * @copyright 删除
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnDel(data:any,dataEl:ElementRef,event:MouseEvent):void{
  	this.riccioPboxService.setSubject({

  		'genre':'delete',
  		'el':dataEl,
  		'type':'delete',
  		'position':{
  			'left':event.clientX-150,
  			'top':event.clientY,
  			'width':300
  		},
  		'data':{
  			'title':'删除提示',
  			'content':'是否删除该会员组',
  			'button':'确认',
  			'delID':data
  		}
  			
  	})
  }

  /**
   * @author GR-03
   * @copyright 处理删除操作的函数
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public handleDel(data:any):void{
  	// this.grRuanwenServices.
  }


  /**
   * @author GR-03
   * @copyright 编辑
   * @param     [param]
   * @return    [return]
   * @param     {any}       data [description]
   */
  public fnEdit(data:any):void{

  	this.memberData = new memberData(data)

    this.write_price = Array.isArray(data['write_price'])==true?[...data['write_price']]:new write_price().data
    this.handleModel('edit')
    this.editAddType = 'edit'
    this.memberId = data['id']

  }

  /**
   * @author GR-03
   * @copyright 添加
   * @param     [param]
   * @return    [return]
   */
  public fnAdd():void{

  	this.memberData = new memberData()
    this.write_price = new write_price().data

    this.handleModel('add')
    this.editAddType = 'add'

  }

  /**
   * @author GR-03
   * @copyright 处理弹窗的函数
   * @param     [param]
   * @return    [return]
   * @param     {string}    type [description]
   */
  public handleModel(type:string):void{
  	this.riccioModalService.setSubject({
  		'data':'',
  		'header':type=='add'?'添加会员组':'编辑会员组',
  		'size':600,
  		'noBtn':true,
  		'type':type
  	})
  }


  /**
   * @author GR-03
   * @copyright 啊关闭是
   * @param     [param]
   * @return    [return]
   */
  public fnEmitClose(value:string):void{
  	if(value==='close'){
  		this.riccioModalService.setSubject({})
  	}
  }

}
