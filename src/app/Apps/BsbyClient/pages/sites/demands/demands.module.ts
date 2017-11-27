import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { PipesModule } from '../../../../../Public/pipes/pipes.module'
import { BsbyUeditorModule } from '../../../common/bsby-ueditor/bsby-ueditor.module'
import { InputToolModule } from '../../../common/input-tool/input-tool.module'
import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { DemandsComponent } from './demands.component'
import { DemandsRouteModule } from './demands.route'
import { DemandsService } from './demands.service'
import { DemandAddComponent } from './demand-add/demand-add.component'

@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        DemandsRouteModule,

        BsbyUeditorModule,
        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        PipesModule,
        InputToolModule
    ],
    declarations: [
        DemandsComponent,
        DemandAddComponent
    ],
    exports:[
        DemandsComponent
    ],
    providers:[
        DemandsService
    ]
})
export class DemandsModule { }