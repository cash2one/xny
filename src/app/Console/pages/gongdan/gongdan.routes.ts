import { RouterModule } 	from '@angular/router';
import {GdDetailComponent} from "./gd-detail/gd-detail.component";
import {ProblemProductComponent} from "./problem-product/problem-product.component";
import {ProblemTypeComponent} from "./problem-type/problem-type.component";
import {SolutionComponent} from "./solution/solution.component";
import {CreateGongdanComponent} from "./create-gongdan/create-gongdan.component";
import { GongdanComponent }		from './gongdan.component';
import {MyGongdanComponent} from "./my-gongdan/my-gongdan.component";

const GongdanRoutes=[
  // {path:'detail',component:GdDetailComponent},
  // {path:'submitStepOne',component:SubmitStepOneComponent},
  // {path:'submitStepTwo',component:SubmitStepTwoComponent},
  // {path:'submitStepThree',component:SubmitStepThreeComponent},
  // {path:'submitStepFour',component:SubmitStepFourComponent}

  	{
	    path: '',
	    component: GongdanComponent,
	    children:[
			{ path: '', redirectTo: 'detail', pathMatch: 'full' },
        {
          path:'myGongdan',
          component:MyGongdanComponent
        },
        {
		    	path: 'detail/id/:id',
		    	component: GdDetailComponent
		    },
			{
				path: 'submitStepOne',
				component: ProblemProductComponent
			},
			{
				path: 'submitStepTwo/id/:id',
				component: ProblemTypeComponent
			},
			{
				path: 'submitStepThree/id/:id/cat_id/:cat_id',
				component: SolutionComponent
			},
			{
				path: 'submitStepFour/id/:id/cat_id/:cat_id',
				component: CreateGongdanComponent
			}
	    ]
	}

];

export const gongdanRoutes = RouterModule.forChild(GongdanRoutes);
