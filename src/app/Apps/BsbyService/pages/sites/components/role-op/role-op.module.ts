import { NgModule } from '@angular/core'
import { CoreModule } from '../../../../common/core.module'
import { DragulaModule } from 'ng2-dragula/ng2-dragula'
import { ServicesModule } from '../../../../services/service.module'

import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioSingleMembersModule } from '@gr-public/riccio-single-members/riccio-single-members.module'
import { RiccioPopoversModule } from '@gr-public/riccio-popovers/riccio-popovers.module'

import { RoleOpService } from './role-op.service'
import { RoleOpComponent } from './role-op.component'
import { RoleAddComponent } from './role-add/role-add.component'

@NgModule({
    imports: [
        CoreModule,
        DragulaModule,
        ServicesModule,
        RiccioModalModule,
        RiccioSingleMembersModule,
        RiccioPopoversModule
    ],
    declarations: [
        RoleOpComponent,
        RoleAddComponent
    ],
    exports:[
        RoleOpComponent
    ],
    providers: [
        RoleOpService
    ]
})
export class RoleOpModule { }