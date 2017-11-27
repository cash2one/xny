export class MemberAppData{

    data:Array<any> = []

    userTitle:string[]=[
        '头像',
        '真实姓名',
        '用户名',
        '编号',
        '手机号',
        '邮箱',
        '性别',
        '状态',
        '管理操作'
    ]

	titleData = [
		'头像',
		'姓名',
		'手机号',
		'用户名',
		'邮箱',
		'性别',
		'状态',
		'注册时间',
		'管理操作'
	]

	showDetailData: any = [
		{
			name: "头像",
			flag: "thumb",
			value: null
		},
		{
			name: "成员id",
			flag: "id",
			value: null
		},
		{
			name: "用户名",
			flag: "name",
			value: null
		},
		{
			name: "姓名",
			flag: "real_name",
			value: null
		},
		{
			name: "性别",
			flag: "sex",
			value: null
		},
		{
			name: "邮箱",
			flag: "email",
			value: null
		},
		{
			name: "状态",
			flag: "status",
			value: null
		},
		{
			name:"注册时间",
			flag:"created_at",
			value:null
		}
	]
}