<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img alt="Vuetify Logo" width="100" src="https://www.wooc.top/favicon.ico">
  </a>
</p>

<p align="center">
  <!-- <a href="https://github.com/vuetifyjs/vuetify/actions?query=workflow%3ACI">
    <img src="https://github.com/vuetifyjs/vuetify/workflows/CI/badge.svg?branch=master&event=push" alt="CI badge">
  </a>
  <a href="https://codecov.io/gh/vuetifyjs/vuetify">
    <img src="https://img.shields.io/codecov/c/github/vuetifyjs/vuetify.svg" alt="Coverage">
  </a> -->
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/dt/@wooc/mini-i18n.svg" alt="Downloads">
  </a>
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/dm/@wooc/mini-i18n.svg" alt="Downloads">
  </a>
  <!-- <br> -->
  <a href="https://github.com/vuetifyjs/vuetify/blob/master/LICENSE.md">
    <img src="https://img.shields.io/npm/l/@wooc/mini-i18n.svg" alt="License">
  </a>
  <!-- <a href="https://app.zenhub.com/workspace/o/vuetifyjs/vuetify/boards">
    <img src="https://img.shields.io/badge/Managed_with-ZenHub-5e60ba.svg" alt="zenhub">
  </a> -->
  <!-- <a href="https://community.vuetifyjs.com">
    <img src="https://discordapp.com/api/guilds/340160225338195969/widget.png" alt="Chat">
  </a> -->
  <!-- <br> -->
  <a href="https://www.npmjs.com/package/vuetify">
    <img src="https://img.shields.io/npm/v/@wooc/mini-i18n.svg" alt="Version">
  </a>
  <!-- <a href="https://cdnjs.com/libraries/vuetify">
    <img src="https://img.shields.io/cdnjs/v/@wooc/mini-i18n.svg" alt="CDN">
  </a> -->
</p>


# 一、前言

现有三方框架较多，如（Taro、UniApp）且支持框架不同（例：Vue + Taro、React + Taro）。每种跟随框架的多语言包都依赖于该框架的特性，无法通用但性能较好。

该库适合寻求框架通用、无三方依赖、且无频繁语言切换的场景使用。切换语言时会重新加载页面，造成一定的消耗。当然也可以将该库结合三方框架的特性使用，如在 Vue 的插件中使用，将语言切换做为数据响应的出发条件使用。
<br/>

### 优点

