export class MailRuleData{

	titleData:Array<string> = [
            'ID',
            '规则名称',
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
                  name: "模版标示",
                  flag: "alias",
                  value: null
            },
            {
                  name: "邮件标题",
                  flag: "title",
                  value: null
            },
            {
                  name: "参数",
                  flag: "parme",
                  value: null
            },
            {
                  name: "邮件内容",
                  flag: "content",
                  value: null
            }
      ]

      bindTempTitle=[
            'ID',
            '模版名称',
            '邮件标题',
            '操作'
      ]

      addOrEditList:AddOrEditList={
            id:null,
            name:null,
            note:null,
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
      status: number,
      tem_id?:number,
      note?: string,
      value?:string
}