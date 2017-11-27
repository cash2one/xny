import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { ProgrammesComponent } from './programmes.component'
import { ProgrammeListComponent } from './programme-list/programme-list.component'
import { ProgrammeOpComponent } from './programme-op/programme-op.component'
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
				path:'op/:type/:programmeid',
				component:ProgrammeOpComponent
			},
			{
				path:'op/:type',
				component:ProgrammeOpComponent
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