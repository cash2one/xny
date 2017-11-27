import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'

import { FriendLinksComponent } from './friendLinks.component'
import { FriendLinksRouteModule } from './friendLinks.route'

import { FriendLinkListComponent } from './friendLink-list/friendLink-list.component'


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
        FriendLinkListComponent
    ],
    exports:[
        FriendLinksComponent
    ],
    providers:[
    ]
})
export class FriendLinksModule { }