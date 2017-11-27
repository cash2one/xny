import { Component, OnInit ,Input,Directive,ElementRef,OnDestroy,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } 	from '@angular/router';

import { animations }  from '../../../../../Public/Animations/index'
import { PersonalService }   from '../../../../../Public/Personal/personal.service' //引入弹框服务
import { GrTaskTagListService } from 'app/Admin/services';

import { TaskReviseData }		from './TaskReviseData'

import { GrTasksListService }    from 'app/Admin/services';
import { dragula,DragulaService,DragulaDirective }                   from 'ng2-dragula';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['../../../../Admin.component.scss','./task-details.component.scss'],
  animations:[
  	animations.rightIn
  ]
})
export class TaskDetailsComponent implements OnInit {

  @ViewChild('textTasksTitle') textTasksTitle;
  @ViewChild('textTagTitle') textTagTitle;
  @ViewChild('deleteElm') deleteElm;
  @ViewChild('TagdeleteElm') TagdeleteElm;


  //loading效果标识符
  public Loading : boolean = false;
  public addCatTask:boolean = false;

  public nowTasks:any; //拖动的任务数据
  public DetailsData:any;
  public ShowDetailsData:Array<any>;
  public TasksDetailsId:number;  //任务模板id
  public taskCatList:Array<any>; //用于存储临时的任务数组
  public tagList:Array<any>;
  public TaskCatAdd = {
    isShow:false,
    taskId:0,
  }

  public TasksCatId :number; //列表id
  public TasksId : number //任务id


    // 新建列表数据
  public createList   :any = {
    isShow:false,
    error:false,
    buttonStyle:{
      disabled:false,
      buttonText:"确定"
    }
  };


  public createTask : any ={
    isShow:false,
    error:false,
    buttonStyle:{
      disabled:false,
      buttonText:"确定"
    }
  };

  //修改任务的状态
  public TasksTitleData:any = {
    isShow:false,
    text:{
      disabled:false,
      buttonText:'保存'
    }
  };


  //修改列表的状态
  public TasksTagTeam:any = {
    isShow:false,
    text:{
      disabled:false,
      buttonText:'保存'
    }
  };

  //删除任务显示弹框
  public ShowDelete:any = {
         isShow:false,
         position:{
            left:0,
            top:0
         }
      };

  //删除列表显示弹框
  public TaskTeamDelete:any = {
         isShow:false,
         position:{
            left:0,
            top:0
         }
      };


  constructor(
  	public activatedRoute:ActivatedRoute,
  	public router:Router,
    public grTasksListService:GrTasksListService,
    public dragulaService:DragulaService,
    public el:ElementRef,
    public grTaskTagListService:GrTaskTagListService,
    public personalService : PersonalService
  ) { 
    this.DetailsData = new TaskReviseData().data;
  }

  ngOnInit() {
      // this.getTaskDetail();
    // 组件创建完成后就开始获取详情数据
    this.activatedRoute.params.subscribe(res=>{
      this.TasksDetailsId = res.id;
      this.getTaskDetail();
    })


    this.dragulaService.setOptions('sixth-bag', {
     moves: (el, container, handle) => {
       return handle.className === 'entry-title pbox-trigger';
     }
    });

    // 当手势放下时触发请求事件
    this.dragulaService.drop.subscribe((value) => {
      this.evenDrop(value);
    });

    this.MouseLevel();

  }

  ngOnDestroy() {
    this.dragulaService.destroy('sixth-bag');
  }

  //获取正在拖放的任务列表
  public FnNoweTasks(list:any){
   this.nowTasks = list
  }

   // 鼠标左右滚动DOM事件
   public MouseLevel():void{
      let scrollContainer = this.el.nativeElement.querySelector("#scrollContainer");
      let taskBoard       = this.el.nativeElement.querySelector(".task-board")

      let LeftwheelEvent = (e) => {
          e=e || window.event; 
          if(e.wheelDelta){//IE/Opera/Chrome 
              if(e.deltaY>0||e.deltaX>0){
                taskBoard.scrollLeft +=80;
              }
              else{
                taskBoard.scrollLeft -=80;
              }
          }

          e.stopPropagation();
          return;
       }
       scrollContainer.addEventListener("mousewheel",LeftwheelEvent,false);
   }



