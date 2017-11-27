import {
    Component,
    OnInit,
    OnDestroy,
    AfterViewChecked,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    Renderer,
    Output,
    EventEmitter
} from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { DragulaService } from 'ng2-dragula/ng2-dragula'

import { animations } from '@gr-public/Animations/index'
import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'
import { RiccioNotificationsService } from '@gr-public/riccio-notifications/riccio-notifications.service'
import { GrSiteService } from '../../../../services/grManagement/grSite.service'

import { RoleOpService } from './role-op.service'
import { AddRoleFc } from './role-op.data'

@Component({
    selector: 'bsby-role-op',
    templateUrl: './role-op.component.html',
    styleUrls: [
        '../../../../../../Public/theme/apps-common/common.scss',
        '../../../../bsbyService.common.scss',
        './role-op.component.scss'
    ],
    animations: [
        animations.rightIn
    ]
})
export class RoleOpComponent implements OnInit, OnDestroy {

    //服务监听
    public roleOpObj: any
    public modalObs: any
    public dragulaObs:any
    //监听添加角色名称组件关闭
    public closeAddRoleObj: any
    //监听点击事件的标示
    public clickFlag: boolean
    //设置角色数据
    public roleOpData: any
    public isShow: boolean
    //点击事件
    public clickHandler: any
    //添加角色表单控件
    public ctrlAddRole: AddRoleFc
    //添加控件表单
    public addRoleForm: FormGroup
    //添加角色表单按钮
    public addRoleFormBtn: {
        text: string;
        status: boolean
    }
    // 提示文字
    public tipName: string

    //选择人员组件数据
    public selectUserData: {
        data: any;
        isShow: boolean;
        nextPage: string;
        page: number;
        type:string;
        roleId?: number;
    }

    //搜索成员参数
    public searchUserParam: {
        app_id: number;
        name: string;
        pagesize: number;
    }

    //添加角色的数据
    public addRoleData: any

    //添加角色响应
    @Output() addRoleEmit = new EventEmitter<any>();
    @Output() delRoleEmit = new EventEmitter<any>();
    //设置成员响应
    @Output() opUserEmit = new EventEmitter<any>();
    //角色排序响应
    @Output() draRoleEmit = new EventEmitter<any>();
    @Output() delServiceEmit = new EventEmitter<any>();

    constructor(
        private roleOpService: RoleOpService,
        private renderer: Renderer,
        private eleRef: ElementRef,
        private builder: FormBuilder,
        private riccioLoadingService: RiccioLoadingService,
        private riccioNotificationsService: RiccioNotificationsService,
        private grSiteService: GrSiteService,
        private dragulaService:DragulaService
    ) {
        this.roleOpData = {}
        this.addRoleData = {}
        this.resolveCtrlAddRole()
        this.resolveAddBtn()
        this.resolveSelectData()
        this.clickFlag = true
        this.tipName = '可以拖动排序'
        this.searchUserParam = {
            app_id: 8,
            name: '',
            pagesize: 20
        }
    }

    ngOnInit() {
        this.resolveAddRoleForm()
        this.closeAddRoleObj = this.roleOpService.closeAddRoleObs.subscribe(res => {
            setTimeout(() => {
                this.resolveClick(true)
            }, 400)
        })
        this.roleOpObj = this.roleOpService.rOpObs.subscribe(data => {
            this.resolveRoleOpObj(data)
            this.resolveClick(true)
        })
        this.dragulaObs = this.dragulaService.drop.subscribe(res=>{
            this.resolveDragula(res)
        })
    }

    ngOnDestroy() {
        this.roleOpObj ? this.roleOpObj.unsubscribe() : {}
        this.closeAddRoleObj ? this.closeAddRoleObj.unsubscribe() : {}
        this.dragulaObs ? this.dragulaObs.unsubscribe() : {}
    }

    /**
     * 处理选择成员数据
     * @author GR-05
     */
    public resolveSelectData() {
        this.selectUserData = {
            data: null,
            isShow: false,
            nextPage: 'loading',
            page: 1,
            type:'role'
        }
    }

    /**
     * 处理拖动
     * @param res 
     * @author GR-05
     */
    public resolveDragula(res){
        switch(res[0]){
            // 角色排序
            case 'roleDrag':    
                this.orderRole()
                break
        }
    }

    /**
     * 处理控件
     * @author GR-05
     */
    public resolveCtrlAddRole() {
        this.ctrlAddRole = {
            name: new FormControl('', [
                Validators.required
            ])
        }
    }

    public resolveAddBtn() {
        this.addRoleFormBtn = {
            text: '添加',
            status: true
        }
    }

    /**
     * 处理表单
     * @author GR-05
     */
    public resolveAddRoleForm() {
        this.addRoleForm = this.builder.group({
            name: this.ctrlAddRole.name
        })
    }

    /**
     * 处理点击事件
     * @param flag 关闭或打开监听
     */
    public resolveClick(flag: boolean) {
        if (flag) {
            this.clickFlag = flag
            this.clickHandler = this.renderer.listen(document, 'click', (e) => {
                if (this.roleOpData['config'].expectClick) {
                    if (!this.roleOpData['config'].expectClick.nativeElement.contains(e.target)) {
                        if (!this.eleRef.nativeElement.contains(e.target)) {
                            this.isShow = false
                            this.clickHandler()
                        }
                    }
                } else {
                    if (!this.eleRef.nativeElement.contains(e.target)) {
                        this.isShow = false
                        this.clickHandler()
                    }
                }
            })
        } else {
            if (this.clickFlag && this.clickHandler) {
                this.clickHandler()
                this.clickFlag = false
            }
        }
    }

