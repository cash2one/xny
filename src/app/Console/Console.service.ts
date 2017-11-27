import { Injectable } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

@Injectable()
export class ConsolesService {

    private comLogoSub:Subject<string> = new Subject<string>()
    public comLogObj:Observable<string> = this.comLogoSub.asObservable()

    private comNameSub:Subject<string> = new Subject<string>()
    public comNameObj:Observable<string> = this.comNameSub.asObservable()

    private memberThumbSub:Subject<string> = new Subject<string>()
    public memberThumbObj:Observable<string> = this.comLogoSub.asObservable()

    private nofitySub:Subject<number>  = new Subject<number>()
    public nofityObj:Observable<number> = this.nofitySub.asObservable()

    constructor(
    ) { }

    public changeComLogo(logo:string){
        this.comLogoSub.next(window['setting']['fileurl'] + logo)
    }

    public changeComName(name:string){
        this.comNameSub.next(name)
    }

    public changeNofityCount(count:number){
        this.nofitySub.next(count)
    }
}
