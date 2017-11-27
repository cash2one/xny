import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { AddoncenterAddComponent } from './addoncenter-add.component';
import { AddEditCenterService }			from './add-edit-center.service'

@NgModule({
  imports:[
    CommonModule,
    FormsModule
  ],
  exports:[
  	AddoncenterAddComponent
  ],
  declarations: [AddoncenterAddComponent],
  providers:[
  	AddEditCenterService
  ]
})
export class AddoncenterAddModule { }
