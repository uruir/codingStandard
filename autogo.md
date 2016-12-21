# 创建命令行工具

本文档在 Windows 下运行。

## 初始化目录

```
npm init
```

如下：

```
{
  "name": "cli",
  "version": "0.0.1",
  "description": "cli demo",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "cli"
  ],
  "author": "uRuier",
  "license": "MIT"
}
```

## 创建自动运行文件

```
mkdir bin
cd bin
```

在 `bin` 文件夹下创建 `autogo.js` 文件，内容如下：

```
#! node
console.log('你好啊！')
```

`cd ..` 回到根目录，运行 `node bin/autogo.js` 即打印出：“你好啊！”。

## 绑定全局变量

在根目录的 `package.json` 文件里添加：
 
```
"bin": {
  "autogo": "./bin/autogo.js"
},
```

并运行 `npm link`，即建立了全局变量。在 Windows 里全局安装的 NPM 包位于：`C:\Users\rui\AppData\Roaming\npm`里，这时在该目录下可以看到 `autogo.cmd` 文件。

这里就可以用 `autogo` 运行文件了。

来源：[前端扫盲-之打造一个Node命令行工具](https://www.awesomes.cn/source/12?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)