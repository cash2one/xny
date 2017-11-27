import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenOrderComponent }		from './ruanwen-order.component'

import { OrderListComponent }		from './order-list/order-list.component'

const RuanwenOrderRoutes = [
	{
		path: '',
		component: RuanwenOrderComponent,
		children:[
			{ 	path: '', redirectTo: 'list', pathMatch: 'full' },
			{ 	path: 'write', redirectTo: 'write/list', pathMatch: 'full' },
	    	{
	    		path: 'list',
		    	component:OrderListComponent
	    	},
	    	{
	    		path: 'write/list',
		    	component:OrderListComponent
	    	}
		]
	}
];

export const ruanwenOrderRoutes: ModuleWithProviders = RouterModule.forChild(RuanwenOrderRoutes);
