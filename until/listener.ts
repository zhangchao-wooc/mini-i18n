/*
 * 监听重新打开小程序之后的系统语言是否变化
 */
import { _env, ty } from '../until';
import { _hint } from './hint';

export const _listener = (i18n: any) => {
  
  switch(_env) {
    case 'wechat':
      _wxListener(i18n)
      break;
    case 'alipay':
      _alipayListener(i18n)
      break;
    case 'browser':
      window.location.reload()
      break;
    default: 
      console.error('未判断出当前环境');
  }
}

function _wxListener (i18n: any) {
  // ty.onAppRouteDone((res: { path: string; query: {} }) => {
  //   const { path, query } = res
  //   const q = Object.keys(query)
  //   let p = path + (q.length ? '?' : '')
  //   q.forEach((item: string, index: number) => {
  //     // @ts-ignore
  //     p += item + '=' + query[item] + (index === q.length - 1 ? '' : '&')
  //   })
  //   console.log('onAppRouteDone', p);
    
  //   i18n.currentPath = p
  // })
  ty.onAppShow((res: any) => {
    _hint(i18n)
  })
}

function _alipayListener (i18n: any) {
  ty.onAppShow((res: any) => {
    _hint(i18n)
  })
}