>1. 不依赖任何框架、通用性较好。接入的成本低，页面改动较少  
>2. 支持 [微信](https://mp.weixin.qq.com/) / [京东](https://mp.jd.com/?entrance=taro) / [百度](https://smartprogram.baidu.com/) / [支付宝](https://mini.open.alipay.com/) / [字节跳动](https://microapp.bytedance.com/) / [QQ](https://q.qq.com/) 小程序  


### 缺点

>1. 页面重载，重载到 tabbar 时会清空 tabbar 的页面缓存。支付宝小程序除外（支付宝使用 redirectTo）。
>2. 整个页面会重新加载，频繁切换时页面消耗较大。如较少存在小程序中语言切换，影响较小。

<br/>

## 小程序特性
### 标题

Tabbar（自定义除外）、NavigationBarTitle 的设置需要通过 Api 单独设置，即使采用跟随框架的方式更新多语言，也需要额外提供函数，触发已加载页面的 Tabbar、NavigationBarTitle 的设置函数更新页面数据。

### 接口

语言切换后，需要刷新所有接口并附带当前语言标记，让后端感知并返回相应多语言的数据或错误提示。
<br/>

### 跳转至小程序
1. 公众号跳转至小程序页面（或小程序中的插件页面）

2. 小程序跳转至小程序

3. H5 跳转至小程序

4. 微信链接跳转至小程序

```ts
// 上述的跳转方式都可以通过以下 API 拿到当前打开页面的信息来源
onAppShow: referrerInfo // 来源信息
getLaunchOptionsSync: referrerInfo scene // 1.来源信息 2.场景值
```
<br/>

### 小程序插件

本地缓存、运行时缓存和宿主小程序共享内存但各自环境独立，并且没有全局的生命周期，可以看做小程序中的一个组件。所以实现时主要需要考虑插件中的以下几点
  

1. 多语言工具不重复初始化
```ts
// 可以通过 API （当前所有语言的集合）字段，判断长度是否大于 0 
i18n.getLanguagePackList
```  

<br/>

2. 宿主语言的语言环境参数传递
```sh
- 本地缓存：环境相互隔离。       此路不通

- 路径传参：可以实现。          plugin://hello-plugin/demo?lang=en_US

- 插件主文件：可以实现。         需要在跳转插件之前调用主文件中方法如下代码所示
```

<span style="padding-left: 20px;">2.1. 插件使用示例</span>

```js
// 插件主文件 index.js
import { i18n } from '@wooc/mini-i18n'
import locales from '../../locales/index' // 引入脚本自动执行初始化操作

module.exports = {
  init(lang) {
  	i18n.setLocales(lang || 'zh_CN') // 默认语言
  }
}

// 宿主环境使用
const plugin = requirePlugin('hello-plugin')
Page({
  data: {},
  onLoad() {
    plugin.init('zh_CN') // 当前语言环境标记，可通过小程序 Api 获取
  },
})
```

﻿
<br/>
3. 页面渲染后的数据更新

在初始化、更改语言后的页面已经渲染。
```ts
// 通过 setData 实现页面的及时渲染
this.setData({title1: t('home.device_list.room_manage')})
```
<br/>
4. 多语言接口动态更新语言

接口返回多语言数据，调用 API 完成，即可通过页面重载，更新多语言数据
```ts
i18n.updateLocale(obj)
```
<br/>

## 各小程序特性
### 支付宝小程序

>非自定义多语言：官方支持四种语言设置：中文、英文、zh-HK、zh-TW。
>
>自定义多语言：可使用i18n。  

<br/>

### 微信及其他小程序

> 非自定义多语言： 无法使用多语言。可通过 API 设置 tabbar 多语言  
> 
> 自定义多语言： 可使用i18n。

<br/>

# 二、mini-i18n 使用

## 安装

```javascript
npm install @wooc/mini-i18n
```

<br/>

## 创建 locales 语言文件

```js
// index.ts
// locales 结构如下,将语言包的key值替换为 ua.ts 中对应的value的标记。具体内容请查看
// https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts
// 与react-i18n 要求基本相同
// {
//	  "zh-Hans": zh
// 		"en": "en"
//  }
// 语言文件为对象嵌套格式
import zh from './zh';
import en from './en';

export default {
  'zh-Hans': zh,
  en
}
```

<br/>

## 入口文件 app.ts / app.tsx 配置

```javascript
import { i18n, t } from '@wooc/mini-i18n'
import locales from './locales' // 语言文件

onLaunch (options) {
  i18n.init({
    locales,
    lang: 'zh_CN',
    defualtLang: 'en_US'
    isHint: true,
    themeColor: '#ff6600',
    homePath: '/pages/my/index'
  })
},
```

<br/>

## 基础使用

```ts
{
  home: {
  	list: {
      title: '家庭列表',
      go_to: '前往%'
    }
  }
}

/** 1. 获取词条 */
t('home.list.title')

/**
 *  2. 动态拼接
 *  第二个参数为动态参数
 *  第三个参数为占位符，默认为'%', 也可自定义。为了满足不同语言翻译时顺序不一致时词条的位置动态拼接
 *  替换词条中的'%'为动态参数。输出: 前往涂鸦智能
 */
t('home.list.go_to', '涂鸦智能', '%')

```

<br/>

## 小程序中

```js
/** JS */
import { t } from '@wooc/mini-i18n'

Page({
  data: {},
  onLoad() {
    this.setData({
      title: t('home.device_list.room_manage')
    })
  },
})
```

```html
<!-- wxs 中无法引入外部 js 使用 -->

<!-- WXML -->
<button id="add" bindtap="addItem">{{ title }}</button>
```

<br/>

## React 中

```tsx
import { i18n, t } from '@wooc/mini-i18n';

onShow () {
  wx.setNavigationBarTitle({title: t('login') })
}

  <View className={style.tip}>{t('loginHint')}</View>
                             
                             
  <Button
    className={style.apBtn}
    style={{ backgroundColor: OEMConfig.extConfig.colorStyle.themaStyle, position:'fixed',right: 0, top: '30%' }}	        
    hoverClass={style.hoverclass}
    onClick={() => {
      i18n.setLocales(i18n.getLocales() === 'zh_CN' ? 'en_US' : 'zh_CN')
    }}
  >
    切换语言
  </Button>                            
```

<br/>

## Vue 中

编写 vue 插件 plugins/t.ts 
```js
export default {
  install: (app, options) => {
    /** 混入全局 methods 中, 否则在模版中无法使用。或是挂载到全局均可 */
    app.mixin({ 
      methods: {
        t (id: string) {
          return options(id)
        },
      }
    })
  }
}
```
<br/>

在 app.ts 中挂载插件
```ts
import i18 from './plugins/t'

const App = createApp({})

App.use(i18, t)

```
<br/>

vue 文件中使用
```ts
import {i18n, t } from '@wooc/mini-i18n'

/** 全局混入 methods 或 在 methods 中创建一个 t 函数，方可在模版引擎中使用 */
<view class="commodity-info_name">{{t(item.name)}}</view>

/** setup创建时，组件实例并未创建，无法使用 methods 中的 t 函数，通过import引用方式，在 setup 中使用 */
setup(){
  const state = reactive({
    msg: t('home'),
    menuItems: [
      {
        name: t('chinese'),
        value: 'zh_CN'
      },
      {
        name: t('english'),
        value: 'en_US'
      },
    ],
  })

  onMounted(() => {
    Taro.setNavigationBarTitle({title: t('home')})
  })

  return {onMounted, ...toRefs(state)}
}
```
<br/>

## 原生小程序插件中

小程序插件中没有全局生命周期，可以看做为小程序的组件。
```js

/** locales.ts 初始化 */
import { i18n, t } from '@wooc/mini-i18n'
import zh from './zh-Hans';
import en from './en';

const locales =  {
  'zh-Hans': zh,
  en
}

const isInit = Object.keys(i18n.allLangData)

/** 防止多次 init */
isInit && i18n.init({
  locales,
  lang: 'zh_CN',
  defualtLang: 'en_US',
  isHint: false,
})
```
<br/>

wxs 中使用
```js
import { i18n, t } from '@wooc/mini-i18n'

Page({
  data: {},
  onLoad(options) {
    const { lang } = options
    if(lang !== i18n.getLocales()) {
      i18n.setLocales({
        lang: 'zh_CN', 
        isReload: true, 
        path 'plugin://hello-plugin/hello-page?lang=zh'
      })
    }
    // setLocales(lang) 时页面已经渲染。使用setData 触发页面的数据更新
    this.setData({title: t('home.device_list.room_manage')})
  },
})
```
<br/>

wxml 中使用
```html
  <text>{{title}}</text>
```

<br/>

# 三、API


## 1.init 初始化

```javascript
/** 
 * locales
 *  { 'en': {home: '首页'}, 'zh': {home: 'Home'}}
 *  结构中的key值，应与 dist/until/ua.js 中对应多语言的 value 值一致
 *  https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts
 * 
 * 
 * defualtLang
 *  获取当前容器中的多语言直接传入即可，i18n中已做转换并映射到 locales 对于语言数据
 * 
 * 
 * lang: 同上
 * 
 * 
 * themeColor
 *  十六进制颜色。如 isHint 为 true，提示框中的按钮颜色。默认为 '#000' 
 *  支付宝不支持
 *  字节小程序不支持，自动跟随主题色。但字节小程序中有微信小程序的实例.所以复用微信小程序api，目前可以使用
 * 
 * 
 * homePath 
 *  '/pages/home/index' 重新加载指向的页面。插件中使用时通常带有动态参数，建议插件中使用
 *   setLocales，updateLocale 中的自定义路径，方便携带动态参数
 *  
 * 
 * isHint
 *  是否弹出提示框，判断系统语言是否与当前小程序语言一致，如不一致弹出提示框是否切换？如下图
 *  插件中不可使用：isHint，因为插件中没有 onAppShow API
 * 
 * 
 * isVerifiyApi
 *  校验当前环境中api是否可用。插件中不可使用，因为插件中没有 canIUse 及其它众多 API
 *  工具中使用的 Api 在各容器中的版本建议不同，某些版本下不可使用
 *  由于 canIUse 在不同环境下表现不稳定，所以暴露是否开启配置项
 *  建议将开发工具、基础库升级到主流配置。同时查看小程序后台，查看当前用户使用的基础库版本，对于指定版本的用户推送
 *  升级消息
 *  
 */
i18n.init({
  locales: object;        // 兜底语言数据必须存在
  defualtLang?: string;   // 兜底语言    默认：'en_US'
  lang?: string;          // 当前显示语言  默认：'en_US'
  themeColor?: string;    // 主题颜色，用于全局提示时，颜色一致  默认：'#000'
  homePath: string;       // reload 默认跳转到的页面, 建议为首页，不建议插件中使用。
  isHint?: boolean;       // 是否显示语言切换提示
  isVerifiyApi?: boolean; // 是否校验当前环境mini- i18n Api 是否可用   默认：false
})

```

<br/>

### isHint

 <img src="https://img-blog.csdnimg.cn/54bde4cab16349299fee3f3ccaeb519f.png" />

<br/>

##  2. setLocales 语言切换

```javascript
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

<br/>

##  3. getLocales 当前语言获取

```javascript
// 语言获取顺序 params lang > localStorage > userAgent > defualt Lang
i18n.getLocales()
```

<br/>

##  4. getLanguagePackList 当前已有的语言列表

```javascript
i18n.getLanguagePackList()
```

<br/>

##  5. updateLocale 语言数据增量更新

```javascript
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

<br/>

## 6.兜底处理

### init 校验

>校验当前传入语言包中，是否存在传入的兜底语言的语言包，如无，控制台提示

<br/>

### 当前语言包是否存在

>是：当前 id 是否存在 >  显示兜底语言中对应 id 的value
>
>否：显示兜底语言中对应 id 的value > key。
>
>提示：控制台提示相应语言包不存在，对应的词条不存在

<br/>

### Ua 参考

https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts

<br/>

# 四、 各小程序的兼容问题

## 字节小程序

- 不支持showModal中按钮颜色自定义，且字段key值不同

- tt.getSystemInfoSync 获取的系统信息中不含有 language 字段，tt.getUserInfo 中可以获取到，但需要授权弹框，故不使用

> Tip: 在字节小程序中可以获取到微信小程序 wx 实例，所有字节小程序上均走 wx 实例上的api，且均可以成功调用，故功能上完全兼容字节小程。注意字节小程序将wx实例从中完全剥离时，该库则不支持字节小程序，请注意后续更新。

<br/>

## QQ 小程序

> 全局也存在 wx 实例，且两个实例的变化是同步的

<br/>

# 五、 基础库版本建议

#### 微信 wx

> 2.1.2 及以上

#### 支付宝 my

> [1.4.0](https://opendocs.alipay.com/mini/framework/lib) 及以上

#### 京东 jd

> 1.10.8 及以上

#### 字节跳动 tt

> 1.46.0 及以上

#### 百度 swan

> 3.140.1 及以上
