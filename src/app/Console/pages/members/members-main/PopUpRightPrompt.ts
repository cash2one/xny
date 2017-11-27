export class PopUpRightPrompt{

	data:any[] = [
		{	
			header:'设置附属部门',
			one:null,
			more:'您选择了多个员工设置统一的部门,是否继续?'
		},
		{	
			header:'设置部门负责人',
			one:'是否将此员工设置为部门负责人?',
			more:'部门负责人只能设置为一个'
		},
		{	
			header:'设置部门管理员',
			one:'是否将此员工设置为部门管理员?',
			more:'是否将多个员工设置为部门管理员?'
		},
		{	
			header:'分配角色',
			one:null,
			more:'您选择了多个员工设置统一的角色,是否继续?'
		},
		{	
			header:'启用',
			one:'确定要对选中员工执行启用操作?',
			more:'您选择了多个员工设置启用,是否继续?'
		},
		{	
			header:'禁用',
			one:'确定要禁用该员工帐号吗?',
			more:'您选择了多个员工设置禁用,是否继续?'
		},
		{
			header:'设置主属部门',
			one:null,
			more:'您选择了多个员工设置统一的部门,是否继续?'
		},
		{
			header:'移除成员',
			one:'确认移除该成员?',
			more:'您选择了多个员工进行移除操作,是否继续?'
		}
	];

	promptText:string = '';

	showModalText:string = 'normal';

	SetDepartmentData:any[] = [];

	SetRoleData:any[] = [];

}