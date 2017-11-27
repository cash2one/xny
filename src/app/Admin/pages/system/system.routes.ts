import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';

import { SystemComponent } from './system.component'
import { MenuComponent } from './menu/menu.component'
const SystemRoutes = [

	{
		path: '',
		component: SystemComponent,
		children: [
			{
				path: 'list/model/:model/cid/:cid/status/:status',
				component: MenuComponent
			}
		]
	},

];

export const systemRoutes = RouterModule.forChild(SystemRoutes);
