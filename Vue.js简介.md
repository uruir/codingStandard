# [Vue.js - a introduction](http://zhuanlan.zhihu.com/evanyou/20302927)

[Vue.js](http://vuejs.org/) 是一个用来开发Web界面的前端库，2014年2月第一次公开发布，配合周边工具，可以称为框架。

本文来源于 Vue.js 的作者在知乎的回答。

## 响应式编程

```
// html
<div id="example">
  {{ msg }}
</div>

// javascript
var obj = {
  msg: 'Hello Vue.js'
}

new Vue({
  id: 'example',
  data: obj
})
```

这样就把视图和模型绑定到一起了，双向的。它也提供了计算属性：

```
var ex = new Vue({
  data: {
    a: 1
  },
  computed: {
    b: function() {
      return this.a + 1
    }
  }
})

ex.a // 1
ex.b // 2
ex.a++  
ex.b // 3
```

当 a 改变时，b 也会跟着改变。

## 组件化

Vue.js 设计了 `*.vue` 格式的文件，将样式、脚本、模板集成到这一个文件当中，每个文件就是一个组件，同时还包含了文件之间的依赖关系。

[*.vue格式的示例文件](http://vuejs.org/images/vue-component.png)

并且支持各种方言，如下：

[带方言的*.vue格式文件](http://vuejs.org/images/vue-component-with-pre-processors.png)

```
var Ex = Vue.extend({
  template: '<div>{{ msg }}</div>',
  data: function() {
    return {
      msg: 'Hello Vue.js'
    }
  }
})

// 将上述组件注册为<example>标签
Vue.component('example', Ex)

// 像其它组件一样使用
<example></example>
```

[组件](http://cn.vuejs.org/guide/components.html)可以套其它组件，为了与其它组件有效组构，组件可以： 

- 有 props 来定义如何接收外部数据
- 用自定义事件向外传递信息
- 用 <slot> API 将外部动态传入的内容（其它组件或HTML）和自身模板进行组合

每个组件可以被独立的测试。

## 模块化

可以与 [Browserify](http://browserify.org/) & [webpack](http://webpack.github.io/) 及 ES2015 配合使用，每个 Vue 组件都可以看做一个独立的模块。

因为 Vue 会自动用 Vue.extend 把对象转为组件构建函数，所以在模块里不需要自己调用 Vue.extend，直接导出一个对象即可。

```
// ComponentA.js
export default {
  template: '<div>{{ msg }}</div>',
  data () {
    return {
      msg: 'Hello Vue.js'
    }
  }
}

// App.js
import ComponentA from './ComponentA'
export default {
  components: { ComponentA },
  template: `
    <div>
      <p>Now I'm using another componet.</p>
      <component-a></component-a>
    </div>
  `
}
```

可以把一个组件的模板、样式和脚本都放在同一个文件里，并且有正确的语法高亮。只要配合 [vue-loader](https://github.com/vuejs/vue-loader) 就能做到。

```
<!-- myComponent.vue -->

<!-- CSS -->
<style>
  .msg {
    color: red;
  }
</style>

<!-- template -->
<template>
  <div class="msg">{{ msg }}</div>
<template>

<!-- JavaScript -->
<script>
export default {
  props: ['msg'],
  created() {
    console.log('myComponent created!');
  }
}
</script>
```

- Vue 文件格式支持局部 CSS，只要在`<style>`标签里加入`scoped`属性
- 每一个 Vue 组件最终都被编译为纯粹的 JavaScript 模块
- Vue 的 <script> 默认支持 ES2015
- 可以在每一个语言块中使用预处理器
- 当使用 webpack + vue-loader 时，可以借助 webpack 将静态资源作为模块依赖来处理

![具体的 Vue 组件](https://pic4.zhimg.com/6af17bf9a1a6eadb50d5545313c1db77_b.jpg)

![支持热替换](http://blog.evanyou.me/images/vue-hot.gif)

## 动画

Vue 的反应式系统使得它可以用来开发数据驱动的逐帧动画，这一类逐帧动画在基于脏检查或是 Vitual DOM 的框架中，往往会导致性能问题，而 Vue 是改了什么计算什么，性能不是问题。

## 路由

单页应用必备。

```
// JavaScript
import Vue from 'vue'
import VueRouter from 'vue-router'
impot App from './app.vue'
import ViewA from './view-a.vue'
import ViewB from './view-b.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/a': { component: ViewA },
  '/b': { component: ViewB }
})

router.start(App, '#app')

// HTML
<div>
  <h1>This is the layout that won't change</h1>
  <router-view><!-- matched component renders here --></router-view>
</div>
```

[实例](https://github.com/vuejs/vue-hackernews)

[更多](http://teahour.fm/2015/08/16/vuejs-creator-evan-you.html)

vue-loader是webpack插件，webpack是前端构建工具。NodeJS符合CommonJS的模块格式，在ES6出来前，前端模块化最早有AMD格式（浏览器里异步加载）。Browserify把用CommonJS规范写的脚本打包成一个文件放在浏览器里跑，后来webpack出现了。