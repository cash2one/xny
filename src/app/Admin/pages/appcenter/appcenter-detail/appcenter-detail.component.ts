import { Component, OnInit ,Input,Directive,ElementRef,OnDestroy,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } 	from '@angular/router';
import { GrAppcenterService }    from '../../../services'
import { PersonalService }   from '../../../../Public/Personal/personal.service' //引入弹框服务
import { AddEditData } from '../add-edit-appcenter/AddEditData';


import { animations }  from '../../../../Public/Animations/index'

@Component({
  selector: 'app-appcenter-detail',
  templateUrl: './appcenter-detail.component.html',
  styleUrls: [ '../../../../Admin/Admin.component.scss','./appcenter-detail.component.scss'],
  animations:[
  	animations.rightIn
  ]
})
export class AppcenterDetailComponent implements OnInit {

	public appID:number;  //应用id

	public AppData:any={};

	public AppHeaderData:Array<any>;

	constructor(public router:Router,
				public activatedRoute:ActivatedRoute,
				public grAppcenterService:GrAppcenterService
	){
		this.AppHeaderData = new AddEditData().showData;
	}

	ngOnInit() {
		// 组件创建完成后就开始获取详情数据
		this.activatedRoute.params.subscribe(res=>{
			this.appID = res.id;
			this.getAppDetail();
		})

	}



	//关闭右侧弹窗返回上一级路由
	public CloseBack():void{
		let backURL = this.router.url.split('/').slice(1,4).join('/')
		this.router.navigateByUrl(backURL)
	}


	public getAppDetail():void{
		this.grAppcenterService.getAppiInfo(this.appID).subscribe(res=>{
			this.AppData = res.data;
	      	console.log('res',this.AppData)                       
	    })

	}





}
