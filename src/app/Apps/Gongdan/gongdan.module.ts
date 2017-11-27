import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { FormsModule }                 from '@angular/forms';
import { RouterModule }                from '@angular/router';

import { GongdanComponent }            from './gongdan.component';

import { ServicesModule }		           from './services/services.module'

import { gongdanRoutes }		           from './gongdan.routes'

import { RiccioPopoversModule }        from '@gr-public/riccio-popovers/riccio-popovers.module';
import { RiccioTopNavbarModule }       from '@gr-public/riccio-top-navbar/riccio-top-navbar.module'
import { RiccioPboxModule }            from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioAppLeftMenuModule }     from '@gr-public/riccip-app-left-menu/riccio-app-left-menu.module'
import { RiccioSpinnersModule }        from '@gr-public/riccio-spinners/riccio-spinners.module'  
import { RiccioPaginationsModule }     from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioModalModule }           from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioDisabledbuttonModule }  from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'
import { RiccioTreeModule }            from '@gr-public/riccio-tree/riccio-tree.module'
import { RiccioSelectMembersModule }   from '@gr-public/riccio-select-members/riccio-select-members.module'

import { GroupingTreeModule }          from './common/grouping-tree/grouping-tree.module'

import { AssistMenuService }           from '../Gongdan/pages/FAQ/assist-menu/assist-menu.service'
import { ClassifyParentService }       from '../Gongdan/pages/FAQ/assist-add-edit-classify/classify-parent/classify-parent.service'
import { AssistTableService }          from '../Gongdan/pages/FAQ/assist-table/assist-table.service'
import { AssistMainService }           from '../Gongdan/pages/FAQ/assist-main/assist-main.service'
import { HelpDocService }              from './pages/FAQ/assist-add-edit-doc/help-doc/help-doc.service'

import { AssistTableComponent }        from './pages/FAQ/assist-table/assist-table.component'
import { AssistMenuComponent }         from './pages/FAQ/assist-menu/assist-menu.component'
import { AssistMainComponent }         from './pages/FAQ/assist-main/assist-main.component'
import { AssistAddEditClassifyComponent }  from './pages/FAQ/assist-add-edit-classify/assist-add-edit-classify.component'
import { ClassifyParentComponent }     from './pages/FAQ/assist-add-edit-classify/classify-parent/classify-parent.component'
import { AssistAddEditDocComponent }   from './pages/FAQ/assist-add-edit-doc/assist-add-edit-doc.component'
import { HelpDocComponent }            from './pages/FAQ/assist-add-edit-doc/help-doc/help-doc.component';

import { CsdMainComponent }            from './pages/CSD/csd-main/csd-main.component';
import { CsdGroupingComponent }        from './pages/CSD/csd-grouping/csd-grouping.component';
import { GroupNoAdminComponent }       from './pages/CSD/csd-main/group-no-admin/group-no-admin.component';
import { CustomerUserNoGroupComponent }from './pages/CSD/csd-main/customer-user-no-group/customer-user-no-group.component';
import { SetGroupingUserComponent }    from './pages/CSD/csd-main/customer-user-no-group/set-grouping-user/set-grouping-user.component';
  
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    gongdanRoutes,
    FormsModule,
    RiccioTreeModule,
    RiccioPopoversModule,
    RiccioTopNavbarModule,
    RiccioPboxModule,
    RiccioAppLeftMenuModule,
    RiccioSpinnersModule,
    RiccioPaginationsModule,
    RiccioModalModule,
    RiccioDisabledbuttonModule,
    RiccioSelectMembersModule,
    GroupingTreeModule,
    ServicesModule.forRoot()
  ],
  exports:[
  	GongdanComponent
  ],
  providers:[
    AssistMenuService,
    ClassifyParentService,
    AssistTableService,
    AssistMainService,
    HelpDocService
  ],
  declarations: [
    GongdanComponent,
    AssistTableComponent,
    AssistMenuComponent,
    AssistMainComponent,
    AssistAddEditClassifyComponent,
    ClassifyParentComponent,
    AssistAddEditDocComponent,
    HelpDocComponent,
    CsdMainComponent,
    CsdGroupingComponent,
    GroupNoAdminComponent,
    CustomerUserNoGroupComponent,
    SetGroupingUserComponent
  ]
})
export class GongdanModule { }
