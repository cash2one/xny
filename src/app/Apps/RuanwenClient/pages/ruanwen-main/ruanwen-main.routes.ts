import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RuanwenMainComponent }		from './ruanwen-main.component'

const RuanwenMainRoutes=[
	{
	    path: '',
	    component: RuanwenMainComponent
	}

]; 

export const ruanwenMainRoutes = RouterModule.forChild(RuanwenMainRoutes);
