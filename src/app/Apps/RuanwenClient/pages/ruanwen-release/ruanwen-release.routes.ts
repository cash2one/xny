import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RuanwenReleaseComponent }		from './ruanwen-release.component'
import { ReleaseResourceComponent }		from './release-resource/release-resource.component'
import { ReleaseActivityComponent }		from './release-activity/release-activity.component'
import { ReleaseExecutoryComponent }	from './release-executory/release-executory.component'
import { ReleaseCompleteComponent }		from './release-complete/release-complete.component'

const RuanwenReleaseRoutes=[
	{
	    path: 'release',
	    component: RuanwenReleaseComponent,
	    children:[
			{ 	path: '', redirectTo: 'screen/list', pathMatch: 'full' },
			{ 	path: 'executory', redirectTo: 'executory/0', pathMatch: 'full' },
			{ 	path: 'screen', redirectTo: 'screen/list', pathMatch: 'full' },
			{ 	path: 'complete', redirectTo: 'complete/0', pathMatch: 'full' },
			{ 	path: 'delivery', redirectTo: 'delivery', pathMatch: 'full' },
			{ 	path: 'screen/list/0', redirectTo: 'screen/list', pathMatch: 'full' },
	    	{
	    		path:'screen/list',
	    		component: ReleaseResourceComponent
	    	},
	    	{
	    		path:'screen/list/:id',
	    		component: ReleaseResourceComponent
	    	},
	    	{
	    		path:'delivery',
	    		component: ReleaseActivityComponent
	    	},
	    	{
	    		path:'delivery/:id',
	    		component: ReleaseActivityComponent
	    	},
	    	{
	    		path:'executory/:id',
	    		component: ReleaseExecutoryComponent
	    	},
	    	{
	    		path:'executoryDraft/:id',
	    		component: ReleaseExecutoryComponent
	    	},
	    	{
	    		path:'complete/:id',
	    		component: ReleaseCompleteComponent
	    	}
	    ]
	}

]; 

export const ruanwenReleaseRoutes = RouterModule.forChild(RuanwenReleaseRoutes);
