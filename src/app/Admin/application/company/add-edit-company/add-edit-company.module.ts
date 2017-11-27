import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { AddEditCompanyComponent } from './add-edit-company.component';
import { AddEditCompanyService }   from './add-edit-company.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
  	AddEditCompanyComponent
  ],
  declarations: [AddEditCompanyComponent],
  providers:[
  	AddEditCompanyService
  ]
})
export class AddEditCompanyModule { }
