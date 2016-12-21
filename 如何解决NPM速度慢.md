npm全称 Node Package Manager，是 NodeJS 的模块依赖管理工具。

## 设置淘宝的CNPM源

由于 NPM 服务器在镜外，加上 GFW，速度很慢，CNPM 对 NPM 里的库进行镜像，所以可以从淘宝这个源里获取所需的包。

```
npm install -g cnpm --registry=http:registry.npm.taobao.org
```

之后除了`npm publish`操作外，都可以用`cnpm`代替。

上述是临时改变源地址来获取 CNPM，永久改变源看下面。

## 取消HTTPS

对个人来说，在这个大个开源库面前，不用太在乎安全性。

```
npm config set strict-ssl false
npm config set registry "http://registry.npmjs.org"
```

第一行是取消 HTTPS 方式，第二行是永久改变源地址。

- 淘宝的源：`http://registry.npm.taobao.org/`
- 官方的源：`https://registry.npmjs.org/`

官方源用了 HTTPS，影响了速度，所以还是用 HTTP吧。

通过`npm config get registry`查看当前使用了哪个源。

## 设置代理

```
npm config set proxy null
```

## 直接去 Github 上下载库

## 更新 NPM 版本号

```
npm install npm@latest -g
```