import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';

import { UserComponent } from './user.component'
import { UserMainComponent } from './user-main/user-main.component'
import { UserDetailsComponent } from './user-details/user-details.component'

const UserRoutes = [
	{
		path: '',
		component: UserComponent,
		children: [
		    { path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path: 'list',
				component: UserMainComponent,
				children: [
					{
						path: ':id',
						component: UserDetailsComponent
					}
				]
			}
		]
	}
];

export const userRoutes = RouterModule.forChild(UserRoutes);
