import { Component, OnInit,ViewChild,ElementRef,OnDestroy,Input,OnChanges } from '@angular/core'
import { Subscription }  from 'rxjs/Subscription'


import { GrRoleService }		from '../../../services'
import { RiccioPboxService }	from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RoleAuthService }    from '../role-auth/role-auth.service'
import { RiccioNotificationsService }      from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService }      from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioModalService }      from '../../../../Public/riccio-modal/riccio-modal.service'

import { RoleSelectRoleService }    from './role-select-role/role-select-role.service'

import { RoleData }		from './roleData'

import { RiccioSelectMembersService }    from '../../../../Public/riccio-select-members/riccio-select-members.service'

@Component({
  selector: 'app-role-main',
  templateUrl: './role-main.component.html',
  styleUrls: [
    '../../../../Public/theme/common/common.scss',
    '../../../Console.component.scss',
    './role-main.component.scss'
  ]
})
export class RoleMainComponent implements OnInit {

 
  @ViewChild('Search') Search:ElementRef

  @Input() public model:string = 'Console'
  @Input() public showTip:boolean = true

  /**
   * 角色相关数据
   * @type {any}
   */
  public RoleData:any

  /**
   * 角色成员相关数据
   * @type {any}
   */
  public RoleUserData:any

  /**
   * 角色权限相关数据
   * @type {[type]}
   */
  public RoleAuthData:any 

  /**
   * 页面交互的数据
   * @type {any}
   */
  public mutualData:any

  /**
   * 判断是否显示loading效果的字段
   * @type {boolean}
   */
  public loading:boolean

  /**
   * 是否显示全选按钮；
   * @type {boolean}
   */
  public allCheckIs:boolean

  /**
   * 根据该字段来判断需要显示哪个弹窗窗口
   * @type {string}
   */
  public riccioModalSymbol:string

  /**
   * 选中的某个角色详情信息
   * @type {any}
   */
  public checkRoleInfo:any

  /**
   * 选中的成员数据
   * @type {any}
   */
  public checkMemberInfo:any

  /**
   * 显示不同的pbox为other的组件的标志位
   * @type {string}
   */
  public pboxOtherSymbol:string

  /**
   * 添加权限人
   * @type {any}
   */
  public selectMembersData:any

  /**
   * 分页的总数
   * @type {any}
   */
  public pageTotal:any

  public RxSubjectPbox:Subscription
  public RxSubjectModal:Subscription
  public RxSubjectPopRight:Subscription


