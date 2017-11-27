import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { MembersComponent }		from './members.component'
import { MembersDisableComponent }		from './members-disable/members-disable.component'
import { MembersDepartmentComponent }		from './members-department/members-department.component'
import { MembersMainComponent }		from './members-main/members-main.component'

const MembersRoutes=[
	{
	    path: '',
	    component: MembersComponent,
	    children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
		    {
		    	path: 'list',
		    	component: MembersMainComponent
		    },
			{
				path: 'disable',
				component: MembersDisableComponent
			},
			{
				path: 'department',
				component: MembersDepartmentComponent
			}
	    ]
	}
]; 

export const membersRoutes = RouterModule.forChild(MembersRoutes);
