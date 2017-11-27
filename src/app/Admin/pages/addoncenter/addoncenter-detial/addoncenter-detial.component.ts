import { Component, OnInit ,Input,Directive,ElementRef,OnDestroy,ViewChild} from '@angular/core';
import { ActivatedRoute, Router } 	from '@angular/router';
import { GrAddoncenterService }    from '../../../services'
import { PersonalService }   from '../../../../Public/Personal/personal.service' //引入弹框服务
import { AddonCenterData }   from '../addoncenter';



import { animations }  from '../../../../Public/Animations/index'

@Component({
  selector: 'app-addoncenter-detial',
  templateUrl: './addoncenter-detial.component.html',
  styleUrls: ['../../../../Admin/Admin.component.scss','./addoncenter-detial.component.scss'],
  animations:[
  	animations.rightIn
  ]
})
export class AddoncenterDetialComponent implements OnInit {

	public appID:number;  //应用id

	public AppData:any={};

	public AppHeaderData:Array<any>;

	constructor(public router:Router,
			    public activatedRoute:ActivatedRoute,
			    public grAddoncenterService:GrAddoncenterService){
		
		this.AppHeaderData = new AddonCenterData().addShow;
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
		this.grAddoncenterService.getAddonInfo(this.appID).subscribe(res=>{
			this.AppData = res.data;
	      	console.log('res',this.AppData)                       
	    })

	}

}
