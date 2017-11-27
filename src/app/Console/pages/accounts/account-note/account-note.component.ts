import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter
} from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'
import { Subscription } from 'rxjs/Subscription'

import { NoteService } from './account-note.service'
import { NoteData,PostData } from './account-note.data'
import { GrAccountsService } from '../../../services/grAccounts/grAccounts.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'

const smallBig = trigger('smallBig', [
    state('in', style({ transform: 'translateY(0) scale(1)' })),
    transition('void => *', [
        animate(800, keyframes([
            style({ opacity: 0.7, transform: 'scale(0.8)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1.1)', offset: 0.2 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 })
        ]))
    ]),
    transition('* => void', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1)', offset: 0.2 }),
            style({ opacity: 0, transform: 'scale(0.8)', offset: 0.5 })
        ]))
    ])
])

@Component({
    selector: 'conosle-note',
    templateUrl: './account-note.component.html',
    styleUrls: [
        '../../../../Public/theme/common/common.scss',
        '../../../Console.component.scss',
        './account-note.component.scss'
    ],
    animations: [smallBig]
})
export class NoteComponent implements OnInit, OnDestroy {

    //服务监听
    public noteObj:Subscription
    public noteData:NoteData
    public postData:PostData
    //显示与否
    public isShow:boolean

    public btn:{
        text:string;
        status:boolean
    }

    noNote:boolean

    @Output() noteEmit:EventEmitter<any> = new EventEmitter<any>()

    constructor(
        public noteService:NoteService,
        public grAccountsService:GrAccountsService,
        public riccioLoadingService:RiccioLoadingService,
        private riccioNotificationsService:RiccioNotificationsService
    ){
        this.btn = {
            text:'保存',
            status:true
        }
        this.noNote = false
    }

    ngOnInit(){
        this.noteObj = this.noteService.noteObs.subscribe(res=>{
            this.resolveNoteObs(res)
        })
    }

    ngOnDestroy(){}

    /**
     * 处理服务监听
     * @param res 
     * @author GR-05
     */
    resolveNoteObs(res:NoteData){
        this.noteData = res
        this.postData = {
            id:res.id,
            note:res.note
        }
        
        this.isShow = true
    }

    /**
     * 关闭
     * @author GR-05
     */
    public fnClose() {
        this.isShow = false
    }

    /**
     * 修改备注
    *  @author GR-05
     */
    public fnMark(){
        if(!this.postData.note || this.postData.note.trim() == ''){
            this.riccioNotificationsService.setSubject({
                text:'请输入备注',
                status:'danger'
            })
            this.noNote = true
        }else{
            this.btn = {
                text:'保存中...',
                status:false
            }
            this.grAccountsService.postAccountNote(this.postData).subscribe(res=>{
                this.btn = {
                    text:'保存',
                    status:true
                }
                if(res.status == 1){
                    this.noteEmit.emit(this.postData.note)
                    this.riccioNotificationsService.setSubject({
                        text:'备注成功',
                        status:'success'
                    })
                    this.fnClose()
                }
            })
        }
    }
}