import { Component, OnInit,OnDestroy,Input } from '@angular/core';

import { RiccioTreeDepartmentService }		from './riccio-tree-department.service'

@Component({
  selector: 'app-riccio-tree-department',
  templateUrl: './riccio-tree-department.component.html',
  styleUrls: ['./riccio-tree-department.component.scss']
})
export class RiccioTreeDepartmentComponent implements OnInit {

  @Input() departmentData

  public AllTreeData:Array<any>;
  public nodeKey:string;
  public childrenKey:string;
  public childrenName:string;
  public symbol:string;
  public loadingBool:boolean;

  constructor(
  	public riccioTreeDepartmentService:RiccioTreeDepartmentService
  ) {
  	this.AllTreeData = [];
    this.nodeKey = 'name',
    this.childrenKey = 'useritems',
    this.childrenName = 'real_name',
    this.symbol = 'id',

    this.loadingBool = true;

  }

  ngOnInit() {
    if(this.departmentData){
      this.loadingBool = false;
      this.AllTreeData = [...this.departmentData['data']];
      this.nodeKey = this.departmentData['nodeKey']?this.departmentData['nodeKey']:'name';
      this.childrenKey = this.departmentData['childrenKey']?this.departmentData['childrenKey']:'useritems';
      this.childrenName = this.departmentData['childrenName']?this.departmentData['childrenName']:'real_name';
      this.symbol = this.departmentData['symbol']?this.departmentData['symbol']:'id';
    }
  }

  ngOnDestroy(){}

}
