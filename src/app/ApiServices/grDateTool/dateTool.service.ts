import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class GrDateToolService {

    constructor(
    ) { }

    /**
     * 获取最近几天始日期
     * @author GR-05
     */
    public getNowStart(flag: number): Date {
        let result: Date
        let now = Date.parse(new Date().toString())
        let para = 1000 * 60 * 60 * 24 * flag

        result = new Date(now - para);
        return result
    }

    /**
     * 获取时间对比
     * @param start 起始时间
     * @param end 结束时间
     * @author GR-05
     */
    public compareStartEndDate(start: string, end: string): boolean {

        let startDate = Date.parse(start)
        let endDate = Date.parse(end)

        return startDate - endDate <= 0
    }

    /**
     * 处理正确的日期格式(直接 tolocalstring 各个浏览器不同)
     * @param dateString 
     * @author GR-05
     */
    public resolveDate(dateString: string): string {
        return dateString.replace(/-/g, '/')
    }

    /**
     * 获取当天最晚
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeLate(dateString: string): string {
        let date = dateString.replace(/\s/g, 'T').replace(/-/g, '/')
        return new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1).toLocaleString('chinese', { hour12: false })
    }

    /**
     * 获取当天最早
     * @param dateString 1994-06-2 例
     * @author GR-05
     */
    public getTimeFirst(dateString: string): string {
        let date = dateString.replace(/\s/g, 'T').replace(/-/g, '/')
        return new Date(new Date(date).getTime()).toLocaleString('chinese', { hour12: false })
    }

    /**
     * 获取两个日期之间的天数
     * @param startDateString  开始时间
     * @param endDateString  要对比的时间
     * @author GR-05
     */
    public stillDate(startDateString: string, endDateString: string): number {
        let compare = Date.parse(endDateString)
        let start = Date.parse(startDateString)

        let result: number = 0
        result = Math.abs(Number.parseInt(((compare - start) / (1000 * 60 * 60 * 24)).toString()))
        // if (Number.parseInt(((now - compare) / (1000 * 60 * 60 * 24)).toString()) >= 0) {
        //     // 要对比的时间在当前时间之前
        //     result = Number.parseInt(((compare - start) / (1000 * 60 * 60 * 24)).toString())
        // } else {
        //     result = Number.parseInt(((compare - start) / (1000 * 60 * 60 * 24)).toString())
        // }
        return result
    }

}
