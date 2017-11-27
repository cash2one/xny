import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

import { animations }			from '../../../../../Public/Animations/index' 
import { taskEditData }			from './taskEditData'
import { GrTasksListService }    from 'app/Admin/services';
import { GrTagListService }    from 'app/Admin/services';  

import { TagData }               from './../../tasks-template-label/tasks.tag'  //标签数据

import { PersonalService }	 from '../../../../../Public/Personal/personal.service' //引入弹框服务

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class TaskEditComponent implements OnInit {

  @Output() callShow:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() TaskId:number;

  public taskEditData:taskEditData;	
  public EditShowData:Array<any>;
  public TagListData:TagData;
  //修改任务时按钮的样式变化数据
  public buttonStyle = {
    disabled:false,
    buttonText:"保存",
    error:false
  }

  constructor(
  	public grTasksListService:GrTasksListService,
  	public grTagListService:GrTagListService,
  	public personalService: PersonalService
  	) {
  	this.EditShowData = [
		{
			name:'标签',
			action:'tagid',
			type:'select',
			option:[],
		},
		{
			name:'名称',
			action:'name',
			type:'input'
		},
		{
			name:'缩略图',
			action:'thumb',
			type:'input'
		},
		{
			name:'状态',
			action:'status',
			type:'select',
			option:[
				{
					id:1,
					name:'显示'
				},
				{
					id:0,
					name:'隐藏'
				}
			]
		}
	];

  	this.taskEditData = new taskEditData().data;
  	this.TagListData = new TagData().ListData;
  }

  ngOnInit() {
  	this.getTaskInfo();
  	this.getTagList();
  	console.log('传入的id',this.TaskId)
  }

  //关闭视图的方法
  public getCloseBack(value):void{
  	this.callShow.emit(value)
  }

  //保存修改的方法
  public FnSaveEdit():void{
  	this.buttonStyle.disabled = true;
  	this.buttonStyle.buttonText = '修改中...';

  	console.log(this.TaskId)
  	console.log('修改提交的数据',this.taskEditData)
	this.grTasksListService.postTaskEdit(this.taskEditData).subscribe(res=>{
		this.buttonStyle.disabled = false;
		this.buttonStyle.buttonText = '保存';
	  	console.log('提交修改的返回',res)
	  	this.getCloseBack(1);
  		this.personalService.showPromptSmall(res.message,"success");
	},error=>{
		this.buttonStyle.disabled = false;
		this.buttonStyle.buttonText = '保存';
		this.personalService.showPromptSmall('网络异常',"error");
	    console.log(error)
	})


  }


	//获取任务标签列表的方法
	public getTagList():void{
		let obj = { }
		this.grTagListService.getTagList(obj).subscribe(res=>{

		  	this.TagListData = res.data;

		  	this.EditShowData[0].option = res.data;

		},error=>{
		    console.log(error)
		})

	}


  public getTaskInfo(){
  	let obj={
  		catid:this.TaskId
  	}
  	this.grTasksListService.postTaskInfo(obj).subscribe(res=>{

	  	this.taskEditData = res.info;
	  	// Object.assign()

	  	console.log(res)
	  	console.log(this.taskEditData)

	},error=>{
	    console.log(error)
	})
  }



}
