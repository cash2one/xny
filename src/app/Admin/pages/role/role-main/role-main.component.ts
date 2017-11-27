import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { GrRoleService } from '../../../services/grRole/grRole.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RoleAuthService } from '../role-auth/role-auth.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPopUpRightService } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'

import { RoleSelectRoleService } from './role-select-role/role-select-role.service'

import { RoleData,RoleRouterInfo } from './roleData'

import { RiccioSelectMembersService } from '../../../../Public/riccio-select-members/riccio-select-members.service'
import { AdminService } from '../../../Admin.service'

@Component({
  selector: 'app-role-main',
  templateUrl: './role-main.component.html',
  styleUrls: [
    '../role.common.scss',
    './role-main.component.scss'
  ]
})
export class RoleMainComponent implements OnInit {


  @ViewChild('Search') Search: ElementRef;
  @ViewChild('rangeBtn', { read: ElementRef }) rangeBtn: ElementRef;

  /**
   * 角色相关数据
   * @type {any}
   */
  public RoleData: any

  /**
   * 角色成员相关数据
   * @type {any}
   */
  public RoleUserData: any

  /**
   * 角色权限相关数据
   * @type {[type]}
   */
  public RoleAuthData: any

  /**
   * 页面交互的数据
   * @type {any}
   */
  public mutualData: any

  /**
   * 判断是否显示loading效果的字段
   * @type {boolean}
   */
  public loading: boolean

  /**
   * 角色列表loading   0 没数据   1 启用   2 禁用
   */
  public treeLoading:number

  /**
   * 是否显示全选按钮；
   * @type {boolean}
   */
  public allCheckIs: boolean

  /**
   * 根据该字段来判断需要显示哪个弹窗窗口
   * @type {string}
   */
  public riccioModalSymbol: string

  /**
   * 选中的某个角色详情信息
   * @type {any}
   */
  public checkRoleInfo: any

  /**
   * 选中的成员数据
   * @type {any}
   */
  public checkMemberInfo: any

  /**
   * 显示不同的pbox为other的组件的标志位
   * @type {string}
   */
  public pboxOtherSymbol: string


  /**
   * 分页的总数
   * @type {any}
   */
  public pageTotal: any

  //筛选条件 0 全部   1 正常   2 禁用
  public rangeType: number
  public rangeName: string
  public searchNameTemp:string

  public routerInfo:RoleRouterInfo
  //选择成员组件数据
  public selectMemberData:any

  //最高级角色id，不可编辑
  public adminRoleId:number
  //是否最顶层
  public isTop:boolean


  public RxSubjectPbox: Subscription
  public RxSubjectModal: Subscription
  public RxSubjectPopRight: Subscription
  public RxSubjectSelectMembers: Subscription