  //关闭右侧弹窗返回上一级路由
  public CloseBack():void{
  	let backURL = this.router.url.split('/').slice(1,4).join('/')
  	this.router.navigateByUrl(backURL)
  }


  //获取任务模板的详细
  public getTaskDetail(){
    let obj={ catid:this.TasksDetailsId };
    this.grTasksListService.postTaskInfo(obj).subscribe(res=>{
        this.DetailsData=res.info;
        this.tagList = res.data;
        console.log(this.tagList)

    },error=>{
        console.log(error)
    })
  }



   //  添加任务列表弹框
   public FnAddTaskCatList(e:string){

    this.addCatTask = false;
    this.createTask.isShow = false;


     this.createList.isShow = !this.createList.isShow;
     this.createList.error = false;  
     if(this.createList.isShow === true){
        new Promise((resolve, reject)=>{
          setTimeout(()=>resolve())
        }).then(()=>{
          this.el.nativeElement.querySelector(e).focus();
        })      
     }  

     Object.assign(this.createList.buttonStyle,{disabled:false,buttonText:"确定"})
   }

    //  添加列表中任务弹框
   public FnAddCatTask(items){
      this.Fncancel();

     let e = '.createTask-'+items.id;

     this.TasksCatId = items.id;

     // Object.assign(this.createTask.buttonStyle,{disabled:false,buttonText:"确定"})


   }

   //  取消列表中任务弹框
   public Fncancel(){
      this.createTask.isShow = !this.createTask.isShow;
      this.addCatTask = !this.addCatTask;
      this.createList.buttonStyle.disabled = false;
      console.log('this.createTask.isShow',this.createTask.isShow)
   }

   //添加任务
   public FnCreateCatTask(value:string){
    this.createTask.error = false;

    let obj = {
      temid:this.TasksCatId,
      name:value.trim()
    }

     if(value.trim().length===0){
        this.createList.error = true;
        this.personalService.showPromptSmall('任务名称不能为空',"danger");
        return false;
     }    
     console.log('添加的分组id',this.TasksCatId);

     // 点击创建后禁用此按钮
    this.createList.buttonStyle.disabled = true;
    this.grTaskTagListService.postTemListAdd(obj).subscribe(response=>{

      if(response.status===1){

        this.personalService.showPromptSmall(response.message,"success")

        //添加成功之后将数据push到对应任务列表的任务队列之中
        this.tagList.forEach((e,index)=>{

          if((e.id)==this.TasksCatId){
            this.tagList[index].temlist.push({id:response.data,listorder:'0',name:value.trim(),temid:this.TasksCatId})
          }

        })        
      }else if(response.status===0){
        this.personalService.showPromptSmall(response.message,"danger")
      }

    },reject=>{
      this.personalService.showPromptSmall('网络异常',"danger")
    })
    this.Fncancel();

   }




   // 新建任务列表的方法
   public FnCreateTasksCat(value:string){

     this.createList.error = false;
     let obj = {
       catid:this.TasksDetailsId,
       name:value.trim()
     }

     if(value.trim().length===0){
        this.createList.error = true;
        this.personalService.showPromptSmall('列表名称不能为空',"danger");
        return false;
     }



     // 点击创建后禁用此按钮
     this.createList.buttonStyle.disabled = true;
     this.createList.buttonStyle.buttonText = "创建中..."

     this.grTaskTagListService.postAddTaskTag(obj).subscribe(response=>{

       if(response.status===1){

          this.personalService.showPromptSmall(response.message,"success")

          //成功添加后push到任务列表的数组后面
          this.tagList.push({id:response.data,count:'0',name:value.trim(),list:[]})

       }
       else if(response.status===0){

          this.personalService.showPromptSmall(response.message,"danger")

       }

       
       this.createList.isShow = false;

     },reject=>{
       this.personalService.showPromptSmall('网络异常',"danger")
     })

   }



