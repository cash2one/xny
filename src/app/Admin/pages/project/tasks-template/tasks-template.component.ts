import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';

import { GrTasksListService }    from 'app/Admin/services';
import { GrTagListService }    from 'app/Admin/services';    

import { TasksData }             from './tasks';  //任务模板数据
import { TagData }               from './../tasks-template-label/tasks.tag'  //标签数据

import { PersonalService }	 from '../../../../Public/Personal/personal.service' //引入弹框服务
import { GrMenuListService }		from '../../../services'

import { animations }    from '../../../../Public/Animations/index'

import { getTaskData }             from './getTaskData';
@Component({
  selector: 'app-tasks-template',
  templateUrl: './tasks-template.component.html',
  styleUrls: ['../../../Admin.component.scss','./tasks-template.component.scss'],
  animations:[
    animations.flyTop
  ]
})
export class TasksTemplateComponent implements OnInit {

	@ViewChild('pagination') pagination:any;
	@ViewChild('deleteElm') deleteElm;

	public loadingText:boolean;
	public TaskId:number;
	// 分页组件数据
	public total = 0;
	public page:number;
	public perPage?:number = 9;
	public previousText?: string = '上一页'
	public nextText?: string = '下一页';
	public firstText?: string = '首页';
	public lastText?: string = '尾页';
	// 分页组件数据结束

	//设置列表筛选初始化的数据
	public getTaskData:getTaskData     = new getTaskData();

	public MenuRight:Array<any>;

	public MenuDataOnly:any;
	public headerList:Array<string>;
	public Operation = 'list';	
	public TasksListData:any;
	public TagListData:TagData;
	public FlyLeftData:any;
	public allCheck:boolean = false;
	public ShowDelete:any;
	public TaskEdit:any;
	public TaskDetail = {
		isShow:false,
		roleId:0,
	};


	constructor(
		public grTasksListService:GrTasksListService,
		public grTagListService:GrTagListService,
		public grMenuListService:GrMenuListService,
		public activatedRoute:ActivatedRoute,
		public router:Router,
		public personalService     :PersonalService,
	) {
		this.loadingText = false;
		this.headerList = ['编号','列表名称','封面','Tag名称','状态','管理操作'];
		this.TasksListData = {
			data:[]
		};
		this.TagListData = new TagData().ListData;

	    this.FlyLeftData = {
	      showText:[
	        {
	          name:'删除',
	          type:'delete',
	          function:'FnDeleteTask'
	        }
	      ],
	      isShow:false,
	      number:0
	    };

	    this.ShowDelete = {
	       isShow:false,
	       position:{
	          left:0,
	          top:0
	       }
	    };
	    this.TaskEdit = {
	      isShow:false,
	      roleId:0
	    };

	    this.MenuDataOnly = {
	    	title:'',
	    	data:{}
	    }

	}

	ngOnInit() {
		this.getTasksList(this.getTaskData);
		this.getTagList();

	    this.activatedRoute.params.subscribe(res=>{

	       let url = this.router.url.split('/').slice(2,this.router.url.split('/').length).join('/');
	       let RouteMenu = this.grMenuListService.FnActiveRouterMenu(url);
	       Object.assign(this.MenuDataOnly,{
	         title:RouteMenu.name,
	         data:RouteMenu
	       }) 
	  
	      this.MenuRight = this.MenuDataOnly.data['chilren']?[...this.MenuDataOnly.data['chilren'].filter(e=>e['is_left']==2)]:[];

	    },error=>{
	        console.log(error)
	    })              
	}


	//获取任务模板列表的方法
	public getTasksList(object):void{
		this.loadingText = false;
		this.TasksListData.data = [];
		this.grTasksListService.getTasksList(object).subscribe(res=>{

			if(res.data.data.length==0){
				this.loadingText = true;
			}
		  	this.TasksListData.data = res.data.data;

		  	this.perPage  = res.data.per_page;

		  	this.total = res.data.total;
		  	// console.log(this.TasksListData.data)

		},error=>{
		    console.log(error)
		})

	}


	//获取任务标签列表的方法
	public getTagList():void{
		let obj = { };
		this.grTagListService.getTagList(obj).subscribe(res=>{

		  	// this.TagListData = [{'name':'不限','id':'0','listorder':1,'status':1},...Array.from(res.data)];

		  	this.TagListData = res.data;

		  	
		  	// this.TagListData.push({'name':'不限','id':0,'listorder':1,'status':1 })

		  	// console.log(this.TagListData)

		},error=>{
		    console.log(error)
		})

	}


