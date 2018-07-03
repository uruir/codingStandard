# 原生数据类型

有 undefined null boolean string number object symbol 七种，symbol 在 ES6 添加，Symbol 是一个方法，`typeof Symbol(); // symbol`，不能作为构造函数使用，`new Symbol; // TypeError`。

Symbol 的作用：作为对象属性的唯一标识符，防止对象属性冲突发生。

```
let a = {age: 30, [Symbol('name')]: 'tr'}, b = {[Symbol('name')]: 'rui'}
let c = {...a, ...b} // {age: 30, Symbol(name): "tr", Symbol(name): "rui"}
```

## 基本数据类型

> 直接修改其值

- Number
- String
- Boolean - 值为`true` or `false`
- Null - 只有一个值`null`
- Undefined - 只有一个值`undefined`

### Undefined

变量已声明，但未被初始化。

使用`typeof`操作符判断数据类型时，未声明与未初始化都返回`undefined`。

```
typeof undefined // 'undefined'
```

### Null

`null`表示空对象指针，它是对象。

```
typeof null // 'object'
```

### Boolean

```
Boolean(undefined) // false
Boolean(null) // false
Boolean(false) // false
Boolean(NaN) // false
Boolean(0) // false
Boolean('') // false
```

### Number

```
Number(undefined) // NaN
Number(null) // 0
Number(true) // 1
Number(false) // 0
Number('') // 0
```

非数值 -> 数值：

- Number(); // Number('')结果为0；Number('12ab')结果为NaN
- parseInt(); // parseInt('')，结果为NaN；parseInt('12ab')，结果为12；parseInt('AF', 16)，结果为175，第一个参数不区分大小写；parseInt('0xa') or parseInt('0xa', 16)结果为10, 其它为0。第一个参数是字符串，如果没有第二个参数，则从前往后解析直至解析不了；如果有第二个参数，则按第二个参数的进制解析
- parseFloat();

`parseInt()` & `parseFloat()`都是从字符串中截取 index=0 到非数字位的数字串；`Number()`用于转换任何数据类型，比前两种要严格。

```
parseInt(1000, 8); //512
parseInt(010, 10); //8。第一个参数先转换为十进制，然后按第二个参数要求转换为相应进制的数
parseInt('0xa', 16); //10。如果第一个参数是字符串，则不转换，直接按第二个参数要求转换为相应进制数
```

除加号以外，所有运算符都不会重载，运算子当数值使用。

```
+'3'; //3
-true; //-1
log([] === []); //false，它们指向不同对象，==结果一样
undefined == null; //true，除此之外undefined or null与其它值对比都是false
```

### String

下面例子用到立即执行函数，简要说一下。在 JavaScript 中，函数有两种存在形式，一种存在于 window 对象下，即在全局变量里作为一个功能被调用；另一种是存在于其它对象中，作为它的方法。

比如创建“人”的对象，它的属性有名字、性别、爱好等属性，也有会游泳、使用计算机等技能。这些技能就是对象为人的方法。

而立即执行函数的形式为：`(function(argu) { ... })(param);`，里面的`function`是一个匿名函数，定义在`window`对象之下，要执行该函数，只要在其后加上`()`即可。

所以本来应该是这样的：`function(argu) { ... }()`，但这种情况并不符合 JavaScript 书写规范，于是把函数体用`()`括起来了。

