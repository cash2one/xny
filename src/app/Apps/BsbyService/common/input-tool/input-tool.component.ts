import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription'
import { FileUploader } from 'ng2-file-upload'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'

import { InputToolService } from './input-tool.service'

interface IShowFileList{
    url: string
    name:string
    isImg:boolean
}

@Component({
    selector: 'app-bsby-service-input-tool',
    templateUrl: './input-tool.component.html',
    styleUrls: ['./input-tool.component.scss']
})
export class InputToolComponent implements OnInit,OnChanges,OnDestroy {
    //附件上传控件 
    @ViewChild('fileUpload') fileUpload: ElementRef

    //上传url
    @Input() uploadUrl:string
    //上传成功通知
    @Output() uploadEmit:EventEmitter<Array<IShowFileList>> = new EventEmitter<Array<IShowFileList>>()
 
    inputTool$:Subscription
    //fileupload 配置对象
    fileUploader: FileUploader
    //已上传文件列表
    filesList: Array<IShowFileList>

    constructor(
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private inputToolService:InputToolService
    ) {
        this.filesList = []
    }

    ngOnInit() {
        this.resetFileUploader()
        this.inputTool$ = this.inputToolService.fileDelObj.subscribe(res => {
            this.resetFileUploader()
            this.filesList = []
        })
    }

    ngOnChanges(change:SimpleChanges){
        if(change.uploadUrl){
            this.fileUploader ? this.fileUploader.options.url = change.uploadUrl.currentValue : {}
        }
    }

    ngOnDestroy(){
        this.inputTool$ ? this.inputTool$.unsubscribe() : {}
    }

    /**
     * 重置文件上传对象
     * @author GR-05
     */
    public resetFileUploader() {
        this.fileUploader = new FileUploader({
            url: this.uploadUrl,
            method: "POST",
            itemAlias: "file"
        })
        this.fileUploader.onAfterAddingFile = (item => {
            item.withCredentials = false
        })
    }

    /**
     * 文件上传成功回调
     * @param response 
     * @param status 
     * @author GR-05
     */
    fileUploadSuccess(response, status) {
        if (status == 200) {
            let tempRes = JSON.parse(response)
            this.riccioLoadingService.closeLoading()
            if (tempRes.status === 1) {
                this.filesList.push({
                    name: tempRes.data['original'],
                    url: tempRes.data['url'],
                    isImg:false
                })
                this.filesList.forEach(file=>{
                    let lastPointInx = file.url.lastIndexOf('.')
                    let fileType = file.url.slice(lastPointInx + 1,file.url.length)
                    file.isImg = this.resolveType(fileType)
                })
                this.uploadEmit.emit(this.filesList)
            } else if (tempRes.status === 0) {
                this.riccioNotificationsService.setSubject({ text: tempRes.message, status: 'danger' })
            }
            this.resetFileUploader()
        } else {
            this.resetFileUploader()
        }
    }

    /**
     * 判断文件类型
     * @param type 
     * @author GR-05
     */
    resolveType(type:string){
        return type == 'jpg' || type == 'jpeg' || type == 'png' || type == 'gif'
    }

    /**
     * 触发文件上传控件
     * @author GR-05
     */
    fnShowUpload() {
        this.fileUpload.nativeElement.click()
    }

    /**
     * 文件上传控件变化
     * @author GR-05
     */
    fnFileChnage() {
        if (this.fileUploader.queue.length > 0) {
            this.riccioLoadingService.setLoading({
                message: '文件上传中'
            })
            this.fileUploader.queue[0].onSuccess = (response, status) => {
                this.fileUploadSuccess(response, status)
            }
            this.fileUploader.queue[0].upload()
        }
    }

    /**
     * 删除
     * @param index 
     * @author GR-05 
     */
    del(index:number){
        this.filesList.splice(index,1)
        let files = []
        this.filesList.forEach(file=>{
            files.push(file.url)
        })
        this.uploadEmit.emit(files)
        this.fileUpload.nativeElement.value = ''
    }

    /**
     * 下载文件
     * @param url  
     * @author GR-05 
     */
    download(url: string) {
        window.open(window['setting']['fileurl'] + url)
    }

}
