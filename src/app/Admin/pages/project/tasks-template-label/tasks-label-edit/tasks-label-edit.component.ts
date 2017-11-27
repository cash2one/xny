import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import { animations }			from '../../../../../Public/Animations/index';
import { PersonalService }   from '../../../../../Public/Personal/personal.service' //引入弹框服务
import { TagData }  from '../tasks.tag';
import { GrTagListService }    from 'app/Admin/services'; 

@Component({
  selector: 'app-tasks-label-edit',
  templateUrl: './tasks-label-edit.component.html',
  styleUrls: ['../../tasks-template/task-edit/task-edit.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class TasksLabelEditComponent implements OnInit {
  	@Output() callShow:EventEmitter<boolean> = new EventEmitter<boolean>();
  	@Input() tagData:any;

 	public EditShowData:Array<any>;

	//添加任务标签时按钮的样式变化数据
	public buttonStyle = {
		disabled:false,
		buttonText:"保存",
		error:false
	};

	public tagEditData = {
		id:'',
		name:'',
		status:'',
	};


	constructor(
		public grTagListService:GrTagListService,
		public personalService:PersonalService
	) {

	    this.EditShowData = new TagData().addShow;
	    console.log('sadasdasdasdasd',this.tagData);

	}

	ngOnInit() {

	}

	//关闭视图的方法
	public getCloseBack(value):void{
		this.callShow.emit(value)
	}





	  //保存修改的方法
	public FnSaveEdit():void{
		this.buttonStyle.disabled = true;
		this.buttonStyle.buttonText = '修改中...';
		console.log('修改的数据',this.tagData)

		this.grTagListService.postEditTag(this.tagData).subscribe(res=>{
			this.buttonStyle.disabled = false;
			this.buttonStyle.buttonText = '保存';
		  	this.getCloseBack(1);
			this.personalService.showPromptSmall(res.message,"success");
		},error=>{
			this.buttonStyle.disabled = false;
			this.buttonStyle.buttonText = '保存';
			this.personalService.showPromptSmall('网络异常',"error");
		    console.log(error)
		})


	}

}
