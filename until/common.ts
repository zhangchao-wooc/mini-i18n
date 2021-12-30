/*
 * 循环获取深层对象值
 */
export const getValue = (locales: object, arr: string[]): string => {
  let obj:any = locales
  arr.forEach(item => {
    // @ts-ignore
    obj = obj && obj[item] 
  })

  return obj || ''

}
