import { Component, OnInit ,ViewChild} from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot,NavigationEnd }  from '@angular/router';
import { PersonalService }	 from '../../../../Public/Personal/personal.service'; //引入弹框服务
import { animations }    from '../../../../Public/Animations/index';
import { GrTagListService }    from 'app/Admin/services'; 
import { TagData }               from './../tasks-template-label/tasks.tag'  //标签数据
import { dragula,DragulaService,DragulaDirective }                   from 'ng2-dragula';

import { GrMenuListService }		from '../../../services'

@Component({
  selector: 'app-tasks-template-label',
  templateUrl: './tasks-template-label.component.html',
  styleUrls: ['../../../Admin.component.scss','../tasks-template/tasks-template.component.scss'],
  animations:[
    animations.flyTop
  ]
})
export class TasksTemplateLabelComponent implements OnInit {
	@ViewChild('deleteElm') deleteElm;


	public TagListData:TagData;
	public headerList:Array<string>;
	public allCheck:boolean = false;
	public FlyLeftData:any;
	public ShowDelete:any;
	public MenuDataOnly:any;
	public MenuRight:Array<any>;

	public listObject:any = {
		list:true,
		name:''
	}

	public TagEdit:any = {
		isShow:false,
		tagId:0
    };

	public TagAdd:any = {
	      isShow:false,
	      tagData:{}
	    };    

	constructor(public personalService:PersonalService,
				public activatedRoute:ActivatedRoute,
				public router:Router,
				public grTagListService:GrTagListService,
				public grMenuListService:GrMenuListService,
				public dragulaService:DragulaService,	

	) { 
		this.MenuRight = [];
		this.MenuDataOnly = {
			title:'',
			data:{}
		}
		this.TagListData = new TagData().ListData;
		this.headerList = ['ID','标签名称','状态','编辑'];
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
	}

	ngOnInit() {
              
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


		this.getTagList()

	    // this.dragulaService.setOptions('sixth-bag', {
	    //  moves: (el, container, handle) => {
	    //    return handle.className === 'entry-title pbox-trigger';
	    //  }
	    // });

	    // 当手势放下时触发请求事件
	    this.dragulaService.drop.subscribe((value) => {
	      // this.evenDrop(value);
	    });


	}


  	//获取任务标签列表的方法
	public getTagList():void{
	
		this.grTagListService.getTagList( this.listObject ).subscribe(res=>{

		  	this.TagListData = res;
		  	console.log(this.TagListData)

		},error=>{
		    console.log(error)
		})

	}


	public FnnameChange(name:string){
		this.listObject.name = name;
		this.getTagList()
	}


	//全选按钮事件
	public FnCheckAll():void{
		console.log('tag列表',this.TagListData);
		this.allCheck = !this.allCheck;

		this.TagListData.data.map(e=>{
            e.isCheck = this.allCheck;
        })

		console.log('tag列表',this.TagListData);
		this.FlyLeftData.isShow = this.SwitchCheck(this.TagListData.data)===true?true:false;
	}

	//单个按钮事件
	public FnCheckTasks(list:any):void{
		list.isCheck = !list.isCheck;
		this.FlyLeftData.isShow = this.SwitchCheck(this.TagListData.data)===true?true:false;
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
		this.TagListData.data.map(e=>{
             if(e.isCheck === true) idArray.push(e.id);
        })
		// idStr = idData.join(',');
		let data = { id : idArray };

		this.grTagListService.getTagDel(data).subscribe(res=>{
			if(res.status==1){
				this.ShowDelete.isShow = !this.ShowDelete.isShow;
				this.personalService.showPromptSmall(res.message,"success");

		        this.TagListData.data.map((e,i)=>{
		        	this.TagListData.data = this.TagListData.data.filter(el=>el['isCheck']===false)
		        })

		        this.FlyLeftData.isShow=false;
			}else{
				this.personalService.showPromptSmall(res.message,"error");
			} 
		},error=>{
		    this.personalService.showPromptSmall('网络异常',"danger");
		})

	}


	public FnTagAdd(){
		this.TagAdd.isShow = !this.TagAdd.isShow;
	}

	//任务标签编辑
	public openEditView(list:any){
		this.TagEdit.isShow = !this.TagEdit.isShow;
	    this.TagEdit.tagData = list;
	    console.log('..............',this.TagEdit)
	}


	// 接受添加组件的方法
	public getCloseBack(value):void{ 
		this.TagAdd.isShow = false;
		if(value){
			value.map((e,i)=>{
				e.isCheck = false;
				this.TagListData.data.push(e)
			})
		}
	}

	public getEditCloseBack(value):void{
		this.TagEdit.isShow = false;
		console.log(value);
	}




}
