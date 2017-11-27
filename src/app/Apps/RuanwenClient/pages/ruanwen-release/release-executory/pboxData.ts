export class pboxData{
	
	'data':any[] = [];

	constructor(type:string = ''){
		switch (type) {
			case "release":
				this.data = [
					{
						id:0,
						name:'取消发布'
					}
				]
				break;
			
		    case "refuse":
				this.data = [
					{
						id:0,
						name:'取消发布'
					}
				]
				break;

			default:
				this.data = [
					{
						id:0,
						name:'取消发布'
					}
				]
				break;
		}
	}

}