  // 拖放组件下降时候需要执行的事件方法
  public evenDrop(value):void{

    let TasksArr      =  Array.from(value[2].children).map(e=>e["id"]).filter(e=>e!=="");
    let beforeTasksId =  value[3].parentNode.getAttribute("id");
    let TasksListId   =  value[2].parentNode.getAttribute("id");
    let myId          =  value[1].getAttribute("id")


    let obj={
        ids:TasksArr.join('|'),
        type:'orderlist',
        temid:'',
        items:value[0]==="another-bag"?1:2
    }

    if(beforeTasksId != TasksListId) obj.temid=TasksListId;

    this.grTasksListService.postTaskInfo(obj).subscribe(res=>{
      this.personalService.showPromptSmall(res.message,"success")
      if(value[0]==='another-bag') this.FnTasksSplice(value)
    },error=>{
      this.personalService.showPromptSmall('网络异常',"danger")
    })


    console.log('移动之后的数组',this.tagList)

  }



   // 重新排列任务的数组
   public FnTasksSplice(value){
     let myId          =  value[1].getAttribute("id")
     let TasksListId   =  value[2].parentNode.getAttribute("id");
     let beforeTasksId =  value[3].parentNode.getAttribute("id");
     console.log(value,myId,TasksListId,beforeTasksId);
     
     if(TasksListId != beforeTasksId){
          
      this.tagList.map((e,i)=>{
        //从原数组从删除某一条数据
        if(e.id==beforeTasksId){
          e.temlist.map((val,key)=>{
            if(myId == val.id){
              this.tagList[i].temlist.splice(key,1);
            }
          })
         // this.tagList[i].temlist = e.temlist?e.temlist:[];
        }

        if(e.id==TasksListId){
          this.tagList[i].temlist.push(this.nowTasks);

         // value[4]
         // ?(()=>{

         //   let lastTasksId   =  value[4].getAttribute("id");

         //   this.tagList[i].temlist.splice(this.tagList[i].temlist.findIndex(ele=>ele.id==lastTasksId),0,this.nowTasks)

         // })()
         // :(()=>{  
         //   this.tagList[i].temlist?this.tagList[i].temlist.push(this.nowTasks):this.tagList[i].temlist = [this.nowTasks];
         // })()
         
       }

       e.count = e.temlist?e.temlist.length:'0'

       
      })

      console.log(this.tagList)

     }

     

   }


  //修改点击显示input框
  public FneditTask(obj:any):void{
    this.TasksId = obj.id;
    this.TasksTitleData.isShow = !this.TasksTitleData.isShow;
    this.TasksTitleData.text = {
      disabled:false,
      buttonText:"保存"
    }
    setTimeout(()=>{
      this.textTasksTitle.nativeElement.focus()
    })
  }

  //修改任务保存
  public FnSaveEditName(event:any,value:string,list:any){ 
      let obj = {
        id:this.TasksId,
        name:value.trim()
      }

      this.TasksTitleData.text = {
        disabled:true,
        buttonText:"保存中..."
      }


       this.grTaskTagListService.postTemListEdit(obj).subscribe(response=>{

         if(response.status===1){

            this.personalService.showPromptSmall(response.message,"success")
            list.name = value;

            this.FnEditCancel();
         }
         else if(response.status===0){

            this.personalService.showPromptSmall(response.message,"danger")
            this.FnEditCancel();
         }
         

       },reject=>{
         this.personalService.showPromptSmall('网络异常',"danger")
       })

  }


  //取消input框显示
  public FnEditCancel(){
    this.TasksTitleData.isShow = false;
    this.TasksTitleData.text = {
      disabled:false,
      buttonText:"保存"
    }
  }

