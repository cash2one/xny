import { Component, OnInit,OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { Subscription }   from 'rxjs/Subscription'

import { postArticle }		from './postArticle'
import { GrArticleServices }		from '../../services'
import { RiccioNotificationsService }		from '@gr-public/riccio-notifications/riccio-notifications.service'
import { RuanwenWritingArticlesService }    from './ruanwen-writing-articles.service'
  
import { RuanwenService }			from '../../ruanwen.service'
import { GrOrderService }    from '../../services'


@Component({
  selector: 'app-ruanwen-writing-articles',
  templateUrl: './ruanwen-writing-articles.component.html',
  styleUrls: ['../../../../Public/theme/apps-common/common.scss','./ruanwen-writing-articles.component.scss']
})
export class RuanwenWritingArticlesComponent implements OnInit {

  /**
   * 需要提交的文章对象数据
   * @type {postArticle}
   */
  public postArticle:postArticle

  /**
   * 按钮的标志位
   * @type {boolean}
   */
  public btnDraftType:boolean

  /**
   * 点击下一步选择资源时的按钮的标志位
   * @type {boolean}
   */
  public btnNextType:boolean

  /**
   * 为了防止多次刷新文本编辑器的内容
   * @type {string}
   */
  public uedContent:string

  /**
   * 延时器关闭字段
   * @type {any}
   */
  public timeOut:any

  constructor(
  	public grArticleServices:GrArticleServices,
  	public ruanwenService:RuanwenService,
  	public router:Router,
    public grOrderService:GrOrderService,
    public activatedRoute:ActivatedRoute,
  	public riccioNotificationsService:RiccioNotificationsService,
    public ruanwenWritingArticlesService:RuanwenWritingArticlesService
  ) { 
  	this.postArticle = new postArticle()
  	this.btnDraftType = true
  	this.btnNextType = true
    this.uedContent = ''


    this.activatedRoute.params.subscribe(res=>{

      if(Object.keys(res).length>0){

        let id = res['id']

        this.fnGetOrderWriteInfo(id)

      }else {
        this.editArticle()
      }

    })

  }

  ngOnInit() {

  	// this.ruanwenService.removeStorage('articleDraft')
  }

  ngOnDestroy(){

    this.ruanwenWritingArticlesService.articleData = {}

  }

  /**
   * @author GR-03
   * @copyright 判断是否从编辑文章进来的
   * @param     [param]
   * @return    [return]
   */
  public editArticle():void{
    let data = this.ruanwenWritingArticlesService.articleData

    if(Object.keys(data).length>0){

      this.postArticle = new postArticle(data)

      this.uedContent = this.postArticle['content']

      this.ruanwenService.setStorage('articleDraft',data['id'])

    }

  }

  /**
   * @author GR-03
   * @copyright 根据订单号获取文章信息
   * @param     [param]
   * @return    [return]
   */
  public fnGetOrderWriteInfo(id:string|number):void{
    this.grOrderService.getOrderInfo({
      'id':id
    }).subscribe(res=>{
      if(res.status===1){
        let data = res['data']['info']
        this.postArticle = new postArticle(data)
        this.uedContent = this.postArticle['content']
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-03
   * @copyright 接收百度富文本编辑器的内容改变
   * @param     [param]
   * @return    [return]
   * @param     {string}    content [description]
   */
  public fnEmitUeditor(content:string):void{

	this.postArticle['content'] = content

  	if(this.timeOut) clearTimeout(this.timeOut)

      this.timeOut = setTimeout(()=>{

        if(content.trim()!==''){
          this.grArticleServices.postArticleOperate({
            ...this.postArticle
          }).subscribe(res=>{
            if(res.status===1){

              this.postArticle['id'] = res['data']
              this.ruanwenService.setStorage('articleDraft',res['data'])
              this.riccioNotificationsService.setSubject({text:'内容已自动保存成功'})
              
            }
          },error=>{
            throw new Error(error)
          })
        }

  	},3000)


  }

  /**
   * @author GR-03
   * @copyright 点击保存文章按钮
   * @param     [param]
   * @return    [return]
   * @param     {[type]}    $event [description]
   */
  public fnBtnSaveDraft($event:boolean,type:string):void{

  	let btnObj = { 
  		'draft':'btnDraftType',
  		'next':'btnNextType'
  	}

  	if(this.handlePostData()===true){

	  	this[btnObj[type]] = false

	  	this.grArticleServices.postArticleOperate({
	  		...this.postArticle
	  	}).subscribe(res=>{

	  		this[btnObj[type]] = true

	  		if(res.status===1){

	  			this.ruanwenService.setStorage('articleDraft',res['data'])

	  			this.postArticle['id'] = res['data']

	  			this.riccioNotificationsService.setSubject({text:'保存草稿成功'})

	  			if(type === 'next') this.router.navigateByUrl("RuanwenClient/article/release/screen/list")

	  		}

	  	},error=>{
	  		throw new Error(error)
	  	})

  	}

  }

  /**
   * @author GR-03
   * @copyright 校验数据
   * @param     [param]
   * @return    [return]
   * @return    {boolean}   [description]
   */
  public handlePostData():boolean{
  	let bool = true
  	switch ("") {
  		case this.postArticle['title']:
  			bool = false
  			this.riccioNotificationsService.setSubject({text:'请填写文章标题','status':'danger'})
  			break;
  		
  		case this.postArticle['content']:
  			bool = false
  			this.riccioNotificationsService.setSubject({text:'请填写文章内容','status':'danger'})
  			break;


  		default:break;
  	}

  	return bool

  }

}
