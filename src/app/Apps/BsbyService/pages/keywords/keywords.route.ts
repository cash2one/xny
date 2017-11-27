import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { KeywordsComponent } from './keywords.component'
import { KeywordListComponent } from './keyword-list/keyword-list.component'


export const routes=[
	{
		path:'',
		component:KeywordsComponent,
		children:[
			{
				path:'',
				redirectTo:'list',
				pathMatch: 'full'
			},
			{
				path:'list',
				component:KeywordListComponent
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
export class KeywordsRouteModule{}