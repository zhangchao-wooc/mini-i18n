 /*
  * current env
  */

 export var ty:any;

 function getEnv () {
   // @ts-ignore
  if (typeof wx !== 'undefined') {
    // @ts-ignore
    ty = wx
    return 'wechat'
    // @ts-ignore
  } else if (typeof my !== 'undefined') {
    // @ts-ignore
    ty = my
    return 'alipay'
  } else if (typeof window !== 'undefined') {
    return 'browser'
  }
}

export const _env = getEnv()

