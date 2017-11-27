export class postArticle{
	'id':number|string = 0;
	'title':string = '无标题';
	'content':string = '';

	constructor(obj:any = {}){

		if(Object.keys(obj).length>0){

			for(let e in this){
				this[e] = obj[e]==undefined?e=='id'?0:'':obj[e]
			}
		}

	}

}