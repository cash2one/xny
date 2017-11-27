import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenArticleComponent } from './ruanwen-article.component';

import { RuanwenListHeaderModule }		from '../../common/ruanwen-list-header/ruanwen-list-header.module'
import { RuanwenWritingArticlesModule }    from '../../common/ruanwen-writing-articles/ruanwen-writing-articles.module'
import { RiccioSpinnersModule }       from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioPaginationsModule }		from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RuanwenSecoundMenuModule }		from '../../common/ruanwen-secound-menu/ruanwen-secound-menu.module'
import { RiccioPboxModule }      from '@gr-public/riccio-pbox/riccio-pbox.module'


import { RuanwenReleaseModule }    from '../ruanwen-release/ruanwen-release.module'
import { OrderListModule }      from '../ruanwen-order/order-list/order-list.module'

import { ruanwenArticleRoutes }		from './ruanwen-article.routes'

import { ArticleListComponent }		from './article-list/article-list.component' 

@NgModule({
  imports: [
    CommonModule,
    RuanwenListHeaderModule,
    RiccioPaginationsModule,
    RuanwenSecoundMenuModule,
    ruanwenArticleRoutes,
    RiccioPboxModule,
    RiccioSpinnersModule,
    RuanwenWritingArticlesModule,

    OrderListModule,
    RuanwenReleaseModule
  ],
  exports:[
  	RuanwenArticleComponent
  ],
  declarations: [
  	RuanwenArticleComponent,
  	ArticleListComponent
  ]
})
export class RuanwenArticleModule { }
