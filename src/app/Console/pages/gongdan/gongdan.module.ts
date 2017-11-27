import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {GongdanComponent} from "./gongdan.component";
import {GdDetailComponent} from "./gd-detail/gd-detail.component";
import {ProblemProductComponent} from "./problem-product/problem-product.component";
import {ProblemTypeComponent} from "./problem-type/problem-type.component";
import {SolutionComponent} from "./solution/solution.component";
import {CreateGongdanComponent} from "./create-gongdan/create-gongdan.component";
import {gongdanRoutes} from "./gongdan.routes";
import { SubmitStepBarComponent } from './submit-step-bar/submit-step-bar.component';
import { GdDetailStepBarComponent } from './gd-detail-step-bar/gd-detail-step-bar.component';
import { MyGongdanComponent } from './my-gongdan/my-gongdan.component';
import { MoreProductComponent } from './problem-product/more-product/more-product.component';
import { GdInfoComponent } from './gd-detail/gd-info/gd-info.component';
import { CommunicationRecordComponent } from './gd-detail/communication-record/communication-record.component';
import { FeedbackComponent } from './gd-detail/feedback/feedback.component';
import { EvaluateComponent } from './gd-detail/evaluate/evaluate.component';
import { ConfirmComponent } from './gd-detail/confirm/confirm.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    gongdanRoutes,
    ReactiveFormsModule
  ],
  exports:[
    GongdanComponent
  ],
  declarations: [
    GongdanComponent,
    GdDetailComponent,
    ProblemProductComponent,
    ProblemTypeComponent,
    SolutionComponent,
    CreateGongdanComponent,
    SubmitStepBarComponent,
    GdDetailStepBarComponent,
    MyGongdanComponent,
    MoreProductComponent,
    GdInfoComponent,
    CommunicationRecordComponent,
    FeedbackComponent,
    EvaluateComponent,
    ConfirmComponent
  ],
  providers:[]
})
export class GongdanModule { }
