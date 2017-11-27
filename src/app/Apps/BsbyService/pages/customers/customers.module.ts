import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopDatePickerModule } from '@gr-public/riccio-pop-datePicker/riccio-pop-datePicker.module'

import { ShowDetailModule } from '../../common/show-detail/show-detail.module'
import { SearchInputModule } from '../../common/search-input/search-input.module'
import { SiteOpModule } from '../../common/site-op/site-op.module'
import { CustomerOpModule } from '../../common/customer-op/customer-op.module'

import { CustomersComponent } from './customers.component'
import { CustomerRouteModule } from './customers.route'

import { CustomerListComponent } from './customer-list/customer-list.component'


@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        CustomerRouteModule,

        ShowDetailModule,
        SearchInputModule,
        SiteOpModule,
        CustomerOpModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        RiccioPopDatePickerModule
    ],
    declarations: [
        CustomersComponent,
        CustomerListComponent
    ],
    exports:[
        CustomersComponent
    ],
    providers: [
    ]
})
export class CustomersModule { }