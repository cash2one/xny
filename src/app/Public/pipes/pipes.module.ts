import { NgModule,ElementRef } from '@angular/core'

import { FileUrlPipe } from './fileUrl.pipe'

@NgModule({
    declarations:[
        FileUrlPipe
    ],
    exports:[
        FileUrlPipe
    ]
})
export class PipesModule{

}