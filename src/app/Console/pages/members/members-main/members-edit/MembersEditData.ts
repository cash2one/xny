export class MembersEditData{

	'id':string|number = '';    // 用户id
	'status'?:string|number = '';    // 1:正常,2:禁用
	'phone':string = '';			 // 联系方式
	'real_name':string = '';		 // 姓名
	'email'?:string = '';			 // 邮箱
	'sex'?:string|number = '1';      // 1:男,2:女
	'positionname'?:string = '';	 // 职务
	'employeecode'?:string = '';     // 员工编号
	'department_id'?:Array<number|string> = [];  // 副部门id数组
	'department_main':string|number = '';  // 主部门id
	'parent_userid'?:string|number = '';   // 直属上级id
	'jointime'?:string|number = '';  // 入职时间
	'birthday'?:string|number = '';  // 生日

}