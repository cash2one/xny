import { FormControl } from '@angular/forms'

export class ProgrammeOpData {

}

// 表单控件(方案)
export class ProgrammeFc{
    title:FormControl;
    content:FormControl;
    vote:FormControl;
}

//提交数据
export class PostData{
    id?:number;
    cid?:number;
    site_id:number;
    title:string;
    content:string;
    file?:string;
    vote?:string;
}