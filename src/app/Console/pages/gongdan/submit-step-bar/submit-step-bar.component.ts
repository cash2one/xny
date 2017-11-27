import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-submit-step-bar',
  templateUrl: './submit-step-bar.component.html',
  styleUrls: ['./submit-step-bar.component.scss']
})
export class SubmitStepBarComponent implements OnInit {

  @Input()
  step:string;

  public image1:string;
  public image2:string;
  public image3:string;
  public image4:string;
  public image5:string;
  public image6:string;
  public image7:string;
  public isActive1:boolean = false;
  public isActive2:boolean = false;
  public isActive3:boolean = false;
  public isActive4:boolean = false;

  constructor() { }

  ngOnInit() {
    switch (this.step){
      case '1':
        this.image1 = "../../../assets/gongdan/stepBar03.jpg";
        this.image2 = "../../../assets/gongdan/stepBar04.jpg";
        this.image3 = "../../../assets/gongdan/stepBar01.jpg";
        this.image4 = "../../../assets/gongdan/stepBar04.jpg";
        this.image5 = "../../../assets/gongdan/stepBar01.jpg";
        this.image6 = "../../../assets/gongdan/stepBar04.jpg";
        this.image7 = "../../../assets/gongdan/stepBar01.jpg";
        this.isActive1 = true;
        break;
      case '2':
        this.image1 = "../../../assets/gongdan/stepBar01.jpg";
        this.image2 = "../../../assets/gongdan/stepBar02.jpg";
        this.image3 = "../../../assets/gongdan/stepBar03.jpg";
        this.image4 = "../../../assets/gongdan/stepBar04.jpg";
        this.image5 = "../../../assets/gongdan/stepBar01.jpg";
        this.image6 = "../../../assets/gongdan/stepBar04.jpg";
        this.image7 = "../../../assets/gongdan/stepBar01.jpg";
        this.isActive2 = true;
        break;
      case '3':
        this.image1 = "../../../assets/gongdan/stepBar01.jpg";
        this.image2 = "../../../assets/gongdan/stepBar02.jpg";
        this.image3 = "../../../assets/gongdan/stepBar01.jpg";
        this.image4 = "../../../assets/gongdan/stepBar02.jpg";
        this.image5 = "../../../assets/gongdan/stepBar03.jpg";
        this.image6 = "../../../assets/gongdan/stepBar04.jpg";
        this.image7 = "../../../assets/gongdan/stepBar01.jpg";
        this.isActive3 = true;
        break;
      case '4':
        this.image1 = "../../../assets/gongdan/stepBar01.jpg";
        this.image2 = "../../../assets/gongdan/stepBar02.jpg";
        this.image3 = "../../../assets/gongdan/stepBar01.jpg";
        this.image4 = "../../../assets/gongdan/stepBar02.jpg";
        this.image5 = "../../../assets/gongdan/stepBar01.jpg";
        this.image6 = "../../../assets/gongdan/stepBar02.jpg";
        this.image7 = "../../../assets/gongdan/stepBar03.jpg";
        this.isActive4 = true;
        break;
      default:
        console.log('输入步骤不能大于4');
        break;
    }
  }

}
