import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { ProgrammesComponent } from './programmes.component'
import { ProgrammeListComponent } from './programme-list/programme-list.component'
import { ProgrammeListAllComponent } from './programme-list/programme-all/programme-all.component'
import { ProgrammeEditComponent } from './programme-list/programme-edit/programme-edit.component'
import { ProgrammeDetailComponent } from './programme-list/programme-detail/programme-detail.component'


export const routes=[
	{
		path:'',
		component:ProgrammesComponent,
		children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path:'list',
				component:ProgrammeListComponent,
				children:[
					{ path: '', redirectTo: 'all', pathMatch: 'full' },
					{
						path:'all',
						component:ProgrammeListAllComponent
					},
					{
						path:'edit/:programmeid/:siteid',
						component:ProgrammeEditComponent
					},
					{
						path:'detail/:programmeid/:siteid',
						component:ProgrammeDetailComponent
					}
				]
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
export class ProgrammeRouteModule{}