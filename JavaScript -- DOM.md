## 通过文档碎片构建 DOM

```
var frag = document.createDocumentFragment()
for (var i = 0; i < 1000; i++) {
  var el = document.createElement('p')
  el.innerHTML = i
  frag.appendChild(el)
}
document.body.appendChild(frag)
```

使用`innerHTML`代替 DOM 构建工作：

```
var html = []
for (var i = 0; i < 1000; i++) {
  html.push('<p>' + i + '</p>')
}
document.body.innerHTML = html.join('')
```

## 使用 firstChild & nextSibling 代替 childNodes 遍历 DOM

