import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AccountComponent }		from './account.component'
import { AccountProfileComponent }		from './account-profile/account-profile.component'

const AccountRoutes=[
	{
	    path: '',
	    component: AccountComponent,
	    children:[
	    	{ path: '', redirectTo: 'profile', pathMatch: 'full' },
	    	{
	    		path: 'profile',
	    		component: AccountProfileComponent
	    	}
	    ]
	}

]; 

export const accountRoutes = RouterModule.forChild(AccountRoutes);
