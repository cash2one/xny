import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

class ModelData {
    modelTitle: string;
    modelName: string;
    appid?: number | string;
}

@Injectable()
export class AppcenterService {

    private modelSub = new Subject<ModelData>()
    public modelObj = this.modelSub.asObservable()
    constructor() { }

    public setModel(data: ModelData) {
        this.modelSub.next(data)
    }
}
