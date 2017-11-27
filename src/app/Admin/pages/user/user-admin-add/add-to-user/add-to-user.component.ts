import { Component, OnInit,ElementRef,Renderer,OnDestroy,ViewChild,Output,EventEmitter } from '@angular/core'
import { Subscription }    from 'rxjs/Subscription'

import { GrMembersService }		from '../../../../services'
import { GrUserService } from '../../../../services/grUser/grUser.service'
import { RiccioNotificationsService }  from '../../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService }    from '../../../../../Public/riccio-pbox/riccio-pbox.service'

import { AddToUsersData }		from './AddToUsersData'
import { btnData }      from './btnData'

@Component({
  selector: 'app-add-to-user',
  templateUrl: './add-to-user.component.html',
  styleUrls: [
    '../../../role/role.common.scss',
    '../user-admin-add.component.scss',
    './add-to-user.component.scss'
  ]
})
export class AddToUserComponent implements OnInit {

  @Output() callData:EventEmitter<string>

  public postAddData:AddToUsersData
  public mobilePhone:string         // 帐号
  public danger:any

  public btnData:btnData

  constructor(
    public grMembersService:GrMembersService,
    public grUserService:GrUserService,
    public riccioPboxService:RiccioPboxService,
  	public riccioNotificationsService:RiccioNotificationsService
  ) {
    this.btnData = new btnData()
    this.callData = new EventEmitter<string>()
  	this.mobilePhone = ''
  	this.postAddData = new AddToUsersData()
  	this.danger = {
  		'mobile':false
  	}
    //cmf 添加
    this.membersList = [];
    this.searchPage = 1;
    this.moreBtn = {
      text:'加载更多',
      status:true
    }
    this.membersName = '';
  }

  ngOnInit() {}

  ngOnDestroy(){}

  //手机号失去焦点之后获取该用户的信息同时获取到id
  public fnGetFindMobile():void{

  	this.danger['mobile'] = this.mobilePhone.trim()===""||!(/^1[34578]\d{9}$/.test(this.mobilePhone.trim().toString()))
  	?(()=>{
  		this.riccioNotificationsService.setSubject({
        text:'请填写正确的手机号',
        status:'danger'
      })
  		return true
  	})()
  	:(()=>{
  		this.grMembersService.postUserIdByPhone({
        mobile:this.mobilePhone.trim(),
        cid:0
      }).subscribe(res=>{
  			if(res.status===1){
          this.postAddData['user_id'] = res['data']
  			}else if(res.status===0){
		  		this.danger['mobile'] = true
  			}
  		},error=>{
  			throw new Error(error)
  		})
  		return false
  	})()
  }

  //所有失去焦点之后的事件判断
  public fnAllBlurEle(str:string):void{
  	switch (str) {
  		case "real_name":
  			(()=>{
  				this.danger[str] = this.postAddData[str].trim()===""?(()=>{
  					let obj = {
  						text:'请输入真实姓名',
  						status:'danger'
  					}
			  		this.riccioNotificationsService.setSubject(obj)
			  		return true
  				})():false
  			})()
  			break

  		case "positionname":
  			(()=>{
  				this.danger[str] = this.postAddData[str].trim()===""
  				?(()=>{
  					let obj = {
  						text:'请输入职务',
  						status:'danger'
  					}
			  		this.riccioNotificationsService.setSubject(obj)
			  		return true
  				})():false
  			})()
  			break
    }
  }

  /**
   * @author GR-03
   * @copyright 添加成员按钮
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnAddMembers():void{
    this.fnGetFindMobile()

    let bool = true;
    for(let e in this.danger){
      if(this.danger[e]==true){
        bool = false
      }
    }
    if(bool==true&&this.postAddData['user_id']!==''){
      this.btnData = {
        text:'添加中...',
        disabled:true
      }
      this.grUserService.postUserAdminAdd(this.postAddData).subscribe(res=>{
        this.btnData = new btnData()
        if(res.status===1){
          this.riccioNotificationsService.setSubject({
            text:'添加成功',
            status:'success'
          })
          this.callData.emit('success')
        }
      },error=>{
        throw new Error(error)
      })
    }

  }

  /**
   * @author GR-03
   * @copyright 关闭视图的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public Close():void{
    this.callData.emit('close')
  }

  //cmf 添加
  public isShow:boolean = false;
  public isClose:boolean;
  public loading:boolean;
  public searchPage:number;
  public membersList:any[];
  public moreBtn:{
    text:string,
    status:boolean
  };
  public searchValue:string;
  public membersName:string;
  public title:string = "请选择成员";
  public placeholder:string = "请输入员工姓名";
  public header:string = "";
  public name:string = "name";
  public nextPage:string = "hide";
  public member:any;

  public closeViewHandler(isClose){
    this.isClose = isClose;
    if(this.isClose == true){
      this.isShow = false;
    }
  }
  public searchUser():void{
    this.isShow = true;
    this.fnGetMembersList(this.membersName,'search');
  }

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
                sliceName:e['real_name']?e['real_name'].slice(0,1):e['name'].slice(0,1),
                mobile:e['mobile']
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


  emitDataHandler(member){
    this.member = member;
    this.isShow = false;
    this.mobilePhone = this.member.mobile;
    this.postAddData['real_name'] = this.member.name;
    this.fnGetFindMobile();

  }
  //搜索事件
  searchHandler(searchValue){
    this.searchValue = searchValue;
    this.fnGetMembersList(this.searchValue,'search')
  }

}
