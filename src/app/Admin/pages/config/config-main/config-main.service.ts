import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/forkJoin'

import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

@Injectable()
export class ConfigMainService {
    constructor(
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService
    ) { }

    /**
     * 解析参数设置，将类似 code|验证码 解析为控件可识别
     * @param paramString 待解析字符串
     * @author GR-05
     * @check GR-03
     */
    public ResolveParmeToCtrl(paramString: string): Array<{
        show: string,
        name: string,
        value: boolean
    }> {
        let result: Array<{
            show: string,
            name: string,
            value: boolean
        }> = []
        if (paramString === null || paramString.length === 0 || paramString === '') {
            return []
        } else {
            let temp: Array<any> = paramString.split('<br>')
            temp.forEach((v) => {
                let oneTemp = v.split('|')
                result.push({
                    name: oneTemp[0],
                    show: oneTemp[1],
                    value: false
                })
            })
            return result
        }
    }

    /**
     * http批量操作公用
     * @param opBatch http请求数组
     * @param loadingMsg loading文字
     * @param notifMsg 通知文字
     * @param fb 回调
     * @author GR-05
     * @check GR-03
     */
    public opListBatch(
        opBatch: Array<any>,
        loadingMsg: string,
        notifMsg: string,
        fb: () => void
    ) {
        this.riccioLoadingService.setLoading({
            message: loadingMsg
        })
        Observable.forkJoin(opBatch).subscribe(res => {
            let result: boolean
            for (let item in res) {
                if (res[item]['status'] !== 1) {
                    result = false
                } else {
                    result = true
                }
            }
            this.riccioLoadingService.closeLoading()
            if (result) {
                this.riccioNotificationsService.setSubject({
                    text: notifMsg,
                    status: 'success'
                })
            } else {
                this.riccioNotificationsService.setSubject({
                    text: '请求完成，但可能有些数据删除出错',
                    status: 'danger'
                })
            }
            fb()
        })
    }
}