/*
 * 监听重新打开小程序之后的系统语言是否变化
 */
import { _env, ty } from '../until';
import { _hint } from './hint';

export const _listener = (i18n: any) => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' || _env === 'alipay' ) {
    _publicListener(i18n)
  } else if (_env === 'browser') {
    // window.onload()
  } else {
    console.error('_listener: 不支持当前环境');
  }
}

function _publicListener (i18n: any) {
  ty.onAppShow((res: any) => {
    _hint(i18n)
  })
}
