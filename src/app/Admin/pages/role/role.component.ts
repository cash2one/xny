import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';
import { RoleRouterInfo } from './role-main/roleData'

import { BreadCrumbData } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
import { RoleData } from './role.data'
@Component({
	selector: 'app-role',
	templateUrl: './role.component.html',
	styleUrls: [
		'./role.common.scss',
		'../../Admin.component.scss',
		'../page.common.scss',
		'./role.component.scss'
	]
})
export class RoleComponent implements OnInit {

	public RouterActive: string;
	public routerType: string
	public routerInfo: RoleRouterInfo

	public breadData: BreadCrumbData[]
	constructor(
		public activatedRoute: ActivatedRoute
	) {
		this.activatedRoute.parent.parent.data.subscribe(res => {
			let Menu = res.Menu.json()
			// console.log(Menu)
		})
	}
	ngOnInit() {
		this.activatedRoute.children[0].url.subscribe(res => {
			this.RouterActive = res.length > 0 ? res[0]['path'] : '';
			this.routerType = res[2]['path']

			this.routerInfo = {
				model: res[2]['path'],
				cid: res[4]['path']
			}

			this.resolveBread()
		})
	}

	public resolveBread(){
		this.breadData = []
		this.breadData.push({
			name:'应用管理',
			routerLink:'/Admin/appcenter/list'
		})
		this.breadData.push({
			name:new RoleData().modelNames[this.routerInfo.model],
			routerLink:`/Admin/appcenter/${this.routerInfo.model}`
		})
		this.breadData.push({
			name:'权限设置'
		})
	}
}
