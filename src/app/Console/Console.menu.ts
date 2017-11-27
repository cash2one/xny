export class MenuItems {

	Data: any = [
		{ url: 'dashboard', name: '控制台' },
		{ url: 'members', name: '成员管理' },
		{ url: 'role', name: '角色管理' },
		{ url: 'apps', name: '应用管理' },
		{ url: 'services', name: '服务管理' },
		{ url: 'setting', name: '企业设置' },
		{ url: 'data', name: '数据管理' },
		{ url: 'security', name: '安全管理' },
		{ url: 'billing', name: '账单管理' },
		{ url: 'statistics', name: '数据统计' },
		{ url: 'account', name: '帐户设置' }
	]

}

export class MenuData {
	msgMenu: any[] = [
		{
			app_name: "消息中心",
			fonticon: "console-",
			isCheck: false,
			level: 1,
			model: "Console",
			name: "全部消息",
			url: "message/all"
		},
		{
			app_name: "消息中心",
			fonticon: "console-",
			isCheck: false,
			level: 1,
			model: "Console",
			name: "未读消息",
			count:0,
			url: "message/unread"
		},
		{
			app_name: "消息中心",
			fonticon: "console-",
			isCheck: false,
			level: 1,
			model: "Console",
			name: "已读消息",
			url: "message/read"
		}
	]
}
