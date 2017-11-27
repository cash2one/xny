export class RoleData{
	
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


	// 页面交互数据
	mutualData:any = {
		tableTitle:['头像','姓名','手机号','用户名','邮箱','性别','操作'],

		PboxText:{

			selectData:[
		          {
		            'id':0,'name':'全部员工'
		          },
		          {
		            'id':1,'name':'部门管理员'
		          },
		          {
		            'id':2,'name':'正常员工'
		          },
		          {
		            'id':3,'name':'禁用员工'
		          },
		          {
		            'id':4,'name':'部门负责人'
		          }
           ]

		},

		presentRole:{
			titile:'企业负责人',
			length:1
		},

		tabSwitch:0,

		NoRole:{
			length:0,
			color:false
		},

		popRightTextData:{
			normal:[
		        {
		          id:0,
		          name:'批量移除'
		        }
			],

			noRole:[
				{
				  id:1,
				  name:'分配角色'
				}
			]

		}

	};

	//角色数据
	RoleData:any = {
		dataList:[],
		pboxOptions:[
			{
				id:0,
				name:'添加子角色'
			},
			{
				id:1,
				name:'编辑角色'
			},
			{
				id:3,
				name:'删除角色'
			},
		]
	}

	//角色下的成员数据
	RoleUserData:any = {
		dataList:[],
		getUserListObj:{
			'id':'-1',
			'name':'',
			'rows':'20',
			'page':'1'
		}
	}


	//角色权限数据
	RoleAuthData:any = {
		data:{}
	}


}