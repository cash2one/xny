import { 
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter
} from '@angular/core';

import { GrSiteService } from '../../../../services/grManagement/grSite.service'
import { RiccioModalService } from '@gr-public/riccio-modal/riccio-modal.service'

@Component({
	selector: 'bsby-site-del',
	templateUrl: './site-del.component.html',
	styleUrls: [
		'../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../BsbyService/bsbyService.common.scss',
		'./site-del.component.scss'
	]
})
export class SiteDelComponent implements OnInit {
	@Input() siteId:number
	@Output() delEmit:EventEmitter<boolean> = new EventEmitter<boolean>()

	//按钮状态
	submitBtn: {
		text: string,
		status: boolean
	}

	constructor(
		private grSiteService:GrSiteService,
		private riccioModalService:RiccioModalService
	) {
		this.submitBtn = {
			text:'删除',
			status:true
		}
	}

	ngOnInit() {
	}

	/**
	 * 删除网站
	 * @author GR-05
	 */
	del(){
		this.submitBtn = {
			text:'删除中',
			status:false
		}
		this.grSiteService.postSiteDel({
			id:this.siteId
		}).subscribe(res=>{
			this.submitBtn = {
				text:'删除',
				status:true
			}
			if(res.status === 1){
				this.delEmit.emit(true)
			}
		})
	}
	
	/**
	 * 关闭
	 * @author GR-05
	 */
	cancle(){
		this.riccioModalService.close()
	}
}
