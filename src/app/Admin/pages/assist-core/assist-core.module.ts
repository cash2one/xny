import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { AssistCoreComponent } from './assist-core.component';

import { assistCoreRoutes }		from './assist-core.routes';
import { AssistMainComponent } from './assist-main/assist-main.component';
import { AssistMenuComponent } from './assist-menu/assist-menu.component';
import { AssistTableComponent } from './assist-table/assist-table.component';
import { AssistAddEditClassifyComponent } from './assist-add-edit-classify/assist-add-edit-classify.component';
import { ClassifyParentComponent } from './assist-add-edit-classify/classify-parent/classify-parent.component'

import { AssistAddEditDocModule }   from './assist-add-edit-doc/assist-add-edit-doc.module'

import { RiccioTreeModule }    from '../../../Public/riccio-tree/riccio-tree.module'
import { RiccioSpinnersModule }    from '../../../Public/riccio-spinners/riccio-spinners.module'  
import { RiccioPaginationsModule }    from '../../../Public/riccio-paginations/riccio-paginations.module'
import { RiccioModalModule }    from '../../../Public/riccio-modal/riccio-modal.module'
import { RiccioDisabledbuttonModule }    from '../../../Public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioPboxModule }    from '../../../Public/riccio-pbox/riccio-pbox.module';

import { AssistMenuService }    from './assist-menu/assist-menu.service'
import { ClassifyParentService }    from './assist-add-edit-classify/classify-parent/classify-parent.service'
import { AssistTableService }  from './assist-table/assist-table.service'
import { AssistMainService }    from './assist-main/assist-main.service'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    assistCoreRoutes,
    RiccioTreeModule,
    AssistAddEditDocModule,
    RiccioSpinnersModule,
    RiccioPaginationsModule,
    RiccioModalModule,
    RiccioDisabledbuttonModule,
    RiccioPboxModule
  ],
  exports:[
  	AssistCoreComponent
  ],
  providers:[
    AssistMenuService,
    ClassifyParentService,
    AssistTableService,
    AssistMainService
  ],
  declarations: [AssistCoreComponent, AssistMainComponent, AssistMenuComponent, AssistTableComponent, AssistAddEditClassifyComponent, ClassifyParentComponent]
})
export class AssistCoreModule { }
