## 自定义 on 函数

```
var doSth = {
  name: 'turui',
  on: function () {
    var param = [].slice.call(arguments)
    switch (param[0]) {
      case 'sayName':
        console.log('I\'m ' + this.name)
        param[1]()
        break
      case 'sleep':
        console.log('sleep')
        break
      default:
        console.log('default')
    }
  }
}

doSth.on('sayName', function () {
  console.log('uRuier')
})
```