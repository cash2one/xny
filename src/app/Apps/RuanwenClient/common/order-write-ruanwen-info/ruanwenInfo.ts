export class ruanwenInfo{

	'title':string = '';
	'content':string = '';

	constructor(obj:any = {}){
		for(let e in this){
			this[e] = obj[e]?obj[e]:''
		}
	}

}