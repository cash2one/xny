import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { DemandsComponent } from './demands.component'


export const routes=[
	{
		path:'',
		component:DemandsComponent
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