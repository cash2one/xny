import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

import { HttpHeadData }    from '../../../../HttpURL'
import { AppService } from '../../../../app.service'

@Injectable()
export class GrProductService {

    private httpURL = new HttpHeadData().SAASURL

    // ------- get -------  //
    //产品列表
    private productList = this.httpURL + 'api/bsby/service/product/list'

    // -------post ------ //
    //添加产品
    private productAdd = this.httpURL + 'api/bsby/service/product/add'
    //编辑产品
    private productEdit = this.httpURL + 'api/bsby/service/product/edit'
    //产品状态
    private productStatus = this.httpURL + 'api/bsby/service/product/status'
    //删除产品
    private productDel = this.httpURL + 'api/bsby/service/product/del'

    constructor(
        private appService:AppService
    ){}

    /**
     * 获取产品列表
     * @param obj name 产品名
     */
    public getProductList(obj:any):Observable<any>{
        return this.appService.interfaceJudg('get',this.productList,obj)
    }

    /**
     * 添加产品
     * @param obj 
     * name	是	string	产品名称
     * core_num	否	int	精准核心词上限
     * long_num	否	int	精准长尾词上限
     * brand_num	否	int	品牌词上限
     * role	否	string	产品默认角色，一行一个
     */
    public postProductAdd(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.productAdd,obj)
    }

    /**
     * 修改产品
     * @param obj 
     * id	是	int	产品id
     * name	是	string	产品名称
     * core_num	否	int	精准核心词上限
     * long_num	否	int	精准长尾词上限
     * brand_num	否	int	品牌词上限
     * role	否	string	产品默认角色，一行一个
     */
    public postProductEdit(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.productEdit,obj)
    }

    /**
     * 修改产品状态
     * @param obj 
     * ids	是	array	产品id数组
     * status	是	int	状态 1正常，2禁用
     */
    public postProductStatus(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.productStatus,obj)
    }

    /**
     * 删除产品
     * @param obj  id 产品id
     */
    public postProductDel(obj:any):Observable<any>{
        return this.appService.interfaceJudg('post',this.productDel,obj)
    }
}