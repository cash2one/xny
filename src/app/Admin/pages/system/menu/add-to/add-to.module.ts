import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { AddToComponent }		from './add-to.component'

import { MenuAddModule }		from '../menu-add/menu-add.module'
import { SelectModelModule }    from '../select-model/select-model.module'

import { AddToService }    from './add-to.service'

@NgModule({
  imports: [
    CommonModule,
    MenuAddModule,
    SelectModelModule,
    FormsModule
  ],
  exports:[
  	AddToComponent
  ],
  declarations: [
  	AddToComponent
  ],
  providers:[
    AddToService
  ]
})
export class AddToModule { }
