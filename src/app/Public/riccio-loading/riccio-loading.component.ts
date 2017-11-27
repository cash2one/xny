import {
    OnDestroy,
    OnInit,
    Component,
    ElementRef,
    ViewChild
} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RiccioLoadingService } from './riccio-loading.service'

import { animations } from '../Animations/index'
import { Loadings } from './riccio-loadingData'

const smallBig = trigger('smallBig', [
	  state('in', style({transform: 'translateY(0) scale(1)'})),
	  transition('void => *', [
	       animate(500, keyframes([
	        style({opacity: 0.7, transform: 'scale(0.8)', offset: 0}),
	        style({opacity: 0.9, transform: 'scale(1.1)',  offset: 0.2}),
	        style({opacity: 1, transform: 'scale(1)',     offset: 0.5})
	      ]))
	  ]),
	  transition('* => void', [
	        animate(300, keyframes([
	        style({opacity: 1, transform: 'scale(1.1)',     offset: 0}),
	        style({opacity: 0.9, transform: 'scale(1)', offset: 0.2}),
	        style({opacity: 0, transform: 'scale(0.8)',  offset: 0.5})
	      ]))
	  ])
	])

@Component({
    selector: 'app-riccio-loading',
    templateUrl: './riccio-loading.component.html',
    styleUrls: ['./riccio-loading.component.scss'],
    animations: [
        smallBig
    ]
})
export class RiccioLoadingComponent implements OnInit,OnDestroy {
    @ViewChild('baseLoading') baseLoading: ElementRef;

    public loadings: Loadings
    public loadingObs: any

    public isShow:boolean
    public baseStyle:any

    constructor(
        public riccioLoadingService: RiccioLoadingService
    ) {
        this.loadings = new Loadings()
        this.baseStyle = {}
        this.riccioLoadingService.loadingObs.subscribe(v => {
            Object.assign(this.loadings,v)
            // this.showLoading()
            this.resolveLoading(this.loadings)
        })
        this.riccioLoadingService.closeObs.subscribe(v=>{
            this.isShow = false
        })
    }

    ngOnInit() {
    }

    ngOnDestroy(){
        console.log('sss')
    }

    public showLoading() {
        this.isShow = true
        this.loadings = this.loadings
    }

    public resolveLoading(loadings:Loadings){
        switch(loadings.type){
            case 'layer':
                this.showLoading()
                break
            case 'base':
                if(loadings.elParent && loadings.elParent.nativeElement){
                    this.showLoading()
                    this.resolveBase(loadings.elParent)
                }
                break
            default: 
                break
        }
    }

    public resolveBase(elParent:ElementRef){
        let style = elParent.nativeElement.getBoundingClientRect()
        this.baseStyle = {
            left:style.left,
            top:style.top,
            width:style.width
        }
    }
}