export class configTemplateData {

      titleData: Array<any> = [
            {
                  name: "ID",
                  op: false
            },
            {
                  name: "模版名称",
                  op: false
            },
            {
                  name: "短信签名",
                  op: false
            },
            {
                  name: "第三方ID",
                  op: false
            },
            {
                  name: "第三方审核状态",
                  op: true
            },
            {
                  name: "管理操作",
                  op: false
            }
      ]

      showDetailData: any = [
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

      templateListData: Array<any> = []

      addOrEditList: AddOrEditList = {
            id: null,
            name: null,
            signature: null,
            content: null,
            parme: null
      }

      addOrEditFlag = {
            flag: 'add',
            btnName: '保存'
      }

      FlyLeftData: any = {
            ids: [],
            isShow: false,
            number: 0
      }
}

export interface AddOrEditList {
      id: number,
      name: string,
      signature: string,
      content: string,
      parme?: string
}

export interface TestListData {
      id: number,
      name?: string,
      tpl_id: string,
      mobile: number,
      data: any,
      mobileValid?:boolean
}