  //显示是否删除的方法
  public FnDeleteShow(event:any,catid:number):void{
    console.log('catid',catid,event);
    this.ShowDelete.isShow = !this.ShowDelete.isShow;
    this.TasksId = catid;
    setTimeout(()=>{
      let deletePositionWidth = this.deleteElm?this.deleteElm.nativeElement.getBoundingClientRect().width:'';
      this.ShowDelete.position = {
        left:event.clientX-deletePositionWidth,
        top:event.clientY
      }  
    })

  }



  //删除任务
  public FnDeleteTask(){
    let arr = [this.TasksId];
    let obj = { id : arr };
    this.grTaskTagListService.postTemListDel(obj).subscribe(response=>{
      if(response.status===1){
        this.personalService.showPromptSmall(response.message,"success");
        this.ShowDelete.isShow = !this.ShowDelete.isShow;

        this.tagList.map((e,i)=>{
          e.temlist.map((val,key)=>{
            if(val.id == this.TasksId){
              this.tagList[i].temlist.splice(key,1);
            }
          })
        })

     }else if(response.status===0){
        this.personalService.showPromptSmall(response.message,"danger")
     }
     
    },reject=>{
      this.personalService.showPromptSmall('网络异常',"danger")
    })

  }

  //修改列表名称input框显示
  public FneditTag(obj:any){
    this.TasksCatId = obj.id;
    this.TasksTagTeam.isShow = !this.TasksTagTeam.isShow;
    this.TasksTagTeam.text = {
      disabled:false,
      buttonText:"保存"
    }
    setTimeout(()=>{
      this.textTagTitle.nativeElement.focus()
    })
  }



    //修改任务保存
  public FnEditTagName(event:any,value:string,items:any){ 

      console.log('event',event)

      if(event.relatedTarget&&event.relatedTarget.tagName==="BUTTON"&&event.relatedTarget.id==="TagChange"){
          console.log('event')
          let obj = {
            id:this.TasksCatId,
            name:value.trim()
          }

          this.TasksTagTeam.text = {
            disabled:true,
            buttonText:"保存中..."
          }

         this.grTaskTagListService.postTaskEditTag(obj).subscribe(response=>{

           if(response.status===1){
              this.personalService.showPromptSmall(response.message,"success")
              items.name = value;
              this.TasksTagTeam.isShow = !this.TasksTagTeam.isShow;
           }else if(response.status===0){
              this.personalService.showPromptSmall(response.message,"danger")
           }
           

         },reject=>{
           this.personalService.showPromptSmall('网络异常',"danger")
         })

      }else{
        this.TasksTagTeam.isShow = !this.TasksTagTeam.isShow;
      }






  }



  //显示列表是否删除的方法
  public FnTaskTagDelete(event:any,tasktag_id:number):void{
    this.TaskTeamDelete.isShow = !this.TaskTeamDelete.isShow;
    this.TasksCatId = tasktag_id;
    setTimeout(()=>{
      let deletePositionWidth = this.TagdeleteElm?this.TagdeleteElm.nativeElement.getBoundingClientRect().width:'';
      this.TaskTeamDelete.position = {
        left:event.clientX-deletePositionWidth,
        top:event.clientY
      }  
    })

  }

  //删除列表
  public FnDeleteTaskTag(){
    let arr = [this.TasksCatId];
    let obj = { id : arr };
    this.grTaskTagListService.postDeleteTaskTag(obj).subscribe(response=>{
      if(response.status===1){
        this.personalService.showPromptSmall(response.message,"success");
        this.TaskTeamDelete.isShow = !this.TaskTeamDelete.isShow;

        this.tagList.map((e,i)=>{
          if(e.id == this.TasksCatId){
            this.tagList.splice(i,1);
          }
        })

     }else if(response.status===0){
        this.personalService.showPromptSmall(response.message,"danger")
     }
     
    },reject=>{
      this.personalService.showPromptSmall('网络异常',"danger")
    })


  }


}
