## 加载和执行 - Loading and Execution

### 脚本位置 - Script Positioning

浏览器使用单进程处理UI更新和JS运行等多个任务，每个JS文件必须等待前一个JS文件下载完成并运行完之后，才开始自己的下载过程，下载及解析JS过程中会阻塞页面解析和用户交互。因此最好把`<script>`标签置于`</body>`前。

虽然IE8+及现代浏览器同时下载多个JS文件，但JS的下载仍然会阻塞其它资源的下载，如图片。

将多个JS文件合并成一个文件，可以减少HTTP请求产生的额外性能负担。

### 成组脚本 - Grouping Scripts

Yahoo!为“Yahoo!用户接口--YUI”库创建了一个“联合句柄”，这是通过它的“内容投递网络--Content Delivery Network”实现的。句柄如下：`http://yui.yahooapis.com/combo?2.7.0/build/yahoo/yahoo-min.js&2.7.0/build/event/event-min.js`。当服务器收到此URL请求时，会将两个独立的文件合并然后一起返回客户端。这种方式通过一个`<script>`标签加载了多个独立JS文件，也是棒棒哒。

### 非阻塞脚本 - Nonblocking Scripts

等页面完成加载后，再加载JS文件，这意味着在`window`的`load`事件发出之后开始下载JS，实现方法有如下几种。

#### 延期脚本 - Deferred Scripts

HTML4为`<script>`标签定义了一个扩展属性`defer`，它表示本脚本不含修改DOM的操作，因此可以稍后执行（DOM加载完成之前不执行，若文档含`window.onload`，则在`onload`事件之前执行）。缺点是部分浏览器不支持该属性。写法为：`<script type="text/javascript" src="x.js" defer></script>`。它可以放置在文档的任何位置，下载后不会马上执行，所以该文件可以与页面的其它资源一起并行下载。

#### 动态脚本元素 - Dynamic Script Elements

DOM允许使用JS动态创建HTML的几乎全部文档内容，其根本在于，`<script>`元素与页面其它元素没什么不同。如下：

```
var script = document.creatElement('script');
script.type = 'text/javascript';
script.src = 'x.js';
document.getElementsByTagName('head')[0].appendChild(script);
```

`x.js`在添加到页面后立刻下载执行，此技术的重点在于：无论在何处启动下载，文件的下载和运行都不会阻塞其它页面处理过程，所以可以将代码放在`<head>`部分。

可以在页面中动态加载多个JS文件，但浏览器不保证文件加载的顺序。

#### XHR脚本注入 - XMLHttpRequest Script Injection

另一个非阻塞方式获得脚本的方法是使用XHR对象将脚本注入到页面中。代码如下：

```
var xhr = new XMLHttpRequest();
xhr.open('get', 'x.js', true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
      var script = document.creatElement('script');
      script.type = 'text/javascript';
      // 创建一个带有内联代码的<script>元素
      script.text = xhr.responseText;
      document.body.appendChild(script);
    }
  }
};
xhr.send(null);
```

缺点是：JS文件必须与页面在同一域内，不能从CDN下载。所以大型网页通常不采用XHR脚本注入技术。

#### 推荐的非阻塞模式

第一步，包含动态加载JS所需的代码，然后加载页面初始化所需的除JS之外的部分。这部分代码尽量小，可能只包含`loadScript()`函数，它下载和运行非常迅速，不会对页面千万很大干扰。当初始代码准备好之后，用它来加载其余的JS。如下：

```
<script type="text/javascript" src="loader.js"></script>
<script type="text/javascript">
  loadScript('the-rest.js', function() {
    Application.init();
  });
</script>
```

## 数据访问 - Data Access

JS中有四种基本的数据访问位置：

- 直接量 - Literal values：仅仅代表自己，而不存储于特定位置。包括字符串、数字、布尔值、对象、数组、函数、正则表达式、具有特殊意义的空值及未定义
- 变量 - Variables：使用`var`关键字创建用于存储数据值
- 数组值 - Array items：具有数字索引，存储一个JS数组对象
- 对象成员 - Object members：具有字符串索引，存储一个JS对象

每一种数据存储位置都具有特定的读写操作负担，一般前两种小于后两种。

### 管理作用域 - Managing Scope

作用域对JS有许多影响，从确定哪些变量可以被函数访问，到确定`this`值，也关系到性能。

#### 作用域链和标识符解析 - Scope Chains and Identifier Resolution

每一个JS函数都被表示为对象，或者说是一个函数实例。函数对象拥有可以访问的属性和不能被程序访问仅供JS引擎使用的内部属性。其中一个内部属性是`[[Scope]]`，由ECMA-262标准第三版定义。

