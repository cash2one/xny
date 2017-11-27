import { FormControl } from '@angular/forms'

// 表单控件
export class KeywordADDFc{
    name:FormControl;
}

// 提交数据
export class PostData{
    name:string = '';
    difficult:number = 1;     //难易程度:1正常 2简单 3困难
    type:number = 1;	    //1精准核心词 2精准长尾词 3品牌词 4区域词
    starttime:string  = null;
}

//竞争力
export class Difficults{
    data = [
        {name:'正常',value:1},
        {name:'简单',value:2},
        {name:'困难',value:3},
    ]
}
//类型
export class Types{
    data = [
        {name:'精准核心词',value:1},
        {name:'精准长尾词',value:2},
        {name:'品牌词',value:3},
        {name:'区域词',value:4}
    ]
}