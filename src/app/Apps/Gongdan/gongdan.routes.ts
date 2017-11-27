import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { GongdanComponent }		from './gongdan.component'
import { AssistMainComponent }		from './pages/FAQ/assist-main/assist-main.component'
import { CsdMainComponent }			from './pages/CSD/csd-main/csd-main.component'

import { GrMembersService }		from '@gr-api-service/grMembers/grMembers.service'

const GongdanRoutes = [
	{
		path: '',
		component: GongdanComponent,
		resolve:  { UserInfo:GrMembersService },
		children:[
			{ path: '', redirectTo: 'FAQ', pathMatch: 'full' },
			{
				path: 'FAQ',
				component: AssistMainComponent
			},
			{
				path: 'CSD',
				component: CsdMainComponent
			}
		]
	}
];

export const gongdanRoutes: ModuleWithProviders = RouterModule.forChild(GongdanRoutes);
