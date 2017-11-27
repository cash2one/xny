import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { BsbyUeditorModule } from '../../../common/bsby-ueditor/bsby-ueditor.module'
import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { ShowDetailModule } from '../../../common/show-detail/show-detail.module'

import { ProgrammesComponent } from './programmes.component'
import { ProgrammesRouteModule } from './programmes.route'

import { ProgrammeListComponent } from './programme-list/programme-list.component'
import { ProgrammeOpComponent } from './programme-op/programme-op.component'
import { ProgrammeDetailComponent } from './programme-detail/programme-detail.component'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        ProgrammesRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        ShowDetailModule,


        BsbyUeditorModule
    ],
    declarations: [
        ProgrammesComponent,
        ProgrammeListComponent,
        ProgrammeOpComponent,
        ProgrammeDetailComponent
    ],
    exports:[
        ProgrammesComponent
    ]
})
export class ProgrammesModule { }