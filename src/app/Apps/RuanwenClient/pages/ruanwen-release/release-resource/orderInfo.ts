export class orderInfo{

	public article:any[];
	public info:any;

	constructor(
          art:any[] = [],
          info:any = {
                "id":'',
                "number":"",
                "order_name":"",
                "user_id":'',
                "department_id":'',
                "cid":'',
                "article_id":'',
                "total_count":'',
                "final_amount":"",
                "remark":"",
                "status":'',
                "created_at":"",
                "updated_at":"",
                "title":"",
                "content":"" 
          }){
		this.article = [...art]
		this.info = {...info}
	}


}