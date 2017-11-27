import { NgModule } from '@angular/core'
import { CoreModule } from '../../common/core.module'
import { ServicesModule } from '../../services/service.module'

import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule } from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopUpRightModule } from '@gr-public/riccio-pop-up-right/riccio-pop-up-right.module'
import { SearchInputModule } from '../../common/search-input/search-input.module'
import { DirectiveModule } from '@gr-public/directives/directive.module'

import { ProductsComponent } from './products.component'
import { ProductsRouteModule } from './products.route'
import { ProductsService } from './products.service'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductOpComponent } from './product-op/product-op.component'

@NgModule({
    imports: [
        CoreModule,
        ServicesModule,
        ProductsRouteModule,

        RiccioPaginationsModule,
        RiccioSpinnersModule,
        RiccioModalModule,
        RiccioPopUpRightModule,
        SearchInputModule,
        DirectiveModule
    ],
    declarations: [
        ProductsComponent,
        ProductListComponent,
        ProductOpComponent
    ],
    exports:[
        ProductsComponent
    ],
    providers:[
        ProductsService
    ]
})
export class ProductsModule { }