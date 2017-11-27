import { Component, OnInit } from '@angular/core';

import { departmentData }		from './departmentData'

import { GrMembersService }		from '../../../services'

@Component({
  selector: 'app-members-department',
  templateUrl: './members-department.component.html',
  styleUrls: ['../../../Console.component.scss','./members-department.component.scss']
})
export class MembersDepartmentComponent implements OnInit {

  /**
   * 所有部门数据列表
   * @type {any[]}
   */
  public departmentList:any[];  
  /**
   * 正常部门的数据列表
   * @type {any[]}
   */
  public departmentNormal:any[];
  /**
   * 禁用的部门数据列表
   * @type {any[]}
   */
  public departmentDisable:any[];
  /**
   * 切换表格的字段标示符
   * @type {string}
   */
  public switchTabTable:string;

  constructor(
  	public grMembersService:GrMembersService
  ) { 
    this.switchTabTable = 'normal';
    this.departmentNormal = [];
    this.departmentDisable = [];
  	this.departmentList = [];
  }

  ngOnInit() {
  	this.FnGetDeparmentList();
  }

  /**
   * @author GR-03
   * @copyright 调用无成员的部门树状接口方法 
   * @param     null
   * @return    arr
   * @check     GR-05       GR-03
   */
  public FnGetDeparmentList():void{
    this.departmentNormal.length=0
    this.departmentDisable.length=0
  	this.grMembersService.getDepartmentList().subscribe(res=>{
  		if(res.status===1){
	  		this.departmentList = this.FnRecursively(res['data']);
        this.departmentNormal = this.departmentList.filter(e=>e['status']===1);
        this.departmentDisable = this.departmentList.filter(e=>e['status']===0);
  		}
  	})
  }

  /**
   * @author GR-03
   * @copyright 处理数据的方法，将树状转为同级
   * @param     {any[]}
   * @return    {Array<any>}
   * @check     GR-05        GR-03
   */
  public FnRecursively(data:any[]):Array<any>{
    let outData = [];
    let fn = _data=>{
       if(Array.isArray(_data)===true){
          _data.map(e=>{
            outData.push(e);
            if(e['chilren'].length>0) fn(e['chilren']);
          })
       }else{
         throw new Error('该对象不是数组')
       }
    };
    fn(data);
  	return outData
  }

}
