import { RouterModule } 	from '@angular/router';
import {MoreComponent} from "./more/more.component";
import {MenuTestComponent} from "./menu-test/menu-test.component";
import {TestResultComponent} from "./menu-test/test-result/test-result.component";
import {TestCompareComponent} from "./menu-test/test-compare/test-compare.component";


const SettingRoutes=[
  { path:'more',component:MoreComponent},
  { path:'more/test',component:MenuTestComponent},
  { path:'more/test/result/model/:model/app_id/:app_id',component:TestResultComponent},
  { path:'more/test/result/model/:model/app_id/:app_id/cid/:cid',component:TestCompareComponent}
];

export const settingRoutes = RouterModule.forChild(SettingRoutes);
