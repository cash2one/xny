import { Component, OnInit, OnDestroy} from '@angular/core'

import { animations } from '../../../../Public/Animations/index'

import { UserOpService } from './user-op.service'
import { UserOp } from './user-op.data'

import { RiccioModalService } from '../../../../Public/riccio-modal/riccio-modal.service'
import { RiccioNotificationsService } from '../../../../Public/riccio-notifications/riccio-notifications.service'
import { AdminService } from '../../../Admin.service'
import { GrUserService } from '../../../services/grUser/grUser.service'

@Component({
  selector: 'app-user-op',
  templateUrl: './user-op.component.html',
  styleUrls: [
    '../../../Admin.component.scss', 
    '../../page.common.scss',
    // './user-main.component.scss',
    './user-op.component.scss'
  ],
  animations: [
    animations.flyTop
  ]
})
export class UserOpComponent implements OnInit,OnDestroy {
    public opType:string
    public uaObs:any
    // 添加用户的模型
    public userAddData:any
    // 添加用户的验证
    public userAddValid:any
    //按钮状态
    public addBtn:any
    constructor(
        public userOpService:UserOpService,
        public riccioModalService:RiccioModalService,
        public riccioNotificationsService:RiccioNotificationsService,
        public adminService:AdminService,
        public grUserService:GrUserService
    ){
        this.userAddData = new UserOp().userAddData
        this.userAddValid = new UserOp().userAddValid
        this.addBtn = {
            text:'保存',
            status:1
        }
    }

    ngOnInit(){
        this.uaObs = this.userOpService.uaObs.subscribe(v=>{
            if(v.type == 'add'){
                this.opType = 'add'
                let modalData: any = {
                    header: '添加员工',
                    size: 600,
                    noBtn: true
                }
                this.userAddData = new UserOp().userAddData
                this.riccioModalService.setSubject(modalData)
            }else if(v.type == 'edit'){
                this.opType = 'edit'
                let modalData: any = {
                    header: '编辑员工',
                    size: 600,
                    noBtn: true
                }
                this.resolveEdit(v.data)
                this.riccioModalService.setSubject(modalData)
            }
        })
    }

    ngOnDestroy(){
        this.uaObs.unsubscribe()
    }

    /**
     * 添加用户
     * @author GR-05
     */
    public fnOpUser(){
        if(this.addBtn.status === 0){
            return
        }
        this.beforeOp()
        let isValid:boolean = false
        isValid = Object.keys(this.userAddValid).every(key=>{
            return this.userAddValid[key] === true
        })
        if(isValid){
            if(this.opType === 'add'){
                this.addBtn = {
                    text:'添加中...',
                    status:0
                }
                this.grUserService.postUserAdd(this.userAddData).subscribe(res=>{
                    this.afterOp(res)
                },error=>{
                    this.addBtn = {
                        text:'添加',
                        status:1
                    }
                })
            }else if(this.opType === 'edit'){
                this.addBtn = {
                    text:'更新中...',
                    status:0
                }
                this.grUserService.postUserEdit(this.userAddData).subscribe(res=>{
                    this.afterOp(res)
                },error=>{
                    this.addBtn = {
                        text:'添加',
                        status:1
                    }
                })
            }
        }
    }

    /**
     * 编辑员工赋值
     * @param user 单个员工数据
     */
    public resolveEdit(user:any){
        this.userAddData = {
            id:user.id,
            name:user.name,
            password:null,
            email:user.email,
            real_name:user.real_name,
            thumb:user.thumb,
            mobile:user.mobile,
            sex:user.sex,
            status:user.status
        }
        this.userAddValid = {
            name:true,
            password:true,
            email:true,
            real_name:true,
            thumb:true,
            mobile:true,
            sex:true,
            status:true
        }
        this.addBtn = {
            text:'保存',
            status:1
        }
    }

    /**
     * 请求操作之前的数据处理
     */
    public beforeOp(){
        if(!this.adminService.validMobile(this.userAddData.mobile)){
            this.userAddValid.mobile = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'请输入正确的手机号'
            })
        }else{ this.userAddValid.mobile = true }

        if(!this.adminService.validEmail(this.userAddData.email)){
            this.userAddValid.email = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'请输入正确的邮箱'
            })
        }else{ this.userAddValid.email= true }

        if(!this.adminService.validEmpty(this.userAddData.name)){
            this.userAddValid.name = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'用户名请不为空'
            })
        }else{ this.userAddValid.name = true }

        if(this.opType === 'add' && !this.adminService.validEmpty(this.userAddData.password)){
            this.userAddValid.password = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'密码请不为空'
            })
        }else{ this.userAddValid.password = true }

        if(this.opType === 'add' && this.userAddData.password && this.adminService.removeEmpty(this.userAddData.password).length < 6){
            this.userAddValid.password = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'密码个数不少于6位'
            })
        }else{ this.userAddValid.password = true }

        if(this.opType === 'edit' && this.userAddData.password && this.adminService.removeEmpty(this.userAddData.password).length < 6 && this.adminService.removeEmpty(this.userAddData.password).length !== 0){
            this.userAddValid.password = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'密码个数不少于6位'
            })
        }else { this.userAddValid.password = true } 

        if(this.opType === 'edit' && (this.userAddData.password == null || this.adminService.removeEmpty(this.userAddData.password).length == 0)){
            delete this.userAddData.password
        }

        if(!this.adminService.validEmpty(this.userAddData.real_name)){
            this.userAddValid.real_name = false
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text:'姓名请不为空'
            })
        }else {  this.userAddValid.real_name = true }
    }

    /**
     * 请求操作后的数据处理
     * @param res 响应体 
     */
    public afterOp(res:any){
        this.addBtn = {
            text:'保存',
            status:1
        }
        if(res.status === 1){
            this.riccioNotificationsService.setSubject({
                status:'success',
                text:this.opType === 'add'?'添加成功':'修改成功'
            })
            this.userOpService.emitUserOp(true)
        }else{
            this.riccioNotificationsService.setSubject({
                status:'danger',
                text: res.message
            })
            this.userOpService.emitUserOp(false)
        }
        this.riccioModalService.setSubject({})
    }
}