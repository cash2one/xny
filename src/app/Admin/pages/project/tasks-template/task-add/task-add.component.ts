import { Component, OnInit,DoCheck,ViewChild } from '@angular/core';

import { ActivatedRoute, Params ,Router}   from '@angular/router';
import { TasksData }     from '../tasks';

import { TagData } from '../../tasks-template-label/tasks.tag';
import { GrTagListService }    from 'app/Admin/services';
import { GrTasksListService }    from 'app/Admin/services';

import { PersonalService }   from '../../../../../Public/Personal/personal.service' //引入弹框服务

@Component({
  selector: 'task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent implements OnInit {

  @ViewChild('Modal') Modal:any;

  public TasksData:TasksData;
  public TasksAddShow:Array<any>;
  public TagListData:TagData;

  redShow:boolean

  constructor(
      public grTagListService:GrTagListService,
      public grTasksListService:GrTasksListService,
      public personalService:PersonalService
    ) { 
    this.TasksData = new TasksData();
    this.TasksAddShow = new TasksData().addShow;
    this.TagListData = new TagData().ListData;
  }

  ngOnInit() {
    this.getTagList();
  }


  //获取任务标签列表的方法
  public getTagList():void{
    let obj = { };
    this.grTagListService.getTagList(obj).subscribe(res=>{

        this.TagListData = res.data;

        this.TasksAddShow[0].option = res.data;

        console.log(this.TagListData)

    },error=>{
        console.log(error)
    })

  }


    //添加任务模板
  public FnAddTask():void{
    console.log('提交数据',this.TasksData.data);
    let postObj = this.TasksData.data;
    let bool = true;
    switch ('') {
      case postObj['name']:
        bool = false;
        break;
      case postObj['tagid']:
        bool = false
        break;
      case postObj['status']:
        bool = false
        break; 
      default:break;
    }
    if(bool===true){
      this.grTasksListService.postAddTask(postObj).subscribe(res=>{
        this.personalService.showPromptSmall(res.message,"success");
        this.personalService.showViewData('task-add',false);
      },error=>{
        this.personalService.showPromptSmall('网络异常',"danger");
      })    
    }else{
      this.personalService.showPromptSmall('缺失参数',"danger");
    }
  }


  public FnCloseView():void{
    this.personalService.showViewData('task-add',false);
  }


}
