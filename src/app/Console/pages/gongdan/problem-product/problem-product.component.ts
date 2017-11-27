import {Component, OnDestroy, OnInit} from '@angular/core';
import {GrGongdanService} from "../../../services/grGongdan/grGongdan.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import 'rxjs/Rx';

@Component({
  selector: 'app-problem-product',
  templateUrl: './problem-product.component.html',
  styleUrls: ['./problem-product.component.scss']
})
export class ProblemProductComponent implements OnInit {

  public feedback:number;                             //待您反馈数量
  public problemCatHead:Array<any>;                     //常见问题分类列表头
  public problemCatMiddle:Array<any>;                   //常见问题分类列表中间
  public problemCatBottom:Array<any>;           //常见问题分类列表底部
  public isShowMore:boolean = false;                   //是否显示更多
  public listFilter:FormControl = new FormControl();       //查询的关键字
  public keywork:string = "";
  public searchResults:Array<any>;                         //查询列表
  public searchListIsShow:boolean = false;                      //查询结果列表是否显示

  constructor(
    private grGongdanService:GrGongdanService,
    private router:Router
  ) { }

  ngOnInit() {
    this.fnGetNotify();
    this.fnGetProblemList();
    this.searchList();
  }
  /**
   * @author GR-06
   * @copyright [获取工单提醒]
   * @param     [param]
   * @return    [return]
   */
  public fnGetNotify() : void {
    this.grGongdanService.getNotify().subscribe(res=>{
      if(res.status == 1){
        this.feedback = res.data.feedback;
      }
    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-06
   * @copyright [获取常见问题列表]
   * @param     [param]
   * @return    [return]
   */
  public fnGetProblemList() : void {
    this.grGongdanService.getProblemCat().subscribe( res=>{
      if(res.status===1) {
        this.problemCatHead = res.data.head;
        this.problemCatMiddle = res.data.middle;
        this.problemCatBottom = res.data.bottom;
      }

    },error=>{
      throw new Error(error)
    })
  }

  /**
   * @author GR-06
   * @copyright [显示更多产品]
   * @param     [param]
   * @return    [return]
   */
  public showMore():void{
    this.isShowMore = true;
  }

  /**
   * @author GR-06
   * @copyright [显示更多产品是否关闭]
   * @param     [param]
   * @return    [return]
   */
    closeMoreHandle(closeMore:boolean){
      if(closeMore == true){
        this.isShowMore = false;
      }
  }

  /**
   * @author GR-06
   * @copyright [提问]
   * @param     [param]
   * @return    [return]
   */
  public ask(id:number):void{
    this.router.navigate(['/Console/gongdan/submitStepTwo','id',id])
  }

  /**
   * @author GR-06
   * @copyright [输入框响应事件]
   * @param     [param]
   * @return    [return]
   */
    public searchList():void{
      this.listFilter.valueChanges
        .debounceTime(500)
        .subscribe((value) => {
          this.keywork = value;
          this.searchResult(this.keywork);
        });
  }

  /**
   * @author GR-06
   * @copyright [搜索列表]
   * @param     [param]
   * @return    [return]
   */
  public searchResult(name:string):void{
    this.grGongdanService.getSearchList({name:name}).subscribe(res =>{
      if(res.status == 1){
        this.searchResults = res.data;
        if(res.data != null && this.keywork !=""){
          this.searchListIsShow = true;
        }
      }
    },error=>{
      throw new Error(error);
    })
  }

  /**
   * @author GR-06
   * @copyright [查询框查询失焦时异步事件]
   * @param     [param]
   * @return    [return]
   */
  public blurEvent():void{
    setTimeout(()=>{
      this.searchListIsShow = false;
    },200)
  }
}
