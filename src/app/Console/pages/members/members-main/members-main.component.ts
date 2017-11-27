import { Component, OnInit,ViewChild,Renderer ,OnDestroy,ElementRef} from '@angular/core'
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router'
import { Subscription }    from 'rxjs/Subscription'

import { RiccioPboxService }    from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioPopUpRightService }      from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioSelectMembersService }    from '../../../../Public/riccio-select-members/riccio-select-members.service'    
import { RiccioTreeDepartmentService }      from '../../../../Public/riccio-tree-department/riccio-tree-department.service'
import { RiccioModalService }      from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService }    from '../../../../Public/riccio-notifications/riccio-notifications.service'

import { GrMembersService }      from '../../../services'

import { membersData }        from './membersData'
import { PopUpRightPrompt }    from './PopUpRightPrompt'

@Component({
  selector: 'app-members-main',
  templateUrl: './members-main.component.html',
  styleUrls: ['../../../Console.component.scss','./members-main.component.scss']
})
export class MembersMainComponent implements OnInit {

  @ViewChild('selectText') selectText: ElementRef;
  @ViewChild('tableTopTitle') tableTopTitle: ElementRef;
  @ViewChild('FnAllElement')  FnAllElement:any
  @ViewChild('Search')      Search:any

  public membersDetailsData:any 
  public DeparmentListData:any    //所有部门的列表
  public TableTitle:any
  public DeparmentUserListData:any//所有员工列表
  public AllDeparmentUserListData:any //所有员工的列表(不可变)
  public pboxOptions:any[]    // 部门列表选择下拉框时的列表选项；
  public NoAdminList:any[]
  public NoDepartment:any[]
  public SelectText:string    // 筛选的字段数据
  public AddMembers:any       //添加成员的数据
  public departmentInfo:any   //某一个部门的详细数据

  public selectMembersData:any  // 选择成员的相关数据

  public treeLoadingType:string      // 是否显示树形loading效果的字段
  public tableLoadingType:string      // 是否显示表格loading效果的字段

  public allCheckIs:boolean   // 是否显示全选按钮

  public postSearchUserData:any  // 搜索企业成员列表的字段

  public RiccioModal:any      // modal模态框的数据
  public ModalShowSwtitch:string // 判断要显示哪一个模态框的视图
  public PopUpRightData:any[] // PopUpRight组件显示的内容数据
  public PopUpRightPrompt:any // PopUpRight组件各种提示的数据

  public riccioModalEmitSubject:any //Modal模态框的订阅,用于组建销毁时取消订阅

  public DepartmentAdminList:any[] // 部门管理员列表
  public departmentPrincipal:string // 部门负责人

  public adminOrDepartment:string // 该字段来判断pbox为other的时候该显示设置负责人还是设置主属部门的字段
  public adminOrDepartmentIsAllCompany:boolean // 该字段来判断pbox为other的时候是否显示全公司选项


  public rxPbox$:Subscription   

  /**
   * 设置主属部门或附属部门的辨别字段
   * @type {string}
   */
  public constDepartmentSymbol:string

  /**
   * 当前搜索的字段用来判断搜索的值是否发生了变化，只有变了才进心搜索
   * @type {string}
   */
  public constSearchValue:string

  /**
   * 分页组件的总数
   * @type {any}
   */
  public pageTotal:any

  /**
   * 未设置负责人的分页对象
   * @type {any}
   */
  public pageTotalNoAdmin:any

  /**
   * 未设置部门的分页总数
   * @type {any}
   */
  public pageTotalNoDepartment:any

