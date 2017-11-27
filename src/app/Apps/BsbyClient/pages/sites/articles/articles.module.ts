import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { ArticlesComponent } from './articles.component'
import { ArticlesRouteModule } from './articles.route'

import { ArticleListComponent } from './article-list/article-list.component'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        ArticlesRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule
    ],
    declarations: [
        ArticlesComponent,
        ArticleListComponent
    ],
    exports:[
        ArticlesComponent
    ],
    providers:[
    ]
})
export class ArticlesModule { }