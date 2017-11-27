import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { BackLinksComponent } from './backLinks.component'
import { BackLinkListComponent } from './backLink-list/backLink-list.component'

export const routes=[
	{
		path:'',
		component:BackLinksComponent,
		children:[
			{
				path:'',
				redirectTo:'list',
				pathMatch:'full'
			},
			{
				path:'list',
				component:BackLinkListComponent
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
export class BackLinksRouteModule{}