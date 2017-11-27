import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { MenuData } from '../menu.menu'
import { editMenuData } from './editMenuData'

import { GrMenuListService } from '../../../../services'
import { AddToService } from './add-to.service'
import { AdminService } from '../../../../Admin.service'
// import { PersonalService } from '../../../../../Public/Personal/personal.service'
import { RiccioNotificationsService } from '../../../../../Public/riccio-notifications/riccio-notifications.service'

@Component({
  selector: 'app-add-to',
  templateUrl: './add-to.component.html',
  styleUrls: ['../../../../Admin.component.scss', '../../../../../Public/theme/common/common.scss', './add-to.component.scss']
})
export class AddToComponent implements OnInit {

  @ViewChild('Modal') Modal: any;

  public MenuData: MenuData;
  public affiliatedTeam: any;
  public MenuAddShow: Array<any>;
  public SelectModel: any;
  public editMenuData: any;
  public ShowText = {
    title: '添加菜单',
    btn: '添加',
    type: 'add',
    status: 1
  }

  //父级菜单的id
  public parentID: string | number;

  public routerCid: string;

  public routerStatus: string;

  public showMenuStatus: boolean = true;

  public parentCid: string;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public grMenuListService: GrMenuListService,
    // public personalService: PersonalService,
    public addToService: AddToService,
    public adminService: AdminService,
    private riccioNotificationsService: RiccioNotificationsService
  ) {
    this.MenuData = new MenuData();
    this.MenuAddShow = new MenuData().addShow;
    this.affiliatedTeam = new MenuData().affiliatedTeam;
    this.editMenuData = new editMenuData().data
    this.SelectModel = {
      isShow: false,
      position: {
        left: 0,
        top: 0
      }
    }
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {

      this.MenuData.symbol = res.action;
      this.routerCid = this.addToService.cid;
      this.routerStatus = this.addToService.menuType;
      this.parentCid = this.addToService.cid;
      this.MenuData.data['model'] = this.addToService.modelName;

    })

    if (this.addToService.symbol === 'add') {
      this.MenuData = new MenuData();
      this.resolveMenuData()
      this.MenuData.data['model'] = this.addToService.modelName;
    }
    else if (this.addToService.symbol === 'edit') {
      this.ShowText = {
        title: '修改菜单',
        btn: '保存',
        type: 'edit',
        status: 1
      }
      this.resolveMenuData()
      Object.assign(this.MenuData.data, this.addToService.editData)
      this.MenuData.data['parentid'] = this.addToService.editData['parent_name'];
    }
    else if (this.addToService.symbol === 'addChilren') {
      this.MenuData = new MenuData();
      this.resolveMenuData()
      this.MenuData.data['parentid'] = this.addToService.editData['name'];
      this.MenuData.data['model'] = this.addToService.editData['model'];
    }
  }

  ngDoCheck() {
    this.affiliatedTeam.data.item = this.grMenuListService.selectTeamData.data;
    this.affiliatedTeam.isShow = this.grMenuListService.selectTeamData.isShow;
  }

  /**
   * 处理显示控件
   * @author GR-05
   * @check GR-03
   */
  public resolveMenuData() {
    //普通菜单
    if (this.routerStatus === '1') {
      this.MenuAddShow[5]['option'] = [
        {
          value: 1,
          name: '左侧菜单'
        },
        {
          value: 2,
          name: '主内容右上切换菜单'
        }
      ]
      this.MenuData.data.is_left = 1
    } else if (this.routerStatus === '2') {
      //选项卡
      this.MenuAddShow[5]['option'] = [
        {
          value: 3,
          name: '企业控制台应用配置选项卡'
        }
      ]
      this.MenuData.data.is_left = 3
    }
  }

  //添加菜单的方法
  public FnAddMenu(type: string): void {

    // let handleParameter = (data: string): boolean => {

    //   let bool: boolean
      
    //   const _data: string[] = data.trim().split('|')

    //   if(data.length>0 && (_data.length==1||_data.filter(e=>e=='').length>0)){
    //     this.riccioNotificationsService.setSubject({text:'附加参数添加格式有误',status:'danger'})
    //     this.MenuAddShow[9]['danger'] = true;
    //     bool = false
    //   } else {
    //     bool = true
    //   }

    //   return bool

    // }

    if (type === 'add') {
      let postObj = {};
      Object.assign(postObj, this.MenuData.data)
      let bool = true;
      switch ('') {
        case postObj['model']:
          this.MenuAddShow[0]['danger'] = true;
          bool = false
          break;
        case postObj['parentid']:
          this.MenuAddShow[1]['danger'] = true;
          bool = false
          break;
        case postObj['path']:
          this.MenuAddShow[2]['danger'] = true;
          bool = false
          break;
        case postObj['name']:
          this.MenuAddShow[4]['danger'] = true;
          bool = false
          break;
        default: break;
      }

      // if (bool === true && handleParameter(this.MenuData.data['parameter']) === true) {
      if (bool === true) {
        this.ShowText = {
          title: '添加菜单',
          btn: '添加中...',
          type: 'add',
          status: 0
        }
        postObj['cid'] = this.routerCid;
        this.addToService.symbol === 'addChilren' ? postObj['parentid'] = this.addToService.editData['id'] : postObj['parentid'] = this.parentID
        this.grMenuListService.postAddMenu(postObj).subscribe(res => {
          this.ShowText = {
            title: '添加菜单',
            btn: '保存',
            type: 'add',
            status: 1
          }
          if (res.status === 1) {
            this.addToService.setSubject(res)
            this.riccioNotificationsService.setSubject({
              text: '添加成功',
              status: 'success'
            })
            // this.personalService.showViewData(null, false);
            // this.personalService.showPromptSmall('添加成功', 'success', { top: "30%", right: "50%" })
          } else {
            this.riccioNotificationsService.setSubject({
              text: '添加失败',
              status: 'danger'
            })
            // this.personalService.showPromptSmall('添加失败', 'danger', { top: "30%", right: "50%" })
          }
        })
      }
    }
    // else if (type === 'edit' && handleParameter(this.MenuData.data['parameter']) === true) {
    else if (type === 'edit') {
      this.ShowText = {
        title: '修改菜单',
        btn: '修改中...',
        type: 'add',
        status: 0
      }
      Object.assign(this.editMenuData, {
        'id': this.MenuData.data['id'],
        'model': this.MenuData.data['model'],
        'path': this.MenuData.data['path'],
        'name': this.MenuData.data['name'],
        'is_left': this.MenuData.data['is_left'],
        'status': this.MenuData.data['status'],
        'type': this.MenuData.data['type'],
        'fonticon': this.MenuData.data['fonticon'],
        'url': this.MenuData.data['url'],
        'parameter':this.MenuData.data['parameter']
      })
      // this.editMenuData['parentid'] = this.addToService.editData['parentid'];
      this.editMenuData['parentid'] = this.parentID != null ? this.parentID : this.addToService.editData['parentid'];
      this.editMenuData['cid'] = this.routerCid;
      this.grMenuListService.postEditMenu(this.editMenuData)
        .subscribe(res => {
          this.ShowText = {
            title: '修改菜单',
            btn: '保存',
            type: 'add',
            status: 1
          }
          if (res.status === 1) {
            this.addToService.setSubject(res)
            // this.personalService.showViewData(null, false);
            this.riccioNotificationsService.setSubject({
              text: '修改成功',
              status: 'success'
            })
            // this.personalService.showPromptSmall('修改成功', 'success', { top: "30%", right: "50%" })
          } else {
            this.riccioNotificationsService.setSubject({
              text: '修改失败',
              status: 'danger'
            })
            // this.personalService.showPromptSmall('修改失败', 'danger', { top: "30%", right: "50%" })
          }
        })
    }
  }


  //显示父级菜单组件的方法
  public showAffiliatedTeam(event: any, type: string): void {
    this.parentCid = this.routerCid;
    if (type === 'parentid') {
      this.showMenuStatus = true;
      let ModalPosition = this.Modal.nativeElement.getBoundingClientRect();
      this.grMenuListService.defineSelectTeamData(true, this.grMenuListService.selectTeamData.data);
      this.affiliatedTeam.isShow = !this.affiliatedTeam.isShow;
      this.affiliatedTeam.data.client.x = event.clientX - ModalPosition.left;
      this.affiliatedTeam.data.client.y = event.clientY - ModalPosition.top;
    }
    else if (type === 'model') {
      this.SelectModel.isShow = !this.SelectModel.isShow
    }

  }

  //显示通用菜单列表
  public showMenuOpen(event: any): void {
    this.parentCid = '0';
    this.showMenuStatus = false;
    let ModalPosition = this.Modal.nativeElement.getBoundingClientRect();
    this.grMenuListService.defineSelectTeamData(true, this.grMenuListService.selectTeamData.data);
    this.affiliatedTeam.isShow = !this.affiliatedTeam.isShow;
    this.affiliatedTeam.data.client.x = event.clientX - ModalPosition.left;
    this.affiliatedTeam.data.client.y = event.clientY - ModalPosition.top;
  }


  //接收添加父级菜单组件的方法
  public getCallData(event: any): void {

    if (event) {
      if (this.showMenuStatus == true) {
        this.MenuData.data['parentid'] = event['name'];
        this.parentID = event['id']
      } else {
        this.MenuData.data['name'] = event['name'];
        this.MenuData.data['path'] = event['path'];
        this.MenuData.data['url'] = event['url'];
      }

    }
    console.log(this.parentID)
  }

  //关闭显示父级菜单组建的方法
  public hideAffiliatedTeam(): void {
    this.grMenuListService.defineSelectTeamData(false, this.grMenuListService.selectTeamData.data);
  }

  //接受选中的模型的方法
  public getSelectData(value: any): void {
    this.MenuData.data['model'] = value.select;
    this.SelectModel.isShow = false;
  }

  //关闭选中的模型的方法
  public getCloseBack(value: boolean): void {
    this.SelectModel.isShow = value;
  }

  //关闭组件视图
  public Close(): void {
    // this.personalService.showViewData(null, false);
  }
}
