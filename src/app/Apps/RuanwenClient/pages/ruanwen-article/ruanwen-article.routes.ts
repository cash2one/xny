import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,RouterModule } 	from '@angular/router';

import { RuanwenArticleComponent }		from './ruanwen-article.component'
import { ArticleListComponent }		from './article-list/article-list.component'
import { RuanwenWritingArticlesComponent }		from '../../common/ruanwen-writing-articles/ruanwen-writing-articles.component'
import { OrderListComponent }			from '../ruanwen-order/order-list/order-list.component'

const RuanwenArticleRoutes=[
	{
	    path: '',
	    component: RuanwenArticleComponent,
	    children:[
			{ 	path: '', redirectTo: 'list', pathMatch: 'full' },
	    	{
	    		path: 'list',
		    	component:ArticleListComponent
	    	},
	    	{
	    		path: 'order',
		    	component:OrderListComponent
	    	},
	    	{
	    		path: 'writing',
	    		component:RuanwenWritingArticlesComponent
	    	},
	    	{
	    		path: 'writing/:id',
	    		component:RuanwenWritingArticlesComponent
	    	}
	    ]
	}

]; 

export const ruanwenArticleRoutes = RouterModule.forChild(RuanwenArticleRoutes);
