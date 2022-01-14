/*
 * 深度合并 deepMergeObject
 */

const merge = (target: any, source: any) => {
  return deep(target, source)
}

const deep = (target: any, source: any) => {
  Object.keys(source).forEach((item, index) => {
    if (!isObject(source[item])) {
      target[item] = source[item]
    } else {
      // @ts-ignore
      deep(target[item], source[item])
    }
  })
  return target
}

const isObject = (item: any) => {
  return Object.prototype.toString.call(item) === '[object Object]'
}

// let a = {
//   'zh-Hans': {
//     home: {
//       index: {
//         a: 1,
//       },
//     },
//   },
//   en: {
//     home: {
//       index: {
//         b: 1,
//       },
//     },
//   },
// }

// let b = {
//   'zh-Hans': {
//     home: {
//       index: {
//         a: 2,
//         b: 3,
//       },
//     },
//   },
// }
// // @ts-ignore
// console.log(JSON.stringify(merge(a, b)))

export = merge
