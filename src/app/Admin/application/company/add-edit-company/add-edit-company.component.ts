import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot }  from '@angular/router';
import { PersonalService }  from '../../../../Public/Personal/personal.service';
import { AddEditCompanyData } from './add-edit-company'

import { AddEditCompanyService }		from './add-edit-company.service';

import { GrCompanyService }		from '../../../services'

@Component({
  selector: 'app-add-edit-company',
  templateUrl: './add-edit-company.component.html',
  styleUrls: ['./add-edit-company.component.scss']
})
export class AddEditCompanyComponent implements OnInit {

	public titleAddShow:Array<any>;
	public AddEditData:any;
	public ShowText:any;


	constructor(
		public router:Router,
		public personalService:PersonalService,
		public addEditCompanyService:AddEditCompanyService,
		public grCompanyService:GrCompanyService
	) { 


		this.titleAddShow = new AddEditCompanyData().addShow;

		this.AddEditData = new AddEditCompanyData().data;

		this.ShowText = {
	  		title:'添加企业',
	  		btn:'添加',
	  		type:'add'
	  	}


	}

	ngOnInit() {
		this.FnIndustryList()
		this.getCompanyScaleList()
		this.FnInit()
	}

	//组件创建完成后判断是添加还是编辑从而切换不同数据
	public FnInit():void{

		let companybol = this.addEditCompanyService.companybol
		if(companybol==='add'){}
		else if(companybol==='edit'){
	  	this.ShowText = {
	  		title:'企业编辑',
	  		btn:'保存',
	  		type:'edit'
	  	}
			let data = this.addEditCompanyService.data;
			Object.assign(this.AddEditData,data)
		}

	}


	//行业
	public FnIndustryList():void{
		this.grCompanyService.getIndustryList().subscribe(res=>{
           console.log(res)
           this.titleAddShow[5].option = res.data;
        })
	}


	//规模
	public getCompanyScaleList():void{
		this.grCompanyService.getCompanyScaleList().subscribe(res=>{
           console.log(res)
           this.titleAddShow[6].option = res.data;
           console.log(this.titleAddShow)
        })
	}	


	public FnAddOrEdit():void{
		console.log('提交数据',this.AddEditData)
		let postObj={};
		Object.assign(postObj,this.AddEditData)
		console.log(postObj)
		let bool = true;
		switch ('') {
			case postObj['name']:
			  this.titleAddShow[0]['danger'] = true;
			  bool = false
			  break;
			case postObj['domain']:
			  this.titleAddShow[1]['danger'] = true;
			  bool = false
			  break;
			case postObj['industry']:
			  this.titleAddShow[2]['danger'] = true;
			  bool = false
			  break;
			case postObj['scale']:
			  this.titleAddShow[2]['danger'] = true;
			  bool = false
			  break;
			case postObj['location']:
			  this.titleAddShow[2]['danger'] = true;
			  bool = false
			  break;    
			default:break;
		}


		if(bool === true){
			if(this.ShowText.type==='add'){

				this.grCompanyService.postCompanyAdd(postObj).subscribe(res=>{
		            res.status===1
		            ?(()=>{
	            	  // this.addEditCenterService.setSubject(res)
		              this.personalService.showViewData(null,false);
		              this.personalService.showPromptSmall('添加成功','success',{top:"30%",right:"50%"})
		            })()
		            :this.personalService.showPromptSmall('添加失败','danger',{top:"30%",right:"50%"})
		        },error=>{
		          console.log(error)
		        })				
			}
			if(this.ShowText.type==='edit'){

				this.grCompanyService.postCompanyEdit(postObj).subscribe(res=>{
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



	public Close():void{
		this.personalService.showViewData('add-edit-company',false)
	}

}