  constructor(
    public activatedRoute:ActivatedRoute,
    public grRoleService: GrRoleService,
    public roleSelectRoleService: RoleSelectRoleService,
    public roleAuthService: RoleAuthService,
    public riccioPboxService: RiccioPboxService,
    public riccioNotificationsService: RiccioNotificationsService,
    public riccioPopUpRightService: RiccioPopUpRightService,
    public riccioModalService: RiccioModalService,
    public riccioLoadingService:RiccioLoadingService,
    public riccioSelectMembersService: RiccioSelectMembersService,
    public adminService: AdminService
  ) {
    this.pboxOtherSymbol = ''
    this.checkMemberInfo = {}
    this.checkRoleInfo = {}
    this.riccioModalSymbol = ''
    this.allCheckIs = false
    this.RoleData = new RoleData().RoleData
    this.RoleUserData = new RoleData().RoleUserData
    this.mutualData = new RoleData().mutualData
    this.RoleAuthData = new RoleData().RoleAuthData
    this.pageTotal = 0
    this.rangeType = 0
    this.rangeName = '全部成员'
    this.selectMemberData = {}
    this.isTop = true

    this.activatedRoute.params.subscribe(para => {
      this.routerInfo = {
        model:para.model,
        cid:para.cid
      }
      this.RoleUserData.getUserListObj['model'] = para.model
      this.RoleUserData.getUserListObj['cid'] = para.cid
    })

  	/**
     * @author GR-03
     * @copyright [接受pbox传递回来的数据流]
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03 
     */
    this.RxSubjectPbox = this.riccioPboxService.getEmit().subscribe(res => {
      switch (res['type']) {
        case "more":
          (() => {
            if (res['data']['id'] == 0) {
              this.riccioModalSymbol = 'moreRole'
              this.riccioModalService.setSubject({
                header: "复制并新增角色",
                type: 'addRole',
                data: this.checkRoleInfo,
                noBtn: true
              })
            }
          })()
          break
        case "delete":
          (() => {
            this.riccioNotificationsService.setSubject({
              text: '成功',
              status: 'success',
              position: {
                right: '300',
                top: '30'
              }
            })
          })()
          break

        case "tree":
          (() => {
            switch (res['data']['id']) {
              case 0:
                this.riccioModalSymbol = 'addRole'
                this.riccioModalService.setSubject({
                  header: "添加子角色",
                  type: 'addRole',
                  data: this.checkRoleInfo,
                  noBtn: true
                })
                break;

              case 1:
                this.riccioModalSymbol = 'editRole'
                this.riccioModalService.setSubject({
                  header: "编辑角色",
                  type: 'editRole',
                  data: this.checkRoleInfo,
                  noBtn: true
                })
                break;

              case 3:
                this.riccioModalSymbol = 'deleteRole'
                this.riccioModalService.setSubject({
                  header: "确认删除该角色?",
                  type: 'deleteRole',
                  noBtn: true
                })
                break;

              default: break;
            }
          })()
          break

        case 'roleRange':
          (() => {
            this.rangeType = res.data.value
            this.rangeName = res.data.name
            this.fnGetRoleUserList()
          })()
          break

        default: break
      }
    })

    /**
     * @author GR-03
     * @copyright 接受Modal发射回来的数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.RxSubjectModal = this.riccioModalService.getEmit().subscribe(res => {
      switch (res['type']) {
        case 'deleteRole':
          (() => {

          })()
          break;

        default: break;
      }
    })


    /**
     * @author GR-03
     * @copyright 监听popright发射回来的数据流
     * @param     [param]
     * @return    [return]
     * @check     GR-05        GR-03
     */
    this.RxSubjectPopRight = this.riccioPopUpRightService.getEmit().subscribe(res => {
      switch (res['type']['id']) {
        case 1:          //批量分配角色
          (() => {
            this.riccioModalSymbol = ''
            setTimeout(() => this.riccioModalSymbol = 'assignRole')
            this.checkMemberInfo = [...res['data']]
            this.riccioModalService.setSubject({
              data: this.checkMemberInfo,
              size: 500,
              header: '分配角色',
              type: 'assignRole',
              noBtn: true
            })
          })()
          break;

        case 0:          //批量移除
          (() => {
            this.riccioModalSymbol = ''
            setTimeout(() => this.riccioModalSymbol = 'deleteRoleUser')
            this.checkMemberInfo = [...res['data']]
            this.riccioModalService.setSubject({
              data: this.checkMemberInfo,
              size: 700,
              header: '移除提示',
              type: 'deleteRoleUser',
              noBtn: true
            })
          })()
          break;

        default: break;
      }
    })

    /**
     * @author GR-03
     * @copyright 订阅selectMembers组件的数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    this.RxSubjectSelectMembers = this.riccioSelectMembersService.getEmit().subscribe(res => {
      if (res.type === 'role') {
        if (Array.isArray(res['data']) === true) {
          // this.grRoleService.postRolePartUserAdd({
          //   'id':this.checkRoleInfo['id'],
          //   'userid':res['data'].map(e=>e['id']).join(',')
          // }).subscribe(_res=>{
          //   if(_res.status===1){
          //     this.fnGetRoleUserList()
          //     this.riccioNotificationsService.setSubject({text:'添加成功'})
          //   }
          // },error=>{
          //   throw new Error(error)
          // })
        }
      }
    })

  }

  ngOnInit() {
    this.fnGetRoleAuth()   // 获取角色权限列表信息
    this.fnGetRoleList()   // 获取角色列表

    this.fnNoRoleList()    // 获取未设置角色成员列表

  }

  ngOnDestroy() {
    this.RxSubjectPbox.unsubscribe()
    this.RxSubjectModal.unsubscribe()
    this.RxSubjectPopRight.unsubscribe()
    this.RxSubjectSelectMembers.unsubscribe()
  }


  /**
   * @author GR-03
   * @copyright 获取角色权限列表信息
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetRoleAuth(): void {
    this.grRoleService.getRoleAuthTree({
      ...this.routerInfo
    }).subscribe(res => {
      if (res.status === 1) {
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
  public fnNoRoleList(): void {
    this.RoleUserData.getUserListObj['id'] = '-1'
    this.grRoleService.getRoleUserList(this.RoleUserData.getUserListObj).subscribe(res => {
      if (res.status === 1) {
        this.mutualData.NoRole.length = res['data']['total']
      }
    })
  }

  /**
   * 获取未设置角色成员个数
   */
  public fnNoRoleLength(){
    this.grRoleService.getRoleUserList({
      id:-1,
      rows:1000,
      page:1,
      cid:this.routerInfo.cid,
      model:this.routerInfo.model
    }).subscribe(res => {
      if (res.status === 1) {
        this.mutualData.NoRole.length = res['data']['total']
      }
    })
  }


  /**
   * @author GR-05
   * @copyright 获取角色树状结构列表的接口
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetRoleList(): void {
    this.treeLoading = 1
    this.grRoleService.getRoleList(this.routerInfo).subscribe(res => {
      if (res.status === 1) {
        if(this.routerInfo.model === 'Admin'){
          this.RoleData.dataList = res['data']
          this.adminRoleId = 1
        }else{
          this.RoleData.dataList = [{groupname:'企业负责人',chilren:res.data,id:'0'}]
          this.adminRoleId = 0
        }
        if(res.data.length > 0){
          this.treeLoading = 2
          this.mutualData.presentRole.status = 1
        }else{
          this.routerInfo.model === 'Admin'?this.treeLoading = 0:this.treeLoading = 2
        }
        this.RoleUserData.getUserListObj['id'] = this.RoleData.dataList[0]['id']
        this.mutualData.presentRole.title = this.RoleData.dataList[0]['groupname']
        this.checkRoleInfo.groupname = this.RoleData.dataList[0]['groupname']
        this.checkRoleInfo.id = this.RoleData.dataList[0]['id']

        this.fnGetRoleUserList()
      }
    })
  }


  /**
   * @author GR-05
   * @copyright 获取某个角色下的成员方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetRoleUserList(): void {

    this.loading = true
    this.RoleUserData.getUserListObj['model'] = this.routerInfo['model']
    this.RoleUserData.getUserListObj['cid'] = this.routerInfo['cid']
    this.grRoleService.getRoleUserList(this.RoleUserData.getUserListObj).subscribe(res => {
      this.loading = false
      if (res.status === 1) {
        this.RoleUserData.dataList = res['data']['data'] ? [...res['data']['data']] : []
        this.pageTotal = res['data']['total']
        this.mutualData.presentRole.length = res['data']['total']

        this.RoleUserData.dataList.map(e => e['isCheck'] = false)
        this.searchNameTemp = this.RoleUserData.getUserListObj.name
        this.resolveRange()
      }

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
  public CallTreeData(event: any): void {
    this.riccioModalSymbol = ''    //取消显示编辑和添加角色的视图
    this.checkRoleInfo = event
    if (event['id'] == this.adminRoleId) {
      this.isTop = true
      this.RoleData.pboxOptions = [
        {
          id: 0,
          name: '添加子角色'
        },
        {
          id: 1,
          name: '编辑角色',
          status: 'disabled'
        },
        {
          id: 3,
          name: '删除角色',
          status: 'disabled'
        }
      ]
    } else {
      this.RoleData.pboxOptions = new RoleData().RoleData.pboxOptions
      this.isTop = false
    }

    this.mutualData.NoRole.color = false
    this.mutualData.presentRole.title = event['groupname']
    this.RoleUserData.getUserListObj['id'] = event['id']
    this.Search ? this.Search.nativeElement.value = '' : false
    this.fnGetRoleUserList()

    if (this.RoleUserData.getUserListObj['id'] !== '0') {
      this.roleAuthService.RoleData.symbol = event.id
      let ArrRules = event['rules'] == "" ? [] : event['rules'].split(',')
      this.roleAuthService.RoleData.rules = [...ArrRules]
    }
    else {
      this.roleAuthService.RoleData.symbol = '1'
    }

    if (this.mutualData.tabSwitch == '1') {
      this.mutualData.tabSwitch = '0'
      setTimeout(() => {
        this.mutualData.tabSwitch = '1'
      })
    }

    this.riccioPopUpRightService.setSubject({})

    this.allCheckIs = false

  }

  public pboxActive(event:any){
    this.checkRoleInfo = event
    if (event['id'] == this.adminRoleId) {
      this.isTop = true
      this.RoleData.pboxOptions = [
        {
          id: 0,
          name: '添加子角色'
        },
        {
          id: 1,
          name: '编辑角色',
          status: 'disabled'
        },
        {
          id: 3,
          name: '删除角色',
          status: 'disabled'
        }
      ]
    } else {
      this.RoleData.pboxOptions = new RoleData().RoleData.pboxOptions
      this.isTop = false
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
  public fnShowPbox(str: string, $event: any, dataEl: any): void {

    switch (str) {
      case "more":
        (() => {
          this.riccioPboxService.setSubject({
            el: dataEl,
            type: 'more',
            position: {
              left: $event.clientX - 100,
              top: $event.clientY,
              width: 200
            },
            data: [{ id: 0, name: '复制并新增角色' }]
          })
        })()
        break
      case "selectClick":
        (() => {
          let obj = {
            el: dataEl,
            type: 'tree',
            position: {
              left: 500,
              top: 230,
              width: 200
            },
            data: [...new RoleData().mutualData.PboxText.selectData]
          }
          this.riccioPboxService.setSubject(obj)
        })()
        break
      case "selectClickTitle":
        (() => {
          if(this.mutualData.presentRole.status === 0){
            return
          }else{
            let showData = [...new RoleData().RoleData.pboxOptions]
            if (this.RoleUserData.getUserListObj['id'] == this.adminRoleId) {
              showData = [
                {
                  id: 0,
                  name: '添加子角色'
                },
                {
                  id: 1,
                  name: '编辑角色',
                  status: 'disabled'
                },
                {
                  id: 3,
                  name: '删除角色',
                  status: 'disabled'
                }
              ]
            }
            let obj = {
              el: dataEl,
              type: 'tree',
              position: {
                left: 310,
                top: 125,
                width: 200
              },
              data: showData
            }
            this.riccioPboxService.setSubject(obj)
          }
        })()
        break

      default: break
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
  public FnSearchList(value: string, str: string): void {
    this.Search.nativeElement.blur()
    if ((str === 'blur' && value.trim() !== '') || value === '') {
      this.RoleUserData.getUserListObj['name'] = value.trim()
      this.fnGetRoleUserList()
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
  public FnDeleteRoleUser(list: any): void {
    this.riccioModalSymbol = ''
    setTimeout(() => this.riccioModalSymbol = 'deleteRoleUser')
    this.checkMemberInfo = [list]
    this.riccioModalService.setSubject({
      data: this.checkMemberInfo,
      size: 700,
      header: '移除提示',
      type: 'deleteRoleUser',
      noBtn: true
    })
  }


  /**
   * @author GR-03
   * @copyright 点击查看未设置角色成员列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public FnGetNoRole(): void {
    this.riccioPopUpRightService.setSubject({})
    this.allCheckIs = false
    this.isTop = true

    this.RoleUserData.getUserListObj['id'] = '-1'
    this.mutualData.presentRole.title = '未设置角色的员工'
    this.mutualData.presentRole.length = this.mutualData.NoRole.length
    this.mutualData.tabSwitch = '0'
    this.fnGetRoleUserList()

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
  public FnShowPopUp(list: any, symbol: string = "single"): void {

    let obj = {
      'data': [],
      'viewText': this.RoleUserData.getUserListObj['id'] == '-1' ? [...this.mutualData.popRightTextData.noRole] : [...this.mutualData.popRightTextData.normal]
    }

    if (symbol === 'single') {
      list.isCheck = !list.isCheck

      this.allCheckIs = this.RoleUserData.dataList.filter(e => e['isCheck'] == false).length == 0 ? true : false

    } else if (symbol === 'all') {
      this.allCheckIs = !this.allCheckIs
      this.RoleUserData.dataList.map(e => e['isCheck'] = this.allCheckIs)
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
  public fnOutputRoleAddEdit(value: any): void {
    this.pboxOtherSymbol = value.name
    if (value.isShow === false) {
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
  public fnOutputRoleRefresh(value: any, type: string): void {
    if (type === 'editRole') {
      this.checkRoleInfo = Object.assign({}, this.checkRoleInfo, value['data'])
      this.CallTreeData(this.checkRoleInfo)
    }

    if (value.show === true) {
      this.fnGetRoleList()
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
  public fnOutputRoleDelete(value: boolean): void {
    if (value === true) {
      this.fnGetRoleList()
      this.CallTreeData({ id: '0', groupname: '企业负责人' })
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
  public fnShowModel(str: string, event: MouseEvent, dataEle: ElementRef, list: any): void {
    switch (str) {
      case "assignRole":
        (() => {
          this.riccioModalSymbol = 'assignRole'
          this.checkMemberInfo = [{ ...list }]
          this.riccioModalService.setSubject({
            data: [list],
            size: 500,
            header: '分配角色',
            type: 'assignRole',
            noBtn: true
          })
        })()
        break;

      default: break;
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
  public fnOutputAssignRole(value: boolean): void {
    if (value === true) {
      this.fnNoRoleList()
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
  public fnOutputRoleDeleteUser(value: boolean): void {
    if (value === true) {
      this.CallTreeData(this.checkRoleInfo)
      this.fnNoRoleList()
      this.RoleUserData.getUserListObj['id'] = this.checkRoleInfo['id']
    }
  }

  /**
   * @author GR-05
   * @copyright 添加权限人的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnAddRoleUser(): void {
    this.selectMemberData.isShow = true
    this.selectMemberData.name = ''
    this.selectMemberData.page = 1
    this.selectMemberData.leftData = []
    this.selectMemberData.rightData = JSON.parse(JSON.stringify(this.RoleUserData.dataList))
    this.getRoleUsers()
  }

  /**
   * 
   * 添加权限人点击加载更多
   * @author GR-05
   */
  public fnMoreRoleUser(flag:boolean){
    if(flag){
      this.selectMemberData.page += this.selectMemberData.page
      this.getRoleUsers()
    }
  }

  /**
   * 添加权限人 请求全部用户
   * @author GR-05
   */
  public getRoleUsers(name:string = ''){
    this.selectMemberData.nextPage = 'loading'
    this.grRoleService.postRoleExpUser({
      id:this.RoleUserData.getUserListObj,
      model:this.routerInfo.model,
      cid:this.routerInfo.cid,
      rows:20,
      page:this.selectMemberData.page,
      name:name
    }).subscribe(res=>{
      let data = res['data']['data']
      let total = res['data']['total']
      if(res.status === 1 && data.length > 0){
        this.selectMemberData.leftData = this.selectMemberData.leftData.concat(data)
        if(total > this.selectMemberData.leftData.length){
          this.selectMemberData.nextPage = 'normal'
        }else{
          this.selectMemberData.nextPage = 'hide'
        }
        // let cutLength = this.resolveMemberLeft()
        // this.selectMemberData.tempLeft = this.selectMemberData.leftData
        // if(total - this.selectMemberData.leftData.length - cutLength > 0){
        //   this.selectMemberData.nextPage = 'normal'
        // }else{
        //   this.selectMemberData.nextPage = 'hide'
        // }
      }else{
        this.selectMemberData.nextPage = 'hide'
      }
    })
  }

  /**
   * 选择成员组件搜索功能 仅名称
   * @author GR-05
   * @param value 名称
   */
  public fnSearchRoleUser(value:string){
    this.getRoleUsers(value)
    // if(value && value.trim().length!==0){
    //   this.selectMemberData.leftData = this.selectMemberData.leftData.filter(item=>{
    //     if(item['real_name']){
    //       return item['real_name'].indexOf(value) != -1
    //     } 
    //   })
    // }else if(value == ''){
    //   this.selectMemberData.leftData = this.selectMemberData.tempLeft
    // }
  }

  /**
   * 选择成员组件关闭事件
   */
  public fnSelectMemberClose(){
    this.selectMemberData.isShow = false
    this.selectMemberData.rightData = []
  }

  /**
   * 处理添加权限人左边数据
   * @author GR-05
   * @return 过滤数据量
   */
  public resolveMemberLeft():number{
    let result = 0
    this.selectMemberData.rightData.forEach(right => {
       this.selectMemberData.leftData = this.selectMemberData.leftData.filter(left=>{
         left['id'] == right['id']?result +=1 :{}
         return left['id'] != right['id']
       })
    })
    return result
  }

  /**
   * 添加权限人动作
   */
  public addRoleUser(data:any){
    let ids = []
    data.forEach(item=>{
      ids.push(item['id'])
    })
    this.riccioLoadingService.setLoading({
      message:'分配中'
    })
    this.grRoleService.postRolePartuserAdd({
      id:this.RoleUserData.getUserListObj['id'],
      userid:ids.join(','),
      ...this.routerInfo
    }).subscribe(res=>{
      this.riccioLoadingService.closeLoading()
      if(res.status === 1){
        this.riccioNotificationsService.setSubject({
          status:'success',
          text:'添加成功'
        })
        this.fnGetRoleUserList()
        this.fnNoRoleLength()
      }
    })
  }

  /**
   * 加载头像失败事件
   * @param list 用户数据 
   */
  public noImg(list:any){
    list['noImg'] = true
  }

  /**
   * @author GR-03
   * @copyright 接受分页组件传递回来的当前页数
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnOutputPage(value: any): void {
    this.RoleUserData.getUserListObj.page = value.page
    this.RoleUserData.getUserListObj.rows = value.rows
    this.fnGetRoleUserList()
  }

  /**
   * 显示成员筛选
   * @param e 点击事件
   * @param el 点击元素
   */
  public fnRange(e: MouseEvent, el: any) {
    let position = this.adminService.getElPosition(this.rangeBtn)
    this.riccioPboxService.setSubject({
      el: el,
      type: 'roleRange',
      position: {
        left: position.left,
        top: position.top,
        width: this.rangeBtn.nativeElement.offsetWidth
      },
      data: [
        { name: '全部成员', value: 0 },
        { name: '正常成员', value: 1 },
        { name: '禁用成员', value: 2 }
      ]
    })
  }

  /**
   * 根据条件筛选数据
   * @param data 
   */
  public resolveRange() {
    if (this.rangeType === 0) {
      return
    } else {
      let result = this.RoleUserData.dataList.filter(item => {
        return item['status'] == this.rangeType
      })

      this.RoleUserData.dataList = result
    }
  }

  /**
   * 搜索成员
   */
  public fnSearch(e:KeyboardEvent){
    if(e.keyCode === 13){
      this.fnGetRoleUserList()
    }
  }

  /**
   * 按键搜索用户
   */
  public fnKeySearch(e:KeyboardEvent){
    this.searchCheck(e)
  }

  /**
   * 失焦搜索用户
   */
  public fnBlurSearch(){
    this.searchCheck()
  }

  /**
   * 搜索用户判断
   */
  public searchCheck(e?:KeyboardEvent){
    if(this.searchNameTemp == this.RoleUserData.getUserListObj.name){
      this.loading = false
    }
    else{
      if((e && e.keyCode === 13) || !e){
        this.fnGetRoleUserList()
      }
    }
  }
}