  constructor(
  	public riccioPboxService:RiccioPboxService,
    public riccioPopUpRightService:RiccioPopUpRightService,
    public riccioSelectMembersService:RiccioSelectMembersService,
    public riccioTreeDepartmentService:RiccioTreeDepartmentService,
    public riccioModalService:RiccioModalService,
    public riccioNotificationsService:RiccioNotificationsService,
    public activatedRoute:ActivatedRoute,
    public router:Router,
    public renderer:Renderer,
    public grMembersService:GrMembersService
  ) { 

    this.grMembersService.setModel("Console")
    
    this.adminOrDepartmentIsAllCompany = false
    this.treeLoadingType = 'show'
    this.tableLoadingType = 'show'
    this.pageTotal = 0
    this.departmentInfo = {data:{},symbol:'create'}
    this.adminOrDepartment = 'admin'
    this.departmentPrincipal = ''
    this.allCheckIs = false
    this.TableTitle = new membersData().TableTitle
    this.pboxOptions = new membersData().pboxOptions
    this.DeparmentListData = new membersData().DeparmentListData
    this.membersDetailsData = new membersData().membersDetailsData
    this.NoAdminList = new membersData().NoAdminList
    this.NoDepartment = new membersData().NoDepartment
    this.postSearchUserData = new membersData().postSearchUserData
    this.AddMembers = new membersData().AddMembers
    this.selectMembersData = new membersData().selectMembersData
    this.DeparmentUserListData = []
    this.SelectText = '正常员工'
    this.RiccioModal = new membersData().RiccioModal
    this.ModalShowSwtitch = 'delete'
    this.PopUpRightData = new membersData().PopUpRightData
    this.PopUpRightPrompt = new PopUpRightPrompt()
    this.DepartmentAdminList = new membersData().DepartmentAdminList
    this.constDepartmentSymbol = 'Main'

    this.pageTotalNoAdmin = {
      total:'',
      page:'1',
      rows:'20'
    }

    this.pageTotalNoDepartment = {
      total:'',
      page:'1',
      rows:'20'
    }
  }

  ngOnInit() {
    
    if(this.FnAllElement){
      this.FnAllElement.nativeElement.addEventListener('click',(e)=>{

        let bool = false
        e['path'].map(el=>{

          if(el['tagName']==='TD'&&el['className']==='customer-content'){
            bool = true
          }

        })

        if(bool==false){
          this.membersDetailsData.isShow = false
        }

      },true)
    }

    //获取部门列表
    this.FnGetDeparment()

    //获取该企业所有部门成员
    this.FnGetUserList()

    //获取没有负责任的部门方法
    this.FnGetNoAdmin()

    //获取未设置部门的员工方法
    this.FnGetNoDepartment()

    //监听PopRight发射回来的数据流
    this.getPopRightEmit()

    //监听pbox发射回来的数据
    this.getPboxEmit()

    //监听Modal发射回来的数据流
    this.getModalEmit()
   
  }

  ngOnDestroy(){
     this.riccioModalEmitSubject.unsubscribe()
     this.rxPbox$.unsubscribe()
  }

  /**
   * @author GR-03
   * @copyright 获取没有负责人的部门方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetNoAdmin():void{
    this.tableLoadingType = 'show'
    this.grMembersService.getDepartmentNoAdmin({
      'page':this.pageTotalNoAdmin.page,
      'rows':this.pageTotalNoAdmin.rows
    }).subscribe(res=>{
      this.tableLoadingType = 'hide'
      if(res.status===1){
        this.NoAdminList = res['data']['data']?[...res['data']['data']]:[]
        this.pageTotalNoAdmin.total = res['data']['total']
        this.NoAdminList.map(e=>e['isCheck']=false)

        if(this.NoAdminList.length==0){
          this.tableLoadingType = 'empty'
        }

      }
    })
    this.riccioPopUpRightService.setSubject({})
    this.allCheckIs = false
  }

  /**
   * @author GR-03
   * @copyright 获取未设置部门的员工方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetNoDepartment():void{
    this.tableLoadingType = 'show'
    this.grMembersService.getUserNoDepartment({
      'page':this.pageTotalNoDepartment.page,
      'rows':this.pageTotalNoDepartment.rows
    }).subscribe(res=>{
      this.tableLoadingType = 'hide'
      if(res.status===1){
        this.NoDepartment = res['data']['data']?[...res['data']['data']]:[]
        this.pageTotalNoDepartment.total = res['data']['total']
        this.NoDepartment.map(e=>e['isCheck']=false)

        if(this.NoDepartment.length==0){
          this.tableLoadingType = 'empty'
        }

      }
    })
    this.riccioPopUpRightService.setSubject({})
    this.allCheckIs = false
  }


  /**
   * @author GR-03
   * @copyright 搜索事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    value [description]
   * @param     {string}    type  [description]
   */
  public FnSearchList(value:string,type:string):void{
    this.Search.nativeElement.blur()
    // constSearchValue
    if((type==='blur'&&value.trim()!=='')||value===''){
      if(this.TableTitle.symbol==='AllUserItems'){
          this.postSearchUserData.data['name'] = value
          this.FnGetUserList()
      }
    }
  }


