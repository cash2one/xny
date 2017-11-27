import { Component, OnInit } from '@angular/core';

import { XnCsdServices }		from '../../../../services'
import { RiccioModalService }		from '@gr-public/riccio-modal/riccio-modal.service'

@Component({
  selector: 'app-customer-user-no-group',
  templateUrl: './customer-user-no-group.component.html',
  styleUrls: ['../../../../../../Public/theme/apps-common/common.scss',
              '../../../../../../Public/theme/apps-common/table.scss',
              './customer-user-no-group.component.scss']
})
export class CustomerUserNoGroupComponent implements OnInit {

  public noAdminTableTitle: string[] = ['姓名','手机号','性别','编辑']

  public noGroupUserListData: any[] = []  // 没有设置分组的成员列表

  public checkSetUserList: any[] = [] // 需要设置的客服分组成员列表数据

  constructor(
  	private xnCsdServices: XnCsdServices,
  	private riccioModalService: RiccioModalService
  ) { }

  ngOnInit() {
  	this.fnGetNoGroupUserList()
  }

  /*
  获取无分组的成员列表的函数
   */
  public fnGetNoGroupUserList() : void {

  	this.xnCsdServices.postCustomerNoGroup({
  		'model': 'Gongdan',
  		'group_id': 0
  	}).subscribe(res=> {

  		if(res.status === 1 ) {

  			this.noGroupUserListData = Array.isArray(res['data']['data']) == true ? [...res['data']['data']]:[]

  		}

  	},error=> {
  		throw new Error(error)
  	})

  }


  /*
  点击设置分组弹出显示设置分组的弹窗
   */
  public fnShowSetGrouping( data: any ) : void {

  	this.checkSetUserList = [data]

  	this.riccioModalService.setSubject({
  		'data': data,
  		'header': '设置客服分组',
  		'size': 600,
  		'noBtn': true,
  		'type': 'setGroup'
  	})

  }

}
