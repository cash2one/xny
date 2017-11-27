import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { UEditorModule } from 'ngx-ueditor'

import { AssistAddEditDocComponent }		from './assist-add-edit-doc.component'

import { RiccioDisabledbuttonModule }		from '../../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioDisabledbuttonModule,
    UEditorModule.forRoot({
        path: 'assets/ueditor/',
        // path: '../../../../assets/ueditor/',
        options: {
            themePath: 'assets/ueditor/themes/'
            // themePath: '../../../../assets/ueditor/themes/'
        }
    }),
  ],
  exports:[
  	AssistAddEditDocComponent
  ],
  declarations: [AssistAddEditDocComponent]
})
export class AssistAddEditDocModule { }
