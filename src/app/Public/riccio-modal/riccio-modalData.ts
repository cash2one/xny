export class RiccioMoadlData{

	data:any;      // 对象数据的入口
	symbol:string = '';  // 标志位，用来判断是要显示哪一个组件；
	header:string = "Modal";
	size:number|string = 700;
	noBtn:boolean = false;
	type:any = ''; 			//标志位，用来判断入口，发射回去的时候发射该条信息
	btn:any = {
		name:'确认',
		status:'success'
	};

}