    /**
     * 处理监听数据
     * @param data 
     * @author GR-05
     */
    resolveRoleOpObj(data: any) {
        if (data) {
            this.roleOpData = data
            this.roleOpData.data = JSON.parse(JSON.stringify(data.data))
            this.addRoleData.site_id = this.roleOpData.data.site_id
            this.isShow = true
        }
    }

    /**
     * 显示添加角色表单
     * @author  GR-05
     */
    public fnAddRole() {
        this.resolveClick(false)
        this.roleOpService.setAddRole(this.roleOpData.data.site_id)
    }

    public fnAddRoleEmit(data: boolean) {
        if (data) {
            //添加角色成功
            this.addRoleEmit.emit(data)
        }
    }

    /**
     * 删除角色
     * @param role 
     *  @author  GR-05
     */
    public fnDelRole(role: any) {
        this.resolveClick(false)
        this.riccioLoadingService.setLoading({
            message: '删除中'
        })
        this.grSiteService.postSiteRoleDel({
            id: role.id,
            site_id: this.roleOpData.data.site_id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            this.resolveClick(true)
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '已删除',
                    status: 'success'
                })
                this.delRoleEmit.emit(role)
            }
        })
    }

    /**
     * 角色排序
     * @author GR-05
     */
    public orderRole(){
        let roleIds = []
        this.roleOpData.data.roleInfo.forEach(role => {
            roleIds.push(role.id)
        })
        this.riccioLoadingService.setLoading({
            message:'排序中'
        })
        this.grSiteService.postSiteRoleOrder({
            site_id:this.roleOpData.data.site_id,
            ids:roleIds
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.draRoleEmit.emit()
            }
        })
    }

    /**
     * 选择人员组件
     * @author GR-05
     */
    public fnShowSelectUser(type:string,role?: any) {
        this.resolveClick(false)
        this.selectUserData.isShow = true
        this.selectUserData.page = 1
        this.selectUserData.data = []
        this.selectUserData.type = type
        type == 'role' ? this.selectUserData.roleId = role.id : {}
        this.getAllUsers(true)
    }

    /**
     * 获取成员列表
     * @param concat 是否合并已有数据
     * @author GR-05
     */
    public getAllUsers(concat:boolean) {
        this.grSiteService.getSiteUsers({
            ...this.searchUserParam,
            page: this.selectUserData.page
        }).subscribe(res => {
            let data = res['data']['data']
            let total = res['data']['total']
            if (res.status === 1 && data.length > 0) {
                concat ? this.selectUserData.data = this.selectUserData.data.concat(data) : this.selectUserData.data = data
                if (total - this.selectUserData.data.length > 0) {
                    this.selectUserData.nextPage = 'normal'
                } else {
                    this.selectUserData.nextPage = 'empty'
                }
            } else {
                this.selectUserData.nextPage = 'empty'
            }
        })
    }

    /**
     * 选择成员组件搜索事件
     * @author GR-05
    */
    public fnSearchSingleUser(value: string) {
        if (value && value.trim().length !== 0) {
            this.searchUserParam.name = value.trim()
            this.getAllUsers(false)
        }
    }

    /**
     * 
     * 选择成员组件点击加载更多
     * @author GR-05
     */
    public fnMoreUser(flag: boolean) {
        if (flag) {
            this.selectUserData.page += this.selectUserData.page
            this.getAllUsers(true)
        }
    }

    /**
     * 选择人员组件关闭
     * @author GR-05
     */
    public fnSelectUserClose() {
        this.resolveSelectData()
        setTimeout(() => {
            this.resolveClick(true)
        }, 400)
    }

    /**
     * 添加成员
     * @param user 
     * @author GR-05
     */
    public addUser(user: any) {
        this.riccioLoadingService.setLoading({
            message: '添加选中成员中'
        })
        let data
        if(this.selectUserData.type == 'role'){
            data = {
                id: this.selectUserData.roleId,
                site_id: this.roleOpData.data.site_id,
                user_id: user.id,
                type: 1
            }
        }else if(this.selectUserData.type == 'service'){
            data = {
                site_id: this.roleOpData.data.site_id,
                user_id: user.id,
                type: 2
            }
        }
        this.grSiteService.postSiteRoleSet(data).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            this.selectUserData.isShow = false
            this.resolveClick(true)
            if (res.status === 1) {
                this.riccioNotificationsService.setSubject({
                    text: '设置成功',
                    status: 'success'
                })
                this.opUserEmit.emit()
            }
        })
    }

    /**
     * 删除客服
     * @author GR-05
     */
    public fnDelService(){
        this.resolveClick(false)
        this.riccioLoadingService.setLoading({
            message:'删除客服中'
        })
        this.grSiteService.postSiteRoleSet({
            site_id:this.roleOpData.data.site_id,
            user_id:null,
            type:2
        }).subscribe(res=>{
            this.riccioLoadingService.closeLoading()
            if(res.status === 1){
                this.delServiceEmit.emit()
            }
        })
    }
}