interface ConfigType {
  locales: LangDataType
  defualtLang?: string
  lang?: string
  themeColor?: string
  isVerifiyApi?: boolean
  isHint?: boolean
  homePath: string
}

interface LangDataType {
  [propName: string]: {
    [propName: string]: {
      [propName: string]: string
    }
  }
}

interface RegionType {
  [propName: string]: string
}

// 增量更新语言包
interface UpdateLocaleType {
  locales: LangDataType // 需要更新的语言包，结构与初始语言包必须相同，注意语言包标识
  isReload?: boolean // 是否重载到 homePath 页面。 默认为 false
  isAnalyticalData?: boolean // 是否解析数据，默认为 true，如过结构为对象、json嵌套形式，可设置为 false
  mark?: string // 分割语言 code 的占位符，默认为 '.'
  path?: string // 存在则认为，自定义重载到指定页面路径。否则走默认重载逻辑
  query?: {
    // 重载到指定页面参数
    [propName: string]: string
  }
}

interface StringToObjectType {
  key: string // 需要解析的词条
  value: string
  mark: string // 用于切割词条的标记，默认为 '.'
}

interface SetLocalesType {
  lang: string
  isReload: boolean
  path?: string // 存在则认为，自定义重载到指定页面路径。否则走默认重载逻辑
  query?: {
    // 重载到指定页面参数
    [propName: string]: string
  }
}

interface ReloadOptionsType {
  path: string
  query: {
    [propName: string]: string
  }
}

export { ConfigType, LangDataType, RegionType, StringToObjectType, UpdateLocaleType, SetLocalesType, ReloadOptionsType }
