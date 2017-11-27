export class DocObj{

	title : string = '';
	cat_id : number = 0;
	recommend : number = 1;
	item_id : number = 0;

	constructor( obj:any = {} ) {
		
		for( let e in this ) {
			this[e] = obj[e]!=undefined ? obj[e] : this[e]
		}

	}


}

