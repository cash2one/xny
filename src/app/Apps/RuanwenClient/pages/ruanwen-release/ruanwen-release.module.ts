import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuanwenReleaseComponent } from './ruanwen-release.component';
import { FormsModule }                 from '@angular/forms';

import { RiccioPaginationsModule }		from '@gr-public/riccio-paginations/riccio-paginations.module'
import { RiccioSpinnersModule }      from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule }    from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPopoversModule }    from '@gr-public/riccio-popovers/riccio-popovers.module'
import { RiccioPboxModule }    from '@gr-public/riccio-pbox/riccio-pbox.module'
import { RiccioDisabledbuttonModule }    from '@gr-public/riccio-disabledbutton/riccio-disabledbutton.module'

import { ruanwenReleaseRoutes }		from './ruanwen-release.routes';
import { ReleaseResourceComponent } from './release-resource/release-resource.component';
import { ReleaseActivityComponent } from './release-activity/release-activity.component';
import { ReleaseExecutoryComponent } from './release-executory/release-executory.component';
import { ReleaseCompleteComponent } from './release-complete/release-complete.component'

import { ActivityCodeModule }    from './release-activity/activity-code/activity-code.module'
import { ReleaseTopNavbarModule }		from '../../common/release-top-navbar/release-top-navbar.module'
import { ReleaseScreenResourceModule }		from '../../common/release-screen-resource/release-screen-resource.module'
import { ReleaseShoppingCartModule }    from '../../common/release-shopping-cart/release-shopping-cart.module'
import { ReleaseResourceInfoModule }    from '../../common/release-resource-info/release-resource-info.module' 
import { ReleaseSelectedResourceModule }    from '../../common/release-selected-resource/release-selected-resource.module'
import { ReleasePathNavbarModule }      from '../../common/release-path-navbar/release-path-navbar.module'
import { RuanwenOrderInfoModule }    from '../../common/ruanwen-order-info/ruanwen-order-info.module'
import { RuanwenNgxueditorModule }    from '../../common/ruanwen-ngxueditor/ruanwen-ngxueditor.module'
import { RuanwenListHeaderModule }    from '../../common/ruanwen-list-header/ruanwen-list-header.module'
import { RuanwenAdvertisingLawModule }    from '../../common/ruanwen-advertising-law/ruanwen-advertising-law.module'
import { RuanwenServiceAgreementModule }    from '../../common/ruanwen-service-agreement/ruanwen-service-agreement.module'

import { ReleaseResourceServices }    from './release-resource/release-resource.services';
import { RuanwenReleaseService }    from './ruanwen-release.service'
import { CartItemListService }    from '../../storage/cartItemList.service';

import { ActivityMatterComponent } from './release-activity/activity-matter/activity-matter.component';
import { ActivityArticlesComponent } from './release-activity/activity-articles/activity-articles.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ActivityCodeModule,
    ruanwenReleaseRoutes,
    ReleaseTopNavbarModule,
    RiccioPaginationsModule,
    RiccioSpinnersModule,
    ReleaseScreenResourceModule,
    ReleaseShoppingCartModule,
    RiccioPopoversModule,
    RiccioModalModule,
    ReleaseResourceInfoModule,
    ReleasePathNavbarModule,
    RiccioPboxModule,
    RuanwenListHeaderModule,
    RuanwenOrderInfoModule,
    RuanwenServiceAgreementModule,
    RuanwenAdvertisingLawModule,
    RuanwenNgxueditorModule,
    ReleaseSelectedResourceModule,
    RiccioDisabledbuttonModule
  ],
  exports:[
  	RuanwenReleaseComponent,
    ReleaseResourceComponent,
    ReleaseActivityComponent
  ],
  declarations: [
    RuanwenReleaseComponent,
    ReleaseResourceComponent,
    ReleaseActivityComponent,
    ReleaseExecutoryComponent,
    ReleaseCompleteComponent,
    ActivityMatterComponent,
    ActivityArticlesComponent
  ],
  providers:[
    ReleaseResourceServices,
    CartItemListService,
    RuanwenReleaseService
  ]
})
export class RuanwenReleaseModule { }
