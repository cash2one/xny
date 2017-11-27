import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

import { animations }			from '../../../../../Public/Animations/index'
import { GrMenuListService }			from '../../../../services'

@Component({
  selector: 'app-select-model',
  templateUrl: './select-model.component.html',
  styleUrls: ['./select-model.component.scss'],
  animations:[
  	animations.flyIn
  ]
})
export class SelectModelComponent implements OnInit {

  @Output() callSelectModel:EventEmitter<any> = new EventEmitter<any>();
  @Output() callShow:EventEmitter<boolean> = new EventEmitter<boolean>();

  public SelectModelData:any;	

  constructor(
    public grMenuListService:GrMenuListService,
  ) { 
  	this.SelectModelData = {
  		isShow:true,
  		data:[],
  		select:'Admin'
  	}
  }

  ngOnInit() {

      this.grMenuListService.getAppcenter().subscribe(res=>{

        Object.assign(this.SelectModelData.data,res)
        console.log(res)
      },error=>{
        console.log(error)
      })

  }

  //选择某一个应用的方法
  public selectedModel(list):void{
  	this.SelectModelData.select = list.model
  }

  //点击确定之后传递值给父级
  public defineModel():void{
  	this.callSelectModel.emit(this.SelectModelData)
  }

  //关闭窗口的方法
  public closeBack():void{
  	this.callShow.emit(false)
  }

}
