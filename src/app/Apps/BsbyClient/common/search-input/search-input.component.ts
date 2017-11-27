import {
    Component,
    OnInit,
    OnDestroy,
    ElementRef,
    ViewChild,
    Output,
    EventEmitter,
    Input,
    forwardRef
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Subscription } from 'rxjs/Subscription'

@Component({
    selector: 'bsby-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: [
        '../../bsbyClient.common.scss',
        './search-input.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true
        }
    ]
})
export class SearchInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
    //文字提示
    @Input() placeholder: string
    //父组件通知
    @Output() searchEmit: EventEmitter<string>
    //值绑定
    searchValue: string

    private onChangeCallback: (_: any) => void = () => {}

    get value(): any {
        return this.searchValue;
    }

    set value(v: any) {
        if (v !== this.searchValue) {
            this.searchValue = v;
            this.onChangeCallback(v);
        }
    }

    constructor() {
        this.placeholder = '输入关键字搜索'
        this.searchEmit = new EventEmitter<string>()
        this.searchValue = ''
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    /**
     * 实现ControlValueAccessor, 双向绑定
     */
    writeValue(val: string): void {
        if (val !== this.searchValue) {
            this.searchValue = val
        }
    }
    registerOnChange(fn: any): void {
        this.onChangeCallback = fn
    }
    registerOnTouched(fn: any): void {
        //此处无用
    }

    /**
     * 监听键盘enter
     * @author GR-05
     */
    fnSearch(e?: KeyboardEvent) {
        if (e.keyCode === 13) {
            this.searchEmit.emit(this.searchValue.trim())
        }
    }

    /**
     * 失焦监听
     * @author GR-05
     */
    public fnBlurSearch() {
        this.searchEmit.emit(this.searchValue.trim())
    }
}