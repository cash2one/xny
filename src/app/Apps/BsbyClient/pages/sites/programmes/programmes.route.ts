import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { ProgrammesComponent } from './programmes.component'
import { ProgrammeListComponent } from './programme-list/programme-list.component'
import { ProgrammeDetailComponent } from './programme-detail/programme-detail.component'

export const routes=[
	{
		path:'',
		component:ProgrammesComponent,
		children:[
			{
				path:'',
				redirectTo:'list',
				pathMatch:'full'
			},
			{
				path:'list',
				component:ProgrammeListComponent
			},
			{
				path:'detail/:programmeid',
				component:ProgrammeDetailComponent
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
export class ProgrammesRouteModule{}