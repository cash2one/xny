export class postOrderAddDraft{
	media_idarr:any[] = [];
	order_name:string = '';
	article_id:string|number = 0;
	id:string|number = '';
	title:string = '无标题';
	content:string = '';
	remark:string = '';

	constructor(obj:any={}){

		if(Object.keys(obj).length>0){

			for(let e in this){
				this[e] = obj[e]==undefined?'':obj[e]
			}

		}

	}	

}

export class postOrderAddOrder{
	media_idarr:any[] = [];
	order_name:string = '';
	article_id:string|number = '';
	id:string|number = '';
	title:string = '无标题';
	content:string = '';
	remark:string = '';
	code:string = '';
}

export class mediaData{
	media_name:string = '';
	media_price:string = '';
	media_id:number|string = '';

	constructor(obj:any={}){

		if(Object.keys(obj).length>0){
			this.media_name = obj['media_name']
			this.media_price = obj['media_price']
			this.media_id = obj['media_id']
		}

	}

}