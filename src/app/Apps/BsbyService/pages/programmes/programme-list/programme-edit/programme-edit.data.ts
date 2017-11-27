import { FormControl } from '@angular/forms'

export class ProgrammeEditData {

}

// 表单控件(方案)
export class ProgrammeFc{
    title:FormControl;
    content:FormControl;
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