```
Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
}
String.method('a', function() {
  console.log('这是');  
  return this;
});
String.method('b',function(){
  console.log('链式调用');
  return this;
});
String.method('c',function(){
  console.log('的例子');
  return this;
});
var str = '';
console.log(str.a().b().c()); // 这是链式调用的例子，有换行
```

即每次调用`str`的方法后都返回`this`。