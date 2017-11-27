import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { AppcenterComponent }		from './appcenter.component'
// import { AppcenterMain1Component }		from './appcenter-main/appcenter-main.component'  
import { ModelAdminComponent } from './model-admin/model-admin.component';
import { ModelConsoleComponent } from './model-console/model-console.component';
import { ModelAppconfigComponent } from './model-appconfig/model-appconfig.component';
import { ModelProjectComponent } from './model-project/model-project.component'
import { ModelBsbyServiceComponent } from './model-bsbyService/model-bsbyService.component'
import { ModelBsbyClientComponent } from './model-bsbyClient/model-bsbyClient.component'
import { ModelRuanwenClientComponent } from './model-ruanwenClient/model-ruanwenClient.component'
import { ModelRuanwenServiceComponent } from './model-ruanwenService/model-ruanwenService.component'

import { AppcenterDetailComponent } from './appcenter-detail/appcenter-detail.component'

import { AppcenterMainComponent } from './appcenter-main/appcenter-main.component'


const AppcenterRoutes=[
	{
	    path: '',
	    component: AppcenterComponent,
	    children:[
		    { path: '', redirectTo: 'Admin', pathMatch: 'full' },
			{
				path: 'list',
				component: AppcenterMainComponent,
				children:[
					{
						path:':id',
						component: AppcenterDetailComponent
					}
				]
			},
			{
				path: 'Admin',
				component: ModelAdminComponent
			},
			{
				path: 'Console',
				component: ModelConsoleComponent
			},
			{
				path: 'AppConfig',
				component: ModelAppconfigComponent
			},
			{
				path: 'Project',
				component: ModelProjectComponent
			},
			{
				path: 'BsbyService',
				component:ModelBsbyServiceComponent
			},
			{
				path: 'BsbyClient',
				component:ModelBsbyClientComponent
			},
			{
				path: 'RuanwenClient',
				component:ModelRuanwenClientComponent
			},
			{
				path: 'RuanwenService',
				component:ModelRuanwenServiceComponent
			},
			{
				path: 'appcenter/:name',
				component: AppcenterComponent
			}
	    ]
	},
];

export const appcenterRoutes = RouterModule.forChild(AppcenterRoutes);
