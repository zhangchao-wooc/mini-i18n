# mini-i18n
Multilingual Mini Program

# 支持 [微信](https://mp.weixin.qq.com/) / [京东](https://mp.jd.com/?entrance=taro) / [百度](https://smartprogram.baidu.com/) / [支付宝](https://mini.open.alipay.com/) / [字节跳动](https://microapp.bytedance.com/) / [QQ](https://q.qq.com/) 小程序

## 一、前言

现有三方整合框架较多，如（Taro、UniApp）且支持框架不同（例：Vue + Taro、React + Taro），每种跟随框架的多语言包都依赖于该框架的特性，无法通用但性能较好。例如：React-i18n、vue- i18n，都可以做到语言切换，页面数据响应式更新，无需重新加载，刷新整个页面消耗较大。

该库适合寻求框架通用、无三方依赖、且无频繁语言切换的场景使用。切换语言时会重新加载页面，造成一定的消耗。

当然也可以将该库结合三方框架的特性使用，如在 Vue 的插件中使用，将语言切换做为数据响应的出发条件使用。



#### 优点

1、不依赖任何框架、通用性较好。接入的成本低，页面改动较少



##### 带来的问题

1、切换语言时，会清空当前所有的路由记录，如在当前页面刷新，无法返回上一页。解决方式：传入path：每次切换语言都跳转到指定路径，如主页。

2、整个页面重新加载，频繁切换时，页面消耗较大。体验一般。如极少存在小程序中语言切换，影响较小



#### **小程序特性**

1、**tabbar（自定义除外）、**NavigationBarTitle 的设置需要通过 Api 单独设置，即使采用跟随框架的方式更新多语言，也需要额外提供函数，触发已加载页面的 **tabbar、**NavigationBarTitle 的设置函数，方可更新。

2、语言切换后，需要刷新所有接口，让后端感知，并返回相应多语言的数据或错误提示。



##### **微信**

非自定义，无法使用多语言。

自定义：可使用i18n。



##### **支付宝**

非自定义：官方支持四种语言设置：中文、英文、zh-HK、zh-TW。

自定义：可使用i18n。



## 二、使用



### 安装

```javascript
npm install @wooc/mini-i18n
```



### 创建 locales.js 语言文件

```js
// index.ts
// locales 结构如下,将语言包的key值替换为 ua.ts 中对应的value的标记。具体内容请查看
// https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts
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



#### app.ts / app.tsx

```javascript
import { i18n, t } from '@wooc/mini-i18n'
import locales from './locales' // 语言文件

// 初始化
// i18n.init({
//   locales: object;        // 兜底语言数据必须存在
//   defualtLang?: string;   // 兜底语言    默认：'en_US'
//   lang?: string;          // 当前显示语言  默认：'en_US'
//   themeColor?: string;    // 主题颜色，用于全局提示时，颜色一致  默认：'#000'
//   homePath: string;       // 语言切换后，默认跳转到的页面。
//   isHint?: boolean;       // 是否显示语言切换提示
//   isVerifiyApi?: boolean; // 是否校验当前环境mini- i18n Api 是否可用   默认：false
// })


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



### 使用

#### React

```js
import { i18n, t } from '@wooc/mini-i18n';

onShow () {
  wx.setNavigationBarTitle({title: t('login') })
}

<View className={style.tip}>{t('loginHint')}</View>
                             
                             
 <Button
    className={style.apBtn}
    style={{ backgroundColor: OEMConfig.extConfig.colorStyle.themaStyle, 		   position:'fixed',right: 0, top: '30%' }}	        
    hoverClass={style.hoverclass}
    onClick={() =>
       i18n.setLocales(i18n.getLocales() === 'zh_CN' ? 'en_US' : 'zh_CN')
    }
 >切换语言</Button>                            
```



#### Vue

```js
// plugins/t.js
export default {
  install: (app, options) => {
    app.mixin({ // 混入全局 methods 中, 否则在模版中无法使用。或是挂载到全局均可
      methods: {
        t (id: string) {
          return options(id)
        },
      }
    })
  }
}

// app.ts
import i18 from './plugins/t'

const App = createApp({

})

App.use(i18, t)

// 使用
import {i18n, t } from '@wooc/mini-i18n'

// 全局混入 methods 或 在 methods 中创建一个 t 函数，方可在模版引擎中使用
<view class="commodity-info_name">{{t(item.name)}}</view>

// setup创建时，组件实例并未创建，无法使用 methods 中的 t 函数，通过import引用方式，在 setup 中使用
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
  })
```



