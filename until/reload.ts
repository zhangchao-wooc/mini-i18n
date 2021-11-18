/*
 * reload Pages refresh Data
 */
import { _env, ty } from './env';

export const _reload = (i18n: any) => {
  switch(_env) {
    case 'wechat':
      _publicReload(i18n)
      break;
    case 'alipay':
      _publicReload(i18n)
      break;
    case 'baidu':
      _publicReload(i18n)
      break;
    case 'qq':
      _publicReload(i18n)
      break;
    case 'jd':
      _publicReload(i18n)
      break;
    case 'bytedance':
      _publicReload(i18n)
      break;
    case 'browser':
      window.location.reload()
    default: 
      console.error('未判断出当前环境');
  }
}

function _publicReload (i18n: any) {
  console.log('_wxReload', i18n);
  
  ty.reLaunch({
    url: i18n.homePath
  })
}

