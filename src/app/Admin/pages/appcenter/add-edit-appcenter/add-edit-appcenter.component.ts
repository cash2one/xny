import { Component, OnInit,Output,EventEmitter,OnDestroy } from '@angular/core';

import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { environment } from '../../../../../environments/environment'

import { AddEditData } from './AddEditData'
import { FileUploader } from 'ng2-file-upload'
import { AdminService } from '../../../Admin.service'
import { AppService } from '../../../../app.service'
import { AddEditAppcenterService } from './add-edit-appcenter.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { RiccioLoadingService } from '../../../../Public/riccio-loading/riccio-loading.service'
import { GrAppcenterService } from '../../../services'
import { AppcenterService } from '../appcenter.service'

@Component({
  selector: 'app-add-edit-appcenter',
  templateUrl: './add-edit-appcenter.component.html',
  styleUrls: ['../../../Admin.component.scss', './add-edit-appcenter.component.scss']
})
export class AddEditAppcenterComponent implements OnInit,OnDestroy {
  @Output() addEditEmit:EventEmitter<boolean> = new EventEmitter<boolean>()

  public AppCenterShow: Array<any>;
  public AddEditData: any;
  public ShowText: any;

  //是否有缩略图
  public isThumb: boolean
  public isThumbIcon: boolean
  //fileupload 组件配置
  public uploader: FileUploader
  //缩略图图标 上传配置
  public uploaderIcon: FileUploader
  //缩略图预览
  public showThumb: any
  public showThumbIcon: any
  public uedShow:boolean
  //ueditor配置
  public ueditorConf:any

  constructor(
    public addEditAppcenterService: AddEditAppcenterService,
    public appcenterService: AppcenterService,
    public router: Router,
    public grAppcenterService: GrAppcenterService,
    public riccioNotificationsService: RiccioNotificationsService,
    private riccioLoadingService: RiccioLoadingService,
    private adminService: AdminService,
    private appService: AppService
  ) {
    this.AppCenterShow = new AddEditData().showData;
    this.AddEditData = new AddEditData().data;
    this.ueditorConf = this.adminService.uedConf()
    this.ShowText = {
      title: '添加应用',
      btn: '添加',
      type: 'add',
      status: true
    }
    this.showThumb = environment.production ? '/home/assets/img/apps_defulet.jpg' : '/assets/img/apps_defulet.jpg'
    this.showThumbIcon = environment.production ? '/home/assets/img/apps_defulet.jpg' : '/assets/img/apps_defulet.jpg'
  }

  ngOnInit() {
    this.FnInit()
    this.resetUploader()
    setTimeout(()=>{
      this.uedShow = true
    },100)
  }

  ngOnDestroy(){
    this.uedShow = false
  }

  /**
   * 切换按钮活动状态
   * @param type 0 禁用  1启用
   */
  public changeBtn(type: number) {
    if (type === 0) {
      this.ShowText.btn = '保存中...'
      this.ShowText.status = false
    } else if (type === 1) {
      this.ShowText.btn = '保存'
      this.ShowText.status = true
    } else if (type === 2) {
      this.ShowText.btn = '上传缩略图中...'
      this.ShowText.status = false
    }
  }

  //组件创建完成后判断是添加还是编辑从而切换不同数据
  public FnInit(): void {

    let symbol = this.addEditAppcenterService.symbol
    if (symbol === 'add') {
      this.ShowText = {
        title: '添加应用',
        btn: '保存',
        type: 'add',
        status: true
      }
    }
    else if (symbol === 'edit') {
      this.ShowText = {
        title: '编辑应用',
        btn: '保存',
        type: 'edit',
        status: true
      }
      let data = this.addEditAppcenterService.data;
      this.AddEditData = { ...data }
      this.showThumb = window['fileurl'] + this.AddEditData['thumb']
      this.showThumbIcon = window['fileurl'] + this.AddEditData['thumb_icon']
    }
  }

