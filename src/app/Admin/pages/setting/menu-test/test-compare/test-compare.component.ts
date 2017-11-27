import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreadCrumbData} from "../../../../../Public/riccio-breadcrumb/riccio-breadcrumb.data";
import {GrMoreService} from "../../../../services/grMore/gr-more.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DragulaService, dragula} from "ng2-dragula";

@Component({
  selector: 'app-test-compare',
  templateUrl: './test-compare.component.html',
  styleUrls: ['./test-compare.component.scss']
})
export class TestCompareComponent implements OnInit,OnDestroy {

  public breadData:BreadCrumbData[];
  public appId:number;
  public cid:number;
  public appModel:string;
  public appName:string;
  public defaultMenu:Array<any>;
  public defaultMenuFilter:Array<any>;
  public defaultTable:Array<any>;
  public defaultTableFilter:Array<any>;
  public myMenu:Array<any>;
  public myTable:Array<any>;
  public defaultMenuShow:Array<any>;
  public defaultTableShow:Array<any>;
  public myMenuShow:Array<any>;        //平级格式
  public myMenuFilter:Array<any>;      //过滤后的菜单数据
  public myTableShow:Array<any>;
  public menuIds:Array<number>;
  public menuLeftLength:number;
  public menuRightLength:number;
  public myMenuValue:any;
  public addAll:boolean = false;
  public grMoreObj:any;
  public dragulaObj:any;

  constructor(
    private grMoreService:GrMoreService,
    private activatedRoute:ActivatedRoute,
    private dragulaService: DragulaService,
    private router:Router
  ) {
    dragulaService.setOptions('bag-first', {
      copy: true,
      moves: function (el, container, handle) {
        return el.className === 'handle';
      }
    });
    dragulaService.setOptions('bag-second', {
      copy: true,
      moves: function (el, container, handle) {
        return el.className === 'handle';
      }
    });
    this.dragulaObj = dragulaService.dragend.subscribe((value) => {
      this.onDragend(value.slice(1));
    });

  }
  ngOnDestroy(): void {
    this.dragulaService.destroy('bag-first');
    this.dragulaService.destroy('bag-second');
    this.dragulaObj.unsubscribe();
    this.grMoreObj.unsubscribe();
  }
  ngOnInit() {
    this.appId = this.activatedRoute.snapshot.params["app_id"];
    this.cid = this.activatedRoute.snapshot.params["cid"];
    this.appModel = this.activatedRoute.snapshot.params["model"];
    this.defaultMenuShow = [];
    this.defaultTableShow = [];
    this.myMenuShow = [];
    this.myTableShow = [];
    this.menuIds = [];
    this.myMenuFilter = [];
    this.defaultMenuFilter = [];
    this.defaultTableFilter = [];
    //面包屑
    switch(this.appModel){
      case "Console":
        this.appName = "企业控制台";
        break;
      case "RuanwenService":
        this.appName = "软文营销（服务端）";
        break;
      case "RuanwenClient":
        this.appName = "软文营销（客户端）";
        break;
      case "BsbyService":
        this.appName = "百搜百应（服务端）";
        break;
      case "BsbyClient":
        this.appName = "百搜百应（客户端）";
        break;
      default:
        this.appName = "";
    }
    this.breadData = [
      {name:'更多',routerLink:['../../../../../../../../']},
      {name:'菜单体检',routerLink:['../../../../../../../']},
      {name:this.appName,routerLink:['../../']},
      {name:'国人在线'}
    ]

    this.grMoreObj = this.grMoreService.getMenuContrast({app_id:this.appId,cid:this.cid}).subscribe(res=>{
      if(res.status == 1){
        this.defaultMenu = res.data.default;
        this.defaultTable = res.data.defaulf_table;
        this.myMenu = res.data.my;
        this.myTable = res.data.my_table;

        this.getChildrenMenuDm(this.defaultMenu);
        // this.getChildrenMenuDt(this.defaultTable);
        this.getChildrenMenuMm(this.myMenu);
        // this.getChildrenMenuMt(this.myTable);
        this.defaultMenuShow.map(e=>{
          this.defaultMenuFilter.push({
            id:e['id'],
            name:e['name'],
            level:e['level'],
            deleteIsShow:false,
            liIsShow:true
          })
        });
        this.defaultTable.map(e=>{
          this.defaultTableFilter.push({
            id:e['id'],
            name:e['name'],
            level:e['level'],
            deleteIsShow:false,
            liIsShow:true
          })
        });
        this.myMenuShow.map(e=>{
          this.myMenuFilter.push({
            id:e['id'],
            name:e['name'],
            level:e['level'],
            deleteIsShow:false,
            liIsShow:true
          })
        });

        this.myTable.map(e=>{
          this.myTableShow.push({
            id:e['id'],
            name:e['name'],
            level:e['level'],
            deleteIsShow:false,
            liIsShow:true
          })
        });

        this.menuLeftLength = this.defaultMenuShow.length + this.defaultTable.length;
        this.menuRightLength = this.myMenuShow.length + this.myTable.length;
      }
    })

  }

