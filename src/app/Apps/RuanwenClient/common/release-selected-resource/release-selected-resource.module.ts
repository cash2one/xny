import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReleaseSelectedResourceComponent } from './release-selected-resource.component';

import { ReleaseResourceInfoModule }    from '../release-resource-info/release-resource-info.module'

import { RiccioSpinnersModule }      from '@gr-public/riccio-spinners/riccio-spinners.module'
import { RiccioModalModule }		from '@gr-public/riccio-modal/riccio-modal.module'
import { RiccioPboxModule }		from '@gr-public/riccio-pbox/riccio-pbox.module'

@NgModule({
  imports: [
    CommonModule,
    RiccioModalModule,
    RiccioPboxModule,
    RiccioSpinnersModule,
    ReleaseResourceInfoModule
  ],
  exports:[
  	ReleaseSelectedResourceComponent
  ],
  declarations: [ReleaseSelectedResourceComponent]
})
export class ReleaseSelectedResourceModule { }
