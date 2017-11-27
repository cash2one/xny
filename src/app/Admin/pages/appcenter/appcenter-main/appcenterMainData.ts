export class appcenterMainData {

      titleData: Array<any> = [
            '排序',
            'ID',
            '缩略图',
            '应用名称',
            '应用标识',
            '最新版本号',
            '应用类型',
            '状态',
            '管理操作'
      ]

      showDetailData: any = [
            {
                  name: "缩略图图标",
                  flag: "thumb_icon_40x40",
                  value: null,
                  img:true,
                  imgImg:true,
                  imgIcon:false
            },
            {
                  name: "应用 ID",
                  flag: "id",
                  value: null
            },
            {
                  name: "应用名称",
                  flag: "name",
                  value: null
            },
            {
                  name:"应用类型",
                  flag:"type",
                  value:null
            },
            {
                  name:"推荐度",
                  flag:"position",
                  value:null
            },
            {
                  name: "应用标识",
                  flag: "model",
                  value: null
            },
            {
                  name: "最新版本",
                  flag: "version",
                  value: null
            },
            {
                  name:"创建于",
                  flag:"created_at",
                  value:null
            },
            {
                  name:"更新于",
                  flag:"updated_at",
                  value:null
            },
            {
                  name: "状态",
                  flag: "status",
                  value: null
            },
            {
                  name: "内容",
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