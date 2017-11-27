export class RiccioSelectData{

	departmentData:any = {
      data:[],					//递归部门的数据
      nodeKey:'name',			//部门名称的key值
      childrenKey:'useritems',	//部门下的成员数组key值
      childrenName:'real_name', //部门下的成员名称key值
      symbol:'id'			    //唯一标示符,用来判断左右两边的key（重要）  保证右边已经选择的成员唯一标示符为id
	}

	loadingData:any = {
		isShow:false,
		text:''
	}


}

