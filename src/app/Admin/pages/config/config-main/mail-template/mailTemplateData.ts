export class MailTemplateData {

  titleData: Array<string> = [
    'ID',
    '模板名称',
    '邮件标题',
    '管理操作'
  ]

  templateListData: Array<any> = []

  showDetailData: any = [
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
      name: "模版名称",
      flag: "name",
      value: null
    },
    {
      name: "邮件标题",
      flag: "title",
      value: null
    },
    {
      name: "邮件参数",
      flag: "parme",
      value: null
    },
    {
      name: "邮件内容",
      flag: "content",
      value: null
    }
  ]

  addOrEditFlag = {
    flag: 'add',
    btnName: '保存'
  }

  addOrEditList: AddOrEditList = {
    id: null,
    alias: null,
    name: null,
    title: null,
    content: null,
    parme: null
  }

  ckeditorConf = {
    toolbar:[
      ['Maximize','Source','-','Preview','Undo','Redo','Cut','Copy','Paste','PasteText'],
      ['Format','FontSize','Bold','Italic','Underline','Strike','TextColor','BGColor'],
      ['NumberedList','BulletedList','-','Outdent','Indent'],
      ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
      ['Link','Unlink']
    ]
  }

  FlyLeftData: any = {
    showText: [
      {
        name: '隐藏',
        type: '0'
      },
      {
        name: '显示',
        type: '1'
      },
      {
        name: '禁用',
        type: '2'
      }
    ],
    isShow: false,
    number: 0
  }
}

export interface AddOrEditList {
  id: number,
  alias: string,
  name: string,
  title: string,
  content?: string,
  parme: string
}

export interface TestListData {
      id: number,
      email:string,
      content:string,
      emailValid?:boolean,
      name?:string
}