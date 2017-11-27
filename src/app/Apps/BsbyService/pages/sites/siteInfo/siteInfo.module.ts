import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioBrowseModule } from '@gr-public/riccio-browse/riccio-browse.module'

import { RoleOpModule } from '../components/role-op/role-op.module'
import { KeywordChartModule } from '../components/keyword-chart/keyword-chart.module'
import { InputToolModule } from '../../../common/input-tool/input-tool.module'

import { SiteInfoRouteModule } from './siteInfo.route'
import { SiteInfoComponent } from './siteInfo.component'
import { BaseInfoComponent } from './baseInfo/baseInfo.component'
import { DataChangeInfoComponent } from './dataChangeInfo/DataChangeInfo.component'
import { DiscussInfoComponent } from './discussInfo/discussInfo.component'
import { KeywordInfoComponent } from './keywordInfo/keywordInfo.component'
import { DescInfoComponent } from './descInfo/descInfo.component'
import { SiteAccountEditComponent } from './baseInfo/site-account-edit/site-account-edit.component'
import { SiteDescEditComponent } from './descInfo/site-desc-edit/site-desc-edit.component'
import { SiteServiceEditComponent } from './baseInfo/site-service-edit/site-service-edit.component'

import { SiteAccountEditService } from './baseInfo/site-account-edit/site-account-edit.service'
import { SiteDescEditService } from './descInfo/site-desc-edit/site-desc-edit.service'
import { SiteServiceEditService } from './baseInfo/site-service-edit/site-service-edit.service'



@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        SiteInfoRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        RiccioBrowseModule,

        RoleOpModule,
        KeywordChartModule,
        InputToolModule
    ],
    declarations: [
        SiteInfoComponent,
        BaseInfoComponent,
        DataChangeInfoComponent,
        DiscussInfoComponent,
        KeywordInfoComponent,
        DescInfoComponent,
        SiteAccountEditComponent,
        SiteDescEditComponent,
        SiteServiceEditComponent
    ],
    exports:[
        SiteInfoComponent
    ],
    providers:[
        SiteAccountEditService,
        SiteDescEditService,
        SiteServiceEditService
    ]
})
export class SiteInfoModule { }