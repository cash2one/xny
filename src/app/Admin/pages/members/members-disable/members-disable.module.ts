import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }                 from '@angular/forms';

import { MembersDisableComponent } from './members-disable.component';

import { RiccioSpinnersModule }        from '../../../../Public/riccio-spinners/riccio-spinners.module'
import { RiccioPopUpRightModule }    from '../../../../Public/riccio-pop-up-right/riccio-pop-up-right.module'
import { RiccioModalModule }    from '../../../../Public/riccio-modal/riccio-modal.module';
import { RiccioPboxModule }      from '../../../../Public/riccio-pbox/riccio-pbox.module';
import { DirectiveModule } from '../../../../Public/directives/directive.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RiccioPopUpRightModule,
    RiccioSpinnersModule,
    RiccioPboxModule,
    RiccioModalModule,
    DirectiveModule
  ],
  exports:[
  	MembersDisableComponent
  ],
  declarations: [
  	MembersDisableComponent
  ]
})
export class MembersDisableModule { }
