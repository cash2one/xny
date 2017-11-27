import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenCompanyComponent }		from './ruanwen-company.component'
import { CompanyMainComponent }			from './company-main/company-main.component'
	
const RuanwenCompanyRoutes = [
	{
		path: '',
		component: RuanwenCompanyComponent,
		children:[
			{ 	path: '', redirectTo: 'main', pathMatch: 'full' },
	    	{
	    		path: 'main',
		    	component:CompanyMainComponent
	    	}
		]
	}
];

export const ruanwenCompanyRoutes: ModuleWithProviders = RouterModule.forChild(RuanwenCompanyRoutes);
