import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { RiccioLoadingService } from '@gr-public/riccio-loading/riccio-loading.service'

import { GrMembersService } from '../../ApiServices/grMembers/grMembers.service'

@Component({
    selector: 'app-member-coms',
    templateUrl: './member-companies.component.html',
    styleUrls: ['./member-companies.component.scss']
})
export class MemberComsComponent implements OnInit {

    //企业列表
    companyList: any[]

    constructor(
        private router: Router,
        private riccioLoadingService: RiccioLoadingService,
        private grMembersService: GrMembersService
    ) { }

    ngOnInit() {
        this.fnGetCompanyList()
    }

    /**
   * @author GR-03
   * @copyright 获取用户所在的企业列表
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
    public fnGetCompanyList(): void {
        this.grMembersService.getMyCompany().subscribe(res => {
            if (res.status === 1) {
                this.companyList = [...res['data']['data']]
            }
        }, error => {
            throw new Error(error)
        })
    }

    /**
   * @author GR-03
   * @copyright 点击跳转到对应的企业
   * @param     [param]
   * @return    [return]
   * @check     GR-05       GR-03
   */
    fnGoToCompany(id: number | string): void {
        this.riccioLoadingService.setLoading({ 'message': '请稍候' })
        this.grMembersService.postMemberCompany({
            'cid': id
        }).subscribe(res => {
            this.riccioLoadingService.closeLoading()
            if (res.status === 1) {
                this.router.navigateByUrl('Console/apps/my')
            }
        }, error => {
            throw new Error(error)
        })
    }

    /**
   * @author GR-03
   * @copyright 修改和转让跳转
   * @param     [param]
   * @return    [return]
   * @param     {any}       event [description]
   */
    public fnGoInfo(event: any): void {
        event.stopPropagation()
        this.router.navigateByUrl('Console/setting/info')
    }

}
