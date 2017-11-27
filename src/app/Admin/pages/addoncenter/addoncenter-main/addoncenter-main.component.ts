import { Component, OnInit } from '@angular/core';

import { GrAddoncenterService }    from '../../../services';
import { AddEditCenterService }  from '../addoncenter-add/add-edit-center.service'
import { PersonalService }   from '../../../../Public/Personal/personal.service' //引入弹框服务
import { animations }    from '../../../../Public/Animations/index'

@Component({
  selector: 'app-addoncenter-main',
  templateUrl: './addoncenter-main.component.html',
  styleUrls: ['../../../Admin.component.scss' ,'./addoncenter-main.component.scss'],
  animations:[
    animations.flyTop
  ]
})
export class AddoncenterMainComponent implements OnInit {

  public DriveList:Array<string>;
  public AppcenterData:Array<any>;
  public isSort:number|string;
  public ShowPbox:any;
  public allCheck:boolean = false;
  public  FlyLeftData:any = {
      showText:[
        {
          name:'隐藏',
          type:'0'
        },
        {
          name:'显示',
          type:'1'
        },
        {
          name:'禁用',
          type:'2'
        }
      ],
      isShow:false,
      number:0
    };


  constructor(
    public grAddoncenterService:GrAddoncenterService,
    public personalService:PersonalService,
    public addEditCenterService:AddEditCenterService
  ) { 
  	this.AppcenterData = [];
    this.DriveList = ['排序','ID','缩略图','应用名称','模型','版本号','状态','添加时间','操作','访问'];
    this.isSort = '-1';
    this.addEditCenterService.$RXJS.subscribe(res=>{
        res.data.isCheck = false;
        this.AppcenterData.push(res.data)
    })

    this.ShowPbox = {
      isShow:false,
      position:{
        top:0,
        left:0
      },
      appId:0
    }

  }

  ngOnInit() {

    //页面加载完成获取应用列表数据
    this.grAddoncenterService.getAddoncenter().subscribe(res=>{
      this.AppcenterData = [...res.data.data];
    })

  }



  //显示添加的视图
	public addonView():void{
    this.addEditCenterService.symbol = 'add';

    console.log(';asdasdasdasdasdasdasd',this.addEditCenterService.symbol)
		this.personalService.showViewData('addoncenter-add',true);
	}


  //显示修改视图
  public editView(list:any):void{
    this.addEditCenterService.symbol = 'edit';
    this.addEditCenterService.data = list;
    console.log(';asdasdasdasdasdasdasd',this.addEditCenterService.data)
    this.personalService.showViewData('addoncenter-add',true);
  }



    //点击全选时的事件
  public FnCheckAll(bool):void{
    this.allCheck = bool;

    this.AppcenterData.forEach(e=>{
      e.isCheck = this.allCheck;
    })

    this.FlyLeftData.isShow = this.SwitchCheck(this.AppcenterData)===true?true:false;
  }

  //选中的当前用户信息
  public FnCheckUser(list:any):void{
    list.isCheck = !list.isCheck;
    this.FlyLeftData.isShow = this.SwitchCheck(this.AppcenterData)===true?true:false;
    console.log(this.FlyLeftData)
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

  // 失去焦点时的排序事件
  public FnSortMenu(list:any):void{
    console.log(list)
    this.grAddoncenterService.getAddonEdit(list).subscribe(res=>{
        if(res.status===1){
            this.personalService.showPromptSmall('排序成功','success',{right:'50%',top:'30%'})
        }else if(res.status===0){
            this.personalService.showPromptSmall('排序失败','danger',{right:'50%',top:'30%'})
        }
    },error=>{
        console.error(error)
    })
  }


  //点击操作后显示，隐藏，禁用等操作的组件视图
  public FnShowPbox(event:any,list:any):void{
    this.ShowPbox.isShow = true;
    this.ShowPbox.appId = list.id
    this.ShowPbox.position = {
      left:event.clientX-240,
      top:event.clientY
    }
  }

  //失去焦点之后延迟消失组件
  public FnBlurPbox():void{
    setTimeout(()=>{
      this.ShowPbox.isShow = false;
    })
  }



  //显示隐藏禁用的事件
  public FnClickOperat(status:number):void{
    this.ShowPbox.isShow = false;
    let statusObj = {
      'id':this.ShowPbox.appId,
      'status':status
    }
    this.grAddoncenterService.postAddonStatus(statusObj).subscribe(res=>{
      if(res.status===1){
          switch (status) {
            case 0:
              this.personalService.showPromptSmall('已修改状态为隐藏','success',{right:'50%',top:'30%'})
              break;
            
            case 1:
              this.personalService.showPromptSmall('已修改状态为显示','success',{right:'50%',top:'30%'})
              break;

            case 2:
              this.personalService.showPromptSmall('已修改状态为禁用','success',{right:'50%',top:'30%'})
              break;

            default:break;
          }

          this.AppcenterData.forEach(e=>{
              if(e.id==this.ShowPbox.appId) e.status = status;
          })
      }
     },error=>{
       console.error(error)
     })

  }



}

