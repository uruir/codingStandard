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

