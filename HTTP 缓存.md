## Web 缓存的种类

### 应用层缓存

应用层缓存是指我们在代码层面上做的缓存。

### 数据库缓存

如：memcached，将查询后的数据放到内存中进行缓存。

### 浏览器缓存

通过浏览器使用 HTTP 协议与服务器交互的时候，浏览器就会根据一套与服务器约定的规则进行缓存工作。

### CDN

浏览器先向 CDN 网关发起 Web 请求，网关后面对应着多台负载均衡源服务器，会根据它们的负载请求，动态将请求转发到合适的源服务器上。从浏览器角度来看，整个 CDN 就是一个源服务器。

### 代理服务器缓存

浏览器和源服务器中间的服务器。

## 为什么需要浏览器缓存？我们需要做些什么？

为每个资源指定一个明确的缓存策略，用以定义资源是否可以缓存，由谁来缓存，可以缓存多久，并且在缓存时间到期时如何有效地重新验证。当服务器返回一个响应时，它需要在响应头中提供 Cache-Control 和 ETag。

说到浏览器中的缓存机制，其实就相当于 HTTP 协议定义的缓存机制，因为浏览器为我们实现了它。一般情况下我们会想到到 HTTP 响应头中的 Expires, Cache-Control, Last-Modified, If-Modified-Since, Etag 这样的与缓存相关的响应头信息。

但是这里我们说服务器返回一个响应时提供必要的 Cache-Control 和 Etag 即可。

这是为什么呢？因为 Cache-Control 与 Expires 的作用一致，Last-Modified 与 ETag 的作用也相近。但它们有以下区别：

![](http://jbcdn2.b0.upaiyun.com/2016/01/5ad70e71eef9b90a79ac6f3ac207d4e9.jpg)

![](http://jbcdn2.b0.upaiyun.com/2016/01/aee37d9ab5ab08910261079974e89231.jpg)

[更多](http://web.jobbole.com/84874/?utm_source=tuicool&utm_medium=referral)

