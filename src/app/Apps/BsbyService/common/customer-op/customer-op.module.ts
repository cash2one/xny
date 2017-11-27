import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core.module'

import { SearchInputModule } from '../search-input/search-input.module'
import { RiccioPaginationsModule } from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { DirectiveModule } from '@gr-public/directives/directive.module'

import { CustomerOpComponent } from './customer-op.component'
import { CustomerOpService } from './customer-op.service'

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SearchInputModule,
        RiccioPaginationsModule,
        RiccioSpinnersModule,
        DirectiveModule
    ],
    exports: [
        CustomerOpComponent
    ],
    declarations: [
        CustomerOpComponent
    ],
    providers: [
        CustomerOpService
    ]
})
export class CustomerOpModule { }