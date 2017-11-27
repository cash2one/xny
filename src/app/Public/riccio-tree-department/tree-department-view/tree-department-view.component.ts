import { Component, OnInit,Input,OnDestroy } from '@angular/core';

import { animations }		from '../../Animations/index'

import { RiccioTreeDepartmentService }		from '../riccio-tree-department.service'

@Component({
  selector: 'app-tree-department-view',
  templateUrl: './tree-department-view.component.html',
  styleUrls: ['./tree-department-view.component.scss'],
  animations:[
    animations.accordion
  ]
})
export class TreeDepartmentViewComponent implements OnInit {

  @Input() AllTreeData:Array<any>;
  @Input() nodeKey:string;
  @Input() childrenKey:string;
  @Input() childrenName:string;
  @Input() symbol:string;

  public Subject:any;

  public TimeOut:any;

  constructor(
  	public riccioTreeDepartmentService:RiccioTreeDepartmentService
  ) { 

  }

  ngOnInit() {

  	this.FnIsCheck();

    this.Subject = this.riccioTreeDepartmentService.getIsCheck().subscribe(res=>{

      if(this.TimeOut) clearTimeout(this.TimeOut)

      this.TimeOut = setTimeout(()=>{

        res.map(e=>{
          this.AllTreeData.forEach(el=>{
            if(el[this.childrenKey].length>0){
              el[this.childrenKey].forEach((ele,i)=>{
                if(ele[this.symbol]==e['id']){
                  el[this.childrenKey][i]['isCheck'] = true;
                }
              })        
            }

          })

        })
      })

    })

  }

  ngOnDestroy(){
    this.Subject.unsubscribe()
  }

  //组件创建完成后给部门和成员添加isAccordion字段和成员的isCheck字段
  public FnIsCheck():void{
  	this.AllTreeData.map(e=>{
  		e['isAccordion']=false;
  		if(e[this.childrenKey].length>0){
  			e[this.childrenKey].map(el=>el['isCheck']=false)
  		}
  	})
  }

  //点击后展开或者收缩动画
  public FnUnfolded(list:any):void{

  	list['isAccordion'] = !list['isAccordion']

  }


  //选中的成员发射数据给父级
  public FnSelectUser(UserList:any):void{
  	UserList['isCheck'] = !UserList['isCheck']
  	this.riccioTreeDepartmentService.setEmit(UserList)
  }

}
