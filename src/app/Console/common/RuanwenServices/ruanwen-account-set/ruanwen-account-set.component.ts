import { Component, OnInit } from '@angular/core';

import { GrRuanwenServices }		from '../services'
import { postData }		from './postData'
import { postDataErrorName }    from './postData'

import { RiccioNotificationsService }		from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-ruanwen-account-set',
  templateUrl: './ruanwen-account-set.component.html',
  styleUrls: ['../../../../Public/theme/common/common.scss','./ruanwen-account-set.component.scss']
})
export class RuanwenAccountSetComponent implements OnInit {
  
  /**
   * 需要提交的数据
   * @type {postData}
   */
  public postData:postData

  /**
   * 校验数据，处理输入错误时候的红框显示
   * @type {postDataErrorName}
   */
  public postDataErrorName:postDataErrorName

  /**
   * 密码是否显示的字段 默认显示
   * @type {boolean}
   */
  public pswShowOrHide:boolean

  public btnType:boolean

  constructor(
  	public grRuanwenServices:GrRuanwenServices,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
  	this.postData = new postData()
    this.postDataErrorName = new postDataErrorName()
  	this.btnType = true
    this.pswShowOrHide = false
  }

  ngOnInit() {
  	this.fnGetMediaData()
  }



  /**
   * @author GR-03
   * @copyright 获取账号设置信息
   * @param     [param]
   * @return    [return]
   */
  public fnGetMediaData():void{

  	this.grRuanwenServices.getAdminMediaGetMeida().subscribe(res=>{
  		if(res.status===1){
  			this.postData = {...res['data']}
  		}
  	},error=>{
  		throw new Error(error)
  	})

  }


  /**
   * @author GR-03
   * @copyright 点击保存按钮发送数据接口
   * @param     [param]
   * @return    [return]
   */
  public saveAdd():void{  

    if(this.handlePostData() == true){
      this.btnType = false
      this.grRuanwenServices.postAdminMediaSet({
        ...this.postData
      }).subscribe(res=>{
        this.btnType = true
        if(res.status===1){
          this.riccioNotificationsService.setSubject({text:'修改成功'})
        }

      },error=>{
        throw new Error(error)
      })  
    }

  }

  /**
   * @author GR-03
   * @copyright 处理表单数据校验
   * @param     [param]
   * @return    [return]
   * @return    {boolean}   [description]
   */
  public handlePostData():boolean{

    let bool : boolean = true

    for(let e in this.postData){
      if(this.postData[e]==''){
        bool = false
        this.riccioNotificationsService.setSubject({text:this.postDataErrorName[e],status:'danger'})
        return 
      }
    }

    return bool

  }

}
