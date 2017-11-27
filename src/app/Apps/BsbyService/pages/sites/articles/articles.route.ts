import { NgModule } from '@angular/core'
import { RouterModule,Routes } from '@angular/router'

import { ArticlesComponent } from './articles.component'
import { ArticleListComponent } from './article-list/article-list.component'

export const routes=[
	{
		path:'',
		component:ArticlesComponent,
		children:[
			{
				path:'',
				redirectTo:'list',
				pathMatch:'full'
			},
			{
				path:'list',
				component:ArticleListComponent
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
export class ArticlesRouteModule{}