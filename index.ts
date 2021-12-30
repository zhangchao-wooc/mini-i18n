import { _listener, _env, getLang, region, _reload, _storage, _canIUse } from './until';
import { getValue } from './until/common';
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
 * 动态替换
 * staticS: 静态字符, 通过 t() 获取的
 * dynamicS: 动态字符, 通过接口获取的
 */
export const order = (staticS: string, dynamicS: string | number, s?: string ): string => {
  s = s ? s : '%'
  if(staticS.includes(s)) {
    return staticS.replace(s, dynamicS.toString())
  }
  return staticS
}

/*
 * 1、语言文件不存在，显示兜底语言
 * 2、指定语言文件存在，当前id无对应value，显示 key
 * 3、都不存在返回 ‘’
 */

export const t = (id:string, dynamicS?: string | number, s?: string): string => {
  const locales = i18n.allLangData[i18n.langTag]
  const defualtLocales = i18n.allLangData[i18n.defualtLangTag]
  const arr = id.split('.')
  
  if(Object.prototype.toString.call(locales) === '[object Object]' && Object.keys(locales).length !== 0) {
    try {
      const str = getValue(locales, arr)
      if(str) {
        // 第二参数存在时，为语言顺序调换
        if(dynamicS !== undefined) return order(str, dynamicS, s)
        return str
      } else {
        console.warn(`mini-i18n: 语言包 ${i18n.langTag} 中的 key：${id} 不存在，请检查接词条`)
        return  arr[arr.length - 1]
      }
    } catch (err) {
      console.warn(err);
      return arr[arr.length - 1]
    }
  }

  console.warn(`mini-i18n: 语言包 ${i18n.langTag} 内容为空，请检查接口或本地文件内容`)
  
  // 当前语言包不存在，显示兜底语言包
  if(Object.prototype.toString.call(defualtLocales) === '[object Object]' && Object.keys(defualtLocales).length !== 0) {
    try {
      const str = getValue(locales, arr)
      if(str) {
        // 第二参数存在时，为语言顺序调换
        if(dynamicS !== undefined) return order(str, dynamicS, s)
        return str
      } else {
        console.warn(`mini-i18n: 兜底语言包 ${i18n.defualtLangTag} 中的 key：${id} 不存在，请检查接词条`)
        return arr[arr.length - 1]
      }
    } catch (err) {
      console.warn(err);
      return arr[arr.length - 1]
    }
  }

  console.warn(`mini-i18n: 语言包 ${i18n.defualtLangTag} 内容为空，请检查接口或本地文件内容`)
  
  return arr[arr.length - 1]
}