	// 选中的页数方法
	public FnPageChange(value):void{
		// console.log('value',value);

		this.getTaskData.page = value=='0'?'1':value;

		// console.log('this.getTaskData',this.getTaskData);
		this.getTasksList(this.getTaskData)
	}
	
	// 跳转到指定的页数
	public FnGoPage(page:any){
		if(page){
			if(parseInt(page)<=0) page = 1;

			this.page = page;

			this.FnPageChange(page);

			page = null;			
		}

	}

	// 任务名称字段检索
	public FnnameChange(value:any){
		this.getTaskData.name = value;
		this.getTasksList(this.getTaskData);
	}


	// 任务标签点击筛选
	public FnTagChange(id:number){
		this.getTaskData.tagid = id;
		this.getTasksList(this.getTaskData);
	}


	//全选按钮事件
	public FnCheckAll(bool:boolean):void{
		this.allCheck = bool;

		this.TasksListData.data.forEach(e=>{
			e.isCheck = this.allCheck;
		})
		this.FlyLeftData.isShow = this.SwitchCheck(this.TasksListData.data)===true?true:false;
	}


	public FnCheckTasks(list:any):void{
		list.isCheck = !list.isCheck;
		this.FlyLeftData.isShow = this.SwitchCheck(this.TasksListData.data)===true?true:false;
	}


  //判断当前的列表是否有被选中的某一条，有则显示滑块
  public SwitchCheck(list:any):boolean{
    let bool = false;
    list.forEach(e=>{
      if(e.isCheck===true) {
        this.FlyLeftData.number = list.filter(el=>el['isCheck']===true).length
        return bool = true;
      }
    })

    return bool
  }


	//任务模板编辑
	public openEditView(tasks_id:number){
		// console.log('传递的任务id',tasks_id)
		this. TaskEdit.isShow = !this.TaskEdit.isShow;
	    this.TaskEdit.roleId = tasks_id;
	}

	//任务添加弹框显示
	public addTaskView(){
		this.personalService.showViewData('task-add',true);
	}



	//详情右边弹出
	public FnShowDetails(id:number){
		// console.log('右边详细数据',object)
		// this.TaskDetail.isShow = !this.TaskDetail.isShow;
		//this.TaskDetail.roleId = object.id;
		this.TaskId = id;

		console.log('任务模板id',this.TaskId)


	}

	//顶部弹出操作
	public FunOperate(type:string,event:any){
		switch (type) {
	      case 'delete':
	        // console.log(this.TasksListData.data)
	        this.FnDelete(event);
	        break; 
	      default:break;
	    }
		
	}


	//显示是否删除的方法
	public FnDelete(event:any):void{

	  this.ShowDelete.isShow = !this.ShowDelete.isShow;
	  setTimeout(()=>{
	    let deletePositionWidth = this.deleteElm?this.deleteElm.nativeElement.getBoundingClientRect().width:'';
	    this.ShowDelete.position = {
	      left:event.clientX-deletePositionWidth,
	      top:event.clientY
	    }  
	  })

	}


  	//执行删除的方法
	public FnDeleteTask(){
		let idArray = [];
		// let idStr = '';
		this.TasksListData.data.map(e=>{
             if(e.isCheck === true) idArray.push(e.id);
        })
		// idStr = idData.join(',');
		let data = { id : idArray };

		this.grTasksListService.postDeleteTask(data).subscribe(res=>{
			if(res.status==1){
				this.ShowDelete.isShow = !this.ShowDelete.isShow;
				this.personalService.showPromptSmall(res.message,"success");

				this.TasksListData.data.map((e,i)=>{
		        	this.TasksListData.data = this.TasksListData.data.filter(el=>el['isCheck']===false)
		        })

		        this.FlyLeftData.isShow=false;

			}else{
				this.personalService.showPromptSmall(res.message,"error");
			} 
		},error=>{
		    this.personalService.showPromptSmall('网络异常',"danger");
		})

	}


	// 接受修改角色组件的方法
	public getCloseBack(value):void{ 
		this.TaskEdit.isShow = false;
		// console.log(value);
		if(value) this.getTasksList(this.getTaskData)
	}

}
