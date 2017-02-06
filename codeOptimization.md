## 条件判断

`boolean || condition`

代替

```
if (!boolean) {
  condition
}
```

## 检测是否包含元素/属性

```
var arr = [1, 2, 3]
console.log(1 in arr) // 1 是 index

var obj = {
  add: function(){
    console.log('add')
  },
  get: function(){
    console.log('add')
  },
  remove: function(){
    console.log('add')
  }
}
console.log('put' in obj) // false
```