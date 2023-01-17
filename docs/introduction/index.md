---
title: 起步 # 配置页面标题,同时生成 <title> 标签
description: mini-i18n 是一个支持大多数小程序多语言实现的 js 库。 # 配置页面简介，同时用于生成 <meta> 标签
keywords: [mini-i18n,i18n,miniapp,wx,my,jd,tt,swan,@wooc/mini-i18n,wooc] # 配置页面关键词，同时用于生成 <meta> 标签
---


# 开始

## 什么是 mini-i18n
```mini-i18n``` 是一个实现小程序多语言的 js 库。

适合寻求框架通用、无三方依赖、且无频繁语言切换的场景使用。

切换语言时会重新加载页面，造成一定的消耗。当然也可以将该库结合三方框架的特性使用，如在 Vue 的插件中使用，将语言切换做为数据响应的出发条件使用。  

<!-- <br/> -->

## 解决的问题

随着各小程序平台的如雨后春笋般出现，相应的三方跨端框架也相应增多，解决一套代码多端部署的问题，在减少大部分开发工作的同时也带来一些问题。

如 Taro、UniApp、Mpx 等， 跨端框架支持的开发框架也不同。例如 Vue + Taro、React + Taro、Vue + Uniapp。每种跟随框架的多语言包都依赖于该框架的特性，无法通用但性能较好。

<!-- <br/> -->

## 已有多语言
### 微信官方多语言
### Mpx



<!-- <br/> -->

## 优点
 1. 不依赖任何框架、通用性较好。接入的成本低，页面改动较少。
 2. 支持 <a href='https://developers.weixin.qq.com/miniprogram/dev/framework' target="_blank">微信</a> / <a href='https://opendocs.alipay.com/mini/03lwrv' target="_blank">支付宝</a> / <a href='https://microapp.bytedance.com/docs/zh-CN/mini-app/develop/guide/start/introduction' target="_blank">字节跳动</a> / <a href='https://mp-docs.jd.com/doc/dev/framework/-1' target="_blank">京东</a> / <a href='https://smartprogram.baidu.com/docs/develop/tutorial/intro/' target="_blank">百度</a> / <a href='https://q.qq.com/wiki/develop/miniprogram/frame' target="_blank">QQ 小程序</a>


## 缺点
 1. 页面重载，重载到 ```tabbar``` 时会清空 ```tabbar``` 的页面缓存。支付宝小程序除外（支付宝使用 ```redirectTo```）。
 2. 整个页面会重新加载，频繁切换时页面消耗较大。如较少存在小程序中语言切换，影响较小。