  //默认菜单无限极菜单递归
  getChildrenMenuDm(arr:Array<any>){
    for(let i = 0;i < arr.length;i++){
      this.defaultMenuShow.push(arr[i]);
      if(arr[i].chilren.length != 0){
        this.getChildrenMenuDm(arr[i].chilren);
      }
    }
  }
  //我的菜单无限极菜单递归
  getChildrenMenuMm(arr:Array<any>){
    for(let i = 0;i < arr.length;i++){
      this.myMenuShow.push(arr[i]);
      if(arr[i].chilren.length != 0){
        this.getChildrenMenuMm(arr[i].chilren);
      }
    }
  }
  // //默认选项卡无限极菜单递归
  // getChildrenMenuDt(arr:Array<any>){
  //   for(let i = 0;i < arr.length;i++){
  //     this.defaultTableShow.push(arr[i]);
  //     if(arr[i].chilren.length != 0){
  //       this.getChildrenMenuDt(arr[i].chilren);
  //     }
  //   }
  // }
  // //我的选项卡无限极菜单递归
  // getChildrenMenuMt(arr:Array<any>){
  //   for(let i = 0;i < arr.length;i++){
  //     this.myTableShow.push(arr[i]);
  //     if(arr[i].chilren.length != 0){
  //       this.getChildrenMenuMt(arr[i].chilren);
  //     }
  //   }
  // }


  //拖拽释放时触发函数
  private onDragend(args) {
    let [e, el] = args;
    let status1 = 0;
    let status2 = 0;
    for(let i = 0;i < this.menuIds.length;i++){
      if(this.menuIds[i] == args[0].value) status1 = 1;
    }
    if(status1 == 0){
      let arr = {id:args[0].value,name:args[0].innerText,level:0,deleteIsShow:true,liIsShow:true};
      for(let i = 0;i<this.defaultMenuFilter.length;i++){
        if(this.defaultMenuFilter[i].name == e.children[1].innerText) status2 = 1;

      }
      if(status2 == 1){
        this.myMenuFilter.push(arr);
      }else if(status2 == 0){
        this.myTableShow.push(arr);
      }
      this.menuIds.push(args[0].value);
    }
    args[0].innerText = '';
  }

  save(){
    this.grMoreService.postMenuData({cid:this.cid,ids:this.addAll == false?this.menuIds.sort():this.menuIds}).subscribe(res=>{
      if(res.status == 1){
        console.log('success')
      }
    })
  }

  //添加所有菜单函数
  allImport(){
    this.addAll = true;
    let statu1;
    let statu2;
    let arr1 = this.myMenuFilter;
    let arr2 = this.myTableShow;
    this.myMenuFilter = this.defaultMenuFilter;
    this.myTableShow = this.defaultTableFilter;
    for(let i = 0;i < this.myMenuFilter.length;i++){
      statu1 = 0;
      for(let j = 0;j < arr1.length;j++){
        if(this.myMenuFilter[i].name == arr1[j].name) statu1 = 1;
      }
      if(statu1 == 0) this.myMenuFilter[i].deleteIsShow = true;
    }
    for(let i = 0;i < this.myTableShow.length;i++){
      statu2 = 0;
      for(let j = 0;j < arr2.length;j++){
        if(this.myTableShow[i].name == arr2[j].name) statu2 = 1;
      }
      if(statu2 == 0) this.myTableShow[i].deleteIsShow = true;
    }

    for(let i = 0;i < this.defaultMenuShow.length;i++){
      this.menuIds.push(this.defaultMenuShow[i].id)
    }
    for(let i = 0;i < this.defaultTable.length;i++){
      this.menuIds.push(this.defaultTable[i].id)
    }
  }

  //删除添加的菜单函数
  deleteMenu(id:number){
    for(let i = 0;i<this.myMenuFilter.length;i++){
      if(this.myMenuFilter[i].id == id){
        this.myMenuFilter[i].liIsShow = false
      }
    }
    for(let i = 0;i<this.myTableShow.length;i++){
      if(this.myTableShow[i].id == id){
        this.myTableShow[i].liIsShow = false
      }
    }
    let index = this.menuIds.indexOf(id);
    this.menuIds.splice(index,1);
  }
}
