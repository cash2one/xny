import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { FriendLinksComponent } from './friendLinks.component'
import { FriendLinksRouteModule } from './friendLinks.route'

import { FriendLinkListComponent } from './friendLink-list/friendLink-list.component'
import { FriendLinkOpComponent } from './friendLink-op/friendLink-op.component'
import { FriendLinkOpService } from './friendLink-op/friendLink-op.service'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        FriendLinksRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule
    ],
    declarations: [
        FriendLinksComponent,
        FriendLinkListComponent,
        FriendLinkOpComponent
    ],
    exports:[
        FriendLinksComponent
    ],
    providers:[
        FriendLinkOpService
    ]
})
export class FriendLinksModule { }