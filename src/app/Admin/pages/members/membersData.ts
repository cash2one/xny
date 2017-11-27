export class MembersData{

	membersDetailsData:any = {
		isShow:false,
		data:[{
            'email':'',
            'employeecode':'',
            'id':'',
            'mobile':'',
            'name':'',
            'positionname':'',
            'real_name':'',
            'sex':'',
            'status':'',
            'thumb':''
        }]
	};

	DeparmentListData:any[] = [];

    pboxOptions:any[] = [
        {
            id:0,
            name:'添加子部门'
        },
        {
            id:1,
            name:'编辑部门'
        },
        {
            id:2,
            name:'禁用部门'
        },
        {
            id:3,
            name:'选择成员'
        },
        {
            id:4,
            name:'删除部门'
        }
    ];

    pboxTopOption:any[] = [
        {
            id:0,
            name:'添加子部门'
        }
    ];

    TableTitle:any = {
        'symbol':'AllUserItems',
        'AllUserItems':['姓名','手机','职务','邮箱','性别','工号','操作'],
        'NoAdminItems':['部门名称','上级部门','创建时间','操作'],
        'NoDepartmentItems':['员工真实姓名','帐号','职务','手机','主属部门','操作'],
    };


    NoAdminList:any[] = [];

    NoDepartment:any[] = [];

    postSearchUserData:any = {
        title:'全部成员',
        length:'0',
        data:{
            type:0, 
            name:'',
            department_id:''
        }
    };


    AddMembers:any = {
        isShow:false
    }


}

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
		}
	];

	promptText:string = '';

	showModalText:string = 'normal';

	SetDepartmentData:any[] = [];

	SetRoleData:any[] = [];

}