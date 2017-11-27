import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { CustomersComponent } from './customers.component'
import { CustomerListComponent } from './customer-list/customer-list.component'

export const routes:Routes=[
	{
		path:'',
		component:CustomersComponent,
		children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path:'list',
				component:CustomerListComponent
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
export class CustomerRouteModule{}