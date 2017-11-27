export class menu{

	'name':string = '';
	'routerLink':string = '';
	'icon':string = '';

	constructor(obj:any = {}){

		if(Object.keys(obj).length>0){

			for(let e in this){
				this[e] = obj[e]?obj[e]:''
			}

		}

	}

}