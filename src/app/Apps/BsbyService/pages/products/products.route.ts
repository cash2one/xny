import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { ProductsComponent } from './products.component'
import { ProductListComponent } from './product-list/product-list.component'


export const routes=[
	{
		path:'',
		component:ProductsComponent,
		children:[
			{ path: '', redirectTo: 'list', pathMatch: 'full' },
			{
				path:'list',
				component:ProductListComponent
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
export class ProductsRouteModule{}