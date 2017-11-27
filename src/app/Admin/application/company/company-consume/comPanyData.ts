export class ComPanyData{

	symbol:string;
	data:any = {
		'model':'Admin',
		'parentid':'',
		'path':'',
		'name':'',
		'is_left':'1',
		'status':'1',
		'type':'1',
		'fonticon':'',
		'url':''
	};

	// processTypes:string[] = [
    //     '充值',
    //     '退款', 
    //     '提现', 
	// 	'消费',
	// ]

	processTypes = {
		'0':'充值',
		'1':'退款',
		'2':'提现',
		'3':'消费',
		'4':'管理员调节',
		'5':'赠送',
		'99':'其他类型'
	}
	
	processTypesOp:any[] = [
        {name:'全部',value:null},
        {name:'充值',value:0},
        {name:'退款',value:1},
        {name:'提现',value:2},
		{name:'消费',value:3},
		{name:'管理员调节',value:4},
		{name:'赠送',value:5},
		{name:'其他类型',value:99}
    ]

	titleAllData:string[] = [
		'企业名称',
		'流水号',
        '日期',
        '名称',
        '操作人',
        '金额',
        '余额',
        '操作'
	];

	titleOneData:string[] = [
		'流水号',
        '日期',
        '名称',
        '操作人',
        '金额',
		'余额',
		'操作'
	];

	affiliatedTeam:any = {
	  isShow:false,
	  data:{
	    item:[],
	    client:{
	      x:"",
	      y:""
	    }
	  }
	}

	showDetailData: any = [
		{
			name:"企业ID",
			flag:"id",
			value:null
		},
		{
			name: "企业logo",
			flag: "logo",
			value: null
		},
		{
			name: "负责人",
			flag: "real_name",
			value: null
		},
		{
			name: "行业",
			flag: "industry_name",
			value: null
		},
		{
			name: "规模",
			flag: "scale_name",
			value: null
		},
		{
			name:"状态",
			flag : "status",
			value : null
		},
		{
			name:"余额",
			flag : "amount",
			value : 0
		},
		{
			name: "创建时间",
			flag: "created_at",
			value: null
		}
	]

	editData:any = [];

}