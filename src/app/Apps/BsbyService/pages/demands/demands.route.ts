import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { DemandsComponent } from './demands.component'
import { DemandListComponent } from './demand-list/demand-list.component'


export const routes=[
	{
		path:'',
		component:DemandsComponent,
		children:[
			{
				path:'',
				redirectTo:'list/my',
				pathMatch: 'full'
			},
			{
				path:'list/:type',
				component:DemandListComponent
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
export class DemandsRouteModule{}