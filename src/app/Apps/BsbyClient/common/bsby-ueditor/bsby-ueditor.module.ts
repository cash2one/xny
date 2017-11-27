import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CoreModule } from '../core.module'
import { UEditorModule } from 'ngx-ueditor'

import { BsbyUeditorComponent } from './bsby-ueditor.component'


@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        UEditorModule.forRoot({
            path: 'assets/ueditor/',
            options: {
                themePath: 'assets/ueditor/themes/'
            }
        })
    ],
    exports: [
        BsbyUeditorComponent
    ],
    declarations: [
        BsbyUeditorComponent
    ],
    providers: [
    ]
})
export class BsbyUeditorModule { }