export class ArticleListData {
    articleListTitles:string[] = [
        '发布时间',
        '文章标题',
        '链接地址',
        '类别',
        '操作'
    ]

    ops:any[] = [
        {name:'编辑',value:1},
        {name:'删除',value:2}
    ]
}