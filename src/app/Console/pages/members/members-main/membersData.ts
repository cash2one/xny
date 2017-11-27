export class membersData{

    selectMembersData:any = {
        input:{
            leftData:[],
            rightData:[],
            isShow:false,
            nextPage:'normal'
        },
        output:{
            searchValue:'',
            pageValue:false            
        }
    };


	membersDetailsData:any = {
		isShow:false,
		data:{
            'email':'',
            'department_main':'',
            'department':[],
            'employeecode':'',
            'id':'',
            'phone':'',
            'name':'',
            'positionname':'',
            'real_name':'',
            'sex':'',
            'status':'',
            'thumb':''
        }
	};

	DeparmentListData:any[] = [];

    pboxOptions:any[] = [
        {
            id:0,
            name:'添加子部门',
            status:'show'
        },
        {
            id:1,
            name:'编辑部门',
            status:'show'
        },
        {
            id:3,
            name:'禁用部门',
            status:'show'
        },
        {
            id:4,
            name:'添加已有成员',
            status:'show'
        }
    ];

    PopUpRightData:any[] = [
        {
            id:6,
            name:'设置主属部门'
        },
        {
            id:0,
            name:'设置附属部门'
        },
        {
            id:1,
            name:'设置部门负责人'
        },
        {
            id:2,
            name:'设置部门管理员'
        },
        {
            id:3,
            name:'分配角色'
        },
        {
            id:4,
            name:'启用'
        },
        {
            id:5,
            name:'禁用'
        },
        {
            id:7,
            name:'移除'
        }
    ];

    TableTitle:any = {
        'symbol':'AllUserItems',
        'AllUserItems':['姓名','手机','职务','邮箱','性别','工号','操作'],
        'NoAdminItems':['部门名称','上级部门','创建时间','操作'],
        'NoDepartmentItems':['头像','姓名','手机号','用户名','邮箱','性别','操作'],
    };


    NoAdminList:any[] = [];

    NoDepartment:any[] = [];

    postSearchUserData:any = {
        'title':'全公司',
        'length':'0',
        'data':{
            'type':'2', 
            'name':'',
            'department_id':'',
            'page':'1',
            'rows':'20'
            }
    };


    AddMembers:any = {
        isShow:false
    }


    //modal数据
    RiccioModal:any = {
        open:false,
        header:''
    }

    //所有部门管理员或者某个部门下的部门管理员
    DepartmentAdminList:any[] = [];

}