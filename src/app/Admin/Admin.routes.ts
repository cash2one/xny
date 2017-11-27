import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AdminComponent }			from './Admin.component';
import { ErrorViewComponent }		from './error-view/error-view.component'

import { GrMenuListService }		from './services'
import { GrMembersService }			from '../ApiServices/grMembers/grMembers.service'

const AdminRoutes=[
	{
	    path: '',
	    component: AdminComponent,
	    resolve:{
			Menu:GrMenuListService,
			UserInfo:GrMembersService
		},
	    children: [
	      { path: '', redirectTo: 'appcenter/list', pathMatch: 'full' },
	      { path: 'appcenter', loadChildren: '../Admin/pages/appcenter/appcenter.module#AppcenterModule', data: { title:'appcenter',id:'16' }},
	      { path: 'company', loadChildren: '../Admin/application/company/company.module#CompanyModule'},
	      { path: 'menu', loadChildren: '../Admin/pages/system/system.module#SystemModule', data: { title:'menu',id:'1' } },
	      { path: 'user', loadChildren: '../Admin/pages/user/user.module#UserModule', data: { title:'user',id:'13' } },
	      { path: 'adminuser', loadChildren: '../Admin/pages/user/user.module#UserModule', data: { title:'user',id:'13' } },
	      { path: 'config', loadChildren: '../Admin/pages/config/config.module#ConfigModule', data: { title:'config',id:'24' }},
          { path: 'setting', loadChildren: '../Admin/pages/setting/setting.module#SettingModule'},
	      { path: 'addoncenter', loadChildren: '../Admin/pages/addoncenter/addoncenter.module#AddoncenterModule', data: { title:'addoncenter',id:'21' }},
	      { path: 'task', loadChildren: '../Admin/pages/project/project.module#ProjectModule', data: { title:'task',id:'8' } },
	      { path: 'role', loadChildren: '../Admin/pages/role/role.module#RoleModule', data: { title:'role',id:'10' } },
	      { path: 'project', loadChildren: '../Admin/pages/project/project.module#ProjectModule', data: { title:'project' } },
	      { path: 'members', loadChildren: '../Admin/pages/members/members.module#MemberModule', data: { title:'members',id:'60' } },
	      { path: 'assist', loadChildren: '../Admin/pages/assist-core/assist-core.module#AssistCoreModule'},
	      { path: 'error', component: ErrorViewComponent },
	      { path: ':path', component: ErrorViewComponent }
	    ]
	}
];

export const adminRoutes = RouterModule.forChild(AdminRoutes);
