import { NgModule } from '@angular/core'
import { CoreModule } from '../../../common/core.module'
import { AngularEchartsModule } from 'ngx-echarts'
import { ServicesModule } from '../../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'
import { SearchInputModule } from '../../../common/search-input/search-input.module'
import { RiccioBrowseModule } from '@gr-public/riccio-browse/riccio-browse.module'

import { KeywordChartModule } from '../components/keyword-chart/keyword-chart.module'

import { KeywordsComponent } from './keywords.component'
import { KeywordsRouteModule } from './keywords.route'

import { KeywordListComponent } from './keyword-list/keyword-list.component'
import { KeywordDetailComponent } from './keyword-detail/keyword-detail.component'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        AngularEchartsModule,
        KeywordsRouteModule,
        KeywordChartModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        SearchInputModule,
        RiccioPopDatePickerModule,
        RiccioBrowseModule
    ],
    declarations: [
        KeywordsComponent,
        KeywordListComponent,
        KeywordDetailComponent
    ],
    exports:[
        KeywordsComponent
    ]
})
export class KeywordsModule { }