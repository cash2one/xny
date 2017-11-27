import { Component, OnInit,OnDestroy,Output, EventEmitter } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription'

import { animations } from '../../../../Public/Animations/index'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { GrUserService } from '../../../services/grUser/grUser.service'
import { CompanyChargeService }		from './company-charge.service'

@Component({
  selector: 'app-company-charge',
  templateUrl: './company-charge.component.html',
  styleUrls: [
    '../../../../Public/theme/common/common.scss',
    './company-charge.component.scss'
  ],
  animations:[
    animations.smallBig
  ]
})
export class CompanyChargeComponent implements OnInit {

  /**
   * @author GR-03
   * @copyright 需要返回的选中某一个成员的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  @Output() public emitData:EventEmitter<{id:number|string,name:string}>

  /**
   * 关闭是否事件数据
   * @author GR-05
   */
  @Output() public statuData:EventEmitter<boolean>

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
   * 是否显示loading效果的标志位
   * @type {boolean}
   */
  public loading:boolean

  //更多按钮的显示
  public moreBtn:{
    text:string,
    status:boolean
  }
  //搜索页码
  public searchPage:number

  constructor(
    public riccioNotificationsService:RiccioNotificationsService,
    public grUserService:GrUserService,
  	public companyChargeService:CompanyChargeService
  ) {
    this.loading = true
    this.membersName = ''
    this.moreBtn = {
      text:'加载更多',
      status:true
    }
    this.searchPage = 1
  	this.membersList = []
  	this.emitData = new EventEmitter<{id:number|string,name:string}>()
    this.statuData = new EventEmitter<boolean>()
  }

  ngOnInit() {
  	this.fnGetMembersList(this.membersName,'search')
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
  public fnGetMembersList(name:string='',type:string):void{
    type == 'search'?this.loading = true:{}
    this.grUserService.getUserIndex({
      name:name,
      page:this.searchPage
    }).subscribe(res=>{
      this.loading = false
  		if(res.status===1){
        let temp = Array.isArray(res['data']['data'])==true
        ?(()=>{
          let arr = []
          res['data']['data'].map(e=>{
            arr.push({
              id:e['id'],
              name:e['real_name']?e['real_name']:e['name'],
              sliceName:e['real_name']?e['real_name'].slice(0,1):e['name'].slice(0,1)
            })
          })
          return [...arr]
        })()
        :[]
        if(type === 'search'){
          // 搜索，直接赋值
          this.membersList = temp
        }else if(type === 'more'){
          // 更多，追加赋值
          this.membersList = this.membersList.concat(temp)
        }

        if(this.membersList.length == res.data.total){
          this.moreBtn = {
            text:'已无更多数据',
            status:false
          }
          this.searchPage = 1
        }else{
          this.moreBtn = {
            text:'加载更多',
            status:true
          }
        }
  		}else{
        this.riccioNotificationsService.setSubject({
          text:res.message,
          status:'danger'
        })
        this.moreBtn = {
          text:'加载更多',
          status:true
        }
      }
    })
  }

  /**
   * 显示更多数据
   */
  public fnShowMore(){
    if(this.moreBtn.status){
      this.searchPage += 1
      this.moreBtn = {
        text:'拉取数据中...',
        status:false
      }
      this.fnGetMembersList('','more')
    }
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
    this.searchPage = 1
    this.fnGetMembersList(term,'search')
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
  	this.emitData.emit(list)
    this.statuData.emit(false)
  }

  /**
   * 关闭弹射
   * @author GR-05
   */
  public fnClose(){
    this.statuData.emit(false)
  }
}
