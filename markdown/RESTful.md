# Representational State Transfer

资源通过 URL 来定位，通过 POST/GET/PUT/PATCH/DELETE 等方法来操作，完成操作后通过 HTTP 的状态码 2xx/4xx 来完成状态的转换。

URL 可以理解为与关系数据库中的表结构一一对应。

## Query 用作资源的筛选

```
/animals?type=crawl&leg_num=4
```

通过查询串从数据库获取精确结果。

## HTTP 方法

HTTP 方法不表示对页面或者代码的操作，而是对资源的操作。
 
GET 方法表示获取 URL 对应的资源，POST/PUT 方法表示新建一条资源，PATCH 方法表示对 URL 对应资源的部分内容进行修改，DELETE 表示删除 URL 对应的资源。

## 优点和应用场景

综合上面所说的，RESTful 的优点：

- 不需要解释即明白某个接口设计的意图
- 接口和资源一一对应，方便写代码，甚至有一些工具（例如 sandman）能根据数据库的表结构生成对应的 RESTful 代码
- 方便做权限控制，例如只允许用户访问自己上传的文件（假设这个文件的 URL 是 /users/123/files/456），此时 URL 里面已经包含了这个用户的 id，不必再通过其他方式反查
- 为前端提供足够的灵活性
- 在 API 升级过程中 URL 的改动较少，减少版本管理的工作量

因此需要访问 RESTful API 的场景：

- 需要对数据进行灵活管理的 Web 页面
- 手机客户端的开发

REST即表述性状态传递（Representational State Transfer，简称REST）是 Roy Fielding 博士在2000年他的博士论文中提出来的一种软件架构风格。

表述性状态转移是一组架构约束条件和原则，满足这些约束条件和原则的应用程序或设计就是 RESTful。需要注意的是，REST 是设计风格而不是标准。

## HTTP

以下为 REST 基本架构的四个方法：

- GET - 用于获取数据
- PUT - 用于添加数据
- DELETE - 用于删除数据
- POST - 用于更新或添加数据

## RESTful Web Services

Web service 是一个平台独立的、低耦合的、自包含的、基于可编程的 Web应用程序，可使用开放的 XML 标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。

基于 REST 架构的 Web Services 即是 RESTful。

由于轻量级以及通过 HTTP 直接传输数据的特性，Web 服务的 RESTful 方法已经成为最常见的替代方法。可以使用各种语言（比如 Java 程序、Perl、Ruby、Python、PHP 和 Javascript）实现客户端。

RESTful Web 服务通常可以通过自动客户端或代表用户的应用程序访问。但是，这种服务的简便性让用户能够与之直接交互，使用它们的 Web浏览器构建一个 GET URL 并读取返回的内容。

## 常用 API 服务

- 回答 [yes or no](https://yesno.wtf/api) 的网站

[查看更多](http://www.runoob.com/w3cnote/restful-architecture.html)

