import { NgModule } from '@angular/core'

import { GrCustomerService } from './grManagement/grCustomer.service'
import { GrDemandService } from './grManagement/grDemand.service'
import { GrKeywordService } from './grManagement/grKeyword.service'
import { GrProductService } from './grManagement/grProduct.service'
import { GrProgrammeService } from './grManagement/grProgramme.service'
import { GrSiteService } from './grManagement/grSite.service'
import { GrArticleService } from './grManagement/grArticle.service'
import { GrBackLinkService } from './grManagement/grBackLink.service'
import { GrFriendLinkService } from './grManagement/grFriendLink.service'
import { GrUserService } from './grManagement/grUser.service'
import { GrSceneService } from './grManagement/grScene.service'

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    GrCustomerService,
    GrDemandService,
    GrKeywordService,
    GrProductService,
    GrProgrammeService,
    GrSiteService,
    GrArticleService,
    GrBackLinkService,
    GrFriendLinkService,
    GrUserService,
    GrSceneService
  ]
})

export class ServicesModule { }