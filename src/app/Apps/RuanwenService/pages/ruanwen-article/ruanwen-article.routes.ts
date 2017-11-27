import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RuanwenArticleComponent }		from './ruanwen-article.component'
import { ArticleListComponent }		from './article-list/article-list.component'

const RuanwenArticleRoutes = [
	{
		path: '',
		component: RuanwenArticleComponent,
		children:[
			{ 	path: '', redirectTo: 'list', pathMatch: 'full' },
	    	{
	    		path: 'list',
		    	component:ArticleListComponent
	    	}
		]
	}
];

export const ruanwenArticleRoutes: ModuleWithProviders = RouterModule.forChild(RuanwenArticleRoutes);
