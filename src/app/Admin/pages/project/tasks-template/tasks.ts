export class TasksData{

	data:any = {
		'name':'',
		'tagid':'',
		'thumb':'',
		'status':'1',
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
			name:'标签',
			action:'tagid',
			type:'select',
			option:[],
		},
		{
			name:'名称',
			action:'name',
			type:'input'
		},
		{
			name:'缩略图',
			action:'thumb',
			type:'input'
		},
		{
			name:'状态',
			action:'status',
			type:'select',
			option:[
				{
					id:1,
					name:'显示'
				},
				{
					id:0,
					name:'隐藏'
				}
			]
		}
	];
	ListData:any = [];

}