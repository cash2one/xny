import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: "fileUrlPipe" })
export class FileUrlPipe implements PipeTransform {
    transform(value: number) {
        return window['setting']['fileurl'] + value
    }
}