```
// 转换字符串，直接把这段立即执行函数拷贝到浏览器的控制台即可知道它的用法
(function(str){
    var arr = str.split('-');
    var r = arr[0];
    for (var i = 1; i < arr.length; i++) {
        r += arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
    }
    console.log(r); //'getElementById'
})('get-element-by-id');
/**
 * 继续解释上面代码
 * 立即执行函数，定义函数后立刻执行。它将参数'get-element-by-id'传到了函数体内的str，str一看，参数是字符串。
 * 于是就把自己当做字符串，然后调用split方法（split是一个函数，只是委屈在字符串对象里，所以喊它方法咯），通过'-'将字符串分隔成数组，即：['get', 'element', 'by', 'id']。
 * 这里插个知识点。JavaScript是弱类型的，因此声明数值、字符串、布尔甚至是函数都只用var关键字就可以，具体指哪种类型，由变量的值决定。
 * 上面得到的数组，数组项是字符串，但也可以是数值、函数等其它类型，多种数据类型可以存在于一个数组中，相当随意。
 * 然后在for循环中对数组项进行操作，最后的console.log类型于C语言的printf，用于打印结果
 * 本示例代码上面是单选注释，这里是多行注释
 **/

// 求字符串中字符数最多的字符，下文出现的log()函数，均是console.log()函数的简写
(function a(str){
    var obj = {};
    for (var i = 0; i < str.length; i++) {
        // str[i]是变量，表示str字符串中第i个字符的值，i从0开始。这里第一个自然是'a'，所以本次的条件是obj对象有属性'a'吗？obj才刚创建当然没有，于是值为false，一元运算符!表示非，于是条件成立
        if (!obj[str[i]]) {
            obj[str[i]] = 1; // 给名为'a'的属性赋值1
        } else {
            obj[str[i]]++; // 如果有'a'，则加1
        }
    }
    // 统计每个字符的个数
    var max = -1, maxKey = '';
    for (var key in obj) {
        if (max < obj[key]) {
            max = obj[key];
            maxKey = key;
        }
    }
    log(maxKey + ': ' + max);
})('abcabcabca');

str.charCodeAt(2); // str里index为2的字符的ASCII编码。如log('a'.charCodeAt(0));，结果为97

var str = 'rui';
str.charAt(1); // 'u'，也可以用str[1]代替该方法
str.charCodeAt(1); // 117，'u'的ASCII码值
log(String.fromCharCode(104, 101, 108, 108, 111)); // 'hello'

var s = 'hello world';
log(s.substr(3, 7)); //lo worl
log(s.substring(3, 7)); //lo w
log(s.slice(3, 7)); //lo w
log(str.trim()); // 用于删除字符串`str`的前后空格。
```

## 引用数据类型（Object 类型）

除上面五种简单类型，其它所有的值都是对象，对象是一组数据与功能的集合。

对象可以通过 new 操作符后跟要创建的对象类型的名称来创建。创建 Object 类型的实例并为其添加属性和方法，就可以创建自定义对象，如：`var o = new Object();`。

数字、字符串和布尔值“貌似”对象，因为它们拥有方法，但它们是不可变的。JavaScript 中的对象是可变的键控集合（keyed collections）。

在 JavaScript 中，数组是对象，函数是对象，正则表达式也是对象。

对象是属性的容器，其中每个属性都拥有名字和值。属性的名字可以是包括空字符串在内的任意字符串，属性值可以是除`undefined`值外任何值。

JavaScript 中的对象是无类别的，它对新属性的名字和值没有约束。对象适合用于收集和管理数据。

JavaScript 包括一个原型链特性，允许对象继承另一个对象的属性。

Object 的每个实例都具有的属性和方法：

- `constructor` 保存着用于创建当前对象的函数。通过`var o = new Object();`创建的 o，则`o.constructor`就是`Object()`
- `hasOwnProperty(propertyName)` 用于检查给定的属性在当前对象实例中(而不是原型中)是否存在，其中作为参数的属性名必须以字符串指定
- `isPrototypeOf(object)` 用于检查传入的对象是否是另一个对象的原型
- `propertyIsEnumerable(propertyName)` 检查给定的属性是否能够用`for-in`语句枚举
- `toLocalString` 返回对象的字符串表示，该字符串与执行环境相对应
- `toString` 返回对象的字符串表示
- `valueOf` 返回对象的字符串、数字或布尔值表示，通常与`toString`方法的返回值相同

只有`Null` & `Undefined`没有`toString`方法。数值的`toString`方法可以传入一个数值基数，即以什么进制输出数值。

```
var arr = ['hello', 'world'];
log(Object.getOwnPropertyNames(arr)); //[ '0', '1', 'length' ]，其中length属性不可枚举，即var k in arr只有0, 1两个属性名
for (var k in arr) {
    log(arr[k]);
} //hello, world，有原型链中的属性
Object.isExtensible(a); //判断a对象是否可扩展
```

对象类型：

```
var o = [];
function dataType(v) {
    var s = Object.prototype.toString.call(v);
    return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};
log(dataType(o)); // array
```

## 基本类型与引用类型

