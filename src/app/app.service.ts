import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser'

import { environment } from '../environments/environment'
import { IconfontUrl } from './app.iconfontUrl'

import { RiccioNotificationsService } from './Public/riccio-notifications/riccio-notifications.service'
import { RiccioLoadingService } from './Public/riccio-loading/riccio-loading.service'
import { RiccioTopLoadingService } from './Public/riccio-top-loading/riccio-top-loading.service'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/observable/throw';

@Injectable()
export class AppService {

    public iconUrls: IconfontUrl

    constructor(
        private http: Http,
        private router: Router,
        private sanitizer: DomSanitizer,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioLoadingService: RiccioLoadingService,
        private riccioTopLoadingService: RiccioTopLoadingService
    ) {
        this.resolveIconUrl()
    }


    /**
     * @author GR-03
     * @copyright 存放本地数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {string}    key   [description]
     * @param     {any}       value [description]
     */
    public setItemLocal(
        key: string,
        value: any
    ) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    /**
     * @author GR-03
     * @copyright 获取本地数据
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {string}    key   [description]
     * @return    {any}             [description]
     */
    public getItemLocal(
        key: string
    ): any {
        let getItem = localStorage.getItem(key)
        let obj = {}
        if (getItem != null) {
            obj = JSON.parse(getItem)
        }
        return obj
    }

    /**
     * @author GR-03
     * @copyright 接口判断是get还是post
     * @check     GR-05             GR-03
     * @param     {string='get'}
     * @param     {string}
     * @param     {any={}}
     * @return    {Observable<any>}
     */
    public interfaceJudg(
        type: string = 'get',
        url: string,
        data: any = {},
        timeout: number = 30000,
    ): Observable<any> {

        if (type === 'get') {
            let params: URLSearchParams = new URLSearchParams()
            let objectKeys = Object.keys(data);
            if (objectKeys.length > 0) {
                objectKeys.forEach(e => {
                    params.set(e, data[e].toString())
                })
            }
            return this.http.get(url, { search: params })
                .timeout(timeout)
                .map(res => this.extractData(res))
                .catch(err => this.handleError(err))
        } else if (type === 'post') {
            let headers = new Headers({ 'Content-Type': 'application/json' })
            let options = new RequestOptions({ headers: headers })
            return this.http.post(url, data, options)
                .timeout(timeout)
                .map(res => this.extractData(res))
                .catch(err => this.handleError(err))
        }
    }

    /**
     * 处理安全性
     * @param url
     * @author GR-05
     */
    public safeUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }

    /**
     * 处理一下文件路径
     * @param fileString 原文件路径
     * @author GR-05
     */
    public resolveFileString(fileString: string): string {
        return window['setting']['fileurl'] + fileString
    }

    /**
     * 获取图标链接
     */
    public resolveIconUrl() {
        if (environment.production) {

            this.iconUrls = {
                admin: this.safeUrl(`${environment.iconUrl}home/iconfont/admin/iconfont.css?v=${window['setting']['statics_version']}`),
                bsby: this.safeUrl(`${environment.iconUrl}home/iconfont/bsby/iconfont.css?v=${window['setting']['statics_version']}`),
                ruanwen: this.safeUrl(`${environment.iconUrl}home/iconfont/ruanwen/iconfont.css?v=${window['setting']['statics_version']}`),
                common: this.safeUrl(`${environment.iconUrl}home/iconfont/common/iconfont.css?v=${window['setting']['statics_version']}`),
                console: this.safeUrl(`${environment.iconUrl}home/iconfont/console/iconfont.css?v=${window['setting']['statics_version']}`),
                gongdan: this.safeUrl(`${environment.iconUrl}home/iconfont/gongdan/iconfont.css?v=${window['setting']['statics_version']}`)
            }
        } else {
            this.iconUrls = {
                admin: this.safeUrl(`${environment.iconUrl}/iconfont/admin/iconfont.css?v=${window['setting']['statics_version']}`),
                bsby: this.safeUrl(`${environment.iconUrl}/iconfont/bsby/iconfont.css?v=${window['setting']['statics_version']}`),
                ruanwen: this.safeUrl(`${environment.iconUrl}/iconfont/ruanwen/iconfont.css?v=${window['setting']['statics_version']}`),
                common: this.safeUrl(`${environment.iconUrl}/iconfont/common/iconfont.css?v=${window['setting']['statics_version']}`),
                console: this.safeUrl(`${environment.iconUrl}/iconfont/console/iconfont.css?v=${window['setting']['statics_version']}`),
                gongdan: this.safeUrl(`${environment.iconUrl}home/iconfont/gongdan/iconfont.css?v=${window['setting']['statics_version']}`)
            }
        }
    }

    /*
    *
    *成功的回调方法
    *
    *
    */
    public extractData(res: Response) {
        // console.log(res)
        let body = res.json();
        if (body.status === 0) {
            this.riccioNotificationsService.setSubject({ text: body.message, status: 'danger' })
        }
        return body || [];
    }

    /*
    *
    *失败的回调方法
    *
    *
    */
    public handleError(error: Response | any) {
        this.riccioLoadingService.closeLoading()
        if (error.name === 'TimeoutError') {
            //超时处理
            this.riccioNotificationsService.setSubject({
                text: '网络超时或出错,请确认网络是否连通',
                status: 'danger'
            })
            // this.httpStatusCode(error.status)
            return Observable.throw(error);
        } else {
            let errMsg: string;
            if (error instanceof Response) {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            } else {
                errMsg = error.message ? error.message : error.toString();
            }

            this.httpStatusCode(error.status)
            return Observable.throw(errMsg)
        }
    }

    /**
     * @author GR-03
     * @copyright 根据http返回的状态码进行操作
     * @param     [param]
     * @return    [return]
     * @check     GR-05       GR-03
     * @param     {number}    code  [description]
     */
    private httpStatusCode(code: number): void {
        switch (code) {
            case 401:          //未登录授权
                // this.riccioNotificationsService.setSubject({ text: '您还没有登录,请登录', status: 'danger' })
                environment.production ? this.router.navigateByUrl('login') : {}
                break;

            case 500:          //500错误
                this.riccioNotificationsService.setSubject({ text: '网络请求错误', status: 'danger' })
                // this.router.navigateByUrl('login')
                break;

            default: break;
        }
    }
}
