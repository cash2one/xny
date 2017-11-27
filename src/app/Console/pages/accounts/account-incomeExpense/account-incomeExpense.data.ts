export class IncomeExpenseData{
    incomeExpenseTitle:string[] = [
        '流水号',
        '日期',
        '名称',
        '操作人',
        '金额',
        '余额',
        '操作'
    ]

    processTypes = {
		'0':'充值',
		'1':'退款',
		'2':'提现',
		'3':'消费',
		'4':'管理员调节',
		'5':'赠送',
		'99':'其他类型'
	}
	
	processTypesOp:any[] = [
        {name:'全部',value:null},
        {name:'充值',value:0},
        {name:'退款',value:1},
        {name:'提现',value:2},
		{name:'消费',value:3},
		{name:'管理员调节',value:4},
		{name:'赠送',value:5},
		{name:'其他类型',value:99}
    ]
}

export class RequestParam{
    page:number = 1;
    rows:number = 20;
    type:number = null;
    time:string[] = [];
    amount:number[] = [null,null];
}