内部`[[Scope]]`属性包含一个函数被创建的作用域中对象的集合。此集合被称为函数的作用域链，它决定哪些数据可由函数访问。此函数作用域链中的每个对象被称为一个可变对象，每个可变对象都以“键值对”的形式存在。当一个函数创建后，它的作用域链被填充以对象，这些对象代表创建此函数的环境中可访问的数据。函数.[[Scope]]指向`Scope chain`，`Scope chain`[0]指向`Global object`。

改变作用域可以用`with`或`try-cathc`，但均不推荐使用。

闭包会申请一份与外部函数相同作用域的内存，因此有可能导致内存泄露。

### 对象成员 - Object Members

对象成员包括属性和方法，在JS中两者差别不大。对象的命名成员可以包含任何数据类型，当然包括函数。当一个命名成员引用了一个函数时，它被称为方法，而一个非函数类型的数据称为属性。

#### 原型 - Prototype

JS中的对象基于原型。原型是其它对象的基础，定义并实现了一个新对象所必须具有的成员。

一个对象通过一个内部属性`__proto__`绑定到它的原型。任何时候创建一个内置类型的实例，如`Object` or `Array`，这些实例自动拥有一个`Object`作为它们的原型。因此，对象可以有两种类型的成员：实例成员和原型成员。

判断属性是否在对象（包括原型链）中：`alert('toString' in obj);`。

#### 原型链 - Prototype Chains

对象的原型决定了一个实例的类型。默认情况下，所有对象都是Object的实例，并继承了所有如`toString`之类的方法。可以使用构造器创建另外一种类型的原型。如：

```
// Book构造器
function Book(title, publisher) {
  this.title = title; 
  this.publisher = publisher;
}
Book.prototype.sayTitle = function() {
  alert(this.title);
};
// 通过new关键字生成Book构造器的实例。所以book1.__proto__是Book.prototype
var book1 = new Book('High Performance JavaScript', 'Yahoo! Press');
var book2 = new Book('JavaScript: The Good Parts', 'Yahoo! Press');
alert(book1 instanceof Book); //true
alert(book1 instanceof Object); //true
book1.sayTitle(); //High Performance JavaScrip
alert(book1.toString()); //[object Object]
```

#### 嵌套成员 - Nested Members

嵌套对象成员会千万性能影响，少用。

#### 缓存对象成员的值 - Caching Object Member Values

一般来说，在同一个函数中要多次读取同一个对象属性，最好将之存入一个局部变量。

## DOM编程 - DOM Scripting

DOM操作代价高，在富页面应用中通常是性能瓶颈。本章讨论三类问题：

- 访问和修改DOM元素 - Accessing and modifying DOM elements
- 修改DOM元素的样式，造成重绘和重排 - Modifying the styles of DOM elements and causing repains and reflows
- 通过DOM事件处理用户响应 - Handling user interaction through DOM events

### 浏览器中的DOM

DOM APIs用于访问HTML文档中的元素，通过JS实现。

浏览器通常要求DOM实现与JS实现保持独立。如在IE中，被称为JScript的JavaScript实现位于库jscript.dll（即IE的JavaScript解析引擎）中，DOM实现位于mshtml.dll（内部代号Trident，即IE的渲染引擎）中。将两部分功能独立会带来性能损耗，操作DOM次数越多，连接两部分功能的代价越高。

### DOM访问与修改

访问DOM还好，修改DOM的话，会导致浏览器重新计算页面的几何变化。另外需要注意对DOM操作时的循环，尽量将操作结果存入局部变量中。

#### innerHTML与DOM方法比较

在一个性能苛刻的操作中更新一大块HTML页面，innerHTML在大多数浏览器中执行得更快。

#### 节点克隆 - Cloning Nodes

使用DOM方法更新页面内容的另一个途径是克隆已有DOM元素（element.cloneNode()），而不是创建新的（document.createElement()）。

#### HTML集合 - HTML Collections

- document.getElementsByName()
- document.getElementsByClassName()
- document.getElementsByTagName()
- document.images
- document.links
- document.forms
- document.forms[0].elements

这些方法和属性返回HTMLCollection对象，是一种类似数组（无push()/slice()等方法，但有length属性）的列表。HTML集合实际上在查询文档，当更新信息时，每次都要重复执行这种查询操作。通常遍历一个集合前，将之转换成数组。

### 重排与重绘

产生重排的情况：

- 添加或删除可见的DOM元素
- 元素位置改变
- 元素尺寸改变（margin/padding/border/width/height etc.）
- 内容改变
- 最初的页面渲染
- 浏览器窗口尺寸改变
- 滚动条

为减少重排与重绘，尽量将多个DOM和样式改变合并到一个批次中一次性执行。

当需要对DOM元素进行多次修改时，可以通过以下步骤减少重排与重绘的次数：

- 从文档流中移除该元素
- 对其应用多重改变
- 将元素添加到文档中

将动画元素浮动出标准流，可避免浏览器重排。如：对于折叠/展开的动画元素，用绝对坐标定位它，当它的尺寸改变时，便不会推移页面中其它元素的位置，而只是覆盖其它元素。

