import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { ServicesModule } from '../../../services/service.module'

import { InputToolModule } from '../../../common/input-tool/input-tool.module'
import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioBrowseModule } from '@gr-public/riccio-browse/riccio-browse.module'

import { KeywordChartModule } from '../components/keyword-chart/keyword-chart.module'

import { SiteInfoRouteModule } from './siteInfo.route'
import { SiteInfoComponent } from './siteInfo.component'
import { BaseInfoComponent } from './baseInfo/baseInfo.component'
import { DataChangeInfoComponent } from './dataChangeInfo/DataChangeInfo.component'
import { DiscussInfoComponent } from './discussInfo/discussInfo.component'
import { KeywordInfoComponent } from './keywordInfo/keywordInfo.component'
import { DescInfoComponent } from './descInfo/descInfo.component'



@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        SiteInfoRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        RiccioBrowseModule,
        InputToolModule,

        KeywordChartModule
    ],
    declarations: [
        SiteInfoComponent,
        BaseInfoComponent,
        DataChangeInfoComponent,
        DiscussInfoComponent,
        KeywordInfoComponent,
        DescInfoComponent
    ],
    exports:[
        SiteInfoComponent
    ],
    providers:[
    ]
})
export class SiteInfoModule { }