  constructor(
  	public grRoleService:GrRoleService,
    public roleSelectRoleService:RoleSelectRoleService,
    public roleAuthService:RoleAuthService,
    public riccioPboxService:RiccioPboxService,
    public riccioNotificationsService:RiccioNotificationsService,
    public riccioPopUpRightService:RiccioPopUpRightService,
    public riccioModalService:RiccioModalService,
    public riccioSelectMembersService:RiccioSelectMembersService
  ) { 
    this.pboxOtherSymbol = ''
    this.checkMemberInfo = {}
    this.checkRoleInfo = {
      groupname:"企业负责人",
      id:'0'
    }
    this.riccioModalSymbol = ''
    this.allCheckIs = false
  	this.loading = true
  	this.RoleData = new RoleData().RoleData
  	this.RoleUserData = new RoleData().RoleUserData
  	this.mutualData = new RoleData().mutualData
    this.RoleAuthData = new RoleData().RoleAuthData
    this.pageTotal = 0
    this.selectMembersData = new RoleData().selectMembersData
  	/**
     * @author GR-03
     * @copyright [接受pbox传递回来的数据流]
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
  	this.RxSubjectPbox = this.riccioPboxService.getEmit().subscribe(res=>{
      console.log(res)
	  	switch (res['type']) {
        case "more":
          (()=>{
            if(res['data']['id']==0){
                this.riccioModalSymbol = 'moreRole'
                this.riccioModalService.setSubject({
                  header:"复制并新增角色",
                  type:'addRole',
                  data:this.checkRoleInfo,
                  noBtn:true
                })
            }
          })()
          break
        case "delete":
          (()=>{
            this.riccioNotificationsService.setSubject({
              text:'成功',
              status:'success',
              position:{
                right:'300',
                top:'30'
              }
            })
          })()
          break

        case "tree":
          (()=>{
            switch (res['data']['id']) {
              case 0:
                this.riccioModalSymbol = 'addRole'
                this.riccioModalService.setSubject({
                  header:"添加子角色",
                  type:'addRole',
                  data:this.checkRoleInfo,
                  noBtn:true
                })
                break;
              
              case 1:
                this.riccioModalSymbol = 'editRole'
                this.riccioModalService.setSubject({
                  header:"编辑角色",
                  type:'editRole',
                  data:this.checkRoleInfo,
                  noBtn:true
                })
                break;

              case 3:
                this.riccioModalSymbol = 'deleteRole'
                this.riccioModalService.setSubject({
                  header:"确认删除该角色?",
                  type:'deleteRole',
                  noBtn:true
                })
                break;

              default:break;
            }
          })()
          break

	  		default:break
	  	}

  	})

    /**
     * @author GR-03
     * @copyright 接受Modal发射回来的数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.RxSubjectModal = this.riccioModalService.getEmit().subscribe(res=>{
      switch (res['type']) {
        case 'deleteRole':
          (()=>{
            
          })()
          break;
        
        default:break;
      }
    })


    /**
     * @author GR-03
     * @copyright 监听popright发射回来的数据流
     * @param     [param]
     * @return    [return]
     * @check     GR-05        GR-03
     */
    this.RxSubjectPopRight = this.riccioPopUpRightService.getEmit().subscribe(res=>{
      switch (res['type']['id']) {
        case 1:          //批量分配角色
          (()=>{
            this.riccioModalSymbol = ''
            setTimeout(()=>this.riccioModalSymbol = 'assignRole')
            this.checkMemberInfo = [...res['data']]
            this.riccioModalService.setSubject({
              data:this.checkMemberInfo,
              size: 500,
              header: '分配角色',
              type:'assignRole',
              noBtn:true
            })
          })()
          break;

        case 0:          //批量移除
          (()=>{
            this.riccioModalSymbol = ''
            setTimeout(()=>this.riccioModalSymbol = 'deleteRoleUser')
            this.checkMemberInfo = [...res['data']]
            this.riccioModalService.setSubject({
              data:this.checkMemberInfo,
              size: 700,
              header: '移除提示',
              type:'deleteRoleUser',
              noBtn:true
            })
          })()
          break;
   
        default:break;
      }
    })


  }

  ngOnInit() {

    this.grRoleService.setModel(this.model)

  	this.FnGetRoleList()   // 获取角色列表

    this.FnNoRoleList()    // 获取未设置角色成员列表

    this.FnGetRoleKey()    // 获取企业负责人信息

    this.FnGetRoleAuth()   // 获取角色列表信息
  }

  ngOnDestroy(){
    this.RxSubjectPbox.unsubscribe()
    this.RxSubjectModal.unsubscribe()
    this.RxSubjectPopRight.unsubscribe()
  }

  ngOnChanges(){
  }

