import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { KeywordChartConf } from './keyword-chart.data'

@Injectable()
export class KeywordChartService {
	private kwChartConfigSbj: Subject<KeywordChartConf> = new Subject<KeywordChartConf>()
	public kwChartConfigObj = this.kwChartConfigSbj.asObservable()

	constructor() { }

	public setkwChartConfig(conf: KeywordChartConf) {
		this.kwChartConfigSbj.next(conf)
	}

	/**
	 * 获取适合关键词趋势的图表默认配置
	 * @author GR-05
	 */
	public getChartStyleConf(param:{
		title:string,
		legend:string[],
		xAxis:string[],
		series:any[]
	}) {
		return {
            title: {
                text: param.title,
                left:'center',
                top:'20',
                padding: [0, 0],
                textStyle:{
                    color:'#666',
                    fontWeight:'500',
                    fontSize:14,
                    itemGap:0
                }
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor:'#fff',
                extraCssText:`
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    color:#666;
                    padding:8px;
                `
            },
            legend: {
                top:'bottom',
                data: param.legend
            },
            grid: {
                left: '3%',
                right: '3%',
                containLabel: true
            },
            toolbox: {
                right:'20',
                top:'5',
                feature: {
                    saveAsImage: {
                        show: true,
                        title: '导出图片'
                    }
                }
            },
            xAxis: {
                type: 'category',
                nameLocation:'middle',
                boundaryGap: true,
                axisLine:{
                    show: false
                },
                axisTick:{
                    show: false
                },
                data: param.xAxis
            },
            yAxis: {
                type: 'value',
                inverse:true,
                min:1,
                axisLine:{
                    show: false
                },
                axisTick:{
                    show: false
                },
                nameLocation:'middle'
            },
            series: param.series
        }
	}
}
