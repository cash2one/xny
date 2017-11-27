export class numberInfoStatus{

	'resourceCount':number = 0;
	'writingCount':number = 0;
	'completeCount':number = 0;
	'cancelCount':number = 0;

	constructor(obj:any = {}){
		for(let e in this){
			this[e] = obj[e]?obj[e]:0
		}
	}

}	