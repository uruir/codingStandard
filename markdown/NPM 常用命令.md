## 安装与卸载包

```
npm install packageName
npm uninstall packageName
```

安装前会先检查当前`node_modules`目录中是否已存在该包，若存在，则不管其远程是不是有新版本，都不安装。若要强行安装，使用`-f` or `--force`。

安装时使用参数`--save-dev`表示安装在`node_modules`目录下并将该模块写进`package.json`的依赖列表里；使用`-g`表示全局安装。

## 更新模块

更新`node_module`里对应包。

```
npm update packageName
```

不更改源的话，远程包存在于[NPM](https://registry.npmjs.org/)。该网址后面加上包名，即可得到该包的信息（JSON 格式），如[React](https://registry.npmjs.org/react)。当然也可以加入具体版本号得到该版本的包的信息：[React v0.14.6](https://registry.npmjs.org/react/v0.14.6)。

## 查看模块信息

```
npm info <name>
npm view <name>
npm v <name>
npm show <name>
```

以上四个命令均可查看具体包的信息。

其中：

```
dist: {
  shasum: 'b90c718b917180f2285a8f6548a390ca43c7736c',
  tarball: 'http://registry.npmjs.org/itachi/-/itachi-0.0.3.tgz'
}
```

的`tarball`即是该版本压缩包的网址。

## 缓存文件夹

```
npm config get cache
```

通过`npm cache ls react`查看包路径。

## 查看全局安装包所在文件夹

```
npm root -g
```

## 查看当前全局安装的包

```
npm ls -g
```

同样的，不使用`-g`参数表查看当前目录下安装了哪些第三方包。

```
npm ls node-sass
```

查看当前目录下包版本。

## 搜索包

```
npm search packageName
```

## 设置 NodeJS 的环境变量

```
set NODE_ENV=production // 设置当前环境为生产环境
registry=https://registry.npm.taobao.org/
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
phantomjs_cdnurl=http://npm.taobao.org/mirrors/phantomjs
ELECTRON_MIRROR=http://npm.taobao.org/mirrors/electron/
```

## 设置 npm 仓库

```
npm config set registry https://registry.npm.taobao.org
```

## 清理缓存

```
npm cache clean
```

## 重新编译

```
npm rebuild package_name
```

## 发布包

```
npm adduser
npm publish
npm unpublish <package>@<version> // 撤销自己发布的某版本代码
```

## 关闭进度条可提升安装速度？

```
npm set process=false
time npm install
```
