import { Directive, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core'

/**
 * 为表格单元格添加title指令
 * tableTitle   应用指令
 * noTitle    不加title
 * setTitle   优先级最高手动设置title
 * 
 * 注：th 和 td 只获取到根级或者一级dom的纯文本
 * @author GR-05
 */

@Directive({
    selector: '[tableTitle]'
})
export class TableTitleDirective implements OnInit, AfterViewInit {
    constructor(
        private ele: ElementRef,
        private renderer: Renderer2
    ) {
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        this.resolveTitle()
    }

    /**
     * 处理表格title
     * @author GR-05
     */
    public resolveTitle() {
        let ths = this.ele.nativeElement.querySelectorAll('th')
        let tds = this.ele.nativeElement.querySelectorAll('td')
        ths.length > 0 ? ths.forEach(th => {
            let text = this.resolveChildNode(th)
            this.renderer.setAttribute(th, 'title', text)
        }) : {}
        tds.length > 0 ? tds.forEach(td => {
            if (td.getAttribute('noTitle') == null && !td.getAttribute('setTitle')) {
                let text = this.resolveChildNode(td)
                this.renderer.setAttribute(td, 'title', text)
            } else if (td.getAttribute('setTitle')) {
                let title = td.getAttribute('setTitle')
                this.renderer.setAttribute(td, 'title', title)
            }
        }) : {}
    }

    /**
     * 递归处理层级dom
     * @param ele 
     * @author GR-05
     */
    public resolveChildNode(ele: HTMLElement): string {
        let result = ''
        let nodes: NodeList = ele.childNodes
        if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
                switch (nodes[i].nodeType) {
                    case 1:
                        //元素
                        let el: HTMLElement = nodes[i] as HTMLElement
                        el.getAttribute('noTitle') == null && this.getInnerText(el).length ? result += '  ' + this.getInnerText(el) + '  ' : {}
                        break
                    case 3:
                        //文本 
                        result += nodes[i].nodeValue.trim()
                        break
                }

            }
        } else {
            result = this.getInnerText(ele)
        }
        return result
    }

    /**
     * 只获取html标签文本
     * @param ele 
     * @author GR-05
     */
    public getInnerText(ele: HTMLElement) {
        return (typeof ele.textContent == "string") ?
            ele.textContent.replace(/(^\s+)|(\s+$)/g, "") :
            ele.innerText.replace(/(^\s+)|(\s+$)/g, "")
    }
}