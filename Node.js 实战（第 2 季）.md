> 吴中骅 雷宗民 赵坤 刘亚中 著，电子工业出版社出版 @ 2014 年 5 月 第 1 版

## 第 1 章 -- 通过 Docker 快速发布 Node.js 应用

## 第 4 章 -- 编写命令行工具 -- 打造一个静态博客系统

Node.js 除了可以编写服务器程序，也可以用来编写一些命令行工具，比如前端自动化构建工具 Gulp 就是使用 Node.js 编写的。用 Node.js 编写命令行工具除了能使用 NPM 上数十万个各类模块资源，还具有程序启动快的优势。

### 使用到的第三方模块

- [`commander`](http://tj.github.io/commanderjs) 解析命令行参数 @2.8.1
- [`Express`](http://express.com) Web 框架 @4.x
- [`serve-static`](https://www.npmjs.com/package/serve-static) 静态文件服务中间件 @1.9.3
- [`markdown-it`](https://www.npmjs.com/package/markdown-it) 渲染 Markdown 格式的文档 @4.2.2
- [`swig`](http://paularmstrong.github.io/swig) swig 语法模板引擎 @1.4.2
- [`rd`](https://www.npmjs.com/package/rd) 遍历目录下的所有文件，包括子目录 @0.0.2
- [`fs-extra`](https://www.npmjs.com/package/fs-extra) 扩展了 fs 模块的一些方法 @0.19.0
- [`open`](https://www.npmjs.com/package/open) 使用系统程序打开指定文件或网址 @0.0.5
- [`moment`](http://momentjs.com/docs) 解析、格式化日期时间 @2.10.3