- 基本类型值：栈内存，用`typeof`确定，如：`typeof 1; // 'number'`
- 引用类型值（对象）：堆内存，用`instanceof`确定，如：`var arr = []; arr instanceof Object; // true`

含引用类型值的变量只是一个指向该对象的指针；复制引用类型的值是复制指针。

引用类型的值（对象）是引用类型的一个实例，在 ECMAScript 中，引用类型是一种数据结构，用于将数据和功能组织在一起，类似于其它语言的类，只是 ECMAScript 不具备传统面向对象语言所支持的类、接口、继承、多态等结构，它的继承是原型继承。

所以有人说 JavaScript 是基于对象的语言，数组、函数、Math、正则表达式等都是基于 Object 类型。

推荐用对象字面量表示法创建 Object 实例：

```
var person = {
  name: 'rui',
  sex: 'male'
}
```

与之相对应的构造函数：

```
var person = new Object();
person.name = 'rui';
person.sex = 'male';
```

很明显，使用字面量表示法创建对象，书写简单，像写 JSON 一样飘逸，表意也更清楚。

访问对象属性一般使用点表示法：`person.name; //'rui'`

也可以用`[]`，`person['name']; //'rui'`，`[]`主要用于两个地方：一是那些含空格的属性；二是可以使用变量。如：`person[s] or person['hello world'];`

所有对象都有`toLocalString()`, `toString()`, `valueOf()`方法。

声明函数的两种方式：

```
// 一种
var sum = function(num1, num2) {
  return num1 + num2;
};
// 另一种
function sum(num1, num2) { return num1 + num2; }
```

每个函数内部，都预置了有两个对象：`arguments` & `this`。

```
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
log(factorial(5)); //120
```

使用`callee`是为了解藕，它指向拥有该`arguments`的函数。

`this`引用的是函数据以执行的环境对象，函数的名字只是一个饮食指针的变量。所以不同执行环境中的相同函数名的函数指向同一函数。

```
function outer() { inner(); }
function inner() { log(inner.caller); }
outer(); //[Function: outer]
```

`inner.caller`指调用了`inner()`的函数，即`outer()`。

函数是对象，所以有属性（`length`，参数个数）和方法（prototype，如`toString()`、`valueOf()`等）。

浏览器中 JavaScript 语言的对象：

- 用户定义对象
- 内建对象（native object）：如`Array`、`Math`和`Date`等
- 宿主对象（host object）：浏览器提供的对象，如`window`

## [基本包装类型](http://www.tuicool.com/articles/i2e6Bn)

为了便于操作基本类型值，ECMAScript 还提供了 3 个特殊的引用类型：

- Boolean
- Number
- String

引用类型与基本包装类型的区别：生存期。自动创建的基本包装类型的对象只存在于代码执行的瞬间，随后被销毁。

另外，Object 构造函数也会根据传入值的类型返回相应基本包装类型的实例。如：

```
var str = new Object("text");
document.write(typeof str); // object
document.write(str instanceof String); // true
```

使用 new 调用基本包装类型的构造函数，与直接调用同名的转型函数是不一样的。如：

```
var num1 = new Number("321"); // 构造函数
document.write(num1 instanceof Number); // true
document.write(typeof num1); // object

var str = "321";
var num2 = Number(str); // 转型函数
document.write(num2 instanceof Number); // false
document.write(typeof num2); // number
```

布尔表达式中的所有对象都会被转换为true。所以建议永远不要使用 Boolean 对象。

String 类型：`charAt()` & `charCodeAt()`用于访问字符串中特定字符的方法。

# typeof

```
typeof a // "undefined"
typeof 'a' // "string"
typeof 1 // "number"
typeof {} // "object", the same as [] & null
```

# instanceof

```
var a = {}
a instanceof Object // true
var a = []
a instanceof Array // true
```

# constructor

```
var a = []
a.constructor.toString() // function Array() { [native code] }
a.constructor === Array // true
a.constructor = Object // 改成了对象
```

# Object.prototype

```
const a = ['Hello','Howard']
const b = {0:'Hello',1:'Howard'}
const c = 'Hello Howard'
Object.prototype.toString.call(a) // "[object Array]"
Object.prototype.toString.call(b) // "[object Object]"
Object.prototype.toString.call(c) // "[object String]"
```
# 判断是否为数组

```
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
isArray([]) // true
```
