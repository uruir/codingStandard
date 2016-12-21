## request

`request.url`为请求的 URL，通过`url.parse(request.url).pathname`得到请求路径。

`request.method`为`GET` || `POST`之类的方法。

`req.params`数组对象

`req.query`解析过的请求参数对象

`req.body`解析过的请求体，由 express 的中间件 bodyParser() 提供，解析 POST 的 body

`req.cookies`由 cookieParser() 提供，是一个对象

`req.get(field)`请求头里的值，如：`req.get('content-type')`

`req.path`返回请求的路径名，可由`req.url`里求出

## response

`res.status(404).sendFile('404.html')`

```
res.set({
  'Content-Type': 'text/plain',
  'Content-Length': '123',
  'ETag': '12345'
})
```

以上是`res.header(field, [value])`的别名。

`res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });`

`res.redirect(301, 'http://example.com');`

`res.charset = 'value';`

`res.send(404, 'Sorry, we cannot find that!');`




