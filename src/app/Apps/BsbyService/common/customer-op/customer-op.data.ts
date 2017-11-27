import { FormControl } from '@angular/forms'

// 表单控件
export class CustomerOpFc{
    mobile:FormControl;
    name:FormControl;
    password:FormControl;
    real_name:FormControl;
    sex:FormControl;
    qq:FormControl;
    email:FormControl;
    company_name:FormControl;
}

// 提交数据
export class PostData{
    cid?:number;
    mobile:string = '';
    name:string = '';
    password?:string = '';
    real_name:string = '';
    sex:number = 1;
    qq?:string = '';
    email?:string = '';

    company_name:string = '';
    industry?:number;
    scale?:number;
    location?:{
        province?:number,
        city?:number,
        area?:number
    } = {}
}

export enum CustomerOpTypes{
    ADD,
    EDIT
}

export interface ICustomerConf{
    type?:CustomerOpTypes,
    data?:any
}

export class CuListTitles{
    data = [
        '公司名称',
        '企业负责人'
    ]
}