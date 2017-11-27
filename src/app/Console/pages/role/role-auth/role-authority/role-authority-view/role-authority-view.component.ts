import { Component, OnInit,Input,ViewChild,OnChanges,SimpleChanges,OnDestroy } from '@angular/core';
import { Subscription }  from 'rxjs/Subscription'
import { RoleAuthService }		from '../../role-auth.service'

@Component({
  selector: 'app-role-authority-view',
  templateUrl: './role-authority-view.component.html',
  styleUrls: ['./role-authority-view.component.scss']
})
export class RoleAuthorityViewComponent implements OnInit {


  @Input() viewData:any;
  @Input() level:number;
  @Input() name:string;
  @Input() ID:number;
  @Input() isCheck:boolean;
  @Input() parentData:any;
  @Input() constParent:any;
  @Input() constParentParent:any;

  public TimeOut:any;
  public symbolID:number|string;

  // *
  //  * 
  //  * @type {Subscription}
   
  public roleAuthRX$:Subscription

  constructor(
    public roleAuthService:RoleAuthService
  ) { 
  }

  ngOnInit() {
    this.onInit()
  }

  ngOnChanges(changes:SimpleChanges){
    // this.FnConstParent()

      // this.FnConstParent()
      this.roleAuthRX$ = this.roleAuthService.getSubject().subscribe(res=>{
        this.roleAuthRX$ ? this.roleAuthRX$.unsubscribe() : {}
        this.onInit(Array.isArray(res['rules'])==true?res['rules']:[])
      })

  }

  ngOnDestroy(){
      // this.roleAuthRX$.unsubscribe()
      this.roleAuthRX$ ? this.roleAuthRX$.unsubscribe() : {}
  }

  /**
   * @author GR-03
   * @copyright 初始化的时候
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
  public onInit(_rules:any[] = []){

    this.roleAuthService.RoleData.rules = _rules

    this.roleAuthService.RoleData.rules.map(e=>{
      if(e==this.constParentParent['id']){
        return this.isCheck = true
      }
    })
    this.symbolID = this.roleAuthService.RoleData.symbol
    if(this.symbolID!=1){
      this.viewData.forEach((e,i)=>{
        if(this.roleAuthService.RoleData.rules.findIndex(y=>e['id']==y)!==-1){
          this.viewData[i]['isCheck'] = true;
          // this.isCheck = true;
        }
        else{
          this.viewData[i]['isCheck'] = false
          // this.isCheck = false;
        }
       }
      )
    }
  }

  //将选中的菜单切换勾选样式
  public FnCheckLabel(list:any,id:number):void{
    if(this.symbolID!=1){
      list.isCheck = !list.isCheck;
      // this.FnParentCheck();
      // this.FnConstParent();
      this.FnChilrenCheck(list);
    }
  }

  //用于根据当前选中的菜单来判断chilren的菜单决定是否被选中
  public FnChilrenCheck(list:any):void{

    list.isCheck===true?
    (()=>{
      this.roleAuthService.RoleData.rules = this.roleAuthService.RoleData.rules.filter(el=>el!=list.id)
      this.roleAuthService.RoleData.rules.push(list.id);
      if(list['chilren'].length>0){

        list['chilren'].map((e,i)=>{e.isCheck = true;this.FnChilrenCheck(e)})
        
      }

    })()
    :
    (()=>{

      this.roleAuthService.RoleData.rules = this.roleAuthService.RoleData.rules.filter(el=>el!=list.id)
      if(list['chilren'].length>0){

        list['chilren'].map((e,i)=>{e.isCheck = false;this.FnChilrenCheck(e)})
      }

    })()

  }

  //判断当前选中的菜单是否全部被选中，如果不是则父级菜单的选中状态为不选中
  public FnParentCheck():void{
    let falseData = this.viewData.filter(e=>e['isCheck']===false);
    falseData.length>0
    ?(()=>{
      this.parentData['isCheck']=false;
      // this.isCheck = false;
      this.roleAuthService.RoleData.rules = this.roleAuthService.RoleData.rules.filter(el=>el!=this.parentData['id'])
    })()
    :(()=>{
      this.parentData['isCheck']=true;
      this.roleAuthService.RoleData.rules.push(this.parentData.id);
    })()
  }

  //在次检查所有的上一级是否全部被选中，是的话勾选
  public FnConstParent():void{
    let falseData = (this.constParent instanceof Array)?this.constParent.filter(e=>e['isCheck']===false):[];
    falseData.length>0
    ?(()=>{
      let parentID = this.constParent[0]['parentid'];
      this.AllFindDataId([this.constParentParent],parentID,false)
    })()
    :(()=>{
      let parentID = this.constParent[0]['parentid'];
      this.AllFindDataId([this.constParentParent],parentID,true)
    })()
  }


  //递归遍历找出parentid的全部勾选
  public AllFindDataId(data:any,id:number|string,bool:boolean):void{
     data.forEach(e=>{
       e['id']===id
       ?(()=>{
         e['isCheck']=bool;
         if(bool===true){
            this.roleAuthService.RoleData.rules.push(id);
         }
         else if(bool===false){
            this.roleAuthService.RoleData.rules = this.roleAuthService.RoleData.rules.filter(el=>el!=id)
         }
       })()
       :(()=>{
         this.AllFindDataId(e['chilren'],id,bool)
       })()
     })

  }


  //判断当前选中的是哪个一级菜单
  public FnCheckAll(list:any):void{
    this.isCheck = !this.isCheck;
    this.FnChilrenCheck({'isCheck':this.isCheck,'chilren':this.viewData,'id':this.ID});

  }

}
