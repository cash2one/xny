import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ViewChild,
	forwardRef
} from '@angular/core'
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { UEditorComponent } from 'ngx-ueditor'

@Component({
	selector: 'app-bsby-ueditor',
	templateUrl: './bsby-ueditor.component.html',
	styleUrls: [
		'../../bsbyClient.common.scss',
		'./bsby-ueditor.component.scss'
	],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => BsbyUeditorComponent),
			multi: true
		}
	]
})
export class BsbyUeditorComponent implements OnInit, ControlValueAccessor {
	@ViewChild('contentUed') contentUed: UEditorComponent;

	@Input() formControl: FormControl;
	@Input() config: any;

	//值绑定
	content: string
	//实例或销毁组件
	uedShow: boolean

	private onChangeCallback: (_: any) => void = () => { }

	get values(): any {
		return this.content;
	}

	set values(v: any) {
		if (v !== this.content) {
			this.content = v;
			this.onChangeCallback(v);
		}
	}

	@Output() valueEmit: EventEmitter<string> = new EventEmitter<string>()

	constructor() {
		this.uedShow = true
	}

	ngOnInit() {
	}

	/**
	 * 编辑器初始化完成事件
	 * @author GR-05
	 */
	uedReady() {
		this.contentUed.addListener('focus', () => {
			this.fnChangeContentTouch()
		})
	}

	/**
     * 手动设置touch
     * @author GR-05
     */
	fnChangeContentTouch() {
		this.formControl ? this.formControl.markAsTouched() : {}
	}


	/**
     * 实现ControlValueAccessor, 双向绑定
     */
	writeValue(val: string): void {
		if (val && val !== this.content) {
			this.content = val
		}
	}
	registerOnChange(fn: any): void {
		this.onChangeCallback = fn
	}
	registerOnTouched(fn: any): void {
		//此处无用
	}

	/**
	 * 手动注销此组件api
	 * @author GR-05
	 */
	closeUed() {
		this.uedShow = false
	}

	/**
	 * 手动清除编辑器内容
	 * @author GR-05
	 */
	clearUed() {
		this.values = ''
		this.contentUed.Instance.body.innerHTML = this.values
	}
}
