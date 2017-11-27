import {
    Component,
    OnInit,
    ViewChild,
    Input,
    Output,
    EventEmitter
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs/Subscription'

import { GrMembersService } from '../../ApiServices/grMembers/grMembers.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioCutService } from '@gr-public/riccio-cut/riccio-cut.service'
import { AppService } from '../../app.service'
import { SettingData } from '../settingData'
import { MemberService } from '../member.service'

@Component({
    selector: 'app-member-setting',
    templateUrl: './member-setting.component.html',
    styleUrls: [
        '../../Public/theme/common/common.scss',
        './member-setting.component.scss'
    ]
})
export class MemberSettingComponent implements OnInit {

    @ViewChild('cropperInput') cropperInput: any

    //按钮状态
    isBtn: boolean

    settingData: SettingData

    thumbImg:string
    errorImg: boolean

    cutRX$: Subscription
    userInfo$: Subscription

    constructor(
        private activatedRoute: ActivatedRoute,
        private grMembersService: GrMembersService,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioCutService: RiccioCutService,
        private appService: AppService,
        private memberService:MemberService
    ) {
        this.isBtn = true
        this.errorImg = false
        this.settingData = this.memberService.getTempUserInfo()
        this.thumbImg = window['setting']['fileurl'] + this.settingData['thumb']

        this.cutRX$ = this.riccioCutService.getEmit().subscribe(res => {
            this.fnUploadImgThumb(res.data.image.image)
            this.riccioCutService.setSubject({})
        })

        this.userInfo$ = this.memberService.userInfoObj.subscribe(res => {
            this.settingData = res
            this.thumbImg = window['setting']['fileurl'] + this.settingData['thumb']
        })
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.cutRX$.unsubscribe()
    }

    /**
     * @author GR-03
     * @copyright 点击确认修改后提交数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public fnSaveEdit(value: boolean): void {
        if (value === true) {
            this.isBtn = false
            this.grMembersService.postMemberEdit(this.settingData).subscribe(res => {
                this.isBtn = true
                if (res.status === 1) {
                    this.riccioNotificationsService.setSubject({ text: '修改成功' })
                    this.memberService.setTempUserInfo(this.settingData)
                }
            }, error => {
                throw new Error(error)
            })
        }
    }

    /**
     * @author GR-03
     * @copyright 触发上传按钮的事件
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public fnClickCropper(): void {
        this.cropperInput.nativeElement.click()
    }

    /**
     * @author GR-03
     * @copyright 点击上传图片和修改图片
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     */
    public fnCut($event: any): void {
        this.riccioCutService.fileChangeListener($event)
        this.cropperInput.nativeElement.value = ''
    }


    /**
     * @author GR-03
     * @copyright 执行上传头像操作
     * @param     [param]
     * @return    [return]
     * @param     {string}    base64 [description]
     */
    public fnUploadImgThumb(base64: string): void {
        this.grMembersService.postMemberUploadAvatar({
            'base': base64
        }).subscribe(res => {
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({ text: '上传成功' })
                this.settingData['thumb'] = res['data']
                this.thumbImg = window['setting']['fileurl'] + res['data']
                this.errorImg = false
            }
        }, error => {
            throw new Error(error)
        })
    }

}
