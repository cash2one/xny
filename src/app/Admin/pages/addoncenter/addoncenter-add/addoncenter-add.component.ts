import { Component, OnInit,DoCheck,ViewChild } from '@angular/core';

import { ActivatedRoute, Params ,Router}   from '@angular/router';

import { AddonCenterData } from '../addoncenter';
import { GrAddoncenterService }    from 'app/Admin/services';
import { AddEditCenterService }  from './add-edit-center.service'

import { PersonalService }   from '../../../../Public/Personal/personal.service' //引入弹框服务

@Component({
  selector: 'app-addoncenter-add',
  templateUrl: './addoncenter-add.component.html',
  styleUrls: ['../../../Admin.component.scss','./addoncenter-add.component.scss']
})
export class AddoncenterAddComponent implements OnInit {

	public AddonData:AddonCenterData;
	public AddonAddShow:Array<any>;

	redShow:boolean

	public ButtonText = {
	    title:'添加插件',
	    btn:'添加',
	    type:'add',
	    disabled:false
	};

	constructor( 
		public personalService:PersonalService,
		public grAddoncenterService :GrAddoncenterService,
		public addEditCenterService :AddEditCenterService
	) {

		this.AddonData = new AddonCenterData().data;
    	this.AddonAddShow = new AddonCenterData().addShow;
	}

	ngOnInit() {
		this.FnInit();
	}



	//组件创建完成后判断是添加还是编辑从而切换不同数据
	public FnInit():void{
		let symbol = this.addEditCenterService.symbol
		if(symbol==='add'){}
		else if(symbol==='edit'){
			this.ButtonText = {
				title:'编辑插件',
				btn:'保存',
				type:'edit',
				disabled:false
			}
			let data = this.addEditCenterService.data;
			Object.assign(this.AddonData,data)
			console.log('this.AddonData',this.AddonData)
		}

	}




	public FnCloseView():void{
		this.personalService.showViewData('addoncenter-add',false);
	}


	public FnAddon():void{
		let postObj={};
		Object.assign(postObj,this.AddonData)
		console.log(postObj)
		let bool = true;
		switch ('') {
			case postObj['name']:
			  this.AddonAddShow[0]['danger'] = true;
			  bool = false
			  break;
			case postObj['model']:
			  this.AddonAddShow[1]['danger'] = true;
			  bool = false
			  break;
			case postObj['app_key']:
			  this.AddonAddShow[2]['danger'] = true;
			  bool = false
			  break;
			default:break;
		}

		if(bool === true){
			if(this.ButtonText.type==='add'){

				this.grAddoncenterService.getAddonAdd(postObj).subscribe(res=>{
		            res.status===1
		            ?(()=>{
	            	  this.addEditCenterService.setSubject(res)
		              this.personalService.showViewData(null,false);
		              this.personalService.showPromptSmall('添加成功','success',{top:"30%",right:"50%"})
		            })()
		            :this.personalService.showPromptSmall('添加失败','danger',{top:"30%",right:"50%"})
		        },error=>{
		          console.log(error)
		        })				
			}
			if(this.ButtonText.type==='edit'){
				this.grAddoncenterService.getAddonEdit(postObj).subscribe(res=>{
		            res.status===1
		            ?(()=>{
		              this.personalService.showViewData(null,false);
		              this.personalService.showPromptSmall('修改成功','success',{top:"30%",right:"50%"})
		            })()
		            :this.personalService.showPromptSmall('修改失败','danger',{top:"30%",right:"50%"})
		        },error=>{
		          console.log(error)
		        })
			}			
		}


	}


}
