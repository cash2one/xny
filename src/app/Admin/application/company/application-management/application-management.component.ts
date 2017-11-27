import {Component, Input, OnInit} from '@angular/core';
import {GrCompanyService} from "../../../services/grCompany/grCompany.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GrMenuListService} from "../../../services/grLogin/grMenuList.service";
import {RiccioNotificationsService} from "../../../../Public/riccio-notifications/riccio-notifications.service";
import {RiccioPboxService} from "../../../../Public/riccio-pbox/riccio-pbox.service";

@Component({
  selector: 'app-application-management',
  templateUrl: './application-management.component.html',
  styleUrls: ['./application-management.component.scss']
})
export class ApplicationManagementComponent implements OnInit {

  public comId:number;
  public appList:Array<any>;    //企业开通的应用列表
  public membersList:Array<any>;    //企业未开通的应用列表
  public menuDataOnly:any;
  public menuRight:any;
  public modalIsShow:boolean = false;
  public modalIsClose:boolean;
  public modalHeader:string = "请选择应用";
  public modalTitle:string = "";
  public modalPlaceholder = "请输入应用名称";
  public searchValue:string;
  public name:string = "name";
  public confirmIsShow:boolean = false;
  public member:any;
  public pageValue:any = 1;
  public nextPage:string;

  constructor(
    private grCompanyService:GrCompanyService,
    private activatedRoute:ActivatedRoute,
    private grMenuListService:GrMenuListService,
    private router:Router,
    private riccioNotificationsService:RiccioNotificationsService) {
    this.menuRight = [];
    this.menuDataOnly = {};
  }

  ngOnInit() {
    this.comId = this.activatedRoute.snapshot.params["id"];
    this.getMenus();
    this.grCompanyService.getCompanyApplication({
      cid:this.comId
    }).subscribe(res => {
      if(res.status === 1){
        this.appList = res.data;
      }
    })
  }

  /**
   * 获取tab
   */
  public getMenus(){
    this.activatedRoute.params.subscribe(res => {
      let RouteMenu = this.grMenuListService.FnActiveRouterMenu('company/list');
      Object.assign(this.menuDataOnly, {
        title: RouteMenu.name,
        data: RouteMenu
      })
      this.menuRight = this.menuDataOnly.data['chilren'] ? [...this.menuDataOnly.data['chilren'].filter(e => e['is_left'] == 2)] : [];
    })
  }

  //管理操作
  fnGoManage(str:string,model:string,id:number){
    if(str == "member"){
      this.router.navigate(['/Admin/members/member_app','model',model,'cid',this.comId,'appid',id])
    }else if(str == "menu"){
      this.router.navigate(['/Admin/menu/list','model',model,'cid',this.comId,'status','1'])
    }else if(str == "rule"){
      this.router.navigate(['/Admin/role/list','model',model,'cid',this.comId])
    }
  }

  //开通应用
  fnOpenApp(){
    this.modalIsShow = true;
    this.fnGetMembersList('',"search")
  }

  //监听弹窗是否关闭
  closeModalHandler(close:boolean){
    this.modalIsClose = close;
    this.modalIsShow = false;
  }

  public fnGetMembersList(name:string='',type:string):void{
    this.grCompanyService.getCompanyUnApplication({
      cid:this.comId,
      name:name,
      page:this.pageValue
    }).subscribe(res=>{
      if(res.status===1){
        let temp = Array.isArray(res['data']['data'])==true
          ?(()=>{
            let arr = [];
            res['data']['data'].map(e=>{
              arr.push({
                id:e['id'],
                app_key:e['app_key'],
                model:e['model'],
                thumb:e['thumb'],
                type:e['type'],
                thumb_icon:e['thumb_icon'],
                name:e['name'],
                version:e['version'],
                content:e['content'],
                path:e['path'],
                status:e['status'],
                group:e['group'],
                desc:e['desc'],
                thumb_icon_40x40:e['thumb_icon_40x40']
              })
            })
            return [...arr]
          })()
          :[]
        if(type === 'search'){
          // 搜索，直接赋值
          this.membersList = temp
        }else if(type === 'more'){
          // 更多，追加赋值
          this.membersList = this.membersList.concat(temp)
        }
        if(res.data.total > this.membersList.length){
          this.nextPage = "normal"
        }else if(res.data.total <= this.membersList.length){
          this.nextPage = "hide"
        }
      }else{
        this.riccioNotificationsService.setSubject({
          text:res.message,
          status:'danger'
        })
      }
    })

  }

  //搜索事件
  searchHandler(searchValue){
    this.searchValue = searchValue;
    this.fnGetMembersList(this.searchValue,'search')
  }

  //点击应用选择弹框中的应用触发
  emitDataHandler(member:any){
    this.confirmIsShow = true;
    this.member = member;
  }

  //点击加载更多返回页数
  pageValueHamdler(pageValue:any){
    this.pageValue = pageValue;
    this.fnGetMembersList('','more')
  }

  //确认添加应用弹框确认取消事件
  addApp(){
    this.grCompanyService.postCompanyApplication({
      cid:this.comId,
      app_ids:[{app_id:this.member.id,model:this.member.model}]
    }).subscribe(res=>{
      if(res.status == 1){
        this.modalIsShow = false;
        this.grCompanyService.getCompanyApplication({
          cid:this.comId
        }).subscribe(res => {
          if(res.status === 1){
            this.appList = res.data;
          }
        })
      }
    })
    this.confirmIsShow = false;
    this.modalIsShow = false;
  }
  cancelAddApp(){
    this.confirmIsShow = false;
  }
}