  //点击保存按钮和添加按钮时的事件
  public FnAddOrEdit(): void {
    let type = this.ShowText.type;
    this.addEditAppcenterService.setSubject(this.AddEditData)
    if (type === 'add') {
      let bool = true;

      switch ("") {
        case this.AddEditData['model']:
          this.AppCenterShow[0].danger = true;
          bool = false
        case this.AddEditData['name']:
          this.AppCenterShow[1].danger = true;
          bool = false

        default: break;
      }

      if (bool === true) {
        this.changeBtn(0)
        this.grAppcenterService.postAppAdd(this.AddEditData)
          .subscribe(res => {
            res.status === 1
              ? (() => {
                this.riccioNotificationsService.setSubject({
                  status: 'success',
                  text: '添加成功'
                })
                this.afterSuccess()
              })()
              : (() => {
                this.riccioNotificationsService.setSubject({
                  status: 'danger',
                  text: '添加失败'
                })
                this.changeBtn(1)
              })()
          })
      }

    }
    else if (type === 'edit') {
      let bool = true;

      switch ("") {
        case this.AddEditData['model']:
          this.AppCenterShow[0].danger = true;
          bool = false
        case this.AddEditData['name']:
          this.AppCenterShow[1].danger = true;
          bool = false

        default: break;
      }
      bool ? this.changeBtn(0) : {}
      this.grAppcenterService.postAppEdit(this.AddEditData)
        .subscribe(res => {
          res.status === 1
            ? (() => {
              this.riccioNotificationsService.setSubject({
                status: 'success',
                text: '修改成功'
              })
              this.afterSuccess()
            })()
            : (() => {
              this.changeBtn(1)
              this.riccioNotificationsService.setSubject({
                status: 'danger',
                text: '修改失败'
              })
            })()
        })
    }
  }

  public afterSuccess() {
    this.changeBtn(1)
    this.addEditAppcenterService.okNotif()
  }


  public Close(): void {
  }

  /**
   * 加载缩略图失败
   * @author GR-05
   */
  public noImg(type: string) {
    if (type == 'thumb') {
      this.isThumb = false
      this.showThumb = environment.production ? '/home/assets/img/apps_defulet.jpg' : '/assets/img/apps_defulet.jpg'
    } else if (type == 'icon') {
      this.isThumbIcon = false
      this.showThumbIcon = environment.production ? '/home/assets/img/apps_defulet.jpg' : '/assets/img/apps_defulet.jpg'
    }
  }

  /**
   * 重置upload
   * @author GR-05
   */
  public resetUploader() {
    this.uploader = new FileUploader({
      url: this.adminService.getUploadUrl().appThumb + '?type=thumb&model=' + this.AddEditData['model'],
      method: "POST",
      itemAlias: "file"
    })
    this.uploaderIcon = new FileUploader({
      url: this.adminService.getUploadUrl().appThumb + '?type=thumb_icon&model=' + this.AddEditData['model'],
      method: "POST",
      itemAlias: "file"
    })
  }

  /**
   * 控件变化监测
   * @param value
   * @author GR-05 
   */
  public changedThumb(value: any, type: string): void {
    if (type === 'thumb') {
      if (this.uploader.queue.length > 0) {
        this.uploader.queue.length != 1 ? this.uploader.queue[0].remove() : {}
        this.isThumb = true
        this.uploadThumb(type)
      }
    } else if (type === 'icon') {
      if (this.uploaderIcon.queue.length > 0) {
        this.uploaderIcon.queue.length != 1 ? this.uploaderIcon.queue[0].remove() : {}
        this.isThumbIcon = true
        this.uploadThumb(type)
      }
    }

  }

  /**
   * 上传应用logo
   * @author GR-05
   */
  public uploadThumb(type: string) {
    if (this.AddEditData['model'] && this.adminService.validEmpty(this.AddEditData['model'])) {
      this.riccioLoadingService.setLoading({
        message: '上传中'
      })
      if (type == 'thumb') {
        this.uploader.queue[0].onSuccess = (response, status, headers) => {
          if (status == 200) {
            let tempRes = JSON.parse(response)
            this.riccioLoadingService.closeLoading()
            if (tempRes.status === 1) {
              this.AddEditData['thumb'] = tempRes.data[0]['filepath']
              this.showThumb = window['fileurl'] + tempRes.data[0]['filepath']
            } else if (tempRes.status === 0) {
              this.riccioNotificationsService.setSubject({ text: tempRes.message, status: 'danger' })
            }
            this.resetUploader()
          } else {
            this.resetUploader()
          }
        }
        this.uploader.queue[0].upload()
      } else if (type === 'icon') {
        this.uploaderIcon.queue[0].onSuccess = (response, status, headers) => {
          if (status == 200) {
            let tempRes = JSON.parse(response)
            this.riccioLoadingService.closeLoading()
            if (tempRes.status === 1) {
              this.AddEditData['thumb_icon'] = tempRes.data[0]['filepath']
              this.showThumbIcon = window['fileurl'] + tempRes.data[0]['filepath']
            } else if (tempRes.status === 0) {
              this.riccioNotificationsService.setSubject({ text: tempRes.message, status: 'danger' })
            }
            this.resetUploader()
          } else {
            this.resetUploader()
          }
        }
        this.uploaderIcon.queue[0].upload()
      }
    }else{
      this.riccioNotificationsService.setSubject({
        text:'必须填写应用标识',
        status:'danger'
      })
    }
  }

  /**
   * 取消缩略图选择
   * @author GR-05
   */
  public cancleThumb() {
    this.resetUploader()
    this.isThumb = false
    this.showThumb = ''
  }
}