  /**
   * @author GR-03
   * @copyright 点击输入框显示pbox选项列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}    str    [description]
   * @param     {any}       event  [description]
   * @param     {any}       dataEl [description]
   * @param     {any    =      {}}        list [description]
   */
  public FnShowPbox(str:string,event:any,dataEl:any,list:any = {}):void{
    switch (str) {
      case "selectClick":
        (()=>{
          let position = this.selectText.nativeElement.getBoundingClientRect()
          let obj = {
            el:dataEl,
            type:'select',
            position:{
              left:position.left,
              top:position.top,
              width:position.width
            },
            data:[
              {
                'id':0,'name':'全部员工'
              },
              {
                'id':2,'name':'正常员工'
              },
              {
                'id':1,'name':'部门管理员'
              },
              {
                'id':4,'name':'部门负责人'
              },
              {
                'id':3,'name':'禁用员工'
              }
            ]
          }
          this.riccioPboxService.setSubject(obj)
        })()
        break

      case "tableClick":
        (()=>{
          let obj = {
            'el':dataEl,
            'type':'table',
            'position':{
              left:event.clientX-100,
              top:event.clientY,
              width:200
            },
            'data':this.postSearchUserData['data']['department_id']==''?[{'id':2,'name':'禁用'}]:(()=>{
              let pboxDown = []

              if(this.postSearchUserData['data']['type']==3){
                pboxDown = [{'id':4,'name':'启用'},{'id':7,'name':'移除'}]
              }else{
                pboxDown = [{'id':2,'name':'禁用'},{'id':7,'name':'移除'}]
              }

              return pboxDown
            })()
          }
          this.riccioPboxService.setSubject(obj)
          this.membersDetailsData.data = list
        })()
        break

      case "selectClickTitle":
        (()=>{
          let position = this.tableTopTitle.nativeElement.getBoundingClientRect()
          setTimeout(()=>{
            let obj = {
              el:dataEl,
              type:'tree',
              position:{
                left:position.left - 20,
                top:position.top + 60,
                width:200
              },
              data:this.pboxOptions
            }  
            if(this.postSearchUserData['data']['department_id']==''){
              obj['data'] = [
                {
                    id:0,
                    name:'添加子部门',
                    status:'show'
                },
                {
                    id:1,
                    name:'编辑部门',
                    status:'disabled'
                },
                {
                    id:3,
                    name:'禁用部门',
                    status:'disabled'
                },
                {
                    id:4,
                    name:'添加已有成员',
                    status:'disabled'
                }
              ]
            }
            this.riccioPboxService.setSubject(obj)
          })

        })()
        break

      default:break
    }

  }


  /**
   * @author GR-03
   * @copyright 从顶部左侧展开的效果
   * @param     [param]
   * @return    [return]
   * @check     GR-05             GR-03
   * @param     {any}             list   [description]
   * @param     {string}          str    [description]
   * @param     {string="single"} symbol [description]
   */
  public FnShowPopUp(list:any,str:string,symbol:string="single"):void{

    let obj = {
      'data':[...this.DeparmentUserListData],
      'viewText':this.postSearchUserData['data']['department_id']==''
      ?[...this.PopUpRightData].filter(e=>e['id']!=1).filter(e=>e['id']!=7)
      :[...this.PopUpRightData]
    }

    if(symbol==='single'){
      list.isCheck = !list.isCheck

      this.allCheckIs = this[str].filter(e=>e['isCheck']==false).length==0?true:false

    }else if(symbol==='all'){
      this.allCheckIs = !this.allCheckIs
      this[str].map(e=>e['isCheck'] = this.allCheckIs)
    }

    this.riccioPopUpRightService.setSubject(obj)
  }

  /**
   * @author GR-03
   * @copyright 接收members－details的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {boolean}   bool  [description]
   */
  public OutPutDetails(bool:boolean):void{
    this.membersDetailsData.isShow = bool
  }

