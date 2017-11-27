import { Injectable, ViewContainerRef, ElementRef } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { MsgCommon,PageData } from './message.data'
import { GrAccountsService } from '../../services/grAccounts/grAccounts.service'

@Injectable()
export class MessageService {

    //信息数据流
    private msgInfoSbj:Subject<MsgCommon> = new Subject<MsgCommon>()
    public msgInfoObj:Observable<MsgCommon> = this.msgInfoSbj.asObservable()

    private msgRequestSbj:Subject<PageData> = new Subject<PageData>()
    public msgRequestObj:Observable<PageData> = this.msgRequestSbj.asObservable()

    public msgInfo:MsgCommon

    constructor(
        private grAccountsService: GrAccountsService
    ) {
        this.msgInfo = new MsgCommon()
    }

    public setMsgInfo(msgCommon:MsgCommon){
        this.msgInfoSbj.next(msgCommon)
    }

    public emitMsgRequest(pageData:PageData){
        this.msgRequestSbj.next(pageData)
    }
}