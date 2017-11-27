import { Component, OnInit,OnDestroy,Output, EventEmitter } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { GrMembersService }		from '../../../../services'
import { EditTransferSettingService }		from './edit-transfer-setting.service'

import { RiccioModalService }		from '../../../../../Public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-edit-transfer-setting',
  templateUrl: './edit-transfer-setting.component.html',
  styleUrls: ['../../../../Console.component.scss','./edit-transfer-setting.component.scss']
})
export class EditTransferSettingComponent implements OnInit {
 
  /**
   * @author GR-03
   * @copyright 需要返回的选中某一个成员的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Output() public emitData:EventEmitter<{id:number|string,name:string}>

  /**
   * 成员列表数据
   * @type {any[]}
   */
  public membersList:any[]

  /**
   * 搜索的成员名称
   * @type {string}
   */
  public membersName:string

  /**
   * 搜索时的延时
   * @type {any}
   */
  public timeOut:any

  /**
   * 是否显示loading效果的标志位
   * @type {boolean}
   */
  public loading:boolean

  constructor(
  	public grMembersService:GrMembersService,
  	public riccioModalService:RiccioModalService,
  	public editTransferSettingService:EditTransferSettingService
  ) { 
    this.loading = true
    this.membersName = ''
  	this.membersList = []
  	this.emitData = new EventEmitter<{id:number|string,name:string}>()
  }

  ngOnInit() {

    this.grMembersService.setModel('Console')

  	this.fnGetMembersList(this.membersName)

  }

  ngOnDestroy(){

  }

  /**
   * @author GR-03
   * @copyright 获取正常员工的列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   */
  public fnGetMembersList(name:string=''):void{
    this.loading = true
  	this.grMembersService.getUserList({
  		type:2,
  		name:name
  	}).subscribe(res=>{
      this.loading = false
  		if(res.status===1){
  			this.membersList = Array.isArray(res['data']['data'])==true
  			?(()=>{
  				let arr = []
  				res['data']['data'].map(e=>{
  					arr.push({
  						id:e['id'],
  						name:e['real_name'],
  						sliceName:e['real_name']?e['real_name'].slice(0,1):''
  					})
  				})

  				return [...arr]
  			})()
  			:[]
  		}
  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 搜索事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   */
  public searchMembers(term:string):void{
    if(this.timeOut) clearTimeout(this.timeOut)

    this.timeOut = setTimeout(()=>{
      this.fnGetMembersList(term)
    },1000)
  }

  /**
   * @author GR-03
   * @copyright 选中成员后返回数据到父组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnEmitTransferData(list:any):void{
  	this.riccioModalService.setSubject({})
  	this.emitData.emit(list)
  }

}
