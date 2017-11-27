export class TagData{

	data:any = {

		'name':'',
		'status':1,

	};

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

	addShow:Array<any> = [
		{
			name:'名称',
			action:'name',
			type:'textarea'
		},
		{
			name:'状态',
			action:'status',
			type:'select',
			option:[
				{
					value:1,
					name:'显示'
				},
				{
					value:0,
					name:'隐藏'
				}
			]
		}
	];
	ListData:any = [];

}