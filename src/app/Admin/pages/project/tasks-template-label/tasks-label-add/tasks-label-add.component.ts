import { Component, OnInit,Output,EventEmitter,Input  } from '@angular/core';
import { animations }			from '../../../../../Public/Animations/index';
import { TagData }  from '../tasks.tag';
import { GrTagListService }    from 'app/Admin/services';
import { PersonalService }   from '../../../../../Public/Personal/personal.service' //引入弹框服务

@Component({
  selector: 'app-tasks-label-add',
  templateUrl: './tasks-label-add.component.html',
  styleUrls: ['../../tasks-template/task-edit/task-edit.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class TasksLabelAddComponent implements OnInit {
	@Output() callShow:EventEmitter<boolean> = new EventEmitter<boolean>();


  	public TagData:TagData;
 	public TagAddShow:Array<any>;

	//添加任务标签时按钮的样式变化数据
	public buttonStyle = {
		disabled:false,
		buttonText:"保存",
		error:false
	};

	constructor(
		public grTagListService:GrTagListService,
	  	public personalService:PersonalService
	) {
		this.TagData = new TagData();
	    this.TagAddShow = new TagData().addShow;
	}

  ngOnInit() {
  }


  //关闭视图的方法
  public getCloseBack(value):void{
  	this.callShow.emit(value)
  }


  //任务标签添加
  public FnSaveAdd():void{
    let postObj = this.TagData.data;
    let bool = true;
    switch ('') {
      case postObj['name']:
        bool = false;
        break;
      case postObj['status']:
        bool = false
        break; 
      default:break;
    }
    if(bool===true){
    this.buttonStyle.disabled = true;
  	this.buttonStyle.buttonText = '保存中...';

      this.grTagListService.postAddTag(postObj).subscribe(res=>{
      	console.log('添加完之后的回调',res);
        this.personalService.showPromptSmall(res.message,"success");
        this.getCloseBack(res.data);
        this.buttonStyle.disabled = false;
  		this.buttonStyle.buttonText = '保存';
      },error=>{
        this.personalService.showPromptSmall('网络异常',"danger");
      })    
    }else{
      this.personalService.showPromptSmall('缺失参数',"danger");
    }

  }



}
