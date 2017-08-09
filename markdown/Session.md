## cookie & session

- 客户端向服务端请求数据
- 服务端向客户端发送 cookie
- 客户端保存 cookie
- 之后每次请求同一服务端都会自动带上该 cookie，直到 cookie 失效（浏览器关闭或者限制时间）

### 设置 cookie

- `path` 匹配的路径
- `expires & maxAge` 过期时间；若无这两项，则每次关闭浏览器时清除 session cookie
- `secure` 值为 true 时，cookie 只在 HTTPS 中有效
- `httpOnly` 值为 true 时不允许脚本操作 document.cookie

### session

将 session_id 保存在 cookie 中，在 Express 里默认为 connect.sid，通过它识别用户身份。
