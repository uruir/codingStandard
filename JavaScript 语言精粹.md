> JavaScript: The Good Parts, written by Douglas Crockford, published by 电子工业出版社 @ 2009 / 04

## 杂谈

编写并运行JS只需要浏览器和文本编辑器。

本书都会用到一个method方法去定义新方法，如下：

```
Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};
```

## 语法

### 空白

JS提供两种方式注释程序，一种是用`/* */`包围的块注释，另一种是用`//`开头的行注释。

### 标识符

标识符由一个字母开头，其后可选择性加字母、数字或下划线，用于语句、变量、参数、属性名、运算符和标记。JS不允许使用保留字定义变量或参数，也不允许在对象字面量中，或一个属性存取表达式的点号之后使用保留字作为对象的属性名。

### 数字

JS只有一个单一的数字类型，在内部被表示为64位的浮点数，和Java的`double`一样，所以1和1.0是相同的值。

NaN是一个数值，表示一个不能产生正常结果的运算结果，如除数为零的情况。NaN不等任何值，包括它自己，可以用`isNaN(number)`检测NaN，如`isNaN('name')`的值为`true`。

值`Infinity`表示所有大于1.79769313486231570e+308的值。

数字拥有方法，如可以使用`Math.floor(number)`把数字转成整数，后文使用了`Math['floor'](number)`。

### 字符串

字符串字面量可以被包围在单引号或双引号中，可能包含0个或多个字符。`\`是转义字符，JS在被创建的时候，Unicode是一个16位的字符集，所以JS中的所有字符都是16位。

转义字符允许把那些正常情况下不被允许插入到字符串中，如反斜线、引号和控制符。`\u`约定允许指定用数字表示的字符码位，如`'A' === '\u0041'`，结果为`true`。

字符串有一个`length`属性，如`'seven'.length`的值为5。

字符串一旦创建，值不可变。

字符串的方法，如`'cat'.toUpperCase() === 'CAT'`，结果为`true`。

### 语句

一个编译单元一组可执行的语句。在Web浏览器中，每个`<script>`标签都提供一个被编译且立即执行的编译单元。因为缺少链接器（Linker，是一个程序，将一个或多个由编译器或汇编器生成的目标文件外加库链接为一个可执行文件），JS把它们一起抛入一个公共的全局名字空间中。

当`var`语句被用在函数的内部时，它定义了这个函数的私有变量。

`switch`、`while`、`for`和`do`语句允许有一个可选的前置标签（`label`），它配合`break`语句使用。

语句通常从上而下顺序执行，可以通过条件语句（`if`和`switch`）、循环语句（`while`、`for`和`do`）、强制跳转语句（`break`、`return`和`throw`）和函数调用来改变执行序列。

代码块是包在一对`{}`中的语句，JS中的代码块不会创建新的作用域。因此变量应该被定义在函数的顶端，而不是代码块中。

下列值为假

- false
- null
- undefined
- ''
- 0
- NaN

其它所有值为真，如所有的对象。需要额外说明的是，`typeof null`的值为`object`。

`switch`中的`case`表达式中可以使用变量。

for in语句会枚举一个对象的所有属性名（键名），包括原型链中的属性。如

```
for (v in obj) {
  if (obj.hasOwnProperty(v)) { ... }
}
```

其中的`hasOwnProperty`方法检测属性是否是对象的自有属性。

PS：JS不允许在`return`关键字和表达式之间换行，不允许在`break`关键字和标签之间换行。

### 表达式

运算符优先级
|符号|解释|
|:---:|:---:|
|`.` `[]` `()`|属性存取及函数调用|
|`delete` `new` `typeof` `+` `-` `!`|一元运算符|
|`*` `/` `%`|乘法、除法、取模|
|`+` `-`|加法/连接、减法|
|`>=` `<=` `>` `<`|不等式运算符|
|`===` `!==`|等式运算符|
|`&&`|逻辑与|
|`\|\|`|逻辑或|
|`? :`|三元运算符|

`typeof`运行符产生的值有`number`、`string`、`boolean`、`undefined`、`function`、`object`。如果运算数是数组或`null`，则结果为`object`，因为数组是对象啊，而任一一个对象的原型链的顶端就是`null`啊！

`+`运算符可以进行加法运算或字符串连接，如果需要加法运算，则两个运算数都需要是数字。

### 字面量

对象字面量是一种方便指定新对象的表示法。属性名可以是标识符或字符串。这些名字被当作字面量名而不是变量名来对待，所以对象的属性名在编译时才能知道。属性的值就是表达式。

数组字面量是一个方便指定新数组的表示法。

### 函数

函数字面量定义了函数值。它可以有一个可选的名字，用于递归地调用自己。它可以指定一个参数列表，这些参数将作为变量由调用时传递的实际参数初始化。函数的主体包括变量定义和语句。

## 对象

### 对象字面量

在对象字面量中，如果属性名是一个合法的JS标识符且不是保留字，并不强制要求用引号括住属性名。所以用引号括住“first-name”是必须的，但是否括住“first_name”则是可选的，理由是后者是一个标准的变量名。

### 检索

有两种方式查询属性值

- obj.name：优先使用
- obj[name]：通常用于`obj['first-name']`或是属性名是变量的情况

若检索不存在的成员元素值，则返回`undefined`。

`\|\|`运算符可以用来填充默认值。

检索一个`undefined`值将会导致`TypeError`，可以通过`&&`运算符避免错误。如：`obj.birth && obj.birth.year`。

### 更新

对象中的值可以通过赋值语句来更新，若对象无此属性，则扩充到该对象中。

### 引用

对象通过引用来传递，它们永远不会被拷贝。

```
var a = {}, b = {}, c = {};
a = b = c = {}; //a, b, c引用同一个空对象
```

### 原型

每个对象都连接一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象都连接到`Object.prototype`这个JS中标准的对象。

当创建一个新对象时，可以选择某个对象作为它的原型。通过给Object增加一个beget方法，这个beget方法创建一个使用原对象作为其原型的新对象。

```
if (typeof Object.beget !== 'function') {
  Object.beget = function (o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  };
}
var another_stooge = Object.beget(stooge);
```

原型连接只有在检索值的时候才被用到。如果尝试去获取对象的某个属性值，且该对象没有此属性名，那么JS会试着从原型对象中获取属性值。依次往上寻找，直到到达Object.prototype。如果到顶都未找到，返回`undefined`，这个过程称为委托。

原型关系是一种动态的关系。如果添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

```
stooge.profession = 'actor';
another_stooge.profession; //'actor'
```

### 反射

`typeof`操作符用于确定属性的类型，如：`typeof flight.number; //'number'`。

