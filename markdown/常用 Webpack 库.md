## 常用 Loaders 介绍

- 处理样式，转成css，如：less-loader, sass-loader
- 图片处理，如: url-loader, file-loader。两个都必须用上。否则超过大小限制的图片无法生成到目标文件夹中
- 处理js，将es6或更高级的代码转成es5的代码。如： babel-loader，babel-preset-es2015，babel-preset-react
- 将js模块暴露到全局，如果expose-loader
 
## 常用 Plugins 介绍

- 代码热替换, HotModuleReplacementPlugin
- 生成 html 文件，HtmlWebpackPlugin
- 将 css 生成文件，而非内联，ExtractTextPlugin
- 报错但不退出 webpack 进程，NoErrorsPlugin
- 代码丑化，UglifyJsPlugin，开发过程中不建议打开
- 多个 html 共用一个 js 文件(chunk)，CommonsChunkPlugin
- 清理文件夹，Clean
- 调用模块的别名 ProvidePlugin，例如想在 js 中用$，如果通过 webpack 加载，需要将 $ 与 jQuery 对应起来

