import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AppsComponent }			from './apps.component'
import { AppsMainComponent }			from './apps-main/apps-main.component'
import { AppsMyComponent }			from './apps-my/apps-my.component'
import { AppsInfoComponent }		from './apps-main/apps-info/apps-info.component'

const AppsRoutes=[
	{
	    path: '',
	    component: AppsComponent,
	    children:[
			{ path: '', redirectTo: 'my', pathMatch: 'full' },
	    	{
	    		path: 'market',
	    		component: AppsMainComponent
	    	},
	    	{
	    		path: 'my',
	    		component: AppsMyComponent
	    	},
	    	{
				path: 'info/:model',
    			component: AppsInfoComponent
			}
	    ]
	}

]; 

export const appsRoutes = RouterModule.forChild(AppsRoutes);
