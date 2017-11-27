import { NgModule } from '@angular/core'

import { CoreModule } from './common/core.module'
import { ServicesModule } from './services/service.module'
import { ServicesModule as ApiServicesModule } from '../../ApiServices/services.module'

import { RiccioPboxModule } from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioPopoversModule } from '@gr-public/riccio-popovers/riccio-popovers.module'
import { RiccioTopNavbarModule } from '@gr-public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioAppLeftMenuModule } from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.module'

import { BsbyClientRouteModule } from './bsbyClient.routes'
import { BsbyClientComponent } from './bsbyClient.component'
import { BsbyClientResolve } from './bsbyClient.resolve'
import { BsbyService } from './bsbyClient.service'



@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        ApiServicesModule,
        RiccioPboxModule,
        RiccioPopoversModule,
        RiccioTopNavbarModule,
        RiccioAppLeftMenuModule,
        BsbyClientRouteModule
    ],
    declarations: [
        BsbyClientComponent
    ],
    providers: [
        BsbyClientResolve,
        BsbyService
    ]
})
export class BsbyClientModule { }