  /**
   * @author GR-03
   * @copyright 获取角色权限列表信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetRoleAuth():void{
    this.grRoleService.getRolePartTabTree().subscribe(res=>{
      if(res.status===1){
        this.RoleAuthData.data = res.data
      }
    })
  }


  /**
   * @author GR-03
   * @copyright 获取未设置角色的成员列表信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnNoRoleList():void{
    this.RoleUserData.getUserListObj['id']='-1'
    this.grRoleService.postRolePartUserList(this.RoleUserData.getUserListObj).subscribe(res=>{
      if(res.status===1){
        this.mutualData.NoRole.length = res['data']['total']
      }

    },error=>{
      throw new Error(error)
    })

  }

  /**
   * @author GR-03
   * @copyright 获取企业负责人的信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetRoleKey():void{
    this.RoleUserData.getUserListObj['id']='0'
    this.FnGetRoleUserList()
  }


  /**
   * @author GR-03
   * @copyright 获取角色树状结构列表的接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetRoleList():void{
  	this.grRoleService.getRolePartList().subscribe(res=>{
      if(res.status===1){
        this.RoleData.dataList = [{groupname:'企业负责人',chilren:[...res['data']],id:'0'}]
      }

  	},error=>{
  		throw new Error(error)
  	})
  }


  /**
   * @author GR-03
   * @copyright 获取某个角色下的成员方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetRoleUserList():void{

  	this.loading = true

  	this.grRoleService.postRolePartUserList(this.RoleUserData.getUserListObj).subscribe(res=>{
  		this.loading = false
  		if(res.status===1){
        this.RoleUserData.dataList = res['data']['data']?[...res['data']['data']]:[]
        this.pageTotal = res['data']['total']
        this.mutualData.presentRole.length = res['data']['total']

        this.RoleUserData.dataList.map(e=>e['isCheck']=false)
  		}

  	},error=>{
  		throw new Error(error)
  	})

  }

  /**
   * @author GR-03
   * @copyright 接受tree角色列表的数据方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       event [description]
   */
  public CallTreeData(event:any):void{
    this.riccioModalSymbol = ''    //取消显示编辑和添加角色的视图
    this.checkRoleInfo = event
    if(event['id']=='0'){
      this.RoleData.pboxOptions = [
        {
          id:0,
          name:'添加子角色'
        },
        {
          id:1,
          name:'编辑角色',
          status:'disabled'
        },
        {
          id:3,
          name:'删除角色',
          status:'disabled'
        }
      ]
    }else{
      this.RoleData.pboxOptions = new RoleData().RoleData.pboxOptions
    }

    this.mutualData.NoRole.color = false
    this.mutualData.presentRole.titile = event['groupname']
    this.RoleUserData.getUserListObj = new RoleData().RoleUserData.getUserListObj
    this.RoleUserData.getUserListObj['id'] = event['id']
    this.Search?this.Search.nativeElement.value = '':false
    this.FnGetRoleUserList()

    if(this.RoleUserData.getUserListObj['id']!=='0'){
      this.roleAuthService.RoleData.symbol=event['id']
      let ArrRules = (event['rules']==""||event['rules']==null)?[]:event['rules'].split(',')
      this.roleAuthService.RoleData.rules = [...ArrRules]
    }
    else{
      this.roleAuthService.RoleData.symbol='1'
    }

    if(this.mutualData.tabSwitch=='1'){
      this.mutualData.tabSwitch='0'
      setTimeout(()=>{
        this.mutualData.tabSwitch='1'
      },100)
    }

    this.riccioPopUpRightService.setSubject({})

    this.allCheckIs = false

  }

  public fnPbox(event:any){
    // this.checkRoleInfo = event
    this.checkRoleInfo['id'] = event['id']
    this.RoleUserData.getUserListObj['id'] = event['id']
    this.roleAuthService.RoleData.symbol=event['id']
    this.riccioModalSymbol = ''
    if(event['id']=='0'){
      this.RoleData.pboxOptions = [
        {
          id:0,
          name:'添加子角色'
        },
        {
          id:1,
          name:'编辑角色',
          status:'disabled'
        },
        {
          id:3,
          name:'删除角色',
          status:'disabled'
        }
      ]
    }else{
      this.RoleData.pboxOptions = new RoleData().RoleData.pboxOptions
    } 
  }

  /**
   * @author GR-03
   * @copyright 显示pbox组件不同数据的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    str    [description]
   * @param     {any}       $event [description]
   * @param     {any}       dataEl [description]
   */
  public FnShowPbox(str:string,$event:any,dataEl:any):void{

  	switch (str) {
      case "more":
        (()=>{
            this.riccioPboxService.setSubject({
              el:dataEl,
              type:'more',
              position:{
                left:$event.clientX-100,
                top:$event.clientY,
                width:200
              },
              data: [{id:0,name:'复制并新增角色'}]
            })
        })()
        break
  		case "selectClick":
  			(()=>{
	          let obj = {
	            el:dataEl,
	            type:'tree',
	            position:{
	              left:500,
	              top:230,
	              width:200
	            },
	            data: [...new RoleData().mutualData.PboxText.selectData]
	          }
	          this.riccioPboxService.setSubject(obj)
  			})()
  			break
      case "selectClickTitle":
        (()=>{

            let showData = [...new RoleData().RoleData.pboxOptions]
            if(this.RoleUserData.getUserListObj['id']=='0'){
              showData = [
                {
                  id:0,
                  name:'添加子角色'
                },
                {
                  id:1,
                  name:'编辑角色',
                  status:'disabled'
                },
                {
                  id:3,
                  name:'删除角色',
                  status:'disabled'
                }
              ]
            }
            let obj = {
              el:dataEl,
              type:'tree',
              position:{
                left:$event.clientX-100,
                top:$event.clientY,
                width:200
              },
              data: showData
            }
            this.riccioPboxService.setSubject(obj)
        })()
        break
  		
  		default:break
  	}

  }


