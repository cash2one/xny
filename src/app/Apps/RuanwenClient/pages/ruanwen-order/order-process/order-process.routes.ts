import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { OrderProcessComponent }		from './order-process.component'
import { RuanwenWriteOrderComponent }		from '../../../common/ruanwen-write-order/ruanwen-write-order.component'
import { WriteWritingComponent }		from './write-writing/write-writing.component'
import { WriteCompleteComponent }		from './write-complete/write-complete.component'

const OrderProcessRoutes=[
	{
	    path: 'process',
	    component: OrderProcessComponent,
	    children:[
			{ 	path: '', redirectTo: 'add', pathMatch: 'full' },
			{ 	path: 'add', redirectTo: 'add/article', pathMatch: 'full' },
			{ 	path: 'writing', redirectTo: 'add', pathMatch: 'full' },
	    	{
	    		path: 'add/article',
		    	component:RuanwenWriteOrderComponent
	    	},
	    	{
	    		path: 'add/article/:id',
		    	component:RuanwenWriteOrderComponent
	    	},
	    	{
	    		path: 'writing/:id',
	    		component:WriteWritingComponent
	    	},
	    	{
	    		path: 'complete/:id',
	    		component:WriteCompleteComponent
	    	}
	    ]
	}

]; 

export const orderProcessRoutes = RouterModule.forChild(OrderProcessRoutes);
