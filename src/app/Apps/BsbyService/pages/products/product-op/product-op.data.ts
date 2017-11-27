import { FormControl } from '@angular/forms'

// 表单控件
export class ProductOpFc{
    name:FormControl;
    core_num:FormControl;
    long_num:FormControl;
    brand_num:FormControl;
    role:FormControl;
}

// 提交数据
export class PostData{
    name:string = '';
    core_num:number = 0;
    long_num:number = 0;
    brand_num:number = 0;
    role:string = `SEO经理\nSEO主管\nSEO助理`
}

//组件配置
export class OpConfig{
    type:string;
    data?:any;
}