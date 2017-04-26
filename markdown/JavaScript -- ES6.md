# ECMAScript 6 核心内容

是 JavaScript 语言的下一代标准，在 2015 年发布，也称为 ECMAScript 2015。

## Babel

是一个广泛使用的 ES6 转码器，可以将 ES6 代码转为 ES5 代码，从而在现有环境中执行。

## let, const

用 `let` 声明的变量拥有块级作用域，不会进行变量提升；`const` 用于声明常量（函数应当是常量），全局环境下优先使用。

```
const arr = [1, 3, 5, 7]
const [a, b, c] = arr
```

## class, extends, super

```
class Animal {
  constructor(){
    this.type = 'animal'
  }
  says(sth){
    alert(this.type + ' says ' + sth)
  }
}

let human = new Animal()
human.says('hello')

class Male extends Animal {
  constructor(){
    super() // 不这样子类就无`this`
    this.type = 'Male'
  }
}

let male = new Male()
male.says('I'm a male')
```

## arrow function

```
function(i){return i + 1;} // ES5
(i) => i + 1 // ES6

function(x, y) {
  x--
  y++
  return x + y
}
(x, y) => { x--; y++; return x + y }
```

箭头函数里的`this`继承外层代码块的`this`。

```
class Animal {
  constructor(){
    this.type = 'animal'
  }
  says(sth){
    setTimeout(() => {
      alert(this.type + ' says ' + sth)
    }, 1000)
  }
}

var animal = new Animal()
animal.says('hi') // animal says hi
```

## template string

```
$("#result").append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

保留\`\`里的所有空格和缩进，变量用`${}`标识。

## destructuring

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

看下面的例子：

```
let cat = 'ken'
let dog = 'lili'
let zoo = {cat: cat, dog: dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
```

用 ES6 完全可以像下面这么写：

```
let cat = 'ken'
let dog = 'lili'
let zoo = {cat, dog}
console.log(zoo)  //Object {cat: "ken", dog: "lili"}
```

反过来可以这么写：

```
let dog = {type: 'animal', many: 2}
let { type, many} = dog
console.log(type, many)   //animal 2
```

## default, rest

`default`很简单，意思就是默认值。大家可以看下面的例子，调用`animal()`方法时忘了传参数，传统的做法就是加上这一句`type = type || 'cat'`来指定默认值。

```
function animal(type){
    type = type || 'cat'  
    console.log(type)
}
animal()
```

如果用 ES6 我们而已直接这么写：

```
function animal(type = 'cat'){
    console.log(type)
}
animal()
```

最后一个`rest`语法也很简单，直接看例子：

```
function animals(...types){
    console.log(types)
}
animals('cat', 'dog', 'fish') //["cat", "dog", "fish"]
```

而如果不用 ES6 的话，我们则得使用 ES5 的`arguments`。

## Promise

```
var p = new Promise(function(resolve, reject){
  console.log('1'); // 1
  // 运行后续的 callback 列表，例如：then,when等。否则，不会执行then里面的函数
  resolve('go next');
});

// 只考虑成功
p.then(function(){
  console.log(2, arguments); // 2 { '0': 'go next' }
  return 'next';
}, null).then(function(){
  console.log(3, arguments) // 3 { '0': 'next' }
}, null);
```


    
