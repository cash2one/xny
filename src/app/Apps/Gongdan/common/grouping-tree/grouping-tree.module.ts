import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupingTreeComponent } from '../grouping-tree/grouping-tree.component';

import { RiccioTreeModule }    from '@gr-public/riccio-tree/riccio-tree.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioTreeModule
  ],
  exports:[
  	GroupingTreeComponent
  ],
  declarations: [GroupingTreeComponent]
})
export class GroupingTreeModule { }
