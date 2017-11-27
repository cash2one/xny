import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { BackLinksComponent } from './backLinks.component'
import { BackLinksRouteModule } from './backLinks.route'

import { BackLinkListComponent } from './backLink-list/backLink-list.component'
import { BackLinkOpComponent } from './backLink-op/backLink-op.component'
import { BackLinkOpService } from './backLink-op/backLink-op.service'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        BackLinksRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule
    ],
    declarations: [
        BackLinksComponent,
        BackLinkListComponent,
        BackLinkOpComponent
    ],
    exports:[
        BackLinksComponent
    ],
    providers:[
        BackLinkOpService
    ]
})
export class BackLinksModule { }