  /**
   * @author GR-03
   * @copyright 点击右侧弹出列表详情页面
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       data  [description]
   * @param     {any}       event [description]
   */
  public FnShowDetails(data:any,event:any):void{

    let bool = false

    event['path'].map(e=>{
      if(e['className']==='customer-content'&&e['tagName']==='TD'){
        bool=true
      }
    }) 

    if(bool===false){}
    else{
      this.membersDetailsData.isShow = true
      this.membersDetailsData.data = data
    }

  }

  /**
   * @author GR-03
   * @copyright 获取部门列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetDeparment():void{
    this.DeparmentListData.length=0
    this.grMembersService.getMembersDepartment().subscribe(res=>{
      if(res.status===1){
        this.DeparmentListData=[{name:'全公司',chilren:[...res['data']],id:''}]
      }
    })

  }

  /**
   * @author GR-03
   * @copyright 获取该企业所有成员
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetUserList():void{
    this.tableLoadingType = 'show'
    this.DepartmentAdminList.length = 0
    this.FnGetDepartmentAdmin(this.postSearchUserData.data['department_id'])
    this.FnGetDepartmentPrincipal(this.postSearchUserData.data['department_id'])
    this.grMembersService.getUserList(this.postSearchUserData.data).subscribe(res=>{
      this.tableLoadingType = 'hide'
      if(res.status===1){
        this.postSearchUserData.length = res['data']['total']
        this.pageTotal = this.postSearchUserData.length
        this.DeparmentUserListData = res['data']['data']?[...res['data']['data']]:[]
        this.DeparmentUserListData.map(e=>e['isCheck']=false)
        if(this.postSearchUserData.data.department_id=='') this.AllDeparmentUserListData = [...this.DeparmentUserListData]
        
        if(this.DeparmentUserListData.length==0){
          this.tableLoadingType = 'empty'
        }

      }
    })
  }


  /**
   * @author GR-03
   * @copyright 接受tree传递过来的数据从而在右边的table显示对应的部门下的员工列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public CallTreeData(value:any):void{

    // this.postSearchUserData = new membersData().postSearchUserData

    this.departmentInfo.data = value

    this.postSearchUserData['data']['department_id'] = value['id']?value['id']:''

    this.postSearchUserData['title']=value['name']

    this.postSearchUserData['data']['name'] = ''

    // this.SelectText = '正常员工'

    this.Search?this.Search.nativeElement.value = '':''

    this.riccioPopUpRightService.setSubject({})

    this.allCheckIs = false

    this.FnGetUserList()

    if(value['id']==""){
      this.pboxOptions = [
        {
            id:0,
            name:'添加子部门',
            status:'show'
        },
        {
            id:1,
            name:'编辑部门',
            status:'disabled'
        },
        {
            id:3,
            name:'禁用部门',
            status:'disabled'
        },
        {
            id:4,
            name:'添加已有成员',
            status:'disabled'
        }
      ]
    }else{
      this.pboxOptions = new membersData().pboxOptions
    }

  }

  public fnPbox(event:any){
    this.departmentInfo.data = event
    this.postSearchUserData['data']['department_id'] = event['id']?event['id']:''
    if(event['id']==""){
      this.pboxOptions = [
        {
            id:0,
            name:'添加子部门',
            status:'show'
        },
        {
            id:1,
            name:'编辑部门',
            status:'disabled'
        },
        {
            id:3,
            name:'禁用部门',
            status:'disabled'
        },
        {
            id:4,
            name:'添加已有成员',
            status:'disabled'
        }
      ]
    }else{
      this.pboxOptions = new membersData().pboxOptions
    }
  }

  /**
   * @author GR-03
   * @copyright 监听pbox发射回来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getPboxEmit():void{

    this.rxPbox$ = this.riccioPboxService.getEmit().subscribe(res=>{
      switch (res['type']) {
        case "select":
          this.SelectText = res['data']?res['data'].name:''
          this.postSearchUserData['data']['type'] = res['data']?res['data'].id:'0'
          this.FnGetUserList()
          break

        case "tree":
          (()=>{
            switch (res['data']['id']) {
              case 0:
                (()=>{
                  this.PopUpRightPrompt.showModalText = 'createEdit'
                  this.departmentInfo.symbol = 'create'
                  this.riccioModalService.setSubject({
                    data:this.departmentInfo,
                    size: 600,
                    header: '添加子部门',
                    type:'createDepartment',
                    noBtn:true
                  })
                })()
                break
              
              case 1:
                (()=>{
                  if(this.postSearchUserData['data']['department_id']==''){
                    this.riccioNotificationsService.setSubject({text:'全公司不允许编辑',status:'danger'})
                  }else {
                    this.PopUpRightPrompt.showModalText = 'createEdit'
                    this.departmentInfo.symbol = 'edit'
                    this.riccioModalService.setSubject({
                      data:this.departmentInfo,
                      size: 600,
                      header: '编辑部门',
                      type:'editDepartment',
                      noBtn:true
                    }) 
                  }
                  
                })()
                break

              case 3:
                (()=>{
                  if(this.postSearchUserData['data']['department_id']==''){
                    this.riccioNotificationsService.setSubject({text:'全公司不允许禁用',status:'danger'})
                  }else {
                    this.PopUpRightPrompt.showModalText = 'disableDepartment'
                    this.riccioModalService.setSubject({
                      data:this.departmentInfo,
                      size: 600,
                      header: '提示',
                      type:'disableDepartment',
                      btn:{
                        name:'确认',
                        status:'danger'
                      }
                    })
                  }
                })()
                break

              case 4:
                  if(this.postSearchUserData['data']['department_id']==''){
                    this.riccioNotificationsService.setSubject({text:'全公司不允许选择成员',status:'danger'})
                  }else {
                    this.FnChooseMembers()
                  }
                break

              default:break
            }
          })()
          break
        case "delete":  //取消部门管理员的操作
          (()=>{
            let obj = {
              'user_arr':[res['data']['id']],
              'department_arr':this.postSearchUserData['data']['department_id']==""?[0]:[this.postSearchUserData['data']['department_id']],
              'type':5
            }
            this.grMembersService.postUserDepartment(obj).subscribe(_res=>{
              if(_res.status===1){
                this.DepartmentAdminList = this.DepartmentAdminList.filter(e=>e['id']!=res['data']['id'])
                this.riccioNotificationsService.setSubject({text:'取消成功'})
              }
            })
          })()
          break

        case "table":
          (()=>{
            if(res['data']['id']==2){
              this.FnSetDenyBatch([this.membersDetailsData.data['id']],2)
            }else if(res['data']['id']==7){
              this.fnDeleteUserList([this.membersDetailsData.data['id']])
            }else if(res['data']['id']==4){
              this.FnSetDenyBatch([this.membersDetailsData.data['id']],1)
            }
          })()
          break

        default:break
      }

    })
  }

  /**
   * @author GR-03
   * @copyright 监听popright发射回来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getPopRightEmit():void{
    this.riccioPopUpRightService.getEmit().subscribe(res=>{

      let data =  this.PopUpRightPrompt['data'][res['type']['id']]

      if(data) this.PopUpRightPrompt['promptText'] = res['data'].length>1?data['more']:data['one']

      this.PopUpRightPrompt['showModalText'] = 'normal'

      if(res['type']['id']==1&&res['data'].length>1){
        let obj = {
          text:this.PopUpRightPrompt['promptText'],
          status:'danger'
        }
        this.riccioNotificationsService.setSubject(obj)
      }else if(res['type']['id']==0&&res['data'].length==1){
          this.PopUpRightPrompt['showModalText'] = 'department'
          this.PopUpRightPrompt.SetDepartmentData = [...res['data']]
          this.constDepartmentSymbol = 'Other'
          this.riccioModalService.setSubject({
            data:res['data'],
            size: 700,
            header: '设置附属部门',
            type:'setDepartment',
            noBtn:true
          })
      }else if(res['type']['id']==6&&res['data'].length==1){
          this.PopUpRightPrompt['showModalText'] = 'department'
          this.PopUpRightPrompt.SetDepartmentData = [...res['data']]
          this.constDepartmentSymbol = 'Main'
          this.riccioModalService.setSubject({
            data:res['data'],
            size: 700,
            header: '设置主属部门',
            type:'setDepartment',
            noBtn:true
          })
      }
      else if(res['type']['id']==3&&res['data'].length==1){
          this.PopUpRightPrompt['showModalText'] = 'role'
          this.PopUpRightPrompt.SetRoleData = [...res['data']]
          this.riccioModalService.setSubject({
            data:res['data'],
            size: 500,
            header: '分配角色',
            type:'setRole',
            noBtn:true
          })
      }else if(data){
        this.riccioModalService.setSubject({
          data:res,
          header: data.header,
          type:'PopUpRight',
          size: 500,
          btn: {
            name:'确认',
            status:'success'
          }
        })
      }

    })
  }

  /**
   * @author GR-03
   * @copyright 监听RiccioModal的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public getModalEmit():void{

    this.riccioModalEmitSubject = this.riccioModalService.getEmit().subscribe(res=>{
      //此处判断该模态框是从哪个入口来的
      if(res['type']==='PopUpRight'){

        let showModalText_arr = ['department','admin','administrator','role','open','disabled','department','delete']
        this.PopUpRightPrompt['showModalText'] = showModalText_arr[res['data']['type']['id']]

        switch (res['data']['type']['id']) {
          case 0:      //设置附属部门
            (()=>{
              this.PopUpRightPrompt.SetDepartmentData = [...res['data']['data']]
              this.constDepartmentSymbol = 'Other'
              setTimeout(()=>{
                this.riccioModalService.setSubject({
                  data:res['data'],
                  header: '批量设置附属部门',
                  size: 700,
                  type:'setDepartment',
                  noBtn:true
                })
              })
            })()
            break
          case 1:      //设置部门负责人
            (()=>{
              let obj = {
                'user_arr':res['data']['data'].map(e=>e['id']),
                'department_arr':[this.postSearchUserData['data']['department_id']],
                'type':3
              }
              this.grMembersService.postUserDepartment(obj).subscribe(res=>{
                if(res.status===1){
                  this.riccioNotificationsService.setSubject({text:'设置成功'})
                }
              })
            })()
            break
          case 2:      //设置部门管理员
            (()=>{
              let obj = {
                'user_arr':res['data']['data'].map(e=>e['id']),
                'department_arr':this.postSearchUserData['data']['department_id']==""?[0]:[this.postSearchUserData['data']['department_id']],
                'type':4
              }
              this.grMembersService.postUserDepartment(obj).subscribe(_res=>{
                if(_res.status===1){
                  let newDepartmentAdminList = [...this.DepartmentAdminList,...res['data']['data']]
                  this.FnGetDepartmentAdmin()
                  this.riccioNotificationsService.setSubject({text:'设置成功'})
                }
              })
            })()
            break
          case 3:      //分配角色
            (()=>{
              this.PopUpRightPrompt.SetRoleData = [...res['data']['data']]
              setTimeout(()=>{
                this.riccioModalService.setSubject({
                  data:res['data'],
                  header: '批量分配角色',
                  size: 500,
                  type:'setRole',
                  noBtn:true
                })
              })
            })()
            break
          case 4:      //启用
            (()=>{
              let user_arr = res['data']['data'].map(e=>e['id'])
              this.FnSetDenyBatch(user_arr,1)
            })()
            break
          case 5:      //禁用
            (()=>{
              let user_arr = res['data']['data'].map(e=>e['id'])
              this.FnSetDenyBatch(user_arr,2)
            })()
            break
          case 6:      //设置主属部门
            (()=>{
              this.PopUpRightPrompt.SetDepartmentData = [...res['data']['data']]
              this.constDepartmentSymbol = 'Main'
              setTimeout(()=>{
                this.riccioModalService.setSubject({
                  data:res['data'],
                  header: '批量设置主属部门',
                  size: 700,
                  type:'setDepartment',
                  noBtn:true
                })
              })
            })()
            break

          case 7:      //移除成员
            (()=>{
              let user_arr = res['data']['data'].map(e=>e['id'])
              this.fnDeleteUserList(user_arr)
            })()
            break

          default:break

        }

      }else if(res['type']==='disableDepartment'){
        let data = res['data']['data']
        let obj = {
           'id':data['id'],
           'status':'0'
        }
        this.grMembersService.postDepartmentStatus(obj).subscribe(res=>{
          if(res.status===1){
            this.riccioNotificationsService.setSubject({text:'禁用成功'})
            this.FnGetDeparment()
            this.CallTreeData({name:'全公司',id:''})
          }
        },error=>{
          throw new Error(error)
        })
      }

    })

  }

  /**
   * @author GR-03
   * @copyright 移除成员
   * @param     [param]
   * @return    [return]
   */
  public fnDeleteUserList(list:any[]):void{
    this.grMembersService.postDepartmentUserDel({
      'department_id':this.postSearchUserData['data']['department_id'],
      'user_id':list
    }).subscribe(res=>{
      if(res.status===1){
        this.FnGetUserList()
        this.riccioPopUpRightService.setSubject({})
        this.riccioNotificationsService.setSubject({
          text:'移除成功'
        })
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 设置启用和禁用
   * @param     [param]
   * @return    [return]
   * @check     GR-05           GR-03
   * @param     {Array<any>}    user_arr [description]
   * @param     {number|string} status   [description]
   */
  public FnSetDenyBatch(user_arr:Array<any>,status:number|string):void{
      let obj = {
        'user_arr':user_arr,
        'status':status
      }
      this.grMembersService.postUserDeny(obj).subscribe(res=>{
        if(res.status===1){
          this.FnGetUserList()
          this.riccioPopUpRightService.setSubject({})
          this.riccioNotificationsService.setSubject({
            text:status==1?'启用成功':'禁用成功'
          })
        }
      },error=>{
        throw new Error(error)
      })
  }


  /**
   * @author GR-03
   * @copyright 点击选择成员按钮显示选择成员组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnChooseMembers():void{
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
    this.grMembersService.getUserNoDepartment({
      'rows':20,
      'page':page,
      'name':this.selectMembersData['output']['searchValue'],
      'department_id':this.postSearchUserData['data']['department_id']
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
    this.grMembersService.getUserList({
      'type':2,
      'department_id':this.postSearchUserData['data']['department_id'],
      'pagesize':1000
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
        this.getSelectMembersEmit(value)
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
   * @copyright 点击添加成员按钮添加成员组件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnAddMembers():void{

     if(this.DeparmentListData[0]['chilren'].length==0){
        this.riccioNotificationsService.setSubject({text:'请先添加子部门',status:'danger'})
     }else{
       this.AddMembers.isShow = !this.AddMembers.isShow
     }

  }


  /**
   * @author GR-03
   * @copyright 接收添加成员过来的数据方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       event [description]
   */
  public ReceiveMembersAdd(event:any):void{
    this.AddMembers.isShow = event.isShow
    this.adminOrDepartmentIsAllCompany = false
    this.adminOrDepartment = ''
    setTimeout(()=>{
      this.adminOrDepartment = event.type
    })
    if(event.type==='success'){
      this.FnGetUserList()
    }
  }

  /**
   * @author GR-03
   * @copyright 编辑成员传递过来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public ReceiveMembersEdit(event:any):void{
    this.adminOrDepartmentIsAllCompany = false
    this.adminOrDepartment = ''
    setTimeout(()=>{
      this.adminOrDepartment = event.type
    })
    if(event.type===''){
      this.FnGetUserList()
    }
  }

  /**
   * @author GR-03
   * @copyright 获取所有部门管理员的名单和某一个部门下的部门管理员
   * @param     [param]
   * @return    [return]
   * @check     GR-05               GR-03
   * @param     {number|string='0'} id    [description]
   */
  public FnGetDepartmentAdmin(id:number|string='0'){
    if(id=='') id = 0
    let obj = {
      'type':1,
      'name':'',
      'department_id':id
    }
    this.grMembersService.getUserList(obj).subscribe(res=>{
      if(res.status===1){
        this.DepartmentAdminList = [...res['data']['data']]
      }
    })

  }

  /**
   * @author GR-03
   * @copyright 删除某一个部门管理员的事件
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       event   [description]
   * @param     {any}       dateElm [description]
   * @param     {any}       list    [description]
   */
  public FnDelDepartmentAdmin(event:any,dateElm:any,list:any):void{
    let obj = {
      genre:'delete',
      el:dateElm,
      type:'delete',
      position:{
        left:event.clientX,
        top:event.clientY,
        width:300
      },
      data:{
        title:'移除提示',
        content:'是否要取消该用户的部门管理员权限？',
        button:'确定',
        delID:list
      }
    }
    this.riccioPboxService.setSubject(obj)

  }

  /**
   * @author GR-03
   * @copyright 选择成员接口方法
   * @param     [param]
   * @return    [return]
   * @param     {any[]}     list [description]
   */
  public getSelectMembersEmit(list:any[]):void{
      let obj = {
        'department_id':this.postSearchUserData['data']['department_id'],
        'user_id':list.map(e=>e['id'])
      }
      this.grMembersService.postDepartmentUserAdd(obj).subscribe(_res=>{
        if(_res.status===1){

          this.FnGetUserList()

          this.riccioSelectMembersService.setSubject({})
          this.riccioNotificationsService.setSubject({text:'添加成功'})
        }else if(_res.status===0){
          this.riccioNotificationsService.setSubject({text:'添加失败',status:'danger'})
        }
      },error=>{
        throw new Error(error)
      })
  }

  /**
   * @author GR-03
   * @copyright 获取部门负责人的方法
   * @return    [return]
   * @check     GR-05           GR-03
   * @param     {number|string}
   */
  public FnGetDepartmentPrincipal(id:number|string):void{
    this.departmentPrincipal = ''
    let obj = {
      type:4,
      name:'',
      department_id:id
    }
    this.grMembersService.getUserList(obj).subscribe(res=>{
      if(res.status===1){
        this.departmentPrincipal = res['data']['data'].length>0?res['data']['data'][0]['real_name']:''
      }
    })
  }

  /**
   * @author GR-03
   * @copyright 监听members-noadminitems组件的数据来切换pbox为other时的情况
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   * @param     {any}
   */
  public FnOutputAdmin(str:string,event:any):void{
    this.adminOrDepartmentIsAllCompany = false
    if(str==='pboxOther'){
      this.adminOrDepartment = ''
      setTimeout(()=>{
        this.adminOrDepartment = event
      })
    }else if(str==='interfaceGetNoDepartment'){
      this.FnGetNoAdmin()
    }
  }

  /**
   * @author GR-03
   * @copyright 监听members-nodepartmentitems组件的数据来切换pbox为other时的情况
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {string}
   * @param     {any}
   */
  public FnOutputdepartment(str:string,event:any):void{
    if(str==='pboxOther'){
      this.adminOrDepartmentIsAllCompany = false
      this.adminOrDepartment = ''
      setTimeout(()=>{
        this.adminOrDepartment = event
      })
    }else if(str==='interfaceGetNoDepartment'){
      this.FnGetNoDepartment()
    }
  }

  /**
   * @author GR-03
   * @copyright 监听members－create发送回来的数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnOutPutCreateEdit(value:any):void{
    if(value.symbol===true&&value.type===''){
      this.FnGetDeparment()
      if(Object.keys(value['data']).length>0){
        this.CallTreeData(value['data'])
      }
    }
    this.adminOrDepartmentIsAllCompany = true
    this.adminOrDepartment = ''
    setTimeout(()=>{
      this.adminOrDepartment = value.type
    })
  }

  /**
   * @author GR-03
   * @copyright 点击显示编辑成员页面modal
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}
   */
  public fnShowEditMembers(list:any):void{
    this.PopUpRightPrompt.showModalText = 'editMembers'
    this.membersDetailsData.data = list
    this.riccioModalService.setSubject({
      data:list,
      header: '编辑成员',
      size: 600,
      type:'editMembers',
      noBtn:true
    })
  }

  /**
   * @author GR-03
   * @copyright 接受分页组件的页数变化
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public fnOutputPageValue(value:any):void{
    this.postSearchUserData.data['page'] = value.page
    this.postSearchUserData.data['rows'] = value.rows
    this.FnGetUserList()
  }

  /**
   * @author GR-03
   * @copyright 没有部门负责人传递回来的数据页数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public fnOutputNoAdminPageChange(value:any):void{
    this.pageTotalNoAdmin.page = value.page
    this.pageTotalNoAdmin.rows = value.rows
    this.FnGetNoAdmin()
  }

  /**
   * @author GR-03
   * @copyright 未设置部门传递回来的分页数据
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   * @param     {any}       value [description]
   */
  public fnOutputNoDepartmentPageChange(value:any):void{
    this.pageTotalNoDepartment.page = value.page
    this.pageTotalNoDepartment.rows = value.rows
    this.FnGetNoDepartment()
  }


}
