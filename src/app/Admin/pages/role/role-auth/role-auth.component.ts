import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { RoleAuthService } from './role-auth.service'
import { GrRoleService } from '../../../services/grRole/grRole.service'

import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RoleRouterInfo } from '../role-main/roleData'

@Component({
	selector: 'app-role-auth',
	templateUrl: './role-auth.component.html',
	styleUrls: [
		'../role.common.scss',
		'./role-auth.component.scss'
	]
})
export class RoleAuthComponent implements OnInit {

	@Input() RoleAuthData: any;
	@Input() roleInfo: any
	@Input() routerInfo: RoleRouterInfo

	@Output() emitData: EventEmitter<boolean>

	/**
	 * 显示按钮的状态标志位
	 * @type {boolean}
	 */
	public disabledBtn: boolean
	public isTop: boolean

	constructor(
		public roleAuthService: RoleAuthService,
		public grRoleService: GrRoleService,
		public riccioNotificationsService: RiccioNotificationsService
	) {
		this.emitData = new EventEmitter<boolean>()
		this.disabledBtn = true
		this.isTop = false
	}

	ngOnInit() {
		if ((this.routerInfo.model == 'Admin' && this.roleInfo.id == 1) ||
			(this.routerInfo.model != 'Admin' && this.roleInfo.id == 0)) {
			this.isTop = true
		} else {
			this.isTop = false
		}
	}


	ngOnChanges() {
		if (this.roleInfo.id) {
			if ((this.routerInfo.model == 'Admin' && this.roleInfo.id != 1) ||
				(this.routerInfo.model != 'Admin' && this.roleInfo.id != 0)) {
				this.fnGetRoleAuthData(this.roleInfo['id'])
			}
		}
	}

	/**
	 * @author GR-03
	 * @copyright 点击授权之后触发的方法
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05       GR-03
	 * @param     {boolean}   value [description]
	 */
	public fnSaveRoleRuth(value: boolean): void {
		this.disabledBtn = false
		if (value === true) {
			this.grRoleService.postRolePowerSet({
				'id': this.roleInfo['id'],
				'rules': this.roleAuthService.RoleData.rules.join(','),
				...this.routerInfo
			}).subscribe(res => {
				this.disabledBtn = true
				if (res.status === 1) {
					// this.emitData.emit(true)
					this.riccioNotificationsService.setSubject({ text: '授权成功' })
				}
			}, error => {
				throw new Error(error)
			})
		}
	}

	/**
	 * @author GR-03
	 * @copyright 获取该角色的详情
	 * @param     [param]
	 * @return    [return]
	 * @check     GR-05           GR-03
	 * @param     {number|string} id    [description]
	 */
	public fnGetRoleAuthData(id: number | string): void {
		let data = {
			id: id,
			...this.routerInfo
		}
		this.grRoleService.getRoleInfo(data).subscribe(res => {
			if (res.status === 1) {
				let arr = res['data']['rules'].split(',')
				this.roleAuthService.setSubject({
					symbol: '1',
					rules: arr.filter(e => e != '')
				})
			}
		}, error => {
			throw new Error(error)
		})
	}

}