原型链中的任何属性也会产生一个值，如：`typeof flight.toString; //'function'`。这里`toString`方法是原型链中`Object`对象的方法。

另外`hasOwnProperty`方法，可以检测是否为对象独有的属性，它不会检查原型链。如：`flight.hasOwnProperty('toString'); //false`。

### 枚举

for in语句可以用来遍历对象中的所有属性名，可以使用`hasOwnProperty`方法过滤原型链中的属性，结合使用`typeof`排除函数。如下：

```
var name;
for (name in another_stooge) {
  if (typeof another_stooge[name] !== 'function') { ... }
}
```

属性名出现的顺序不固定。若想以特定顺序出现，使用数组，如下：

```
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];
for (var i = 0, len = properties.length; i < len; i++) { ... }
```

### 删除

`delete`运算符可以用来删除对象的属性。它移除对象中确定的属性，不删除原型链中的属性。

### 减少全局变量污染

JS编程中应尽量少用全局变量，若要用，定义唯一一个全局变量，如：`var myGlobalVar = {};`。

另一种减少全局污染（对需要信息进行隐藏）的方法是使用闭包。

## 函数

JS中最好的特性就是它对函数的实现，函数包含一组语句，它们是JS的基础模块单元，用于代码利用、信息隐藏和组合调用。函数用于指定对象的行为。一般来说，所谓编程就是将一组需求分解成一组函数与数据结构的技能。

