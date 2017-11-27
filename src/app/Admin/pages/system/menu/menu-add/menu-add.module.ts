import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                                  from '@angular/forms';

import { RiccioTreeModule }    from '../../../../../Public/riccio-tree/riccio-tree.module'

import { MenuAddComponent }		from './menu-add.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioTreeModule
  ],
  exports:[
  	MenuAddComponent
  ],
  declarations: [
  	MenuAddComponent
  ]
})
export class MenuAddModule { }
