import { NgModule,ElementRef } from '@angular/core'

import { TableTitleDirective } from './table-title.directive'

@NgModule({
    declarations:[
        TableTitleDirective
    ],
    exports:[
        TableTitleDirective
    ]
})
export class DirectiveModule{

}