### 函数对象

在JS中，函数就是对象。对象是“键/值”对的集合并拥有一个连到原形对象的隐藏连接。对象字面量产生的对象连接到Object.prototype。函数对象连接到Function.prototype（该原形对象本身连接到Object.prototype）。每个函数在创建时附有两个附加的隐藏属性：函数的上下文和实现函数行为的代码。

每个函数对象在创建时也随带有一个prototype属性。它的值是一个拥有constructor属性且值为该函数的对象。这和隐藏连接到Function.prototype完全不同。

因为函数是对象，所以它们可以像任何其它的值一样被使用。函数可以存入在变量、对象和数组中，函数可以被当作参数传递到其它函数，函数可以返回函数。而且，因为函数是对象，所以函数可以拥有方法。函数的与众不同在于可以被调用。

### 函数字面量

函数对象可以通过函数字面量来创建

```
var add = function (a, b) {
  return a + b;
}
```

函数字面量包括四部分

- 保留字`function`
- 函数名，可以被省略（此时称为匿名函数）
- 包围在圆括号中的一组参数，每个参数用英文逗号隔开。这些参数将被定义为函数中的变量，当函数被调用时这些变量初始化为实际提供的参数的值
- 包围在`{}`中的一组语句，是函数的主体，当函数被调用时执行

函数字面量可以出现在任何允许表达式出现的地方。函数也可以定义在其它函数中，一个内部函数可以访问自己的参数和变量，也能访问它被嵌套在其中的外部函数的参数和变量。通过函数字面量创建的函数对象包含一个连到外部上下文的连接，这称为闭包。

### 调用

调用一个函数将暂停当前函数的执行，传递控制权和参数给新函数，除了声明时定义的形式参数，每个函数接收两个附加的参数：`this` & `arguments`。`this`的值取决于调用模式，JS有四种调用模式

- 方法调用模式
- 函数调用模式
- 构造器调用模式
- `apply`调用模式

调用运算符是跟在任何产生一个函数值的表达式之后的一对`()`。`()`内可包含零或多个由英文逗号隔开的表达式，每个表达式产生一个参数值，每个参数值被赋予函数声明时定义的形式参数名。参数过多，忽略超出的；过少，缺失的值为`undefined`。

#### 方法调用模式

当函数被保存为对象的一个属性时，该函数称为方法。当一个方法被调用时，`this`被绑定到该对象。

```
var obj = {
  val: 0;
  increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};
obj.increment(); //1
obj.increment(2); //3
```

通过`this`可取得它所属对象的上下文的方法称为公共方法。

#### 函数调用模式

当一个函数并非一个对象的属性时，那么它被当作一个函数来调用：`var sum = add(3, 4); //7`。

当函数以此模式调用时，`this`绑定到全局对象。如果该方法定义了一个变量`that`并给它赋值为`this`，，那么内部函数就可以通过变量`that`访问到`this`。伪代码如下

```
obj.double = function () {
  var that = this;
  var helper = function () {
    that.value = add(that.value, that.value);
  };
  helper(); //以函数的形式调用helper
};
obj.double(); //以方法的形式调用double
```

#### 构造器调用模式（不推荐）

JS是一门基于原型继承的语言，这意味着对象可以直接从其它对象继承属性（主流编程语言多是基于类的语言）。

如果在一个函数前面使用`new`来调用，那么将创建一个隐藏连接到该函数的`prototype`成员的新对象，同时`this`将会被绑定到那个新对象上。`new`前缀会改变`return`语句的行为。

```
var Quo = function (string) {
  this.status = string;
};
// 给Quo的所有实例提供一个公共方法
Quo.prototype.getStatus = function () {
  return this.status;
};
var myQuo = new Quo('confused');
```

结合`new`前缀调用的函数叫构造器函数，按约定，使用大写字母开头定义变量。

#### Apply调用模式

JS的函数可以拥有方法。

`apply`方法让我们构建一个参数数组并用其去调用函数，也允许选择`this`的值，`apply`方法接收两个参数，第一个为将被绑定给`this`的值，第二个就是参数数组。

