/*
 * get current language
 */
import { _env, ty } from './env'

export const getLang = () => {
  switch (_env) {
    case 'wechat':
      return _publicLang()
    case 'alipay':
      return _alipayLang()
    case 'baidu':
      return _publicLang()
    case 'qq':
      return _publicLang()
    case 'jd':
      return _publicLang()
    case 'bytedance':
      // 字节小程序获取语言api需要授权，故此处使用兜底语言，不支持自动获取当前语言，需使用时调用setlocales设置语言进行切换
      return ''
    case 'browser':
      return window.navigator.language || ''
    default:
      break;
  }
}

function _publicLang () {
  return ty.getSystemInfoSync().language
}

function _alipayLang () {
  return ty.env.language || ''
}
