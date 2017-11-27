export class memberData{

	'name':string = '';
	'discount':string = '';
	'describe':string  = '';

	constructor(obj:any = {}){
		if(Object.keys(obj).length>0){
			for(let e in this){
				this[e] = obj[e]?obj[e]:''
			}
		}
	}

}


export class write_price{

	'data':any[] = [
		{'type':'A','name':'普通文章(800字)','price':''},
		{'type':'B','name':'优秀文章(1000字)','price':''},
		{'type':'C','name':'高级写手(1500字)','price':''},
		{'type':'D','name':'专业写手(2000字)','price':''}
	]

	constructor(){
		
	}

}