import { FormControl } from '@angular/forms'

// 表单控件
export class RechargeFc {
	charge: FormControl;
}

// 提交数据
export class PostData {
	charge: number = null;
}

export class ComPanyData {

	symbol: string;
	data: any = {
		'model': 'Admin',
		'parentid': '',
		'path': '',
		'name': '',
		'is_left': '1',
		'status': '1',
		'type': '1',
		'fonticon': '',
		'url': ''
	};

	titleData: string[] = [
		'ID',
		'企业logo',
		'企业名称',
		'企业负责人',
		'行业',
		'规模',
		'状态',
		'余额',
		'管理操作'
	];

	affiliatedTeam: any = {
		isShow: false,
		data: {
			item: [],
			client: {
				x: "",
				y: ""
			}
		}
	}

	showDetailData: any = [
		{
			name: "企业ID",
			flag: "id",
			value: null
		},
		{
			name: "企业logo",
			flag: "logo",
			value: null,
			img: true,
			imgImg: false,
			imgIcon: true
		},
		{
			name: "负责人",
			flag: "real_name",
			value: null
		},
		{
			name: "行业",
			flag: "industry_name",
			value: null
		},
		{
			name: "规模",
			flag: "scale_name",
			value: null
		},
		{
			name: "状态",
			flag: "status",
			value: null
		},
		{
			name: "余额",
			flag: "amount",
			value: 0
		},
		{
			name: "创建时间",
			flag: "created_at",
			value: null
		}
	]

	editData: any = [];

}