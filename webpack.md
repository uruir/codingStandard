> 为什么用 webpack

- 将多个 CSS/JS 等资源打包进一个文件里，减少请求数。可以替代 browserify/gulp
- 可以使用诸如 .vue 的文件，前端编码更灵活
- 原生支持 AMD/CommonJS 模块体系

通过 `webpack-dev-server --progress --colors` 实时更新页面调试。

## 配置文件里的模块

```
//node的路径模块
var path=require('path');
//我们是webpack当然要引入这个
var webpack = require('webpack');
//这个是构建页面资源的插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//因为我们是vue.js的应用，把各个组件当做一个页面.vue后缀，所以引入这个可以编译這些文件
var vue = require("vue-loader");
```

`webpack`是基于 NodeJS 的项目，是模块打包工具（module bundler），用于把各种有依赖关系的文件打包成一系列静态资源。

![如图](http://webpack.github.io/assets/what-is-webpack.png)

它的魅力在它的配置文件中：

```
module.exports = {
  entry: "./entry.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
```

`entry`是项目的入口文件，`output`是 webpack 处理完后的文件存放位置，`module`里的`loaders`是处理某种静态资源时所用到的模块。

webpack 提供了强大的 loader 机制和 plugin 机制，loader 机制支持载入各种各样的静态资源，不只是 js 脚本、连 html, css, images 等各种资源都有相应的 loader 来做依赖管理和打包；而 plugin 则可以对整个 webpack 的流程进行一定的控制。

比如在安装并配置了 css-loader 和 style-loader 之后，就可以通过 require('./bootstrap.css') 这样的方式给网页载入一份样式表，这比`RequireJS`这类前端模块管理器只能加载`js`文件强大许多。

`loaders`里，`test`指匹配的文件类型；`loader`是处理该类型文件所使用的库，`style!css`表示先用`css-loader`处理，再用`style-loader`处理。

webpack 背后的原理其实就是把所有的非 js 资源都转换成 js (如把一个 css 文件转换成“创建一个 style 标签并把它插入 document”的脚本、把图片转换成一个图片地址的 js 变量或 base64 编码等)，然后用 CommonJS 的机制管理起来。

## 安装

```
cnpm install -g webpack
```

## 建立项目

```
mkdir webpackDemo
cd webpackDemo
npm init
```

初始化项目时，直接回车用默认值就好。

目录结构如下：

- /app
 + index.js
 + sub.js
- package.json
- webpack.config.js

webpack 原生支持 CommonJS 和 AMD 两种风格的 JavsScript 文件。

```
// sub.js，这里使用 CommonJS 风格
function generateText() {
  var el = document.createElement('h1');
  el.innerHTML('Hello webpack');
  return el;
}
module.exports = generateText;

// index.js
var sub = require('./sub.js');
var app = document.createElement('p');
app.innerHTML = 'funny';
sub().appendChild(app);
document.body.appendChild(sub);
```

## 配置 webpack

使用配置文件（webpack.config.js）的目的是整合 app 里两个 js 文件，并把生成的 js 文件插入 HTML 文档中。

本示例使用一个插件来生成示例 HTML、自动刷新浏览器。

```
npm install html-webpack-plugin --save-dev
npm install webpack-dev-server --save-dev
```

在配置文件里写入：

```
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
// 定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  // 项目的文件夹可以直接用文件夹名称，默认会找 index.js，也可以确定是哪个文件
  entry: APP_PATH,
  // 输出的文件名，合并以后的 js 会命名为 bundle.js
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  // 添加我们的插件，会自动生成一个 html 文件
  plugins: [
    new htmlWebpackPlugin({
      title: 'Hello World app'
    })
  ],
  devServer: [
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true
  }
};
```

然后在 package.json 文件里修改 script 行：

```
"scripts": {
  "start": "webpack-dev-server --hot --inline"
},
```

在项目根目录里运行：`webpack`。

这样 webpack 便合并了两个 JavaScript 文件，生成一个 HTML 文档，并把 JS 插入文档中。

此时在浏览器里打开：`localhost:8080`，此时应出现“Hello World”。

## 添加样式

```
npm install css-loader style-loader --save-dev
```

webpack.config.js 里添加：

```
module: {
  loaders: [
    { test: '/\.css$/', loaders: ['style', 'css'], include: APP_PATH }
  ]
},
```

新建样式文件：

```
// main.js
body {
    background: yellow;
}
```

入口文件 index.js 中加入：`require('./main.css');`，这样页面背景就变黄了。

[点击原文查看更多](http://zhuanlan.zhihu.com/FrontendMagazine/20367175)


