export class UserData {

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

	// data:Array<any> = [
	// 	{
	//            "id":1,
	//            "name":"key",
	//            "email":"key@qq.com",
	//            "cid":0,
	//            "status":1,
	//            "thumb":null,
	//            "job":"超级管理员",
	//            "real_name":"超级管理员",
	//            "tel":"13545698745",
	//            "employeecode":"001",
	//            "sex":1
	//        },
	//        {
	//            "id":2,
	//            "name":"key",
	//            "email":"key@qq.com",
	//            "cid":0,
	//            "status":1,
	//            "thumb":null,
	//            "job":"超级管理员",
	//            "real_name":"超级管理员",
	//            "tel":"13545698745",
	//            "employeecode":"001",
	//            "sex":1
	//        },
	//        {
	//            "id":3,
	//            "name":"key",
	//            "email":"key@qq.com",
	//            "cid":0,
	//            "status":1,
	//            "thumb":null,
	//            "job":"超级管理员",
	//            "real_name":"超级管理员",
	//            "tel":"13545698745",
	//            "employeecode":"001",
	//            "sex":1
	//        },
	//        {
	//            "id":4,
	//            "name":"key",
	//            "email":"key@qq.com",
	//            "cid":0,
	//            "status":1,
	//            "thumb":null,
	//            "job":"超级管理员",
	//            "real_name":"超级管理员",
	//            "tel":"13545698745",
	//            "employeecode":"001",
	//            "sex":1
	//        },

	// ]

	data: Array<any> = [];
}