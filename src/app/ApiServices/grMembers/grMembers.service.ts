import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AppService } from '../../app.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'

import { HttpHeadData } from '../../HttpURL'
import { environment } from '../../../environments/environment'

class MockUserData {
    data = {
        company_userinfo: {
            admin_id: 7,
            admin_phone: "132****6100",
            email: "11",
            employeecode: null,
            id: 1,
            is_admin: 0,
            is_auth: 1,
            logo: "/uploads/grsaas/logo/logo.jpg",
            logo_login: "/uploads/grsaas/logo/logo_login.png",
            name: "深圳市国人在线信息技术有限公司",
            phone: "12312312312",
            positionname: null,
            real_name: "key1",
            sex: 1,
            status: 1
        },
        is_administrator: false,
        user_info: {
            email: "key@qq.com",
            mobile: "18603040072",
            name: "key",
            real_name: "管理员",
            qq: null,
            sex: 1,
            status: 1,
            thumb: "/uploads/grsaas/avatar/EgyMhYSP-biH1-daC4-G4KctYE7.jpg"
        }
    }

}

@Injectable()
export class GrMembersService implements Resolve<any>{

    // 请求地址
    private httpURL = new HttpHeadData().SAASURL;
    private getMyCompanyURL = this.httpURL + "api/member/my_company"; // 获取当前用户所在的企业列表
    private getCurrentUserURL = this.httpURL + "api/member/current_user"; // 获取当前登录信息
    private getCurrentMenuURL = this.httpURL + "api/member/my_menu"; //企业顶部下拉菜单

    private postMemberCompanyURL = this.httpURL + "api/member/company"; // 选择企业
    private postMemberEditURL = this.httpURL + "api/member/edit"; // 修改个人信息
    private postMemberPasswordURL = this.httpURL + "api/member/password"; // 修改密码
    private postMemberUploadAvatarURL = this.httpURL + "upload_avatar"; // 用户上传头像

    constructor(
        private http: Http,
        private riccioNotificationsService: RiccioNotificationsService,
        private riccioLoadingService: RiccioLoadingService,
        private appService: AppService
    ) { }

    /**
     * @author GR-03
     * @copyright [resolve路由守卫，只有请求到当前用户所在的企业列表才可以进入企业控制台]
     * @param     [param]
     * @return    [return]
     * @check     GR-05                    GR-03
     * @param     {ActivatedRouteSnapshot}
     * @param     {RouterStateSnapshot}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        // if (environment.production) {
        return this.http.get(this.getCurrentUserURL)
            .toPromise()
            .then(res => {
                return res.json()
            })
            .catch(res => this.appService.handleError(res))

        // } else {
        //   return Promise.resolve(new MockUserData);
        // }
    }

    /**
     * @author GR-03
     * @copyright [获取当前用户所在的企业列表]
     * @param     [param]
     * @return    [return]
     * @return    {Observable<any>} [description]
     */
    public getMyCompany(): Observable<any> {
        return this.appService.interfaceJudg('get', this.getMyCompanyURL)
    }

    /**
     * 获取当前企业对应的下拉菜单数据
     * @author GR-05
     */
    public getCurrentMenu(): Observable<any> {
        return this.appService.interfaceJudg('get', this.getCurrentMenuURL)
    }


    /**
     * @author GR-03
     * @copyright 获取用户信息，同时也是验证用户是否登陆的证据！
     * @param     [param]
     * @return    [return]
     * @check     GR-05             GR-03
     * @return    {Observable<any>} [description]
     */
    public getCurrentUser(): Observable<any> {
        return this.http.get(this.getCurrentUserURL)
            .timeout(15000)
            .map(res => this.extractData(res))
            .catch(err => this.handleError(err))
    }

    /**
     * @author GR-03
     * @copyright 选择企业的接口
     * @param     [param]
     * @return    [return]
     * @check     GR-05             GR-03
     * @param     {any}             obj   [description]
     * @return    {Observable<any>}       [description]
     */
    public postMemberCompany(obj: any): Observable<any> {
        return this.appService.interfaceJudg('post', this.postMemberCompanyURL, obj)
    }

    /**
     * @author GR-03
     * @copyright 修改密码
     * @param     [param]
     * @return    [return]
     * @check     GR-05             GR-03
     * @param     {any}             obj   [description]
     * @return    {Observable<any>}       [description]
     */
    public postMemberEdit(obj: any): Observable<any> {
        return this.appService.interfaceJudg('post', this.postMemberEditURL, obj)
    }

    /**
     * @author GR-03
     * @copyright 修改密码
     * @param     [param]
     * @return    [return]
     * @check     GR-05             GR-03
     * @param     {any}             obj   [description]
     * @return    {Observable<any>}       [description]
     */
    public postMemberPassword(obj: any): Observable<any> {
        return this.appService.interfaceJudg('post', this.postMemberPasswordURL, obj)
    }

    /**
     * @author GR-03
     * @copyright 上传头像
     * @param     [param]
     * @return    [return]
     * @param     {any}             obj [description]
     * @return    {Observable<any>}     [description]
     */
    public postMemberUploadAvatar(obj: any): Observable<any> {
        return this.appService.interfaceJudg('post', this.postMemberUploadAvatarURL, obj)
    }


    /*
     *
     *成功的回调方法
     *
     *
     */
    public extractData(res: Response) {
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
        if (error.name === 'TimeoutError') {
            //超时处理
            this.riccioNotificationsService.setSubject({
                text: '网络超时或出错,请确认网络是否连通',
                status: 'danger'
            })
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

            return Observable.throw(errMsg)
        }
    }
}
