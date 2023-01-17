---
title: Mini-i18n/Config # 配置页面标题,同时生成 <title> 标签
description: mini-i18n 是一个支持大多数小程序多语言实现的 js 库。 # 配置页面简介，同时用于生成 <meta> 标签
keywords: [mini-i18n,i18n,miniapp,wx,my,jd,tt,swan,@wooc/mini-i18n,wooc] # 配置页面关键词，同时用于生成 <meta> 标签
---

# 配置

## Init 初始化

```js
import locales from './locales' // 语言文件

i18n.init({
  locales: locales        // 兜底语言数据必须存在
})
```

## 兜底语言

当系统语言不支持时，显示为兜底语言

```js
import locales from './locales' // 语言文件

i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  defualtLang: 'en'
})
```

## 指定语言

当前环境下指定显示的语言。

获取当前容器中的多语言直接传入即可，可使用 [getLocales](/api#getlocales) 获取。```i18n``` 中已做转换并映射到 ```locales``` 对于语言数据。也可通过 [setLocales](/api#setlocales) 动态设置

```js
import locales from './locales' // 语言文件

i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  lang: 'en'
})
```

## 语言切换提示

在用户的系统语言发生改变后，弹框提示用户当前小程序语言与系统语言不符，选择切换语言或保持当前语言显示。  

默认为 ```false```，侦测系统语言发生变化，自动刷新页面，切换为当前语言展示，如不支持当前语言则显示为默认语言。

弹框中的语言只支持中英文展示。

```js
import locales from './locales' // 语言文件

// 是否弹出提示框，判断系统语言是否与当前小程序语言一致，如不一致弹出提示框是否切换？如下图
i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  isHint: true
})
```

<img src="https://img-blog.csdnimg.cn/54bde4cab16349299fee3f3ccaeb519f.png" />

:::warning
插件中不可使用：```isHint```，因为插件中没有 <a href='https://developers.weixin.qq.com/miniprogram/dev/api/base/app/app-event/wx.onAppShow.html' target="_blank">onAppShow API</a>
:::

## 默认主题色

当 ```isHint``` 为 ```true``` 时有效。设置提示弹框中按钮的颜色，便于与小程序主题色统一。

十六进制默认为 ```'#000'```

```js
import locales from './locales' // 语言文件

// 是否弹出提示框，判断系统语言是否与当前小程序语言一致，如不一致弹出提示框是否切换？如下图
i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  isHint: true,
  themeColor: '#000'
})
```

:::warning
1. 支付宝小程序不支持。
2. 字节小程序不支持，自动跟随主题色。但字节小程序中有微信小程序的实例，所以复用微信小程序 ```API```。
:::

## 重载路径

语言切换重新加载时默认跳转到的页面。 建议为首页，不建议插件中使用。

```js
import locales from './locales' // 语言文件

i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  homePath: '/pages/home/index'
})
```

## API 校验

校验当前环境 ```Mini-i18n Api``` 是否可用。

**插件中不可使用**，因为插件中没有 <a href='https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.canIUse.html' target="_blank">canIUse</a> 及其它众多 ```API```。 工具中使用的 ```API``` 在各容器中的版本不同，某些版本下不可使用。

由于 <a href='https://developers.weixin.qq.com/miniprogram/dev/api/base/wx.canIUse.html' target="_blank">canIUse</a> 在不同环境下表现不稳定，所以暴露是否开启配置项。建议将开发工具、基础库升级到主流配置。同时查看小程序后台，查看当前用户使用的基础库版本，对于指定版本的用户推送升级消息

```js
import locales from './locales' // 语言文件

i18n.init({
  locales: locales,        // 兜底语言数据必须存在
  isVerifiyApi: false      // 默认：false
})
```

## 兜底处理

### init 校验

```js
校验当前传入语言包中，是否存在传入的兜底语言的语言包，如无，控制台提示
```

### 当前语言包是否存在

```js
是：当前 id 是否存在 > 显示兜底语言中对应 id 的 value

否：显示兜底语言中对应 id 的 value > key。

提示：控制台提示相应语言包不存在，对应的词条不存在
```

### Ua 参考

<a href='https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts' target="_blank">链接</a>
