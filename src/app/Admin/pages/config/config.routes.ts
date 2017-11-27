import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { ConfigComponent }		from './config.component'
import { ConfigMainComponent }		from './config-main/config-main.component'
import { ConfigDriveComponent }		from './config-main/config-drive/config-drive.component'
import { ConfigTemplateComponent }		from './config-main/config-template/config-template.component'
import { ConfigRuleComponent }		from './config-main/config-rule/config-rule.component'
import { MailTemplateComponent }		from './config-main/mail-template/mail-template.component'
import { MailDriveComponent }			from './config-main/mail-drive/mail-drive.component'
// import { MailRuleComponent }			from './config-main/mail-rule/mail-rule.component'

import { MailRuleComponent } from './config-main/mail-rule/mail-rule.component'

const ConfigRoutes=[
	{
	    path: '',
	    component: ConfigComponent,
	    children:[
		    { path: '', redirectTo: 'main', pathMatch: 'full' },
			{
				path:'main',
				component:ConfigMainComponent
			},
			{
				path:'sms',
				component:ConfigMainComponent,
			    children:[
			    	{ path: '', redirectTo: 'drive', pathMatch: 'full' },
					{
						path:'drive',
						component:ConfigDriveComponent
					},
					{
						path:'template',
						component:ConfigTemplateComponent
					},
					{
						path:'rule',
						component:ConfigRuleComponent
					}
			    ]
			},
			{
				path:'mail',
				component:ConfigMainComponent,
			    children:[
			    	{ path: '', redirectTo: 'drive', pathMatch: 'full' },
					{
						path:'drive',
						component:MailDriveComponent
					},
					{
						path:'list',
						component:MailTemplateComponent
					},
					{
						path:'rule_list',
						component:MailRuleComponent
					}
			    ]
			},
			{
				path:'config/:name',
				component:ConfigMainComponent
			}
	    ]
	},
];

export const configRoutes = RouterModule.forChild(ConfigRoutes);
