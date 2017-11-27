import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GrGongdanService} from "../../../../services/grGongdan/grGongdan.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-more-product',
  templateUrl: './more-product.component.html',
  styleUrls: ['./more-product.component.scss']
})
export class MoreProductComponent implements OnInit {
  @Input()
  isShowMore:boolean;
  @Input()
  problemBottom:any;
  @Output()
  closeShowMore:EventEmitter<boolean> = new EventEmitter();
  public closeMore:boolean;                    //是否关闭显示更多产品
  public columnOne:Array<any>;                  //存取第一到五列的数据
  public columnTwo:Array<any>;
  public columnThree:Array<any>;
  public columnFour:Array<any>;
  public columnFive:Array<any>;

  constructor(
    private router:Router
  ) {
    this.columnOne = [];
    this.columnTwo = [];
    this.columnThree = [];
    this.columnFour = [];
    this.columnFive = [];
  }

  ngOnInit() {
    setTimeout(()=>{
      this.dataAverage();
    },1000)
  }

  /**
   * @author GR-06
   * @copyright [收起显示更多产品]
   * @param     [param]
   * @return    [return]
   */
  public packup():void{
    this.isShowMore = false;
    this.closeMore = true;
    this.closeShowMore.emit(this.closeMore);
  }

  /**
   * @author GR-06
   * @copyright [数据均分五列]
   * @param     [param]
   * @return    [return]
   */
  public dataAverage(){
    for(let i = 0;i < this.problemBottom.length;i++){
      if((i+1)%5 == 0){
        this.columnFive.push(this.problemBottom[i]);
      }else if((i+1)%5 == 4){
        this.columnFour.push(this.problemBottom[i]);
      }else if((i+1)%5 == 3){
        this.columnThree.push(this.problemBottom[i]);
      }else if((i+1)%5 == 2){
        this.columnTwo.push(this.problemBottom[i]);
      }else if((i+1)%5 == 1){
        this.columnOne.push(this.problemBottom[i]);
      }
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
}
