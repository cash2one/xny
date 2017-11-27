export class  postDraftData{

	'name':string = '';
	'start':string = '';
	'end':string = '';

	constructor(obj:any = {}){

		if(Object.keys(obj).length>0){

			for(let e in this){
				this[e] = obj[e]==undefined?'':obj[e]
			}

		}

	}

}