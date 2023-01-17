---
title: 使用 # 配置页面标题,同时生成 <title> 标签
description: mini-i18n 是一个支持大多数小程序多语言实现的 js 库。 # 配置页面简介，同时用于生成 <meta> 标签
keywords: [mini-i18n,i18n,miniapp,wx,my,jd,tt,swan,@wooc/mini-i18n,wooc] # 配置页面关键词，同时用于生成 <meta> 标签
---

# 使用

## 创建多语言文件

在项目根目录下创建 ```locales``` 文件夹

```locales``` 结构如下
```bash
# 支持文件类型为 .json、.js、.ts
locales
- zh.js
- en.js
```

将语言包的 ```key``` 值替换为 ```ua.ts``` 中对应的 ```value``` 的标记。具体内容请查看 <a href='https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts' target="_blank">ua.ts</a>

```js
// 与react-i18n 要求基本相同
// {
//	  "zh-Hans": zh
// 		"en": "en"
//  }
import zh from './zh';
import en from './en';

export default {
  'zh-Hans': zh,
  en
}
```
### 编辑 locales/zh.js
```js
{
  home: {
  	list: {
      title: '家庭列表',
    }
  }
}
```

### 编辑 locales/en.js
```js
{
  home: {
  	list: {
      title: 'Family list',
    }
  }
}
```

## 配置入口文件

```js
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

## 使用

### 原生小程序

```js
// js
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

### React

```js
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

### Vue 

编写 ```vue``` 插件 ```plugins/t.ts```

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

在 ```app.ts``` 中挂载插件

```js
import i18 from './plugins/t'

const App = createApp({})

App.use(i18, t)
```

```vue``` 文件中使用

```js
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

### 原生小程序插件

小程序插件中没有全局生命周期，可以看做为小程序的组件。

```js
/** locales.js 初始化 */
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

```wxs``` 中使用

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

```wxml``` 中使用

```html
<text>{{title}}</text>
```
