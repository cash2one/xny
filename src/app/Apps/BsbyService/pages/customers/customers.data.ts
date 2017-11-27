export class CustomerData{
    customerListTitle:any[]=[
        '公司名称',
        '执行负责人',
        '专属客服',
        '产品方案',
        '域名',
        '开始时间',
        '结束时间',
        '运营时长',
        '操作'
    ]

    customerListSorter:any[] = [
        {name:'按开始时间正序',value:1},
        {name:'按开始时间倒序',value:2},
        {name:'按结束时间正序',value:3},
        {name:'按结束时间倒序',value:4},
        {name:'按运营时间正序',value:5},
        {name:'按运营时间倒序',value:6}
    ]
}
export class CustomerListRequestParam{
    username:string = '';
    page:number = 1;
    rows:number = 20;
}