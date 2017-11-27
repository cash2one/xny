export class DocObj{

	catid : number = 0;
	status : number = 1;
	name : string = '';
	content : string = '';

	constructor( obj:any = {} ) {
		
		for( let e in this ) {
			this[e] = obj[e]!=undefined ? obj[e] : this[e]
		}


	}


}

