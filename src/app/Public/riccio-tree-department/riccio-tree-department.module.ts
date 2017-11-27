import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RiccioTreeDepartmentService }		from './riccio-tree-department.service'

import { RiccioTreeDepartmentComponent } from './riccio-tree-department.component';
import { TreeDepartmentViewComponent } from './tree-department-view/tree-department-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
  	RiccioTreeDepartmentComponent
  ],
  declarations: [
  	RiccioTreeDepartmentComponent, 
  	TreeDepartmentViewComponent
  ],
  providers:[
  	RiccioTreeDepartmentService
  ]
})
export class RiccioTreeDepartmentModule { }
