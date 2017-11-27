import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription';

import { disableData } from './disableData'
import { GrMembersService } from '../../../services'

import { RiccioPopUpRightService } from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.service'
import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioPboxService } from '../../../../Public/riccio-pbox/riccio-pbox.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { MembersService } from '../members.service'

@Component({
  selector: 'app-admin-members-disable',
  templateUrl: './members-disable.component.html',
  styleUrls: [
    '../../role/role.common.scss',
    './members-disable.component.scss'
  ]
})
export class MembersDisableComponent implements OnInit {

  @ViewChild('Search') Search: any;

  public routerInfo: {
    model: string;
    cid: number | string;
  }

  public TableTitle: string[];
  public DisableUserData: any;
  public SearchUserData: any;

  public loadingType: string;
  public allCheckIs: boolean;   // 全选按钮标示符号

  public popRight$: Subscription;   // popUpRight组件的数据流
  public modal$: Subscription;    // 

  //搜索字段
  public searchName: string
  public searchNameTemp: string

  constructor(
    public grMembersService: GrMembersService,
    public riccioPopUpRightService: RiccioPopUpRightService,
    public riccioModalService: RiccioModalService,
    public riccioPboxService: RiccioPboxService,
    public riccioNotificationsService: RiccioNotificationsService,
    public activatedRoute: ActivatedRoute,
    public riccioLoadingService: RiccioLoadingService,
    private membersService:MembersService  
  ) {
    this.loadingType = 'show';
    this.allCheckIs = false;
    this.SearchUserData = new disableData().SearchUserData;
    this.DisableUserData = new disableData().DisableUserData;
    this.TableTitle = new disableData().TableTitle_arr
    this.searchName = ''
    this.searchNameTemp = ''

    this.activatedRoute.params.subscribe(res => {
      this.routerInfo = {
        model: res.model,
        cid: res.cid
      }
      this.membersService.setRouterInfo(this.routerInfo)
    })
  }

  ngOnInit() {

    //获取禁用列表的方法
    this.fnGetDisableUserList();

    //监听popRight发射回来的数据流
    this.GetPopUpRightEmit();

    //监听modal发射回来的数据流
    this.GetModalEmit();
  }

  ngOnDestroy() {
    this.popRight$.unsubscribe();
    this.modal$.unsubscribe();
  }

  /**
	 * 搜索成员
	*/
  public fnSearch(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.fnGetDisableUserList()
    }
  }

	/**
	 * 按键搜索用户
	 */
  public fnKeySearch(e: KeyboardEvent) {
    this.searchCheck(e)
  }

	/**
	 * 失焦搜索用户
	 */
  public fnBlurSearch() {
    this.searchCheck()
  }

	/**
	 * 搜索用户判断
	 */
  public searchCheck(e?: KeyboardEvent) {
    if (this.searchNameTemp == this.searchName) {
      // this.loadingType = 'hide'
    }
    else {
      if ((e && e.keyCode === 13) || !e) {
        this.fnGetDisableUserList()
      }
    }
  }

  /**
   * @author GR-03
   * @copyright 获取禁用成员列表的方法
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public fnGetDisableUserList(): void {
    this.loadingType = 'show';
    let obj = {
      'type': 3,
      'name': this.searchName,
      'cid': this.routerInfo.cid
    }
    this.grMembersService.postUserList(obj).subscribe(res => {
      this.loadingType = 'hide';
      if (res.status === 1) {
        this.DisableUserData = Object.assign({}, this.DisableUserData, res['data']);
        if (Array.isArray(this.DisableUserData['data']) === true) this.DisableUserData['data'].map(e => {
          e['isCheck'] = false
          e['department'] = e['department'].filter(fe => fe['is_main'] == 1)[0]
        })

        if (this.DisableUserData['data'].length == 0) {
          this.loadingType = 'empty';
        }

        this.searchNameTemp = this.searchName
      }
    })
  }

  /**
   * @author GR-03
   * @copyright 搜索成员的方法
   * @check     GR-05       GR-03
   * @param     {string}
   * @param     {string}
   */
  public FnSearchList(value: string, str: string): void {
    this.Search.nativeElement.blur();
    if (str === 'blur') {
      this.SearchUserData['name'] = value;
      this.fnGetDisableUserList();
    }

  }


  /**
   * @author GR-03
   * @copyright 点击多选框的时候从左上角向右弹出popRight组件
   * @check     GR-05             GR-03
   * @param     {any}
   * @param     {string="single"}
   */
  public FnShowPopUp(list: any, symbol: string = "single"): void {
    let obj = {
      'data': [...this.DisableUserData['data']],
      'viewText': [{ id: 0, name: '启用' }]
    }

    if (symbol === 'single') {
      list.isCheck = !list.isCheck;

      this.allCheckIs = this.DisableUserData['data'].filter(e => e['isCheck'] == false).length == 0 ? true : false;

    } else if (symbol === 'all') {
      this.allCheckIs = !this.allCheckIs;
      this.DisableUserData['data'].map(e => e['isCheck'] = this.allCheckIs)
    }

    this.riccioPopUpRightService.setSubject(obj)
  }


  public fnSetOpen(list: any): void {
    this.riccioModalService.setSubject({
      data: [list],
      size: 400,
      header: '启用',
      type: 'open',
      btn: {
        name: '确认',
        status: 'success'
      }
    })
  }


  /**
   * @author GR-03
   * @copyright 负责监听PopUpRight发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public GetPopUpRightEmit(): void {
    this.popRight$ = this.riccioPopUpRightService.getEmit().subscribe(res => {
      this.riccioModalService.setSubject({
        data: res['data'],
        size: 400,
        header: '启用',
        type: 'open',
        btn: {
          name: '确认',
          status: 'success'
        }
      })
    })
  }

  /**
   * @author GR-03
   * @copyright 负责监听Modal发射回来的数据流
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public GetModalEmit(): void {
    this.modal$ = this.riccioModalService.getEmit().subscribe(res => {
      if (res['type'] === 'open') {
        let obj = {
          'user_arr': res['data'].map(e => e['id']),
          'status': 1,
          'cid': this.routerInfo.cid
        }
        this.riccioLoadingService.setLoading({
          message: '启用中'
        })
        this.grMembersService.postUserStatus(obj).subscribe(_res => {
          this.riccioLoadingService.closeLoading()
          if (_res.status === 1) {
            this.riccioNotificationsService.setSubject({ text: '启用成功' });
            this.riccioPopUpRightService.setSubject({});
            this.allCheckIs = false;
            this.SearchUserData = new disableData().SearchUserData;
            // this.Search.nativeElement.value = '';
            this.fnGetDisableUserList();
          }
        }, error => {
          throw new Error(error)
        })
      }
    })
  }


}
