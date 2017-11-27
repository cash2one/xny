import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { SearchInputModule } from '../../common/search-input/search-input.module'
import { PipesModule } from '@gr-public/pipes/pipes.module'

import { DemandsComponent } from './demands.component'
import { DemandsRouteModule } from './demands.route'
import { DemandListComponent } from './demand-list/demand-list.component'

@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        DemandsRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        SearchInputModule,
        PipesModule
    ],
    declarations: [
        DemandsComponent,
        DemandListComponent
    ],
    exports:[
        DemandsComponent
    ]
})
export class DemandsModule { }