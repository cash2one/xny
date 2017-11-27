import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenAccountComponent }		from './ruanwen-account.component'
import { AccountMainComponent }		from './account-main/account-main.component'

const RuanwenAccountRoutes = [
	{
		path: '',
		component: RuanwenAccountComponent,
		children:[
			{ 	path: '', redirectTo: 'main', pathMatch: 'full' },
	    	{
	    		path: 'main',
		    	component:AccountMainComponent
	    	}
		]
	}
];

export const ruanwenAccountRoutes: ModuleWithProviders = RouterModule.forChild(RuanwenAccountRoutes);
