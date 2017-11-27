import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AddoncenterComponent }		from './addoncenter.component'
import { AddoncenterMainComponent }		from './addoncenter-main/addoncenter-main.component'  
import { AddoncenterDetialComponent } from './addoncenter-detial/addoncenter-detial.component';


const AddoncenterRoutes=[
	{
	    path: '',
	    component: AddoncenterComponent,
	    children:[
	    	{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path: 'list',
				component: AddoncenterMainComponent,
				children:[
					{
						path:':id',
						component: AddoncenterDetialComponent
					}
				]
			},	
	    ]
	},
];

export const addoncenterRoutes = RouterModule.forChild(AddoncenterRoutes);