## **三、API**



### **1、init** **初始化**

```javascript
i18n.init({
  locales: object;        // 兜底语言数据必须存在
  defualtLang?: string;   // 兜底语言    默认：'en_US'
  lang?: string;          // 当前显示语言  默认：'en_US'
  themeColor?: string;    // 主题颜色，用于全局提示时，颜色一致  默认：'#000'
  homePath: string;       // 语言切换后，默认跳转到的页面。
  isHint?: boolean;       // 是否显示语言切换提示
  isVerifiyApi?: boolean; // 是否校验当前环境mini- i18n Api 是否可用   默认：false
})

locales: { 'en': {home: '首页'}, 'zh': {home: 'Home'}}
结构中的key值，应与 dist/until/ua.js 中对应多语言的 value 值一致
https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts

defualtLang：获取当前容器中的多语言直接传入即可，i18n中已做转换并映射到 locales 对于语言数据

lang: 同上

themeColor：十六进制颜色。如 isHint 为 true，提示框中的按钮颜色。默认为 '#000' 
// 支付宝不支持
// 字节小程序不支持，自动跟随主题色。但字节小程序中有微信小程序的实例.所以复用微信小程序api，目前可以使用

homePath：'/pages/home/index' 第一个 '/' 不可省略

isHint：是否弹出提示框，判断系统语言是否与当前小程序语言一致，如不一致弹出提示框是否切换？如下图

isVerifiyApi： 
/*
 * 校验当前环境中api是否可用。
 * 工具中使用的 Api 在各容器中的版本建议不同，某些版本下不可使用
 * 由于 canIUse 在不同环境下表现不稳定，所以暴露是否开启配置项
 * 建议将开发工具、基础库升级到主流配置。同时查看小程序后台，查看当前用户使用的基础库版本，对于指定版本的用户推送
 * 升级消息
 */
```

isHint: 

 <img src="https://img-blog.csdnimg.cn/54bde4cab16349299fee3f3ccaeb519f.png" />

###  2、setLocales 语言切换

```javascript
i18n.setLocales(lang: string)  如：'zh_CN'
```



###  3、getLocales 当前语言获取

```javascript
// 语言获取顺序 params lang > localStorage > userAgent > defualt Lang
i18n.getLocales()
```



###  4、getLanguagePackList 当前支持语言列表

```javascript
i18n.getLanguagePackList()
```



###  5、updateLocale 语言数据增量更新

```javascript
// 每次设置多语言时，在主文件中调用多语言接口，使用该 Api 更新多语言数据

i18n.updateLocale(locales)  

例：locales { 'en': {home: '首页'}, 'zh': {home: 'Home'}}
```



### 6、兜底处理



#### init 校验

校验当前传入语言包中，是否存在传入的兜底语言的语言包，如无，报错提示



#### 当前语言包是否存在

是：当前 id 是否存在 >  显示兜底语言中对应 id 的value

否：显示兜底语言中对应 id 的value



#### Ua参考

https://github.com/zhangchao-wooc/mini-i18n/blob/main/until/ua.ts



## 四、各小程序的兼容问题

### 字节小程序

1、不支持showModal中按钮颜色自定义，且字段key值不同

2、tt.getSystemInfoSync 获取的系统信息中不含有 language 字段，tt.getUserInfo 中可以获取到，但需要授权弹框，故不使用

**Tip：**在字节小程序中获取到微信小程序 wx 实例，所有字节小程序上均走 wx 实例上的api，且均可以成功调用，故功能上完全兼容字节小程。注意字节小程序将wx实例从中完全剥离时，该库则不支持字节小程序，请注意后续更新。



#### QQ小程序

1、全局也存在 wx 实例，且两个实例的变化是同步的



#### 基础库版本建议

**微信 wx**

2.1.2 及以上

**支付宝 my**

 [1.4.0](https://opendocs.alipay.com/mini/framework/lib) 及以上

**京东 jd**

1.10.8 及以上

**字节跳动 tt**

1.46.0 及以上

**百度 swan**

3.140.1 及以上
