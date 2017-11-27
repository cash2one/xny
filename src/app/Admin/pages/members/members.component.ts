import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

import { BreadCrumbData } from '../../../Public/riccio-breadcrumb/riccio-breadcrumb.data'
import { Models } from '../../Admin.menu'
import { AdminService } from '../../Admin.service'
import { MembersService,RouterInfo } from './members.service'
import { GrCompanyService } from '../../services/grCompany/grCompany.service'

@Component({
	selector: 'app-members',
	templateUrl: './members.component.html',
	styleUrls: [
		'../role/role.common.scss',
		'../../Admin.component.scss',
		'../page.common.scss',
		'./members.component.scss'
	]
})
export class MembersComponent implements OnInit, OnDestroy{

	public routerInfoObj:any

	public routerInfo: RouterInfo

	public breadcrumbData: BreadCrumbData[]

	isConsole: boolean
	//企业名称
	cname: string

	constructor(
		public router: Router,
		private activatedRoute: ActivatedRoute,
		private adminService: AdminService,
		private membersService:MembersService,
		private grCompanyService:GrCompanyService
	) {
		this.routerInfoObj = this.membersService.routerInfoObj.subscribe(res=>{
			this.routerInfo = res
			this.getCname()
			this.resolveRouter(res)
		})
	}

	ngOnInit(){
		
	}

	ngOnDestroy(){
		this.routerInfoObj.unsubscribe()
	}

	/**
	 * 处理路由显示
	 * @param res 
	 * @author GR-05
	 */
	resolveRouter(res:RouterInfo){
		if(res.model == 'Console'){
			this.isConsole = true
			this.breadcrumbData = [
				{ name: '应用管理', routerLink: '/Admin/appcenter/list' },
				{ name: '企业控制台', routerLink: `/Admin/appcenter/Console` },
				{ name: '部门与员工' }
			]
		}else{
			this.breadcrumbData = [
				{ name: '应用管理', routerLink: '/Admin/appcenter/list' },
				{ name: new Models().names[this.routerInfo.model], routerLink: `/Admin/appcenter/${this.routerInfo.model}` },
				{ name: '部门与员工' }
			]
		}
	}

	/**
	 * 获取企业名称
	 * @author GR-05
	 */
	getCname(){
		this.grCompanyService.getCompanyInfo(this.routerInfo.cid).subscribe(res=>{
			if(res.status === 1){
				this.cname = res.data.name
			}
		})
	}
}
