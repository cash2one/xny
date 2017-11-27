export class ConfigRuleData{

	titleData:Array<string> = [
            'ID',
            '规则名称',
            '唯一标识',
            '模版名称',
            '规则说明',
            '管理操作'
      ]

      showDetailData: any = [
            {
                  name: "规则ID",
                  flag: "id",
                  value: null
            },
            {
                  name: "规则名称",
                  flag: "name",
                  value: null
            },
            {
                  name: "唯一标识",
                  flag: "alias",
                  value: null
            },
            {
                  name: "模版ID",
                  flag: "tem_id",
                  value: null
            },
            {
                  name: "模版名称",
                  flag: "tem_name",
                  value: null
            },
            {
                  name: "规则说明",
                  flag: "note",
                  value: null
            }
      ]

      showTemDetailData: any = [
            {
                  name: "模版id",
                  flag: "id",
                  value: null
            },
            {
                  name: "短信签名",
                  flag: "signature",
                  value: null
            },
            {
                  name: "第三方id",
                  flag: "tpl_id",
                  value: null
            },
            {
                  name: "审核状态",
                  flag: "status",
                  value: null
            },
            {
                  name: "参数",
                  flag: "parme",
                  value: null
            },
            {
                  name: "短信内容",
                  flag: "content",
                  value: null
            }
      ]

      bindTempTitle=[
            'ID',
            '模版名称',
            '状态',
            '操作'
      ]

      addOrEditList:AddOrEditList={
            id:null,
            name:null,
            alias:null,
            status:1
      }

      addOrEditFlag = {
            flag: 'add',
            btnName: '保存'
      }

	templateRuleData:Array<any> = []

	FlyLeftData:any = {
            isShow:false,
            ids:[],
            number:0
	}
}

export interface AddOrEditList {
      id: number,
      name: string,
      alias: string,
      status: number,
      tem_id?:number,
      note?: string
}