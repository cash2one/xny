export class searchStatus{
	'data':any[] = [];

	constructor(type:string){

		if(type=='list'){
			this.data = [
				{
					id:0,
					name:'全部'
				},
				{
					id:1,
					name:'进行中'
				},
				{
					id:2,
					name:'已完成'
				},
				{
					id:3,
					name:'草稿'
				}
			]	
		}else if(type=='write'){
			this.data = [
				{
					id:0,
					name:'全部'
				},
				{
					id:1,
					name:'草稿'
				},
				{
					id:4,
					name:'进行中'
				},
				{
					id:5,
					name:'已完成'
				}
			]
		}



	}

}