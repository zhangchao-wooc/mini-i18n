/*
 * reload Pages refresh Data
 */
import { _env, ty } from './env'

export const _reload = (i18n: any) => {
  switch (_env) {
    case 'wechat':
      _wxReload(i18n)
      break
    case 'alipay':
      _alipayReload()
      break
    case 'baidu':
      _wxReload(i18n)
      break
    case 'qq':
      _wxReload(i18n)
      break
    case 'jd':
      _wxReload(i18n)
      break
    case 'bytedance':
      _wxReload(i18n)
      break
    case 'browser':
      window.location.reload()
    default:
      console.error('i18n_reload不支持当前环境:', _env)
      break
  }
}

function _wxReload(i18n: any) {
  // @ts-ignore
  const { path, query } = ty.getLaunchOptionsSync()
  console.log('_wxReload', path, query)

  const isQuery = query && Object.keys(query).length !== 0
  // reLaunch 关闭所有页，跳转至tabbar，晴空路由栈
  ty.redirectTo({
    url: isQuery ? joinUrl(path, query) : '/' + path,
    fail: function (err: any) {
      console.log('_reload', err, '非tabbar页面, 即将使用 reLaunch 跳转页面：', `/${path}`)

      ty.reLaunch({
        // redirectTo 关闭当前页，跳转至非tabbar，保留路由栈
        url: `/${path}`,
      })
    },
  })
}

function _alipayReload() {
  // @ts-ignore
  const { path, query } = ty.getLaunchOptionsSync()
  const isQuery = query && Object.keys(query).length !== 0
  ty.redirectTo({
    // redirectTo 关闭当前页，跳转页面，保留路由栈
    url: isQuery ? joinUrl(path, query) : '/' + path,
  })
}

// 拼接 url 参数
function joinUrl(route: string, params: { [propName: string]: string }) {
  let queryLength = Object.keys(params).length
  let url = '/' + route + (queryLength !== 0 ? '?' : '')
  Object.keys(params).forEach((item, index) => {
    url += item + '=' + params[item] + (index === queryLength - 1 ? '' : '&')
  })
  return url
}
