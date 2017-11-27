import { NgModule } from '@angular/core'
import { RouterModule , Routes } from '@angular/router'

import { GrMembersService } from '@gr-api-service/grMembers/grMembers.service'

import { BsbyServiceResolve } from './bsbyService.resolve'
import { BsbyServiceComponent } from './bsbyService.component'


export const routes:Routes=[
	{
		path:'',
		component: BsbyServiceComponent,
		resolve:{
			menus:BsbyServiceResolve,
			userInfo:GrMembersService
		},
		children:[
			{ path: '', redirectTo: 'customer', pathMatch: 'full' },
			{
				path:'customer',
				loadChildren:'../BsbyService/pages/customers/customers.module#CustomersModule'
			},
			{
				path:'site',
				loadChildren:'../BsbyService/pages/sites/sites.module#SitesModule'
			},
			{
				path:'product',
				loadChildren:'../BsbyService/pages/products/products.module#ProductsModule'
			},
			{
				path:'keyword',
				loadChildren:'../BsbyService/pages/keywords/keywords.module#KeywordsModule'
			},
			{
				path:'demand',
				loadChildren:'../BsbyService/pages/demands/demands.module#DemandsModule'
			},
			{
				path:'programme',
				loadChildren:'../BsbyService/pages/programmes/programmes.module#ProgrammesModule'
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
export class BsbyServiceRouteModule{}

