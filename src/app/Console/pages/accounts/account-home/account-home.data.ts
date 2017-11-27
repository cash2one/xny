export class AccountHomeData{
    consumeTitle:any[] = [
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

}