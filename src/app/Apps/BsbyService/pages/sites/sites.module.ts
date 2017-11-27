import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { DirectiveModule } from '@gr-public/directives/directive.module'
import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'
import { RiccioPopUpRightModule } from '@gr-public/riccio-pop-up-right/riccio-pop-up-right.module'
import { SearchInputModule } from '../../common/search-input/search-input.module'

import { ShowDetailModule } from '../../common/show-detail/show-detail.module'
import { SceneModule } from '../../common/scene/scene.module'

import { SitesComponent } from './sites.component'
import { SitesRouteModule } from './sites.route'
import { SitesService } from './sites.service'

import { SiteListComponent } from './components/site-list/site-list.component'
import { RoleOpModule } from './components/role-op/role-op.module';
import { SiteDelComponent } from './components/site-del/site-del.component'


import { SiteOpModule } from '../../common/site-op/site-op.module'

@NgModule({
    imports: [
        CoreModule,
        SitesRouteModule,

        ShowDetailModule,
        SceneModule,
        RoleOpModule,
        SiteOpModule,

        DirectiveModule,
        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        RiccioPopDatePickerModule,
        RiccioPopUpRightModule,
        SearchInputModule
    ],
    declarations: [
        SiteListComponent,
        SitesComponent,
        SiteDelComponent
    ],
    exports:[
        SitesComponent
    ],
    providers: [
        SitesService
    ]
})
export class SitesModule { }