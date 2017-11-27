import { Injectable,ElementRef } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { Subject }    from 'rxjs/Subject'
import 'rxjs/add/observable/forkJoin'

import { HttpHeadData } from '../HttpURL'
import { RiccioLoadingService } from '../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../Public/riccio-notifications/riccio-notifications.service'

export class UploadUrl{
    appThumb:string
}

@Injectable()
export class AdminService {
    private subMenuSub = new Subject<boolean>()
    public subMenuObj = this.subMenuSub.asObservable()

    // 有关上传的接口上
    public uploadUrl:UploadUrl

    constructor(
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService
    ) {
        this.uploadUrl = {
            appThumb:new HttpHeadData().SAASURL+'api/admin/app/upload_logo'
        }
     }

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
                    text: '请求完成，但可能有些数据操作出错',
                    status: 'danger'
                })
            }
            fb()
        })
    }

    /**
     * 设置二级菜单
     * @param flag 
     */
    public setSecondMenu(flag:boolean){
        this.subMenuSub.next(flag)
    }

    /**
     * 百度编辑器配置
     * @param flag 
     */
    public uedConf(flag: string = 'basic') {
        let conf
        switch (flag) {
            case 'basic':
                conf = {
                    toolbars: [['FullScreen', 'Source', '|', 'Undo', 'Redo', '|', 'FontSize', 'Bold', 'forecolor', 'Italic', 'Underline', 'Link', '|', 'InsertImage', 'ClearDoc', 'CheckImage', 'Emotion', 'attachment', 'PageBreak', 'insertcode', 'WordImage', 'RemoveFormat', 'FormatMatch', 'AutoTypeSet']],
                    autoClearinitialContent: true,
                    wordCount: false
                }
                break;

            case 'full':
                conf = {
                    toolbars: [['fullscreen', 'source', '|', 'undo', 'redo', '|',
                            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                            'directionalityltr', 'directionalityrtl', 'indent', '|',
                            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                            'print', 'preview', 'searchreplace', 'help', 'drafts']],
                    autoClearinitialContent: true,
                    wordCount: false
                }
                break;
            default: break;
        }
        return conf
    }

    /**
     * 获取元素在浏览器中的位置
     * @param el 元素  引用
     */
    public getElPosition(el:ElementRef):{
        top:number,
        left:number
    }{
        let clickEl = el.nativeElement
        let top = clickEl.offsetTop
        let left = clickEl.offsetLeft
        let clickParent = clickEl.offsetParent
        while(clickParent != null){
            top += clickParent.offsetTop
            left += clickParent.offsetLeft
            clickParent = clickParent.offsetParent
        }
        return {
            top:top,
            left:left
        }
    }

    //验证手机
    public validMobile(mobile: string) {
        return /^1[34578]\d{9}$/.test(mobile)
    }
    //验证邮箱
    public validEmail(email: string) {
        return  /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
    }
    //验证是否空白
    public validEmpty(val:string){
        val ? val = val.replace(/(^\s+)|(\s+$)/g,"") : {}
        if(val !== null && val.length !== 0){
            return true
        }else{
            return false
        }
    }
    public removeEmpty(val:string):string{
        val ? val = val.replace(/(^\s+)|(\s+$)/g,"") : {}
        return val
    }

    /**
     *  获取接口url
     */
    public getUploadUrl():UploadUrl{
        return this.uploadUrl
    }
}