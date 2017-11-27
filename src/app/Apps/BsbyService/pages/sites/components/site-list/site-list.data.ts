export class SiteListData {
    siteListTitle: any[] = [
        '网站域名',
        '公司名称',
        '产品方案',
        '执行负责人',
        '客服',
        '状态',
        '开始时间',
        '结束时间',
        '操作'
    ]

    siteListSorter: any[] = [
        { name: '按开始时间正序', value: 1 },
        { name: '按开始时间倒序', value: 2 },
        { name: '按结束时间正序', value: 3 },
        { name: '按结束时间倒序', value: 4 }
    ]

    siteStatus: any[] = [
        { name: '执行中', value: 1 },
        { name: '已停止', value: 2 },
        { name: '待执行', value: 3 },
        { name: '删除', value: 4 }
    ]
}
export class SiteListRequestParam {
    listorder: number = null;
    page: number = 1;
    rows: number = 20;
}