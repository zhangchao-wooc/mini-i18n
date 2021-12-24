import { _listener, _env, getLang, region, _reload, _storage, _canIUse } from './until';
import { LangDataType, ConfigType } from '@types'

// 多语言
class I18n {
  allLangData: LangDataType;
  lang: string;
  defualtLang: string;
  langTag: string;
  defualtLangTag: string;
  themeColor: string;
  homePath: string;
  isVerifiyApi: boolean;
  isHint: boolean
  constructor () {
    this.allLangData = Object.create(null)
    this.lang = 'en-US'
    this.defualtLang = 'en-US'
    this.langTag = 'en'
    this.defualtLangTag = 'en'
    this.themeColor = '#000'
    this.homePath = '' // 切换语言、跳转页面。建议为首页
    this.isVerifiyApi = false // 是否开启 校验当前环境mini- i18n Api 是否可用 
    this.isHint = false
  }

  init (config: ConfigType) {
    console.log('mini-i18n init...');
    this.isVerifiyApi = config.isVerifiyApi || this.isVerifiyApi 
    this.isVerifiyApi && _canIUse()

    this.themeColor = config.themeColor || this.themeColor 
    this.allLangData = config.locales ||  Object.create(null)

    this.defualtLang = config.defualtLang || this.defualtLang
    this.defualtLangTag = this._formatLanguageTag(this.defualtLang) || this.defualtLangTag

    const localLang = _storage('get')
    // params > localStorage > userAgent > defualt Lang
    this.lang = config.lang || localLang || getLang() || this.defualtLang
    this.langTag = this._formatLanguageTag(this.lang)
    _storage('set', this.lang)

    !!config.isHint &&  _listener(this)
    this.homePath = config.homePath || this.homePath
    // @ts-ignore
    if(!config.locales[this._formatLanguageTag(this.defualtLang)]) {
      throw `默认语言 ‘${this.defualtLang}’ 的文件不存在, 请检查多语言文件配置是否正确`
    }
  }

  getLocales () {
    return _storage('get') || this.lang
  }

  getEnv () {
    return _env
  }

  getLanguagePackList () {
    return Object.keys(this.allLangData)
  }

  setLocales (lang: string) {
    _storage('set', lang)
    this.lang = lang
    this.langTag = this._formatLanguageTag(lang)
    _reload(this)
  }

  updateLocale (obj: LangDataType) { // 更新语言文件的数据
    Object.keys(obj).forEach((item:string) => {
      Object.keys(obj[item]).forEach((key:string) => {
        this.allLangData[item][key] = obj[item][key]
      })
    })
    _reload(this)
  }

  // 小程序语言标记：zh_CN  浏览器语言标记：zh-CN 不一致。统一转化为zh-cn 小写 + '-', return region中对应的语言标记
  // 当前传入语言没有对应的tag时，返回兜底语言tag
  _formatLanguageTag (s: string) {
    const lang = s.includes('_') ? s.replace('_', '-').toLowerCase() : s.toLowerCase()
      
    if (region[lang]) {
      return region[lang]
    }
    return this.defualtLangTag
  }
}

export const i18n = new I18n()

/*
 * 1、语言文件不存在，显示兜底语言
 * 2、指定语言文件存在，当前id无对应value，显示 key
 * 3、都不存在返回 ‘’
 */
export const t = (id:string) => {
  const locales = i18n.allLangData[i18n.langTag]
  const defualtLocales = i18n.allLangData[i18n.defualtLangTag]
  const arr = id.split('.')
  
  if(Object.prototype.toString.call(locales) === '[object Object]' && Object.keys(locales).length !== 0) {
    return eval('locales.' + id) || arr[arr.length - 1] || ''
  }

  // 当前语言包不存在，显示兜底语言包
  if(Object.prototype.toString.call(defualtLocales) === '[object Object]' && Object.keys(locales).length !== 0) {
    return eval('defualtLocales.' + id) || arr[arr.length - 1] || ''
  }

  console.warn(`mini-i18n: 语言包 ${i18n.lang} 内容为空，请检查接口或本地文件内容`)
  return arr[arr.length - 1]
}