  /**
   * @author GR-03
   * @copyright 搜索事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    value [description]
   * @param     {string}    str   [description]
   */
  public FnSearchList(value:string,str:string):void{
	this.Search.nativeElement.blur()
  	if((str==='blur'&&value.trim()!=='')||value===''){
  		this.RoleUserData.getUserListObj['name'] = value.trim()
  		this.FnGetRoleUserList()
  	}

  }


  /**
   * @author GR-03
   * @copyright 移除某个角色下的成员
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       list  [description]
   */
  public FnDeleteRoleUser(list:any):void{
    this.riccioModalSymbol = ''
    setTimeout(()=>this.riccioModalSymbol = 'deleteRoleUser')
    this.checkMemberInfo = [list]
    this.riccioModalService.setSubject({
      data:this.checkMemberInfo,
      size: 700,
      header: '移除提示',
      type:'deleteRoleUser',
      noBtn:true
    })
  }


  /**
   * @author GR-03
   * @copyright 点击查看未设置角色成员列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetNoRole():void{
    this.riccioPopUpRightService.setSubject({})
    this.allCheckIs = false
    
    this.RoleUserData.getUserListObj['id']='-1'
    this.mutualData.presentRole.titile = '未设置角色的员工'
    this.mutualData.presentRole.length = this.mutualData.NoRole.length
    this.mutualData.tabSwitch = '0'
    this.FnGetRoleUserList()

  }

 
  /**
   * @author GR-03
   * @copyright 点击勾选的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             list   [description]
   * @param     {string="single"} symbol [description]
   */
  public FnShowPopUp(list:any,symbol:string="single"):void{

    let obj = {
      'data':[],
      'viewText':this.RoleUserData.getUserListObj['id']=='-1'?[...this.mutualData.popRightTextData.noRole]:[...this.mutualData.popRightTextData.normal]
    }

    if(symbol==='single'){
      list.isCheck = !list.isCheck

      this.allCheckIs = this.RoleUserData.dataList.filter(e=>e['isCheck']==false).length==0?true:false

    }else if(symbol==='all'){
      this.allCheckIs = !this.allCheckIs
      this.RoleUserData.dataList.map(e=>e['isCheck'] = this.allCheckIs)
    }

    obj['data'] = [...this.RoleUserData.dataList]

    this.riccioPopUpRightService.setSubject(obj)

  }

  /**
   * @author GR-03
   * @copyright 接受role-add-or-edit组件的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public fnOutputRoleAddEdit(value:any):void{
    this.pboxOtherSymbol = value.name
    if(value.isShow===false){
      this.riccioModalService.setSubject({})
    }
  }

  /**
   * @author GR-03
   * @copyright 判断添加和编辑完成后是否需要重新请求刷新页面
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}   value [description]
   */
  public fnOutputRoleRefresh(value:any,type:string):void{
    if(type==='editRole'){
      this.checkRoleInfo = Object.assign({},this.checkRoleInfo,value['data'])
      this.CallTreeData(this.checkRoleInfo)
    }

    if(value.show===true){
      this.FnGetRoleList()
    }

  }

  /**
   * @author GR-03
   * @copyright 接受deleterole组件的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   value [description]
   */
  public fnOutputRoleDelete(value:boolean):void{
    if(value===true){
      this.FnGetRoleList()
      this.CallTreeData({id:'0',groupname:'企业负责人'})
    }
  }

