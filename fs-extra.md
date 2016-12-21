[fs-extra](http://npm.taobao.org/package/fs-extra) 提供了 Node.js 内置文件模块 fs 所不具有的文件功能。它是 fs 的超集，通过`var fse = require('fs-extra');`引入，不需要再重复引入 fs 模块。

## outputFile(file, data, [options], callback)

与 fs 模块的`writeFile()`类似，如果父目录不存在则创建。

```
var fs = require('fs-extra')
var file = __dirname + '/haha.txt'

fs.outputFile(file, 'hello!', function (err) {
  console.log(err) // => null

  fs.readFile(file, 'utf8', function (err, data) {
    console.log(data) // => hello!
  })
})
```

同步版本是`outputFileSync()`。

## outputJson(file, data, [options], callback)

## readJson(file, [options], callback)

```
var fs = require('fs-extra')

fs.readJson('./output.json', function(err, obj){
  console.log(obj.name); 
})
```

## copySync(src, dest, [options])

