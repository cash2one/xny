export class SelectComData{
    comTitle:any[] = [
        '公司名称',
        '企业负责人',
        '产品方案',
        '网站域名',
        '客服'
    ]
}

export class ComListRequestParam{
    name:string = '';
    page:number = 1;
    rows:number = 20;
}