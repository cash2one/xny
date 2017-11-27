import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenServiceComponent }		from './ruanwen-service.component'
import { GrMenuServicesResolve }		from './services'
import { GrMembersService }				from '@gr-api-service/grMembers/grMembers.service'

const RuanwenServiceRoutes = [
	{
		path: '',
		component: RuanwenServiceComponent,
		resolve:  { Menu:GrMenuServicesResolve,UserInfo:GrMembersService },
		// resolve:  { Menu:GrMenuServicesResolve },
		children:[
			{ path: '', redirectTo: 'article', pathMatch: 'full' },
			{
				path:'article',
				loadChildren:'../RuanwenService/pages/ruanwen-article/ruanwen-article.module#RuanwenArticleModule'
			},
			{
				path:'company',
				loadChildren:'../RuanwenService/pages/ruanwen-company/ruanwen-company.module#RuanwenCompanyModule'
			},
			{
				path:'order',
				loadChildren:'../RuanwenService/pages/ruanwen-order/ruanwen-order.module#RuanwenOrderModule'
			},
			{
				path:'account',
				loadChildren:'../RuanwenService/pages/ruanwen-account/ruanwen-account.module#RuanwenAccountModule'
			}
		]
	}
];

export const ruanwenServiceRoutes = RouterModule.forChild(RuanwenServiceRoutes);
