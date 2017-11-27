import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    Renderer,
    ElementRef,
    HostListener
} from '@angular/core'
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations'

import { RiccioPopDatePickerService } from './riccio-pop-datePicker.service'
import { DatePickerConfig, DefaultData } from './riccio-pop-datePicker.data'

const smallBig = trigger('smallBig', [
    state('in', style({ transform: 'translateY(0) scale(1)' })),
    transition('void => *', [
        animate(800, keyframes([
            style({ opacity: 0.7, transform: 'scale(0.8)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1.1)', offset: 0.2 }),
            style({ opacity: 1, transform: 'scale(1)', offset: 0.5 })
        ]))
    ]),
    transition('* => void', [
        animate(300, keyframes([
            style({ opacity: 1, transform: 'scale(1.1)', offset: 0 }),
            style({ opacity: 0.9, transform: 'scale(1)', offset: 0.2 }),
            style({ opacity: 0, transform: 'scale(0.8)', offset: 0.5 })
        ]))
    ])
])

@Component({
    selector: 'app-riccio-pop-datePicker',
    templateUrl: './riccio-pop-datePicker.component.html',
    styleUrls: [
        '../../Public/theme/apps-common/common.scss',
        './riccio-pop-datePicker.component.scss'
    ],
    animations: [smallBig]
})
export class RiccioPopDatePickerComponent implements OnInit, OnDestroy {
    @ViewChild('datePicker') datePicker: any;

    //日期配置
    public dateConfig: DatePickerConfig
    //服务订阅
    public dpObs: any
    public closeObs: any
    public dateShow: boolean
    public monthShow: any[]
    public weekShow: any[]

    constructor(
        private renderer: Renderer,
        private elementRef: ElementRef,
        public datePickerService: RiccioPopDatePickerService
    ) {
        this.dateShow = false
        this.monthShow = new DefaultData().monthNames
        this.weekShow = new DefaultData().dayNamesLong
        this.dateConfig = {
            date: new Date(),
            style: {
                left: 0,
                top: 0,
                width: 0
            },
            expectClick: null
        }
    }

    ngOnInit() {
        this.dpObs = this.datePickerService.dpObs.subscribe(dateConfig => {
            this.resolveDateConfig(dateConfig)
        })
        this.closeObs = this.datePickerService.closeObj.subscribe(res => {
            this.close()
        })
    }

    ngOnDestroy() {
        this.dpObs ? this.dpObs.unsubscribe() : {}
        this.closeObs ? this.closeObs.unsubscribe() : {}
    }

    /**
     * 处理配置
     * @param dateConfig 
     * @author GR-05
     */
    resolveDateConfig(dateConfig: DatePickerConfig) {
        this.dateConfig = Object.assign(this.dateConfig, dateConfig)
        this.resolveStyle(this.dateConfig)
        this.dateShow = true
        this.listenResize()
    }

    /**
     * 处理样式
     * @param config 
     * @author GR-05
     */
    resolveStyle(config: DatePickerConfig) {
        let WindowWidth = document.body.offsetWidth
        let WindowHeight = document.body.offsetHeight

        setTimeout(() => {
            if (this.datePicker) {
                let datePickerWidth = this.datePicker.nativeElement.offsetWidth
                let datePickerHeight = this.datePicker.nativeElement.offsetHeight

                if (config.style.left > (WindowWidth - datePickerWidth)) {
                    this.dateConfig.style.left = WindowWidth - datePickerWidth
                }

                if (config.style.top > (WindowHeight - datePickerHeight)) {
                    this.dateConfig.style.top = WindowHeight - datePickerHeight
                }
            }
        })
    }

    /**
     * 简单监听窗口高度变化
     * @author GR-05
     */
    public listenResize() {
        this.renderer.listen(window, 'resize', (e) => {
            setTimeout(() => {
                this.resolveStyle(this.dateConfig)
            }, 200)
        })
    }

    /**
     * 处理点击事件
     * @author GR-05
     */
    @HostListener('document:click', ['$event'])
    OnClick(e): void {
        let path = e.path || (e.composedPath && e.composedPath())
        let show: boolean = false

        if (!this.dateConfig.expectClick || !this.dateConfig.expectClick.nativeElement.contains(e.target)) {
            for (let i = 0; i < path.length; i++) {
                if (path[i]['outerHTML'] && path[i]['outerHTML'].indexOf('app-riccio-datepickers') == 1) {
                    show = true
                    break
                }
                if (!path[i]['outerHTML']) {
                    show = false
                    break
                }
            }
            !show ? (this.dateShow ? this.close() : {}) : {}
        }
    }

    /**
     * 关闭
     * @author GR-05
     */
    close() {
        this.datePickerService.setEmit({
            type: 'close',
            date: null
        })
        this.dateShow = false
    }

    /**
     * 获取组件的日期
     * @param data
     * @author GR-05
     */
    getDate(data: any) {
        this.datePickerService.setEmit({
            type: this.dateConfig.type,
            date: data.date
        })
        this.dateShow = false
    }
}