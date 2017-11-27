import { FormControl } from '@angular/forms'

// 表单控件
export class ArticleOpFc{
    title:FormControl;
    url:FormControl;
    inputtime:FormControl;
}

// 提交数据
export class PostData{
    title:string = '';
    url:string = '';
    type:number = 1;
    inputtime:string = new Date().toLocaleString('chinese',{hour12:false});
}

//类别
export class Types{
    data = [
        {name:'公司新闻',value:1},
        {name:'行业新闻',value:2},
        {name:'其他',value:3},
    ]
}