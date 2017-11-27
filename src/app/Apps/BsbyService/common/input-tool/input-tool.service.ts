import { Injectable } from '@angular/core'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class InputToolService{

    private fileDelSub:Subject<boolean> = new Subject<boolean>()
    public fileDelObj:Observable<boolean> = this.fileDelSub.asObservable()

    constructor(){

    }

    /**
     * 删除文件对象
     * @author GR-05
     */
    setFileDel(){
        this.fileDelSub.next(true)
    }
}