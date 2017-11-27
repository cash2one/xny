import { 
    Component, 
    OnInit,
    Input,
    Output,
    EventEmitter
} from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

let animations = {
    topIconState: trigger('topIconState', [
        state('default', style({
            transform: 'rotateZ(0deg)'
        })),
        state('active', style({
            transform: 'rotateZ(90deg)'
        })),
        transition('default <=> active', animate('300ms linear'))
    ]),
    menuWidth: trigger('menuWidth', [
        state('default', style({
            width: '60px'
        })),
        state('active', style({
            width: '180px'
        })),
        transition('default <=> active', animate('300ms linear'))
    ]),
    menuName: trigger('menuName', [
        state('default', style({
            transform: 'translateX(120px)'
        })),
        state('active', style({
            transform: 'translateX(0px)'
        }))
    ]),
    shrinkRotate:trigger('shrinkRotate',[
        state('default', style({
            // transform: 'rotateY(180px)',
            right:'-20px',
            border: '1px solid #ccc',
            'border-left': 'none',
            background:'#fff'
        })),
        state('active', style({
            // transform: 'rotateY(0px)',
            right:'0px',
            border: '1px solid #666D70',
            'border-right': 'none'
        })),
        transition('default <=> active', animate('300ms ease-out'))
    ])
}

import { ILeftData,IMenu } from './riccio-app-left-menu.interface'

@Component({
    selector: 'app-riccio-app-left-menu',
    templateUrl: './riccio-app-left-menu.component.html',
    styleUrls: [
        './riccio-app-left-menu.component.scss'
    ],
    animations:[
        animations.menuName,
        animations.menuWidth,
        animations.topIconState,
        animations.shrinkRotate
    ]
})
export class RiccioAppLeftMenuComponent implements OnInit {

    @Input() leftData:ILeftData
    @Output() menuEmit:EventEmitter<IMenu> = new EventEmitter<IMenu>()

    menuState:string
    featureName:string
    isImgError:boolean

    constructor(
        private activatedRoute:ActivatedRoute
    ) {
        this.leftData = {
            title:'',
            logo:'',
            module:'',
            menu:[]
        }
        this.menuState = 'active'
        this.isImgError = false
    }

    ngOnInit() {
        this.activatedRoute.firstChild.url.subscribe(res => {
            this.leftData.menu.forEach(menu => {
                if(menu.url.indexOf(res[0].path) == 0){
                    this.fnEmit(menu)
                }
            })
        })
    }

    /**
     * 一级菜单切换动画
     * @author GR-05
     */
    public fnChangeAnimation() {
        this.menuState == 'default' ? this.menuState = 'active' : this.menuState = 'default'
    }

    /**
     * logo加载错误
     * @author GR-05
     */
    imgError(){
        this.isImgError = true
    }

    /**
     * 父组件可监听菜单点击事件
     * @param menu 
     * @author GR-05
     */
    fnEmit(menu:IMenu){
        this.menuEmit.emit(menu)
    }

}
