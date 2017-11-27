import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { UEditorModule } from 'ngx-ueditor';

import { RuanwenNgxueditorComponent } from './ruanwen-ngxueditor.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UEditorModule.forRoot({
        // 指定ueditor.js路径目录
        // path: 'home/assets/ueditor/',
        path: 'assets/ueditor/',
        // 默认全局配置项
        options: {
            // themePath: '/assets/ueditor/themes/'
            themePath: 'assets/ueditor/themes/'
        }
    })
  ],
  exports:[
  	RuanwenNgxueditorComponent
  ],
  declarations: [RuanwenNgxueditorComponent]
})
export class RuanwenNgxueditorModule { }
