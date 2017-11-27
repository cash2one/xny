import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { KeywordsComponent } from './keywords.component'
import { KeywordsRouteModule } from './keywords.route'

import { KeywordListComponent } from './keyword-list/keyword-list.component'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        KeywordsRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule
    ],
    declarations: [
        KeywordsComponent,
        KeywordListComponent
    ],
    exports:[
        KeywordsComponent
    ]
})
export class KeywordsModule { }