import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { MembersComponent }			from './members.component';
import { MembersAppComponent } 		from './members-app/members-app.component';

import { MembersMainComponent } from './members-main/members-main.component'
import { MembersDisableComponent } from './members-disable/members-disable.component'
import { MembersDepartmentComponent } from './members-department/members-department.component'

const MembersRoutes=[
	{
		path:'',
		component: MembersComponent,
		children:[
			{
				path: 'list/model/:model/cid/:cid',
				component: MembersMainComponent,
			},
			{
				path:'member_app/model/:model/cid/:cid/appid/:appid',
				component:MembersAppComponent
			},
			{
				path: 'disable/model/:model/cid/:cid',
				component:MembersDisableComponent
			},
			{
				path: 'department/model/:model/cid/:cid',
				component:MembersDepartmentComponent
			}
		]
	}

]

export const membersRoutes = RouterModule.forChild(MembersRoutes);
