import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RuanwenOrderComponent }		from './ruanwen-order.component'
import { OrderListComponent }		from './order-list/order-list.component'
import { OrderWriteComponent }			from './order-write/order-write.component'
import { RuanwenWriteOrderComponent }		from '../../common/ruanwen-write-order/ruanwen-write-order.component'

const RuanwenOrderRoutes=[
	{
	    path: '',
	    component: RuanwenOrderComponent,
	    children:[
			{ 	path: '', redirectTo: 'list', pathMatch: 'full' },
	    	{
	    		path: 'list',
		    	component:OrderWriteComponent
	    	},
	    	{
	    		path: 'add',
		    	component:RuanwenWriteOrderComponent
	    	},
	    	{
	    		path: 'add/:id',
		    	component:RuanwenWriteOrderComponent
	    	}
	    	// {
	    	// 	path: 'write/list',
		    // 	component:OrderWriteComponent
	    	// }
	    	// {
	    	// 	path: 'write/article',
		    // 	component:RuanwenWriteOrderComponent
	    	// },
	    	// {
	    	// 	path: 'write/article/:id',
		    // 	component:RuanwenWriteOrderComponent
	    	// }
	    ]
	}

]; 

export const ruanwenOrderRoutes = RouterModule.forChild(RuanwenOrderRoutes);
