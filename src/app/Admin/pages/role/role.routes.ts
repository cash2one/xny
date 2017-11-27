import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RoleComponent }		from './role.component'
import { RoleMainComponent }		from './role-main/role-main.component'
import { RoleManagementComponent }		from './role-management/role-management.component'

const RoleRoutes=[
	{
	    path: '',
	    component: RoleComponent,
	    children:[
	    	{
	    		path: 'list/model/:model/cid/:cid',
	    		component: RoleMainComponent
	    	},
	    	{
	    		path: 'management/model/:model/cid/:cid',
	    		component: RoleManagementComponent
	    	}
	    ]
	}

]; 

export const roleRoutes = RouterModule.forChild(RoleRoutes);
