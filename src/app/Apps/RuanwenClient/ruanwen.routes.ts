import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenComponent }		from './ruanwen.component'
import { RuanwenWriteOrderComponent }		from './common/ruanwen-write-order/ruanwen-write-order.component'

import { GrMenuServicesResolve }		from './services'
import { GrMembersService }		from '@gr-api-service/grMembers/grMembers.service'
	
const RuanwenRoutes = [
	{
		path: '',
		component: RuanwenComponent,
		resolve:  { Menu:GrMenuServicesResolve, UserInfo:GrMembersService },
		children:[
			{ path: '', redirectTo: 'article', pathMatch: 'full' },
			{ path: 'order/process', redirectTo: 'order/process/write', pathMatch: 'full' },
			{
				path: 'main',
				loadChildren:'../RuanwenClient/pages/ruanwen-main/ruanwen-main.module#RuanwenMainModule'
			},
			{
				path: 'write',
				loadChildren:'../RuanwenClient/pages/ruanwen-order/ruanwen-order.module#RuanwenOrderModule'
			},
			{
				path: 'article',
				loadChildren:'../RuanwenClient/pages/ruanwen-article/ruanwen-article.module#RuanwenArticleModule'
			}
		]
	}
];

export const ruanwenRoutes: ModuleWithProviders = RouterModule.forChild(RuanwenRoutes);
