export class classifyObj{

	name : string = '';
	is_assign : number = 1;
	status : number = 1;
	is_search: number = 1;
	desc: string = '';
	parent_id : number = 0;
	icon : string = '';

	constructor( obj : any = {} ) {

		for(let e in this) {
			this[e] = obj[e]!=undefined ? obj[e] : this[e]
		}

	}

}