```
var arr = [3, 4];
var sum = add.apply(null, arr);

var statusObj = {
  status: 'ok'
};
// statusObj没继承Quo.prototype
var status = Quo.prototype.getStatus.apply(statusObj);
```

这样`statusObj`便拥有了`Quo.prototype.getStatus`方法。

### 参数

当函数被调用时，会得到一个`arguments`伪数组。该伪数组拥有`lenght`属性，但缺少其它数组方法。

### 返回

一个函数总会返回一个值（通过`return`或执行到函数尾的`}`时），没指定则为`undefined`。如果函数以在前面加上`new`前缀的方式来调用，且返回值不是一个对象，则返回`this`。

### 异常

```
var add = function (a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}
var tryIt = function () {
  try {
    add('seven');
  } catch (e) {
    log(e.name + ': ' + e.message);
  }
}
tryIt();
```

一个try语句只会有一个将捕获所有异常的catch代码块。

### 给类型增加方法

JS允许给语言的基本类型增加方法，通过`Object.prototype`添加方法来使得该方法对所有对象可用。这种方式对函数、数组、字符串、数字、正则表达式和布尔值都适用。如：

```
Number.method('integer', function () {
  return Math[this < 0 ? 'ceil' : 'floor'](this); // Math[x]，这里x是变量或表达式，如果是点运算符，则只能是常量了
});
log((-10 / 3).integer()); // -3
```

通过给基本类型增加方法，可以大大提高语言的表达力。因为JS原型继承的动态本质，新的方法立刻被赋予到所有的值（对象实例）上，哪怕值是在方法被创建之前就创建好了。

### 递归

### 作用域

在编程语言中，作用域控制着变量与参数的可见性及生命周期。减少命名冲突，提供自动内存管理。

由于JS无块级作用域，尽量将声明统一放置于函数体内最顶部。

### 闭包

作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了`this`和`arguments`）。

内部函数拥有比它的外部函数更长的生命周期。

和以对象字面量形式去初始化myObj不同，通过调用一个函数的形式去初始化myObj，该函数将返回一个对象字面量，此函数定义了一个value变量，该变量对increment和getValue方法总是可用，但函数的作用域使得value在程序的其它部分是不可见的。

```
var myObj = function () {
  var value = 0;
  return {
    increment: function (inc) {
      value +=  typeof inc === 'number' ? inc : 1;
    },
    getValue: function () {
      return value;
    }
  }
}();
myObj.getValue(3); // 3
```

上面并没有把一个函数赋值给myObj，而是把调用该函数后返回的结果赋值给它。

```
var fade = function (node) {
  var level = 1;
  var step = function () {
    var hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};
fade(document.body);
```

上例中，页面的背景颜色将由黄（#ff0）渐变到白（#fff）。

### 回调 - Callbacks

### 模块 - Module

使用函数和闭包来构造模块。模块是一个提供接口却隐藏状态与实现的函数或对象。通过使用函数去产生模块，几乎可以完全摒弃全局变量的使用。

```
String.method('deentityify', function () {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };
  return function () {
    return this.replace(/&([^&;]+);/g, function (a, b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  }
}());
console.log('&lt;&quot;&gt;'.deentityify()); // <">
```

模块模式的一般形式是：一个定义了私有变量和函数的函数，利用闭包创建可以访问私有变量和函数的特权函数，最后返回这个特权函数，或者把它保存到一个可以访问到的地方。

使用模块模式可以摒弃全局变量的使用，它促进了信息隐藏和其它优秀的设计实践，对应用程序的封装或者构造其它单例对象，都很有用。

模块模式也可以用来产生安全的对象。

```
var serialMaker = function () {
  var prefix = '';
  var seq = 0;
  return {
    setPrefix: function (p) {
      prefix = String(p);
    },
    setSeq: function (s) {
      seq = s;
    },
    gensym: function () {
      var r = prefix + seq;
      seq += 1;
      return r;
    }
  };
};
var seqer = serialMaker();
seqer.setPrefix('Q');
seqer.setSeq(1000);
var unique = seqer.gensym(); // Q1000
```

