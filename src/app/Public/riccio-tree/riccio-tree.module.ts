import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiccioTreeComponent } from './riccio-tree.component';
import { TreeViewComponent } from './tree-view/tree-view.component';

import { RiccioTreeService }      from './riccio-tree.service'

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioTreeComponent
  ],
  declarations: [
  	RiccioTreeComponent,
  	TreeViewComponent
  ],
  providers:[
    RiccioTreeService
  ]
})
export class RiccioTreeModule { }
