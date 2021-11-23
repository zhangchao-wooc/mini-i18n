 /*
  * current env
  */

 export var ty:any;

 function getEnv () {
   // @ts-ignore
  if (typeof wx !== 'undefined' && wx.getSystemInfo) {
    // @ts-ignore
    ty = wx
    return 'wechat'
    // @ts-ignore
  } else if (typeof my !== 'undefined' && my.getSystemInfo) {
    // @ts-ignore
    ty = my
    return 'alipay'
    // @ts-ignore
  } else if (typeof tt !== 'undefined' && tt.getSystemInfo) {
    // @ts-ignore
    ty = tt
    return 'bytedance'
    // @ts-ignore
  } else if (typeof swan !== 'undefined' && swan.getSystemInfo) {
    // @ts-ignore
    ty = swan
    return 'baidu'
    // @ts-ignore
  } else if (typeof qq !== 'undefined' && qq.getSystemInfo) {
    // @ts-ignore
    ty = qq
    return 'qq'
    // @ts-ignore
  } else if (typeof jd !== 'undefined' && jd.getSystemInfo) {
    // @ts-ignore
    ty = jd
    return 'jd'
  } else if (typeof window !== 'undefined') {
    return 'browser'
  } else {
    console.error('_env: 不支持当前环境');
  }
}

export const _env = getEnv()

