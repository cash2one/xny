export class AddEditCompanyData{

	data:any = {
		'name':'',
		'domain':'',
		'logo':'',
		'logo_login':'',
		'industry':'',
		'scale':'',
		'location':''
	};


	addShow:Array<any> = [
		{
			name:'企业名称',
			action:'name',
			type:'input',
			default:true
		},
		{
			name:'企业域名',
			action:'domain',
			type:'input',
			default:true
		},
		{
			name:'企业logo',
			action:'logo',
			type:'input',
			default:true
		},
		{
			name:'登录logo',
			action:'logo_login',
			type:'input',
			default:false
		},
		{
			name:'负责人',
			action:'user_id',
			type:'input',
			default:false
		},		
		{
			name:'行业',
			action:'industry',
			type:'select',
			default:false,
			option:[]
		},

		{
			name:'规模',
			action:'scale',
			type:'select',
			default:false,
			option:[]
		},
		{
			name:'地区',
			action:'location',
			type:'input',
			default:false,
			option:[],
		}

	];
	ListData:any = [];

}