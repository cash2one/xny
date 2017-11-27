import { Injectable } from '@angular/core'

import { GrMembersService } from '../../services'
import { RiccioLoadingService } from '../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../Public/riccio-notifications/riccio-notifications.service'

@Injectable()
export class MembersOpService {
    constructor(
        private grMembersService:GrMembersService,
        private riccioLoadingService:RiccioLoadingService,
        private riccioNotificationsService:RiccioNotificationsService
    ){}

    /**
	 * 设置部门通用函数
	 * @param type 1：设置主属部门 2：设置副属部门 3：设置部门负责人 4：设置部门管理员 5：普通员工
	 * @param user_arr 用户id数组
	 * @param department_arr 部门id数组
     * @param cid   企业id
	 * @param cb 回调
	 */
	public setDepartment(
		type: number,
		user_arr: any[],
        department_arr: any[],
        cid:number | string,
		cb?: () => void
	) {
		this.grMembersService.postDepartmentSet({
			user_arr: user_arr,
			department_arr: department_arr,
			type: type,
			cid: cid
		}).subscribe(res => {
			this.riccioLoadingService.closeLoading()
			if (res.status === 1) {
				this.riccioNotificationsService.setSubject({
					status: 'success',
					text: '设置成功'
				});
				cb?cb():{}
			}
		})
	}
}