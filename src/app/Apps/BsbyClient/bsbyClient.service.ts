import { Injectable, ViewContainerRef, ElementRef } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { RiccioPboxService } from '@gr-public/riccio-pbox/riccio-pbox.service'

export class SiteRouteInfo {
    siteId?: number;
}

@Injectable()
export class BsbyService {

    //获取所有菜单
    public bsbyMenus: any[]

    //存放公用网站详情
    public siteInfo: SiteRouteInfo

    //应用详情
    public appInfo: any

    //存放共用登录数据
    private userInfo: any

    //网站数据流
    private siteRouteInfoSbj = new Subject<SiteRouteInfo>()
    public siteRouteInfoObj = this.siteRouteInfoSbj.asObservable()

    //用户数据流
    private userInfoSbj = new Subject<any>()
    public userInfoObj = this.userInfoSbj.asObservable()

    //应用数据流
    private appInfoSbj = new Subject<any>()
    public appInfoObj = this.appInfoSbj.asObservable()

    //设置临时缓存网站数据流
    private tempSiteInfoSbj = new Subject<any>()
    public tempSiteInfoObj = this.tempSiteInfoSbj.asObservable()

    constructor(
        private riccioPboxService: RiccioPboxService
    ) {
    }


    /**
     * 网站路由数据流动
     * @param info 
     * @author GR-05
     */
    public setSiteRouteInfo(info: SiteRouteInfo) {
        this.siteRouteInfoSbj.next(info)
        this.siteInfo ? this.siteInfo = Object.assign(this.siteInfo, info) : this.siteInfo = info
    }

    /**
     * 设置用户数据
     * @param info 
     * @author GR-05
     */
    public setUserInfo(info: any) {
        this.userInfoSbj.next(info)
        this.userInfo = JSON.parse(JSON.stringify(info))
    }

    /**
     * 获取存储的用户数据
     * @author GR-05
     */
    public getUserInfo(): any {
        return JSON.parse(JSON.stringify(this.userInfo))
    }

    /**
     * 设置临时缓存网站数据
     * @param info 
     * @author GR-05
     */
    public setTempSiteInfo(info: any) {
        this.tempSiteInfoSbj.next(info)
    }

    /**
     * 设置appinfo
     * @param info 
     */
    public setAppInfo(info: any) {
        this.appInfo = info
        this.appInfoSbj.next(JSON.parse(JSON.stringify(info)))
    }

    /**
     * 处理日期显示
     * @param dateString 
     * @author GR-05
     */
    public resolveDate(dateString: string): string {
        let result = ''
        if (dateString) {
            let tempDate = new Date(dateString.replace(new RegExp(/-/gm), "/"))
            result = tempDate.toLocaleDateString()
        }
        return result
    }

    //验证手机
    public validMobile(mobile: string) {
        return /^1[34578]\d{9}$/.test(mobile)
    }
    //验证邮箱
    public validEmail(email: string) {
        return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(email)
    }
    //验证是否空白
    public validEmpty(val: string) {
        val ? val = val.replace(/(^\s+)|(\s+$)/g, "") : {}
        if (val !== null && val.length !== 0) {
            return true
        } else {
            return false
        }
    }
    //简单验证域名
    public validUrl(url: string, protocol?: boolean) {
        if (protocol) {
            return /^(http|ftp|https):\/\/([\w-]+\.)+([\w]+)$/.test(url)
        } else {
            return /^([\w-]+\.)+([\w]+)$/.test(url)
        }
    }
    public removeEmpty(val: string): string {
        val ? val = val.replace(/(^\s+)|(\s+$)/g, "") : {}
        return val
    }

    /**
    * 显示pbox
    * @param ele 显示位置参考物
    * @param el 点击冒泡参考物
    * @param data pbox 数据
    * @param type pbox 类型
    * @author GR-05
    */
    public showPbox(ele: ElementRef, el: any, data: Array<any>, type: string) {
        let position = ele.nativeElement.getBoundingClientRect()
        this.riccioPboxService.setSubject({
            genre: 'option',
            el: el,
            position: {
                top: position.top,
                left: position.left,
                width: ele.nativeElement.offsetWidth
            },
            type: type,
            data: data
        })
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
}