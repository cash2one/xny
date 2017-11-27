import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { SettingComponent }		from './setting.component'
import { SettingMainComponent }		from './setting-main/setting-main.component'
import { SettingLogoComponent }		from './setting-logo/setting-logo.component'
import { SettingCertificationComponent }		from './setting-certification/setting-certification.component'

const SettingRoutes=[
	{
	    path: '',
	    component: SettingComponent,
	    children:[
			{ path: '', redirectTo: 'info', pathMatch: 'full' },
		    {
		    	path: 'info',
		    	component: SettingMainComponent
		    },
		    {
		    	path: 'logo',
		    	component: SettingLogoComponent
		    },
		    {
		    	path: 'certification',
		    	component: SettingCertificationComponent
		    }
	    ]
	}

]; 

export const settingRoutes = RouterModule.forChild(SettingRoutes);