  /**
   * @author GR-03
   * @copyright 显示model组件的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05        GR-03
   * @param     {string}     str     [description]
   * @param     {MouseEvent} event   [description]
   * @param     {ElementRef} dataEle [description]
   */
  public fnShowModel(str:string,event:MouseEvent,dataEle:ElementRef,list:any):void{
    switch (str) {
      case "assignRole":
        (()=>{
          this.riccioModalSymbol = 'assignRole'
          this.checkMemberInfo = [{...list}]
          this.riccioModalService.setSubject({
            data:[list],
            size: 500,
            header: '分配角色',
            type:'assignRole',
            noBtn:true
          })
        })()
        break;
      
      default:break;
    }
  }

  /**
   * @author GR-03
   * @copyright 接收分配角色传递过来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   value [description]
   */
  public fnOutputAddignRole(value:boolean):void{
    if(value===true){
      this.FnNoRoleList()
      this.FnGetNoRole()
    }
  }

  /**
   * @author GR-03
   * @copyright 接收role-delete-userlist组件emit回来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   value [description]
   */
  public fnOutputRoleDeleteUser(value:boolean):void{
    if(value===true){
      this.CallTreeData(this.checkRoleInfo)
      this.FnNoRoleList()
      this.RoleUserData.getUserListObj['id']=this.checkRoleInfo['id']
    }
  }

  /**
   * @author GR-03
   * @copyright 点击选择成员按钮显示选择成员组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnAddRoleUser():void{
    this.selectMembersData['input']['isShow'] = true
    /*
    左侧数据
     */
     this.selectMembersLeftData()

    /*
    右侧数据
     */
     this.selectMembersRightData()

  }  

  /**
   * @author GR-03
   * @copyright 获取左侧数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public selectMembersLeftData(type:string='empty',page:string|number=1):void{
    this.selectMembersData['input']['nextPage'] = 'loading'
    if(type=='empty') this.selectMembersData['input']['leftData'] = []
    this.grRoleService.postRolePartUnUserList({
      'rows':20,
      'name':this.selectMembersData['output']['searchValue'],
      'model':this.model,
      'page':page,
      'id':this.RoleUserData.getUserListObj['id']
    }).subscribe(res=>{
      if(res.status===1){
        if(res['data']['next_page_url']!==null){
          this.selectMembersData['input']['nextPage'] = 'normal'
        }else {
          this.selectMembersData['input']['nextPage'] = 'hide'
        }
        this.selectMembersData['input']['leftData'] = type=='empty'?res['data']['data']:[...this.selectMembersData['input']['leftData'],...res['data']['data']]

      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 获取右侧数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public selectMembersRightData():void{
    this.grRoleService.postRolePartUserList({
      'id':this.RoleUserData.getUserListObj['id'],
      'model':this.model,
      'rows':1000
    }).subscribe(res=>{
      if(res.status===1){
        this.selectMembersData['input']['rightData'] = res['data']['data']
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 接收选择成员数据的组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    type  [description]
   * @param     {any}       value [description]
   */
  public fnOutputSelectMembers(type:string,value:any):void{
    switch (type) {
      case "searchValue":
        this.selectMembersData['output']['searchValue'] = value
        this.selectMembersLeftData()
        break;
      
      case "pageValue":
        this.selectMembersLeftData('more',value)
        break;

      case "emitData":
        (()=>{
          this.grRoleService.postRolePartUserAdd({
            'id':this.RoleUserData.getUserListObj['id'],
            'userid':value.map(e=>e['id']).join(',')
          }).subscribe(_res=>{
            if(_res.status===1){
              this.FnGetRoleUserList()
              this.riccioNotificationsService.setSubject({text:'添加成功'})
            }
          },error=>{
            throw new Error(error)
          })
        })()
        break;

      case "close":
        this.selectMembersData['input']['isShow']=!value
        this.selectMembersData['input']['leftData'] = []
        this.selectMembersData['input']['rightData'] = []
        break;

      default:break;
    }
  }



  /**
   * @author GR-03
   * @copyright 接受分页组件传递回来的当前页数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnOutputPage(value:any):void{
    this.RoleUserData.getUserListObj.page = value.page
    this.RoleUserData.getUserListObj.rows = value.rows
    this.FnGetRoleUserList()
  }


}
