---
title: Mini-i18n/API # 配置页面标题,同时生成 <title> 标签
description: mini-i18n 是一个支持大多数小程序多语言实现的 js 库。 # 配置页面简介，同时用于生成 <meta> 标签
keywords: [mini-i18n,i18n,miniapp,wx,my,jd,tt,swan,@wooc/mini-i18n,wooc] # 配置页面关键词，同时用于生成 <meta> 标签
---

# API

## setLocales

语言切换

```js
/**
 * lang：'zh_CN'
 * 
 * isReload?: 是否定向到指定页面，完成页面更新。默认为 false
 * 
 * path?: string,
 * 自定义的跳转路径。 为空时，以 homePath（不建议于插件） 路径为准。 
 * 插件通常携带动态参数，建议如下方式使用
 * 插件使用自定义路径：'plugin://hello-plugin/hello-page?lang=zh' 模式
 * 
 * query?: string,
 * 参数。也可以将参数直接拼接到 path 后，如上所示
 */

i18n.setLocales({
  lang: string, 
  isReload: boolean = false,
  path?: string,
  query?: {
    [propName: string]: string
  }
})  
```

## getLocales

当前语言获取

```js
// 语言获取顺序 params lang > localStorage > userAgent > defualt Lang
i18n.getLocales()
```

## getLanguagePackList

获取当前已有的语言列表

```js
i18n.getLanguagePackList()
```

## updateLocale

语言数据增量更新。

通过后端接口，动态修改多语言显示，便于修改线上多语言展示。

```js
// 每次设置多语言时，在主文件中调用多语言接口，使用该 Api 更新多语言数据

/** 
 * 例：locales 
 *	{ 'en': {home: '首页'}, 'zh': {home: 'Home'}}
 *
 *   isReload?: 
 *   是否定向到指定页面，完成页面更新。默认 false
 *
 *   isAnalyticalData?: boolean, 
 *   是否解析数据，默认为 true，如过结构为对象、json嵌套形式，可设置为 false
 *
 *   mark?: string,          
 *   分割语言 code 的占位符，默认为 '.'
 *
 *   path?: string,
 *   自定义的跳转路径。 为空时，以 homePath（不建议于插件） 路径为准。 
 *   插件通常携带动态参数，建议如下方式使用 
 *   插件使用自定义路径：'plugin://hello-plugin/hello-page?lang=zh' 模式
 *
 *   query?: string,
 *   参数。也可以将参数直接拼接到 path 后，如上所示
 */

i18n.updateLocale({
  locales, 
  isReload = false, 
  isAnalyticalData = true, 
  mark = '.',
  path: string,
  query: {
    [propName: string]: string
  }
})  
```

