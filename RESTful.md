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