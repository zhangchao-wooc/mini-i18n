/*
 * 校验当前环境中api是否可用。
 * 工具中使用的 Api 在各容器中的版本建议不同，某些版本下不可使用
 * 由于 canIUse 在不同环境下表现不稳定，所以暴露是否开启配置项
 * 建议将开发工具、基础库升级到主流配置。同时查看小程序后台，查看当前用户使用的基础库版本，对于指定版本的用户推送升级消息
 */
import { _env, ty } from './env'

const apiVerify = {
  public: {
    'getSystemInfoSync': 'getSystemInfoSync',
    'showModal': 'showModal',
    'onAppShow': 'onAppShow',
    'reLaunch': 'reLaunch',
    'getStorageSync': 'getStorageSync',
    'setStorage': 'setStorage'
  },
  alipay: {
    'env': 'env.language',
    'confirm': 'confirm'
  }
}

export const _canIUse = () => {
  if ( _env === 'wechat' || _env === 'baidu' || _env === 'qq' || _env === 'jd' || _env === 'bytedance' ) {
    Object.keys(apiVerify.public).forEach((item: string, index) => {
      // @ts-ignore
      if(!ty.canIUse(apiVerify.public[item])) {
        throw `${item} 不支持当前版本，请升级到支持 Api ${item} 的基础库或开发工具到指定版本。`
      }
    })
    console.log('mini-i18n: Api 在当前环境可用');
    
  } else if (_env === 'alipay') {
    Object.keys(apiVerify).forEach((item: string, index) => {
      // @ts-ignore
      Object.keys(apiVerify[item]).forEach((it: string, id) => {
        // @ts-ignore
        if(!ty.canIUse(apiVerify[item][it])) {
          // @ts-ignore
          throw `${it} 不支持当前版本，请升级到支持 Api ${it} 的基础库或开发工具到指定版本。`
        }
      })
    })
    console.log('mini-i18n: Api 在当前环境可用');
  } else {
    console.error('mini-i18n: 不支持当前环境');
  }
}

