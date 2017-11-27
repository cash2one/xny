export class postWriteData{

	'title':string = '无标题';
	'content':string = '';
	'id':string|number = '';
	'total_count':any = '1';
	'article_type':string = 'A';
	'final_amount':string|number = '0';
	'remark':string = '';

	constructor(content:string = ''){
		this.content = content
	}

}