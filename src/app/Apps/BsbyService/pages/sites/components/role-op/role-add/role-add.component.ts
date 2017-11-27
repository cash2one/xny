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

import { animations } from '@gr-public/Animations/index'
import { GrSiteService } from '../../../../../services/grManagement/grSite.service'

import { AddRoleFc,AddRolePostData } from '../role-op.data'
import { RoleOpService } from '../role-op.service'

@Component({
    selector: 'bsby-role-add',
    templateUrl: './role-add.component.html',
    styleUrls: [
        '../../../../../../../Public/theme/apps-common/common.scss',
        '../../../../../bsbyService.common.scss',
        './role-add.component.scss'
    ],
    animations: [
        animations.flyIn
    ]
})
export class RoleAddComponent implements OnInit, OnDestroy {

    //服务监听
    public roleAddObj: any
    public isShow: boolean
    //添加角色表单控件
    public ctrlAddRole: AddRoleFc
    //添加控件表单
    public addRoleForm: FormGroup
    //添加角色表单按钮
    public addRoleFormBtn: {
        text: string;
        status: boolean
    }

    //添加角色的数据
    public addRoleData: AddRolePostData

    //添加角色响应
    @Output() addRoleEmit = new EventEmitter<any>();

    constructor(
        public renderer: Renderer,
        public eleRef: ElementRef,
        public builder: FormBuilder,
        public grSiteService: GrSiteService,
        public roleOpService:RoleOpService
    ) {
        this.addRoleData = new AddRolePostData()
        this.resolveCtrlAddRole()
        this.resolveAddBtn()
    }

    ngOnInit() {
        this.resolveAddRoleForm()
        this.roleAddObj = this.roleOpService.addRoleObs.subscribe(res=>{
            this.resolveRoleAddObj(res)
        })
    }

    ngOnDestroy() {
        this.roleAddObj?this.roleAddObj.unsubscribe():{}
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

    /**
     * 处理提交按钮
     * @author GR-05
     */
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
     * 处理监听数据
     * @param data 
     * @author GR-05
     */
    resolveRoleAddObj(siteid: any) {
        console.log(siteid)
        if (siteid) {
            this.addRoleData.site_id = siteid
            this.isShow = true
        }
    }

    /**
     * 添加角色
     * @author GR-05
     */
    public addRole() {
        this.addRoleFormBtn = {
            text: '添加中...',
            status: false
        }
        this.grSiteService.postSiteRoleAdd(this.addRoleData).subscribe(res => {
            this.resolveAddBtn()
            if (res.status === 1) {
                this.addRoleEmit.emit(res.data)
                this.reset()
            }
        })
    }

    /**
     * 重置
     * @author GR-05
     */
    public reset(){
        this.resolveAddBtn()
        this.addRoleForm.reset(new AddRolePostData())
        this.isShow = false
        this.roleOpService.closeAddRole()
    }

    public fnClose(){
        this.reset()
    }
}