### 事件托管 - Event Delegation

一个简单而优雅的处理DOM事件的技术是事件托管。因为事件逐层冒泡总能被父元素捕获，所以只需在一个包装元素上挂接一个句柄，就可以处理子元素发生的所有事件。

## 算法和流程控制 - Algorithms and Flow Control

### 循环性能 - Loop Performance

在JS提供的四种循环（for/while/do-while/for in）中，for in循环最慢，因为每次迭代操作都要搜索实例或原型的属性。

在JS中，倒序循环可以略微提高循环性能，保要消除因此而产生的额外操作。

将`switch`转换成`process[i]`操作（名曰数组查表法），当事件在`switch`中后几个时，可避免查询前几个`case`带来的消耗，而直接到达第`i`个`case`。

#### 基于函数的迭代 - Function-Based Iteration

ECMA-262标准第四版介绍了本地数组对象的一个新方法`forEach()`。此方法遍历数组的所有成员，并在每个成员上执行一个函数。在每个元素上执行的函数作为`forEach()`的参数传进去，并在调用时接收三个参数（数组项的值，数组项的索引和数组自身）。

```
items.forEach(function(value, index, array){
  process(value);
});
```

尽管基于函数的迭代显得更便利，但比基于循环的迭代慢很多。通常基于函数是基于循环8倍的时间，每个数组项要关联额外的函数调用是造成速度慢的原因。

### 条件表达式 - Conditionals

使用`if-else`还是`switch`取决于测试条件的数量。少用`if-else`，多用`switch`。



## 字符串和正则表达式 - Strings and Regular Expressions

## 响应接口 - Responsive Interfaces

JS和UI更新共享的进程通常被称为浏览器UI线程。

如果接口在100ms内响应用户输入，用户认为自己是直接操作用户界面中的对象，超过100ms意味着用户认为自己与接口断开了。

若一些JS任务因为复杂性不能在100ms内完成，理想方法是让出对UI线程的控制，使UI更新可以进行。让出意味着停止JS运行，给UI线程机会进行更新，然后再继续运行JS，于是JS定时器（setTimeout()/setInterval()）派上用场了。定时器存在10ms左右的误差。

## Ajax

Ajax是高性能JavaScript的基石，它可以通过延迟下载大量资源使页面加载更快。它通过在客户端和服务器之间异步传送数据，避免页面集体加载。

### 数据传输 - Data Transmission

#### 请求数据 - Requesting Data

有五种常用技术用于向服务器请求数据（1、2、5常用）：

- XHR
- Dynamic script tag insertion
- iframes
- Comet
- Multipart XHR

#### XHR

使用GET还是POST方式？如果请求不改变服务器状态只是取回数据使用GET，且GET请求的结果可以保存在变量中供以后调用。只有当URL和参数的长度超过2048个字符时，才使用POST提取数据。

当使用XHR将数据发回服务器时，一个POST至少发送两个数据包（信息头和POST体）。

#### 动态脚本标签插入

克服了XHR的最大限制：可以从不同域的服务器上获取数据。

```
var scriptElement = document.createElement('script');
scriptElement.src = 'http://any-domain.com/javascript/lib.js';
document.getElementByTagName('head')[0].appendChild(scriptElement);
function jsonCallback(jsonString) {
  var data = ('(' + jsonString + ')');
  // Process the data here
}
```

但是动态脚本标签插入不能通过请求发送信息头，参数只能通过GET方法传递，不能用POST，不能设置请求的超时或重试。JS没有权限或访问控制的概念，所以页面上任何使用动态脚本标签插入的代码都可以完全控制整个页面。

上面例子中，lib.js文件将调用jsonCallback函数组装数据：`jsonCallback({'status': 1, 'colors': ['#fff', '#000', '#f00']});`。

#### 多部分XHR

允许只用一个HTTP请求就从服务器获取多个资源。

## 编程实践 - Programming Practices

### 避免二次评估 - Avoid Double Evaluation

JS中有四种方式实现在程序中获取一个包含代码的字符串并运行它：

- `eval('num1 + num2');`
- `sum = new Function('arg1', 'arg2', 'return arg1 + arg2;');`
- `setTimeout('sum = num1 + num2', 100);`
- `setInterval('sum = num1 + num2', 100);`

以上几种方式只提倡第三种中第一个参数传入函数来使用，原因是执行代码需要二次评估。

### 使用对象/数组直接量 - Use Object / Array Literals

```
var obj = {
  name: 'turui',
  sex: 'male'
}
```

### 不要重复工作 - Don't Repeat Work

使用原生的`querySelector()/querySelectorAll()`完成DOM操作。

## 创建并部署高性能JavaScript应用程序 - Building and Deploying High-Performance JavaScript Application

使用压缩器再Gzip。

## 工具 - Tools

- Profiling
- Network analysis
- Fiddler