seqer包含的方法没用到`this`，因此没有办法损害seqer。除非调用对应的方法，否则无法改变`prefix` or `seq`的值。seqer对象是可变的，所以它的方法可能会被替换掉，但替换后的方法依然不能访问私有成员。seqer就是一组函数的集合，而且那些函数被授予特权，拥有使用或改变私有状态的能力。

### 级联 - Cascade

有一些方法没有返回值，如一些设置或修改对象的某个状态却不返回任何值的方法就是典型的例子。如果让这些方法返回`this`而不是`undefined`，就可以启用级联。在一个级联中，可以在单独一条的语句中依次调用同一个对象的很多方法。一个启用级联的Ajax类库可能允许以这样的形式去编码。

### 套用

套用允许将函数与传递给它的参数相结合去产生一个新的函数。

### 记忆 - Memoization

保存运算结果供以后使用。

## 继承

在基于类的语言（如Java）中，继承（inheritance or extends）提供了两个有用的服务。首先，它是代码重用的一种形式。另外，是它包括了一套类型系统的规范。

JS是一门弱类型语言，不做类型转换。对于一个对象来说，重要的不是它从哪里来，而是能做什么。

JS提供了一套更为丰富的代码重用模式，可以模拟那些基于类的模式，也可以支持更具表现力的模式。

在基于类的语言中，对象是类的实例，且类可以从另一个类继承。JS基于原型，意味着对象直接从其他对象继承。

### 伪类

JS不让对象直接从其它对象继承（打脸吗？），反而插入了一个多余的间接层，从而使构造器函数产生对象。

当一个函数对象被创建时，Function构造器产生的函数对象会运行类似这样的代码：`this.prototype = { constructor: this };`。新函数对象被赋予一个prototype属性，其值是包含一个constructor属性且属性值为该新函数对象，该prototype对象是存放继承特征的地方。因为JS没有提供一种方法去确定哪个函数是打算用来作构造器的，所以每个函数都会得到一个prototype对象。

当彩构造器模式，使用`new`前缀去调用一个函数时，将修改函数执行的方式。如果`new`运算符是一个方法而不是一个运算符，它可能会像这样执行：

```
Function.method('new', function () {
  // 创建一个新对象，它继承自构造器函数的原型对象
  var that = Object.beget(this.prototype);
  // 调用构造器函数，绑定this到新对象上
  var other = this.apply(that, arguments);
  // 如果它的返回值不是一个对象，就返回该新对象
  return (typeof other === 'object' && other) || that;
});
```

水越来越深了，笔记做不下去了。

## 数组 - Arrays

数组是一段线性分配的内存，通过整数去计算偏移并访问其中的元素。

JS提供一种类数组（array-like）特性的对象，它把数组的下标转变成字符串，用其作为属性。虽然比真·数组慢，但可以更方便的使用。数组有自己的字面量形式，也有一套内置方法。

### 数组字面量

数组的第一个值获得属性名'0'，依此类推。

```
var numbers = ['zero', 'one', 'two', 'three'];
numbers[0]; //zero
numbers.length; //4

// 对象字面量，与上面的nubmers相同结果
var numbersObj = {
  '0': 'zero',
  '1': 'one',
  '2': 'two',
  '3': 'three'
}
```

上例两种方式的区别是：numbers继承自`Array.prototype`，有`length`方法；而numbersOjb继承自`Object.prototype`，无`length`方法。

JS允许数组包含任意混合类型的值。

### 长度

JS中数组的`length`无上界，根据数组元素自动更新其值。如：

```
var arr = []; 
arr[1000] = 'TR';
arr.length; // 1001
```

可以直接给数组设置`length`值，当值大于数组长度时，不会分配更多的空间；当值小于数组长度时，只保留长度值前面的数组元素。如`arr.length = 1; // arr为['zero']`。

## 正则表达式 

JS的很多特性借鉴自其它语言。语法自Java，函数自Scheme，原型继承自Self，正则自Perl。