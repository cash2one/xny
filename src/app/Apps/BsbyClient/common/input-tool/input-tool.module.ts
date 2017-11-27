import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload'
import { PipesModule } from '@gr-public/pipes/pipes.module'

import { InputToolComponent } from './input-tool.component';
import { InputToolService } from './input-tool.service'

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        PipesModule
    ],
    declarations: [
        InputToolComponent
    ],
    exports: [
        InputToolComponent
    ],
    providers:[
        InputToolService
    ]
})
export class InputToolModule { }
