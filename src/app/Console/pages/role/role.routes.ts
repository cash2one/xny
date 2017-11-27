import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RoleComponent }		from './role.component'
import { RoleMainComponent }		from './role-main/role-main.component'
import { RoleManagementComponent }		from './role-management/role-management.component'

const RoleRoutes=[
	{
	    path: '',
	    component: RoleComponent,
	    children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
	    	{
	    		path: 'list',
	    		component: RoleMainComponent
	    	},
	    	{
	    		path: 'management',
	    		component: RoleManagementComponent
	    	}
	    ]
	}

]; 

export const roleRoutes = RouterModule.forChild(RoleRoutes);
