/*
 * reload Pages refresh Data
 */
import { _env, ty } from './env'
import { ReloadOptionsType } from '@types'

export const _reload = (i18n: any, options: ReloadOptionsType) => {
  switch (_env) {
    case 'wechat':
      _wxReload(i18n, options)
      break
    case 'alipay':
      _alipayReload(options)
      break
    case 'baidu':
      _wxReload(i18n, options)
      break
    case 'qq':
      _wxReload(i18n, options)
      break
    case 'jd':
      _wxReload(i18n, options)
      break
    case 'bytedance':
      _wxReload(i18n, options)
      break
    case 'browser':
      window.location.reload()
    default:
      console.error('i18n_reload不支持当前环境:', _env)
      break
  }
}

function _wxReload(i18n: any, options: ReloadOptionsType) {
  // @ts-ignore
  // const { path, query } = ty.getLaunchOptionsSync()
  // const pagesList = getCurrentPages && getCurrentPages()
  // const currentPages = pagesList.length > 1 && pagesList(pagesList.length - 1)

  // console.log('_wxReload', {
  //   launcthPath: path,
  //   launcthQuery: query,
  //   currentPagesPath: currentPages.route,
  //   currentPagesQuery: currentPages.options,
  // })
  const path = options.path ? options.path : i18n.homePath
  const query = options.query

  console.log('reload', path)

  const isQuery = query && Object.keys(query).length !== 0
  // reLaunch 关闭所有页，跳转至tabbar，晴空路由栈
  ty.redirectTo({
    url: isQuery ? joinUrl(path, query) : path,
    fail: function (err: any) {
      console.warn('_reload_redirectTo', {
        _env,
        err,
        log: `path:${path} 非tabbar页面, 即将使用 reLaunch 跳转页面：`,
        path,
        query,
      })

      ty.reLaunch({
        // redirectTo 关闭当前页，跳转至非tabbar，保留路由栈
        url: path,
        fail: function (err: any) {
          console.warn('_reload_reLaunch:', {
            _env,
            err,
            path,
            query,
          })
        },
      })
    },
  })
}

function _alipayReload(options: ReloadOptionsType) {
  // @ts-ignore
  // const { path, query } = ty.getLaunchOptionsSync()
  const path = options.path ? options.path : i18n.homePath
  const query = options.query
  const isQuery = query && Object.keys(query).length !== 0
  ty.redirectTo({
    // redirectTo 关闭当前页，跳转页面，保留路由栈
    url: isQuery ? joinUrl(path, query) : path,
    fail: function (err: any) {
      console.warn('_reload_redirectTo', {
        _env,
        err,
        path,
        query,
      })
    },
  })
}

// 拼接 url 参数
function joinUrl(route: string, params: { [propName: string]: string }) {
  let queryLength = Object.keys(params).length
  let url = route + (queryLength !== 0 ? '?' : '')
  Object.keys(params).forEach((item, index) => {
    url += item + '=' + params[item] + (index === queryLength - 1 ? '' : '&')
  })
  return url
}
