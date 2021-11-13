import { _listener, _env, getLang, region, _reload, _storage } from './until';
import { LangDataType, ConfigType } from '@types'

// 多语言
class I18n {
  allLangData: LangDataType;
  lang: string;
  defualtLang: string;
  langTag: string;
  themeColor: string;
  currentPath: string;
  constructor () {
    this.allLangData = Object.create(null)
    this.lang = 'en-US'
    this.defualtLang = 'en-US'
    this.langTag = 'en'
    this.themeColor = '#000'
    this.currentPath = ''
    _listener(this)
  }

  init (config: ConfigType) {
    this.themeColor = config.themeColor || '#000'
    this.allLangData = config.locales ||  Object.create(null)
    this.defualtLang = config.defualtLang || 'en-US'
    const localLang = _storage('get')
    // params > localStorage > userAgent > defualt Lang
    this.lang = config.lang || localLang || getLang() || this.defualtLang
    _storage('set', this.lang)
    this.langTag = this._formatLanguageTag(this.lang)
    // @ts-ignore
    if(!config.locales[this._formatLanguageTag(this.defualtLang)]) {
      throw `The default language pack ‘${this.defualtLang}’ does not exist, please check the local language pack`
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
    const langList = this.getLanguagePackList()
    const tag = this._formatLanguageTag(lang)
    const index = langList.findIndex(item => item === tag)
    
    if(index !== -1) {
      _storage('set', lang)
      this.lang = lang
      this.langTag = tag
      _reload(this)
    }
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
  _formatLanguageTag (s: string) {
    try {
      const lang = s.includes('_') ? s.replace('_', '-').toLowerCase() : s.toLowerCase()
      return region[lang]
    } catch (err) {
      console.log(err);
      throw `Please check if the lang tag ${s} is correct`
    }
  }
  
}

export const i18n = new I18n()
/*
 * 1、语言文件不存在，显示兜底语言
 * 2、指定语言文件存在，当前id无对应value，显示兜底语言id对应的value
 */
export const t = (id:string) => {
  // @ts-ignore
  if(i18n.allLangData[i18n.langTag]) {
  // @ts-ignore
    return i18n.allLangData[i18n.langTag][id] || i18n.allLangData[i18n._formatLanguageTag(i18n.defualtLang)][id]
  }
  // @ts-ignore
  return i18n.allLangData[i18n._formatLanguageTag(i18n.defualtLang)][id]
}

