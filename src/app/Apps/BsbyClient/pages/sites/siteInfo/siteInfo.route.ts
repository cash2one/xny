import { NgModule } from '@angular/core'
import { RouterModule , Routes} from '@angular/router'

import { SiteInfoComponent } from './siteInfo.component'


export const routes:Routes=[
	{
		path:'',
		// component:SiteInfoComponent,
		children:[
			{
				path:':siteid',
				component:SiteInfoComponent
			}
		]
	}
]

@NgModule({
	imports:[
		RouterModule.forChild(routes)
	],
	exports:[
		RouterModule
	]
})

export class SiteInfoRouteModule{}