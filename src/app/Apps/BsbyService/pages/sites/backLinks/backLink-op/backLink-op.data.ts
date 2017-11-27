import { FormControl } from '@angular/forms'

// 表单控件
export class BackLinkOpFc {
    title:FormControl;
    url:FormControl;
    platform:FormControl;
    inputtime:FormControl;
}

// 提交数据
export class PostData {
    title:string = '';
    url:string = '';
    platform:string = '';
    inputtime:string = new Date().toLocaleString('chinese',{hour12:false});
}