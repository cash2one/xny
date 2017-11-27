import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { SearchInputModule } from '../../common/search-input/search-input.module'
import { BsbyUeditorModule } from '../../common/bsby-ueditor/bsby-ueditor.module'

import { ProgrammesComponent } from './programmes.component'
import { ProgrammeRouteModule } from './programmes.route'
import { ProgrammeListComponent } from './programme-list/programme-list.component'
import { ProgrammeListAllComponent } from './programme-list/programme-all/programme-all.component'
import { ProgrammeEditComponent } from './programme-list/programme-edit/programme-edit.component'
import { ProgrammeDetailComponent } from './programme-list/programme-detail/programme-detail.component'

import { ProgrammesService } from './programme-list/programme.service'

@NgModule({
    imports: [
        CoreModule,
        BsbyUeditorModule,
        ServicesModule,
        ProgrammeRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        SearchInputModule
    ],
    declarations: [
        ProgrammesComponent,
        ProgrammeListComponent,
        ProgrammeEditComponent,
        ProgrammeListAllComponent,
        ProgrammeDetailComponent
    ],
    exports:[
        ProgrammesComponent
    ],
    providers:[
        ProgrammesService
    ]
})
export class ProgrammesModule { }