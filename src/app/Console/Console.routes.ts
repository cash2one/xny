import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { environment } from '../../environments/environment'

import { GrConsolesService }		from './services'
import { GrSettingService }			from './services'
import { GrMembersService }		    from '@gr-api-service/grMembers/grMembers.service'

import { ConsoleComponent } from './Console.component'

const ConsoleRoutes = [
	{
		path: '',
		component: ConsoleComponent,
		resolve: { Menu:GrConsolesService,UserInfo:GrMembersService },
		children: [
            { path: '', redirectTo: 'members', pathMatch: 'full' },
            {
                path:'index',
                loadChildren:"../Console/pages/index/index.module#IndexModule"
            },
			{
				path: "role",
				loadChildren: "../Console/pages/role/role.module#RoleModule"
			},
			{
				path: "setting",
				loadChildren: "../Console/pages/setting/setting.module#SettingModule"
			},
			{
				path: "apps",
				loadChildren: "../Console/pages/apps/apps.module#AppsModule"
			},
			{
				path: "user",
				loadChildren: "../Console/pages/account/account.module#AccountModule"
			},
			{
				path: "members",
				loadChildren: "../Console/pages/members/members.module#MembersModule"
			},
			{
				path: 'account',
				loadChildren:"../Console/pages/accounts/account.module#AccountModule"
			},
			{
				path: 'message',
				loadChildren:"../Console/pages/messages/message.module#MessageModule"
			},
			{
				path: 'gongdan',
				loadChildren:"../Console/pages/gongdan/gongdan.module#GongdanModule"
			}
			// 
		]
	}
];

export const consoleRoutes: ModuleWithProviders = RouterModule.forChild(ConsoleRoutes);
