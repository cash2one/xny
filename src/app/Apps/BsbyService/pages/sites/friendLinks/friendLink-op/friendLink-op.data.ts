import { FormControl } from '@angular/forms'

// 表单控件
export class FriendLinkOpFc {
    mykey: FormControl;
    otherkey: FormControl;
    url: FormControl;
    pr: FormControl;
    included: FormControl;
    inputtime: FormControl;
}

// 提交数据
export class PostData {
    mykey: string = '';
    otherkey: string = '';
    url: string = '';
    pr: string = '';
    included: string = '';
    islink: number = 1;
    status: number = 1;
    inputtime: string = new Date().toLocaleString('chinese', { hour12: false });
}

export class IsLink {
    data = [
        { name: '有', value: 1 },
        { name: '无', value: 2 }
    ]
}

export class Status {
    data = [
        { name: '有效', value: 1 },
        { name: '无效', value: 2 }
    ]
}