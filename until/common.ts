import { LangDataType, StringToObjectType } from 'types'
import merge from './merge'
/*
 * 解析接口的多语言数据，为对象嵌套
 */
class AnalyticalData {
  newData: LangDataType
  constructor() {
    this.newData = {}
  }
  analyticalData(data: any, mark: string): object {
    Object.keys(data).forEach((item, index) => {
      this.newData[item] = {}
      let obj = {}
      Object.keys(data[item]).forEach((it, id) => {
        const o = this.stringToObject({ key: it, value: data[item][it], mark })
        merge(obj, o)
      })
      this.newData[item] = obj
    })
    return this.newData
  }

  // 三级嵌套整合
  stringToObject({ key, value, mark }: StringToObjectType): object {
    const arr = key.split(mark)
    const l = arr.length
    const obj: any = {}
    if (l > 1 && obj[arr[0]] === undefined) {
      obj[arr[0]] = {}
    } else if (l === 1) {
      obj[arr[0]] = value
    }

    if (l > 2 && obj[arr[0]][arr[1]] === undefined) {
      obj[arr[0]][arr[1]] = {}
    } else if (l === 2) {
      obj[arr[0]][arr[1]] = value
    }

    if (l === 3) {
      obj[arr[0]][arr[1]][arr[2]] = value
    }

    return obj
  }
}

export const dealData = new AnalyticalData()
/*
 * 循环获取深层对象值
 */
export const getValue = (locales: object, arr: string[]): string => {
  let obj: any = locales
  arr.forEach((item) => {
    // @ts-ignore
    obj = obj && obj[item]
  })

  return obj || ''
}
