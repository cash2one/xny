import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core.module'

import { SearchInputModule } from '../search-input/search-input.module'
import { RiccioSpinnersModule } from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioPaginationsModule } from '../../../../Public/riccio-paginations/riccio-paginations.module'

import { CustomerOpModule } from '../customer-op/customer-op.module'

import { SiteOpComponent } from './site-op.component'
import { SiteSelectComComponent } from './site-select-com/site-select-com.component'

import { SiteOpService } from './site-op.service'
import { SiteSelectComService } from './site-select-com/site-select-com.service'

@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        SearchInputModule,
        RiccioSpinnersModule,
        RiccioPaginationsModule,
        CustomerOpModule
    ],
    exports: [
        SiteOpComponent,
        SiteSelectComComponent
    ],
    declarations: [
        SiteOpComponent,
        SiteSelectComComponent
    ],
    providers: [
        SiteOpService,
        SiteSelectComService
    ]
})
export class SiteOpModule { }