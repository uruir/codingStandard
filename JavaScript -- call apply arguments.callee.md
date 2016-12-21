ECMAScript 3 给 Function 的原型定义了两个方法，他们是`Function.prototype.call`和`Function.prototype.apply`，其实他们的作用是一样的，只是传递的参数不一样而已。

## apply

两个参数，第一个参数指定了函数体内`this`对象的指向，第二个参数为一个类似数组的集合，比如如下代码：

```
var yunxi = function(a, b) {
  console.log([a, b]); // [1, 2]，方括号样式不需要用引号，可以直接显示出来
  console.log(this === window); // true
};
yunxi.apply(null, [1, 2]); // null 指向 window 对象
```

## call

```
var abc = function(a, b) { 
  console.log([a, b]); // [2, "a"]
  console.log(this === window); // true
}; 
abc.call(null, 2, 'a'); 
```

## apply & call 的用途

改变函数体内`this`的指向。

```
var name1 = {
  name: 'Sasuke'
}
var name2 = {
  name: 'Itachi'
}
var name = 'uRuier'
function say(name) {
  return this.name
}
console.log(say()) // uRuier
console.log(say.call(name1)) // Sasuke
console.log(say.call(name2)) // Itachi
```

`say()` & `name` 都`window`属于对象。

```
document.getElementsByTagName("h1")[0].onclick = function() {
  console.log(this); // this 指向该元素
  var func = function(){
    console.log(this); // 打印出 window 对象
  }
  func();
}
```

点击`<h1>`元素后，第二行的`this`指元素本身，`func()`内的`this`指向`window`对象。

想要两个`this`都指向`<h1>`：

```
document.getElementsByTagName("h1")[0].onclick = function() {
  console.log(this); // this 指向该元素
  var func = function(){
    console.log(this); 
  }
  func.call(this);
}

// or
document.getElementsByTagName("h1")[0].onclick = function() {
  console.log(this); // this 指向该元素
  var _self = this;
  var func = function(){
    console.log(_self);
  }
  func();
}
```

## arguments.callee

`callee`是`arguments`的属性，当前执行环境的函数被调用时，`arguments.callee`对象会指向自身。

```
function test() {
  console.log(arguments.callee)
}

test()
```

结果与`test.toString()`一致（忽略排版）。

## Function.prototype.bind

```
Function.prototype.bind = function(context) {
  var _self = this;
  return function() {
    return _self.apply(context, arguments);
  }
}
var yunxi = {
  name: 'itachi'
};
var func = function() {
  console.log(this.name); // itachi
}.bind(yunxi); 
func();
```

