import { FormControl } from '@angular/forms'

// 表单控件
export class DemandADDFc{
    content:FormControl;
}

// 提交数据
export class PostData{
    content:string  = '';
    images:Array<any> =[];
}