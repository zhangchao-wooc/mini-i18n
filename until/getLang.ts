/*
 * get current language
 * 字节小程序获取语言api需要授权，故此处使用兜底语言，不支持自动获取当前语言，需使用时调用setlocales设置语言进行切换
 */
import { _env, ty } from './env'

export const getLang = () => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' ) {
    return _publicLang()
  } else if (_env === 'alipay') {
    return _alipayLang()
  } else if (_env === 'browser') {
    window.navigator.language || ''
  } else {
    console.error('不支持当前环境');
  }
}

function _publicLang () {
  return ty.getSystemInfoSync().language
}

function _alipayLang () {
  return ty.env.language || ''
}
