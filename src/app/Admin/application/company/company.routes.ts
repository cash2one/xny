import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { CompanyComponent }		from './company.component'
import { CompanyMainComponent }		from './company-main/company-main.component';
import { CompanyManagerComponent } from './company-manager/company-manager.component'
import { CompanyConsumeAllComponent } from './company-consumeAll/company-consumeAll.component'

import { CompanyAuditComponent } from './company-audit/company-audit.component'
import {ApplicationManagementComponent} from "./application-management/application-management.component";


const CompanyRoutes=[

	{
	    path: '',
	    component: CompanyComponent,
	    children:[
			{
				path: 'list/model/:model/app_id/:app_id/type/:type',
				component: CompanyMainComponent
			},
			{
				path:'list/audite_list',
				component:CompanyAuditComponent
			},
			{
				path: 'list/manager',
				component:CompanyManagerComponent
			},
			{
				path:'account/list',
				component:CompanyConsumeAllComponent
			},
        {
          path:'app/list/:id',
          component:ApplicationManagementComponent
        },
			{
				path:'',
				redirectTo:'list/manager',
				pathMatch:'full'
			},
			{
				path:'list',
				redirectTo:'list/manager',
				pathMatch:'full'
			}
	    ]
	},

];

export const companyRoutes = RouterModule.forChild(CompanyRoutes);
