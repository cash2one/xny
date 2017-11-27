import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { SettingData } from './settingData'

@Injectable()
export class MemberService {

    //临时用户数据
    private userInfo: SettingData

    private userInfoSbj: Subject<any> = new Subject<any>()
    public userInfoObj: Observable<any> = this.userInfoSbj.asObservable()

    private RXJS = new Subject<any>();

    constructor() {
        this.userInfo = new SettingData()
    }

    //传入数据
    public setSubject(mission: any) {
        this.RXJS.next(mission);
    }
    public getSubject(): Observable<any> {
        return this.RXJS.asObservable()
    }

    /**
     * 修改缓存用户数据
     * @param data 
     */
    public setTempUserInfo(data:any){
        data = JSON.parse(JSON.stringify(data))
        Object.keys(this.userInfo).forEach( key => {
            this.userInfo[key] = data[key]
        }) 
        this.userInfoSbj.next(JSON.parse(JSON.stringify(this.userInfo)))
    }

    /**
     * 获取缓存用户数据
     */
    public getTempUserInfo():SettingData{
        return JSON.parse(JSON.stringify(this.userInfo))
    }

}
