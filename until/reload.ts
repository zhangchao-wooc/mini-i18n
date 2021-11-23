/*
 * reload Pages refresh Data
 */
import { _env, ty } from './env';

export const _reload = (i18n: any) => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' || _env === 'alipay' ) {
    _publicReload(i18n)
  } else if (_env === 'browser') {
    window.location.reload()
  } else {
    console.error('不支持当前环境');
  }
}

function _publicReload (i18n: any) {
  ty.reLaunch({
    url: i18n.homePath
  })
}

