- Function
- Array
- Date
- RegExp
- Error

## 自定义 on 函数

当将函数和对象合写在一起时，函数就变成了“方法”。

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