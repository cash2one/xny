import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

import { DepartmentCreateComponent } from './department-create.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DepartmentCreateComponent
  ],
  declarations: [
    DepartmentCreateComponent
  ]
})
export class DepartmentCreateModule { }
