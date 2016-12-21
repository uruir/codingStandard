函数内变量提升：函数声明会提到`return`之前，而`var`不会。

```
var foo = function bar() {}; 
log(typeof bar); //undefined，bar的名字外部不可见
log(typeof foo); //function
log(foo.toString()); //function bar() {};

//数组的原型是Object，所以可像其它类型一样，附加属性，这不影响数组固有的length属性
var a = [];
a[0] = 1;
a[5] = 'a';
a.foo = 'c';
console.log(a); //[1, , , , , 'a', foo: 'c']
console.log(a.foo); //c
console.log(a.length); //6，即a.foo对数组长度无影响
a[7] = 'haha';
console.log(a); //[1, , , , , 'a', , 'haha', foo: 'c']
console.log(a.length); //8

//实参可以从arguments数组中修改
function foo(a) {
    arguments[0] = 2;
    console.log(a);
}
foo('a'); //2

function foo(a) {
    arguments[0] = 5;
    console.log(a);
}
delete foo.length; //该属性不能被删除
console.log(typeof foo.length); //number
```

不是所有的事件都能冒泡，如`blur/focus/load/unload`

```
typeof Object; //function
typeof Array; //function
typeof Function; //function
typeof Date; //function 
typeof Date(); //string
typeof new Date(); //object
typeof null; //object
typeof []; //object
typeof {}; //object
function F() {}; typeof new F(); //object
```

函数也是对象，由`Function`构造。

```
Object.prototype.__proto__ === null; //true
```

Object是一个函数对象，由Function构造

```
Function.prototype.prototype === undefined; //true
Function.prototype.__proto__ === Object.prototype; //true
Object.prototype.constructor === Object; //true
Object.constructor === Function; //true
```

变量提升只是提升变量名，没有提升变量值。

