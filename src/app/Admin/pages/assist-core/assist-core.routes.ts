import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AssistCoreComponent }		from './assist-core.component'
import { AssistMainComponent }		from './assist-main/assist-main.component'

const AssistCoreRoutes=[
	{
	    path: '',
	    component: AssistCoreComponent,
	    children:[
		    { path: '', redirectTo: 'main', pathMatch: 'full' },
		    {
		    	path: 'main',
		    	component: AssistMainComponent
		    }
	    ]
	},
];

export const assistCoreRoutes = RouterModule.forChild(AssistCoreRoutes);
