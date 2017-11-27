import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { FileUploadModule } from 'ng2-file-upload'
import { UEditorModule } from 'ngx-ueditor'

import { AddEditAppcenterComponent } from './add-edit-appcenter.component'
import { AddEditAppcenterService } from './add-edit-appcenter.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FileUploadModule,
    UEditorModule.forRoot({
      path: 'assets/ueditor/',
      options: {
          themePath: 'assets/ueditor/themes/'
      }
  }),
  ],
  exports: [
    AddEditAppcenterComponent
  ],
  declarations: [
    AddEditAppcenterComponent
  ],
  providers: [
    AddEditAppcenterService
  ]
})
export class AddEditAppcenterModule { }
