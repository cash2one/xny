import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenArticleComponent } from './ruanwen-article.component';

import { ruanwenArticleRoutes }	from './ruanwen-article.routes';
import { ArticleListComponent } from './article-list/article-list.component'

import { RiccioPaginationsModule }		from '../../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }    from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';

import { RuanwenListHeaderModule }		from '../../../RuanwenClient/common/ruanwen-list-header/ruanwen-list-header.module'


@NgModule({
  imports: [
    CommonModule,
    ruanwenArticleRoutes,
    RuanwenListHeaderModule,
    RiccioPboxModule,
    RiccioSpinnersModule,
    RiccioPaginationsModule
  ],
  exports:[
  	RuanwenArticleComponent
  ],
  declarations: [RuanwenArticleComponent, ArticleListComponent]
})
export class RuanwenArticleModule { }
