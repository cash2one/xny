import { Injectable } from '@angular/core';

@Injectable()
export class CompanyService {

  constructor() { }

  /**
     * 获取最近几天始日期
     * @author GR-05
     */
  public getNowStart(flag: number): string {
    let result: Date
    let now = Date.parse(new Date().toString())
    let para = 1000 * 60 * 60 * 24 * flag

    result = new Date(now - para);
    return result.toLocaleDateString()
  }

  /**
   * 获取时间对比
   * @param start 起始时间
   * @param end 结束时间
   * @author GR-05
   */
  public compareStartEndDate(start: string, end: string): boolean {
    console.log(start, end)
    let startDate = Date.parse(start)
    let endDate = Date.parse(end)

    return startDate - endDate <= 0
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

}
