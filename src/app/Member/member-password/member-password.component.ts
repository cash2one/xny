import {
    Component,
    OnInit,
    OnDestroy,
    Input
} from '@angular/core'

import { GrMembersService } from '../../ApiServices/grMembers/grMembers.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { ModifyData,DangerData } from './member-password-data'

@Component({
    selector: 'app-members-password',
    templateUrl: './member-password.component.html',
    styleUrls: [
        '../../Public/theme/common/common.scss',
        './member-password.component.scss'
    ]
})
export class MemberPasswordComponent implements OnInit {

    /**
     * 按钮标志位
     * @type {boolean}
     */
    public isBtn: boolean
    /**
     * 修改密码数据
     * @type {modifyData}
     */
    public modifyData: ModifyData
    /**
     * 错误提示
     * @type {dangerData}
     */
    public dangerData: DangerData

    constructor(
        public grMembersService: GrMembersService,
        public riccioNotificationsService: RiccioNotificationsService
    ) {
        this.isBtn = true
        this.modifyData = new ModifyData()
        this.dangerData = new DangerData()
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.isBtn = true
    }

    /**
     * @author GR-03
     * @copyright 点击按钮后提交数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {boolean}   value [description]
     */
    public fnSaveEdit(value: boolean): void {
        if (value === true && this.isModifyTrue() == true) {
            this.isBtn = false
            this.grMembersService.postMemberPassword({
                ...this.modifyData
            }).subscribe(res => {
                this.isBtn = true
                if (res.status === 1) {
                }
            }, error => {
                throw new Error(error)
            })
        }
    }

    /**
     * @author GR-03
     * @copyright 验证输入的信息是否正确
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @return    {boolean}   [description]
     */
    public isModifyTrue(): boolean {
        let bool = true
        let symbol = false
        for (let e in this.modifyData) {
            if (this.modifyData[e].length < 6) {
                bool = false
                symbol = true
                this.dangerData[e] = true
            }
        }
        if (this.modifyData['new_password'] != this.modifyData['new_password_confirmation']) {
            bool = false
            this.riccioNotificationsService.setSubject({ text: '新密码和确认密码不一致', status: 'danger' })
        }
        if (symbol === true) {
            this.riccioNotificationsService.setSubject({ text: '请输入6-16位密码', status: 'danger' })
        }
        return bool
    }

}
