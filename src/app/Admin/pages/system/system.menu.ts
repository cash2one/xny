export class SystemMenuItem{
	'data':any = [
			{
				'id':'1',
				'model':'Admin',
				'parentid':'0',
				'path':'Admin/system',
				'name':'系统设置',
				'fonticon':'admin-gerenshezhi',
				'isdel':'2',
				'is_left':'1',
				'chilren':[
					{
						'id':'2',
						'model':'Admin',
						'parentid':'1',
						'path':'Admin/Menu',
						'name':'菜单',
						'fonticon':'admin-caidan01',
						'isdel':'2',
						'is_left':'1',
						'chilren':[]
					}
				]
			}
	]
}