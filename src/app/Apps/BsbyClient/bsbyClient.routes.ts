import { NgModule } from '@angular/core'
import { RouterModule , Routes } from '@angular/router'

import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'

import { BsbyClientResolve } from './bsbyClient.resolve'
import { BsbyClientComponent } from './bsbyClient.component'


export const routes:Routes=[
	{
		path:'',
		component: BsbyClientComponent,
		resolve:{
			menus:BsbyClientResolve,
			userInfo:GrMembersService
		},
		children:[
			{ path: '', redirectTo: 'site', pathMatch: 'full' },
			{
				path:'site',
				loadChildren:'./pages/sites/sites.module#SitesModule'
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
export class BsbyClientRouteModule{}

