POST 的 `content-type` 有两种：

- `application/x-www-form-urlencoded` 文本表单，用 `querystring` 解析
- `multipart/form-data` 文件表单

文件上传时，`Content-Type` 里 `boundary` 的值即是边界字符串。

![image_1ano1muahnbj11as1uhf80t1uc19.png-167.2kB][1]

字段部分（header_field）和数据部分使用一个空行（\r\n）分隔。

每一部分数据以边界字符串分隔，最后的边界字符串追加了 `--`。

GET & POST 都不安全，只要不是 HTTPS，那么均可以明文看到其传输的内容。


  [1]: http://static.zybuluo.com/uruir/7e0qdgztprfdwu7k8ykoge9l/image_1ano1muahnbj11as1uhf80t1uc19.png
