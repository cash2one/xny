import { NgModule } from '@angular/core'
import { CoreModule } from '../../../../common/core.module'
import { ServicesModule } from '../../../../services/service.module'

import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'

import { KeywordOpComponent } from './keyword-op.component'
import { KeywordOpService } from './keyword-op.service'

@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        RiccioModalModule,
        RiccioPopDatePickerModule
    ],
    declarations: [
        KeywordOpComponent
    ],
    exports:[
        KeywordOpComponent
    ],
    providers:[
        KeywordOpService
    ]
})
export class KeywordOpModule { }