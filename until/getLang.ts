/*
 * get current language
 */
import { _env, ty } from './env'

export const getLang = () => {
  switch (_env) {
    case 'wechat':
      return _wxLang()
    case 'alipay':
      return _alipayLang()
    case 'browser':
      return window.navigator.language || ''
    default:
      break;
  }
}

function _wxLang () {
  let l
  ty.getSystemInfo({
    success: (res: { language: any }) => {
      l = res.language
    },
    fail: (err: any) => {
      console.error(err)
    }
  })
  return l
}

function _alipayLang () {
  return ty.env.language || ''
}
