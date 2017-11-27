import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { RiccioPopoversModule } from '../riccio-popovers/riccio-popovers.module'

import { RiccioAppLeftMenuComponent } from './riccio-app-left-menu.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        RiccioPopoversModule
    ],
    exports: [
        RiccioAppLeftMenuComponent
    ],
    declarations: [
        RiccioAppLeftMenuComponent
    ]
})
export class RiccioAppLeftMenuModule { }