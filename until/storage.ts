/*
 * get or set localStorage
 */
import { _env, ty } from './env'

export const _storage = (handler: string, lang?: string) => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' ) {

    return _publicStorage(handler, lang)
  } else if (_env === 'alipay') {

    return _alipayStorage(handler, lang)
  } else if (_env === 'browser') {

    return _browserStorage(handler, lang)
  } else {
    console.error('不支持当前环境');
  }
}

function _publicStorage (h: string, lang?: string) {
  if(h === 'get') {
    try {
      const res = ty.getStorageSync('ty_locale')
      if (res) {
        return res
      }
    } catch (e) {
      console.error(e);
    }
  } else if(h === 'set') {
    ty.setStorage({
      key: 'ty_locale',
      data: lang
    })
  } else {
    _errorLog('_wxStorage')
  }
}

function _alipayStorage (h: string, lang?: string) {
  if(h === 'get') {
    try {
      const res = ty.getStorageSync({ key: 'ty_locale' })
      if (!res.error) {
        return res.data
      }
    } catch (e) {
      console.error(e);
    }
  } else if(h === 'set') {
    ty.setStorage({
      key: 'ty_locale',
      data: lang
    })
  } else {
    _errorLog('_alipayStorage')
  }
}

function _browserStorage (h: string, lang?: string) {
  if(h === 'get') {
    return localStorage.getItem('ty_locale')
  } else if(h === 'set') {
    localStorage.setItem('ty_locale', lang || '')
  }
}

function _errorLog (p: string) {
  throw `${p}: Please check params`
}
