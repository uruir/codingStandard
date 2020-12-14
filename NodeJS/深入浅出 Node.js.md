> 朴灵 著，人民邮电出版社出版 @ 2013年12月第1版

## 序一

优势：开发高并发、高性能后端服务程序。

2011 年初创办 [CNode 开源技术社区](cnodejs.org)，发起并组织多次 NodeParty 线下技术分享及 JSConf China。

Node 托管环境学习测试：Node App Engine。

## 序二

Node 诞生于 2009 年，Ryan Dahl 利用 V8 引擎开发了基于事件循环实现的异步 I/O 框架。由于 JavaScript 之前没有 I/O 库，使得 Node 在开发异步 I/O 时不会像 EventMachine 那样因与同步 I/O 混用而导致问题。

国内开发者的 Node 项目：nw.js & pomelo。
 
企业界：LinkedIn 的移动平台由 Ruby -> Node，Yahoo & Microsoft 也有部分应用迁移到 Node；国内应该是阿里巴巴用得最广。

## 第 1 章 -- Node 简介

### Node 诞生

[官网](http://nodejs.org)，别名 NodeJS、Node.js。

Ryan Dahl 是一名资深 C/C++ 程序员，在创造 Node 之前，他的主要工作是围绕高性能 Web 服务器进行的。经历一些尝试和失败后，他找到设计高性能 Web 服务器要点：事件驱动、非阻塞 I/O。

### Node 给 JavaScript 带来的意义

JavaScript 作为一门图灵完备的语言，长期限制在浏览器的沙箱中运行，它的能力取决于浏览器中间层提供了多少支持。

Chrome 浏览器组件构成：

- Blink（渲染内容与样式） & V8（解析 JavaScript）
- 中间层
- 网卡、硬盘等

Node 的结构与 Chrome 很相似，只是移除了渲染这一块 UI 组件，它们都是基于事件驱动的异步架构。浏览器通过事件驱动服务界面上的交互，Node 通过事件驱动服务 I/O。

### 特点

#### 异步 I/O

#### 事件与回调函数

回调无处不在，因为在 JavsScript 中，函数是一等公民，可以将函数作为对象传递给方法作为实参进行调用。

#### 单线程

在 Node 中，JavaScript 无法与其余线程共享任何状态，好处是不用处处在意状态的同步问题，这里没有死锁的存在，也没有线程上下文交换带来的性能开销。

弱点：

- 无法利用多核 CPU
- 错误会引起整个应用退出，应用健壮性值得考验
- 大量计算占用 CPU 导致无法继续调用异步 I/O

像浏览器中 JavaScript 与 UI 共用一个线程一样，JavaScript 长时间执行会导致 UI 的渲染和响应被中断。在 Node 中，长时间的 CPU 也会导致后续的异步 I/O 发不出调用，已完成的异步 I/O 的回调函数也得不到及时执行。

最早解决大计算问题的方案由 Google 开发的 Gears 提供。它启用一个完全独立的进程，将需要计算的程序发送给这个进程，在结果得出后，通过事件将结果传递回来。后来 HTML5 定制了 Web Workers 标准，Google 放弃了 Gears，全力支持 Web Workers。

Web Worker 能够创建工作线程来进行计算，以解决 JavaScript 大计算阻塞 UI 渲染的问题。工作线程为了不阻塞主线程，通过消息传递的方式来传递运行结果，这也使得工作线程不能访问到主线程中的 UI。

Node 采用与 WW 相同的思路来解决单线程中大计算问题：child_process。

#### 跨平台

起初 Node 只运行在 Linux 平台，在 Windows 上需要 Cygwin or MinGW，在 Node v0.6.0 版本时，微软投入的团队帮助 Node 实现 Windows 平台的兼容。

基于 libuv 实现跨平台的架构：

- Node.js
- libuv
- *nix & Windows

Node 的第三方 C++ 模块也可以借助 libuv 实现跨平台。

#### 应用场景

技术选型：I/O 密集型和 CPU 密集型。

## 第 2 章 -- 模块机制

### 模块

JavaScript 通过`<script>`标签引入代码的方式杂乱无章，语言自身无组织和约束能力，不得不用命名空间来约束代码。

### CommonJS 规范

Node 借鉴 CommonJS 的 Modules 规范实现了一套非常易用的模块系统，NPM 对 Package 规范的完好支持使得 Node 应用在开发过程中事半功倍。

CommonJS 对模块的定义分为三部分：

- 模块引用：`var math = require('math');`，引入外部模块
- 模块定义：`exports`对象用于导出当前模块的方法或变量。`module`代表模块自身，`exports`是它的属性。一个文件就是一个模块：
  ```
  // math.js
  exports.add = function() {
    var sum = 0,
      i = 0,
      args = arguments,
      l = args.length;
    while (i < l) {
      sum += args[i++];
    }
    return sum;
  };
  
  // program.js
  var math = require('math');
  exports.increment = function(val) {
    return math.add(val, 1);
  };
  ```
- 模块标识：传递给`require`方法的参数。

### Node 的模块实现

模块分两类：Node 提供的核心模块（二进制代码）；用户编写的文件模块。

引入模块步骤：

- 路径分析
- 文件定位
- 编译执行

优先级：缓存（先核心再用户） -> 核心模块 -> 路径形式的文件模块 -> 自定义模块。

文件扩展名先后顺序：`.js` -> `.node` -> `.json` -> 其它扩展名都被当做`.js`载入。在尝试过程中，需要调用 `fs` 模块同步阻塞式判断文件是否存在。每一个编译成功的模块都会将其文件路径作为索引缓存在`Module._cache`对象上，以提高二次引入的性能。

用户编写的模块的编译：

- JavaScript 模块
- C/C++ 模块
- JSON 文件

```
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  if (parent && parent.children) {
    parent.children.push(this);
  }
  
  this.filename = null;
  this.loaded = false;
  this.children = [];
}

// 调用 .json 文件
Module._extensions['.json'] = function(module, filename) {
  var content = NativeModule.require('fs').readFileSync(filename, 'utf-8');
  try {
    module.exports = JSON.parse(stripBOM(content));
  } catch (err) {
    err.message = filename + ':' + err.message;
    throw err;
  }
};
```

在编译过程中，Node 对获取的 JavaScript 文件内容进行头尾包装：`(function (exports, require, module, __filename, __dirname) { ... });`。包装后的代码会通过 vm 原生模块的 `runInThisContext`方法执行（类似于 eval，只是具有明确上下文，不污染全局），返回一个具体的`function`对象。最扣，将当前模块对象的`exports`属性、`require`方法、`module`模块对象自身，以及在文件定位中得到的完整文件路径和文件目录作为参数传递给这个`function`执行。

`exports`对象是通过形参的方式传入，直接赋值形参会改变形参的引用，但并不能改变作用域外的值。

Node 调用`process.dlopen`方法进行加载和执行。在 Node 的架构下，`dlopen`方法在 Windows 和 *nix 平台下分别有不同的实现，通过 libuv 兼容层进行了封装。

.node 的模块文件并不需要编译，它是编写 C/C++ 模块之后编译生成的，只有加载和执行的过程。在执行的过程中，模块的 exports 对象与 .node 模块产生联系，然后返回给调用者。

Node 利用 fs 模块同步读取 JSON 文件的内容之后，调用`JSON.parse`方法得到对象，然后将它赋给模块对象的 exports，以供外部调用。JSON 文件用作项目配置文件时比较有用，不必调用 fs 模块去异步读取和解析，直接`require`引入即可。

### 核心模块

核心模块分 C/C++ 编写（Node 项目的 src 目录下）及 JavaScript 编写（lib 目录下）两部分。

#### JavaScript 核心模块的编译过程

在编译所有 C/C++ 文件之前，编译程序需要将所有的 JavaScript 模块文件编译为 C/C++ 代码，使用 V8 附带的 js2c.py 工具，将所有内置的 JavaScript 代码（src/node.js & lib/*.js）转换成 C++ 里的数组，生成 node_natives.h 头文件。

引入 lib 目录下的 JavaScript 核心模块，也需要头尾包装，然后才执行和导出 exports 对象。

JavaScript 核心模块源文件通过`process.binding('natives')`取出，编译成功的模块缓存到`NativeModule._cache`对象上，文件模块则缓存到`Module._cache`对象上。

#### C/C++ 核心模块的编译过程

在核心模块中，有些模块全部由 C/C++ 编写，有些模块则由 C/C++ 完成核心部分，其它部分则由 JavaScript 实现包装或向外导出，以满足性能需求。

纯 C/C++ 编写的部分称内建模块，因为它们通常不被用户直接调用。Node 的`buffer`、`crypto`、`evals`、`fs`、`os`等模块都是部分对它 C/C++ 编写的。

通常文件模块通过 JavaScript 核心模块调用 C/C++ 内建模块。Node 在启动时，会生成一个全局变量`process`，并提供`Binding`方法（src/node.cc中）来协助加载内建模块。

C/C++ 模块通过预先编译为 .node 文件，然后调用`process.dlopen`方法加载执行。

#### 核心模块的引入流程

`require('os')` -> `NativeModule.require('os')` -> `process.binding('os')` -> `get_builtin_module('node_os')` -> `NODE_MODULE(node_os,  reg_func)`

#### 编写核心模块

核心模块中的 JavaScript 部分几乎与文件模块开发相同，遵循 CommonJS 模块规范。

编写内建模块有两步：

- 编写头文件
- 编写 C/C++ 文件

### C/C+＋ 扩展模块

JavaScript 的位运算模仿 Java 的位运算实现，但Java 位运算是在 int 型数字的基础上进行。

## 包与 NPM 

Node 对模块规范的实现，一定程序上解决了变量依赖、依赖关系等代码组织性问题。包的出现，则是在模块的基础上进一步组织 JavaScript 代码。

包目录：

- `package.json` 包描述文件
- `bin` 存放可执行二进制文件的目录
- `lib` 存放 JavaScript 代码的目录
- `doc` 存放文档的目录
- `test` 存放单元测试用例的代码

`npm install package_name -g`可以让包作为命令行工具使用，它把脚本添加到执行路径中。它根据包描述文件中的`bin`字段，将实际脚本链接到与 Node 可执行文件相同的路径下。事实上，通过全局模式安装的所有模块包都被安装进了一个统一的目录下，这个目录可以通过如下方式推算出来：`path.resolve(process.execPath, '.', '..', 'lib', 'node_modules');`。

`require`在引入包时，会优先从`main`字段检查，并将其作为包中其余模块的入口。如果不存在这个字段，`require`方法会查找包目录下`index.js`、`index.node`、`index.json`作为入口。

`devDependencies`是开发时的依赖，提示包的后续开发者安装这些依赖包。

NPM 钩子命令：

```
"script": {
  "preinstall": "preinstall.js",
  "install": "install.js",
  "uninstall": "uninstall.js",
  "test": "test.js"
}
```

在以上字段中执行`npm install <package>`时，`preinstall`指向的脚本将会被加载执行，然后`install`指向的脚本会被执行。

`npm init`将生成`package.json`文件。

`npm adduser`用于注册包仓库帐号。

`npm publish <folder>`用于上传包，或在含`package.json`的目录下`npm publish`。

`npm owner ls <package>`管理包权限；`npm owner add <user> <package>`添加作者；`npm owner rm <user> <package>`删除作者。

好的包就具有：

- 良好的测试
- 良好的文档（Readme.md & api）
- 良好的测试覆盖率
- 良好的编码规范

### 前后端共用模块

鉴于网络的原因，CommonJS 为后端 JavaScript 制定的规范并不完全适应前端的应用场景，[AMD 规范（Asynchronous Module Definition）](https://github.com/amdjs/amdjs-api/wiki/AMD)更合适。

AMD 规范是 CommonJS 模块规范的一个延伸，定义如下：`define(id?, dependencies?, factory);`：

```
define(function() {
  var exports = {};
  exports.sayHello = function() {
    alert('Hello from module: ' + module.id);
  };
  return exports;
});
```

AMD 模块需要用`define`来明确定义一个模块，而在 Node 实现中是隐式包装的，它们的目的是进行作用域隔离，仅在需要的时候被引入，避免过去那种通过全局变量或全局命名空间的方式。

CMD 规范由玉伯提出，它与 AMD 的区别主要是定义模块和依赖引入的部分。AMD 需要在声明模块的时候指定所有的依赖，通过形参传递依赖到模块内容中：

```
define(['dep1, 'dep2'], function(dep1, dep2) {
  return function() {};
});
```
而 CMD 更接近 CommonJS：

```
define(function(require, exports, module) {
  
});
```

`require`、`exports`、`module`通过形参传递给模块，在需要依赖模块时，随时调用`require`引入即可。

## 异步 I/O

前端编程算 GUI 编程的一种，其中充斥了各种 Ajax 和事件，属于典型的异步应用场景。

异步很早就出现于操作系统的底层，通过信号量、消息等方式有了广泛的应用。

与 Node 的事件驱动、异步 I/O 设计理念比较相近的一个知名产品为 Nginx，它采用纯 C 编写，具备面向客户端管理连接的强大能力，但它背后依然受限于各种同步方式的编程语言。

不同 I/O 类型及其对应的开销：

|I/O 类型|花费的 CPU 时钟周期|
|:---:|:---:|
|CPU 一级缓存|3|
|CPU 二级缓存|14|
|内存|250|
|硬盘|4.1e7|
|网络|2.4e8|

I/O 是昂贵的，分布式 I/O 是更昂贵的。

异步/同步和阻塞/非阻塞是 两回事。

操作系统内核对于 I/O 只有两种方式：阻塞和非阻塞。

操作系统对计算机进行了抽象，将所有输入输出设备抽象为文件。内核在进行文件 I/O 操作时，通过文件描述符进行管理，而文件描述符类似于应用程序与系统内核之间的凭证。应用程序如果需要进行 I/O 调用，需要先打开文件描述符，然后再根据文件描述符去实现文件的数据读写。

非阻塞 I/O：由于完整的 I/O 并没有完成，立即返回的并不是业务层期望的数据，而仅仅是当前调用的状态。为了获取完整的数据，应用程序需要重复调用 I/O 操作来确认是否完成。这种重复调用判断操作是否完成的技术叫做轮询。

所以阻塞 I/O 造成 CPU 等待浪费，非阻塞 I/O 需要轮询去确认是否完成数据获取，让 CPU 处理状态判断。

`epoll`是 Linux 下效率最高的 I/O 事件通知机制，在进入轮询的时候如果没有检查到 I/O 事件，将会进行休眠，直到事件发生将它唤醒。它是真实利用了事件通知、执行回调的方式，而不遍历查询，所以不会浪费 CPU，执行效率高。

Node 异步 I/O 模型的基本要素：事件循环、观察者、请求对象、I/O 线程池。

与 I/O 无关的异步 API：`setTimeout`、`setInterval`、`setImmediate`、高效的`process.nextTick`。

调用`setTimeout`或`setInterval`创建的定时器会被插入到定时器观察者内部的一个红黑树中。每次 Tick 执行时，会从该红黑树中迭代取出定时器对象，检查是否超过定时时间。如果超过就形成一个事件，它的回调函数将立即执行。

`process.nextTick`的回调函数保存在一个数组中，在每轮循环中会将数组中的回调函数全部执行完，属于 idle 观察者；`setImmediate`保存在链表中，在每轮循环中执行链表中的一个回调函数，属于 check 观察者。在每一个轮循检查中，idle 观察者等于 I/O 观察者，I/O 观察者先于 check 观察者。

事件驱动的实质：通过主循环加事件触发的方式来运行程序。

经典的服务器模型：

- 同步式：一次只处理一个请求，其余请求等待
- 每进程/每请求：为每个请求创建一个进程
- 每线程/每请求

每线程/每请求的方式为 Apache 所用，Node 通过事件驱动的方式处理请求，无须为每一个请求创建额外的对应线程。

## 异步编程

有异步 I/O，必有异步编程。

### 函数式编程

#### 高阶函数

```
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b){
  return a - b;
});
```

#### 偏函数

```
var isType = function(type) {
  return function(obj) {
    return toString.call(obj) == '[object ' + type + ']';
  };
};

var isString = isType('String');
var isFunction = isType('Function');
```

### 异步编程的优势与难点

#### 优势

基于事件驱动的非阻塞 I/O 模型。利用事件循环的方式，JavaScript 线程用于分配任务和处理结果，I/O 线程池里的线程处理各个 I/O。

#### 难点

- 异常处理
- 函数嵌套过深
- 阻塞代码
- 多线程编程：`child_process`是 Node 的基础 API，cluster 模块是更深层次的应用
- 异步转同步

### 异步编程解决方案

#### 事件发布/订阅模式

是一种广泛用于异步编程的模式，是回调函数的事件化。

Node 自身的 events 模块是发布/订阅模式的一个简单实现，Node 中部分模块都继承自它，这个模块比前端浏览器中的大量 DOM 事件简单，不存在事件冒泡，也不存在`preventDefault`、`stopPropagation`、`stopImmediatePropagation`等控制事件传递的方法。它具有`addListener/on`、`once`、`removeListener`、`removeAllListeners`和`emit`等基本的事件监听模式的方法实现。

```
emitter.on('sthEvent', function(msg) {
  alert(msg);
});
emitter.emit('sthEvent', 'I am a message');
```

可以看到，订阅事件就是一个高阶函数的应用。事件发布/订阅模式可以实现一个事件与多个回调函数的关联，这些回调函数又称为事件侦听器。通过`emit`发布事件后，消息会立即传递给当前事件的所有侦听器执行。侦听器可以很灵活地添加和删除，使得事件和具体处理逻辑之间可以很轻松持关联和解耦。

该模式并无同步和异步调用的问题，但在 Node 中，`emit`调用多半是伴随事件循环而异步触发的，所以我们说发布/订阅广泛应用于异步编程。

#### Promise / Deferred模式

先执行异步调用，延迟传递处理的方式，最早出现于 Dojo 的代码中，后来 jQuery 1.5 版本引进，几乎重写了 Ajax 部分。

```
$.get('/api')
  .success(onSuccess)
  .error(onError)
  .complete(onComplete);
```

即使不调用`success`、`error`方法，Ajax 也会执行。现在可以对事件加入任意的业务处理逻辑：

```
$.get('/api')
  .success(onSuccess1)
  .success(onSuccess2);
```

该模式在 2009 年时被 Kris Zyp 抽象为一个提议草案，发布在 CommonJS 规范中，现该草案已抽象出 Promises/A、Promises/B、promises/D 等典型的 Promises/Deferred 模型。

Promise 库：Q or when。

#### 流程控制库

**1. 尾触发与 Next**

除了前面两种写入规范的异步模式外，还有一类方法是需要手工调用才能持续执行后续调用的，叫做尾触发，常见关键词是 next。事实上，尾触发目前应用最多的地方是 Connect 的中间件。

```
var app = connect();
// Middleware
app.use(connect.staticCache());
app.use(connect.static(__dirname + '/public'));
app.use(connect.cookieParser());
app.use(connect.session());
app.use(connect.query());
app.use(connect.bodyParser());
app.use(connect.csrf());
app.listen(3001);
// 监听端口上的请求，中间件利用了尾触发的机制
function (req, res, next) {
  // 中间件
}
```

每个中间件传递请求对象、响应对象和尾触发函数，通过队列形成一个处理流。

**2. [async](https://github.com/caolan/async)**

**3. Step**

这个流程控制库由 Tim Caswell 编写，比 async 更轻量，在 API 的暴露上也更具备一致性，因为它只有一个接口 Step。

```
Step(
  function readFile1() {
    fs.readFile('file1.txt', 'utf-8', this);
  },
  function readFile2(err, content) {
    fs.readFile('file2.txt', 'utf-8', this);
  },
  function done(err, content) {
    console.log(content);
  }
);
```

`this`是 Step 内部的`next`方法，将异步调用的结果传递给下一个任务作为参数，并调用执行。

通过`this.parallel()`可以实现多个异步任务并行执行。

**4. [wind](https://github.com/JeffreyZhao/wind)**

前身为 Jscex，由国内知名码农赵劼完成开发。它为 JavaScript 语言提供了一个 monadic 扩展，能够显著提高一些常见场景下的异步编程体验。

```
// 冒泡排序
var compare = function(x, y) {
  return x - y;
};
var swapAsync = eval(Wind.compile('async', function(a, i, j) {
  $await(Wind.Async.sleep(20));
  var t = a[i], a[i] = a[j], a[j] = t;
  paint(a); // 重绘数组
}));
var bubbleSort = eval(Wind.compile('async', function(array) {
  for (var i = 0, len = array.length; i < len; i++) {
    for (var j = 0; j < len - i - 1; j++) {
      if (compare(array[j], array[j + 1]) > 0) {
        $await(swapAsync(array, j, j + 1));
      }
    }
  }
}));
```

### 异步并发控制

#### bagpipe

#### async

## 内存控制

在 v8 中，所有的 JavaScript 对象都是通过堆来进行分配的。通过`process.memoryUsage()`查看内存使用情况（单位：字节）：

```
> process.memoryUsage();
{ 
  rss: 17100800, // 进程的常驻内存
  heapTotal: 6081920, // 申请到的内存 
  heapUsed: 3582556 // 已使用内存
}
```

可以看出，堆中的内存用量总是小于进程的常驻内存用量，这意味着 Node 中的内存使用并非都是通过 V8 进行分配的。我们将那些不是通过 V8 分配的内存称为堆外内存。

Buffer 对象不同于其它对象，它不经过 V8 的内存分配机制，所以也不会有堆内存的大小限制。这意味着利用堆外内存可以突破内存限制的问题。

在代码中声明变量并赋值时，所使用对象的内存就分配在堆中。

释放变量占用的内存：如果变量是全局变量（不通过 var 声明或定义在 global 变量上），由于全局作用域需要直到进程退出才能释放，此时将导致引用的对象常驻内存（老生代中）。这时要释放全局变量，可使用重新赋值，让旧的对象脱离引用关系。

在 JavaScript 中，实现外部作用域访问内部作用域中变量的方法叫闭包（closure）。这得益于高阶函数的特性：函数可以作为参数或者返回值。

```
var foo = function() {
  var bar = function() {
    var local = "局部变量";
    return function() {
      return local;
    };
  };
  var baz = bar();
  console.log(baz());
};
```

在正常的 JavaScript 执行中，无法立即回收的内存有闭包和全局变量引用这两种情况。

### 内存指标

#### 查看内存使用情况

进程的内存：一部分是 rss，其余部分在交换区或文件系统中。

与`process.memoryUsage()`不同的是，os 模块中的`totalmem`和`freemem`这两个方法用于查看操作系统的内存使用情况，它们分别返回系统的总内存和闲置内存，以字节为单位。

### 内存泄漏

造成内存泄漏的原因：

- 缓存
- 队列消费不及时
- 作用域未释放

### 内存泄漏排查

定位 Node 应用的内存泄漏：

- v8-profiler
- `node-heapdump` Node 的核心贡献者之一的 Ben Noordhuis 编写的模块 
- node-mtrace
- dtrace
- `node-memwatch` Mozilla 的 Lloyd Hilaiel 编写，采用 WTFPL 许可发布

### 大内存应用

Node 提供 stream 模块用于处理大文件。

由于 V8 的内存限制，无法通过`fs.readFile`和`fs.writeFile`直接进行大文件的操作，而改用`fs.createReadStream`和`fs.createWriteStream`方法通过流的方式实现对大文件的操作。

```
var reader = fs.createReadStream('in.txt');
var writer = fs.createWriteStream('out.txt');
// chunk 即是 Buffer 对象
reader.on('data', function(chunk) {
  writer.write(chunk);
});
reader.on('end', function() {
  writer.end();
});
// 上面的操作可改为
reader.pipe(writer);
```

可读流提供了管道方法，封闭了 data 事件和写入操作。通过流的方式，上述代码不会受到 V8 内存限制的影响。

## 第 6 章 -- 理解 Buffer

JavaScript 中无论宽字节字符串还是单字节字符串，都被认为是一个字符串。

```
console.log('零一二'.length); // 3
console.log('\u00bd'.length); //1
```

### Buffer 结构

Buffer 是一个像 Array 的对象（有`length`，也可以通过下标访问元素），但它主要用于操作字节。

#### Buffer 对象

```
var str = '这里是读书笔记';
var buf = new Buffer(str, 'utf-8'); // 字符串转 Buffer，默认为 UTF-8
console.log(buf); // <Buffer e8 bf 99 e9 87 8c e6 98 af e8 af bb e4 b9 a6 e7 ac 94 e8 ae b0>
```

中文字在 UTF-8 编码下占用 3 个元素，字母和半角标点符号占用 1 个元素。

#### Buffer 内存分配

Buffer 对象的内存分配不是在 V8 的堆内存中，而是在 Node 的 C++ 层面实现内存的申请。即在 C++ 层面申请内存，在 JavaScript 中分配内存。

Node 采用 slab 分配机制，是一种动态内存管理机制，最早诞生于 Solaris 操作系统中，目前一些 *nix 操作系统中有广泛的应用，如 FreeBSD & Linux。

slab 是一块申请好的固定大小的内存区域，有 3 种状态：

- full
- partial
- empty

当需要一个 Buffer 对象时，通过`new Buffer(size)`申请。

Node 以 8KB 为界限来区分一个 Buffer 对象是大对象还是小对象。

### Buffer 的转换

Buffer 对象可以转换成如下编码的字符串：

- ASCII
- UTF-8
- UTF-16LE/UCS-2
- Base64
- Binary
- Hex

一个 Buffer 对象可以在存储不同编码类型的字符串：`buf.write(string[, offset][, length][, encoding]);`。

Buffer 转字符串：`buf.toString([encoding, ][start, ][end]);`。

判断是否支持转码：`Buffer.isEncoding(encoding);`，返回`true` or `false`。

`iconv`和`iconv-lite`支持更多的编码类型，如中文。

`iconv-lite`采用纯 JavaScript`实现，`iconv`则通过 C++ 调用`libiconv`库完成。前者比后者更轻量，无须编译和处理环境依赖直接使用，性能更好。

```
var iconv = require('iconv-lite');
var str = iconv.decode(buf, 'GB2312');
var buf = iconv.encode(str, 'ASCII');
```

读流时的`data += chunk`等价于`data = data.toString() + chunk.toString();`。

对可读流进行编码可解决乱码问题：

```
var readStream = fs.creatReadStream('in.md');
readStream.setEncoding('utf-8');
```

另一个解决乱码的方法是使用 string_decoder 模块的 StringDecoder 实例对象。

正确拼接 Buffer 的方式：

```
var chunks = [];
var size = 0;
res.on('data', function(chunk) {
  chunks.push(chunk);
  size += chunk.length;
});
res.on('end', function() {
  var buf = Buffer.concat(chunks, size);
  var str = iconv.decode(buf, 'utf-8');
  console.log(str);
});
```

### Buffer 与性能

```
var http = require('http');
var helloworld = '';
for (var i = 0; i< 1024 * 10; i++) {
  helloworld += 'a';
}
helloworld = new Buffer(helloworld);
http.createServer(function(req, res) {
  res.writeHead(200);
  res.end(helloworld);
}).listen(8001);
```

通过 ab 进行一次性能测试，发起 200 个并发客户端：`ab -c 200 -t 100 http://127.0.0.1:8001/`。

## 网络编程

Node 是一个面向面生的平台，它具有事件驱动、无阻塞、单线程等特性，具有良好的可伸缩性，轻量，适合在分布式网络中扮演角色。

在 Web 领域，大多编程语言需要专门的 Web服务器作为容器，如 ASP、ASP.NET 需要 IIS，PHP 需要 Apache or Nginx，JSP 需要 Tomcat 等，而 Node 只需要几行代码，无需额外的容器。

Node 提供了 net、dgram、http、https 4 个模块，分别用于处理 TCP、UDP、HTTP、HTTPS，适用于服务器和客户端。

### TCP

对于通过`net.createServer`创建的服务器而言，它是一个`EventEmitter`实例，它的自定义事件有如下几种：

- `listening` 简洁写法：`server.listen(port, listeningListener)`
- `connection` 每个客户端套接字连接到服务器端时触发
- `close` 当服务器关闭时触发，在调用`server.close`后，服务器将停止接受新的套接字连接，但保持当前存在的连接，等待所有连接都断开后，会触发该事件
- `error` 当服务器异常时触发

```
var net = require('net');
var server = net.createServer(function(socket) {
  socket.write('Echo server\r\n');
  socket.pipe(socket);
});
server.listen(1337, '127.0.0.1');
```

在终端使用`telnet 127.0.0.1 8124`与服务器进行会话交流。

### UDP

UDP 套接字一旦创建，既可以作为客户端发送数据，也可以作为服务器接收数据。

```
// server
var dgram = require('daram');
var socket = dgram.createSocket('udp4');

server.on('msg', function(msg, rinfo) {
  console.log('server got: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});
server.on('listening', function() {
  var address = server.address();
  console.log('server listening ' + address.address + ':' + address.port);
});
server.bind(41234);
```

该套按字将接收网卡上 41234 端口的所有信息，绑定完成后，触发`listening`事件。

```
// client
var dgram = require('dgram');
var msg = new Buffer('哈哈');
var client = dgram.createSocket('udp4');
client.send(msg, 0, msg.length, 41234, 'localhost', function(err, bytes) {
  client.close();
});
```

### HTTP

从协议的角度来说，浏览器其实是一个 HTTP 代理，用户的行为将会通过它转化为 HTTP 请求报文发送给服务器，服务器端在处理请求后，发送响应报文给代理，代理在解析报文后，将用户内容呈现在界面上。

HTTP 服务与 TCP 服务模型的区别是在开启 keepalive 后，一个 TCP 会话可以用于多次请求和响应。TCP 服务以 connection 为单位进行服务，HTTP 服务以 request 为单位进行服务。http 模块即是将 connection 到 request 的过程进行了封装。

除此之外，http 模块将连接所用套接字的读写抽象为 ServerRequest 和 ServerResponse 对象，它们分别对应请求和响应操作。在请求产生的过程中，http 模块拿到连接中传来的数据，调用二进制模块 http_parser 进行解析，在解析完请求报文的报头后，触发 request 事件，调用用户的业务逻辑。

### WebSocket

Node 与 WebSocket 配合度很高：

- WS 客户端基于事件的编程模型与 Node 中自定义事件相差无几
- WS 实现了客户端与服务器端之间的长连接，而 Node 事件驱动的方式十分擅长与大量的客户端保持高并发连接

除此之外，其与 HTTP 相比的好处：

- 客户端与服务器端只建立一个 TCP 连接，可以使用更少的连接
- WS 服务器端可以摄像头数据到客户端，这远比 HTTP 请求响应模式更灵活、更高效
- 有更轻量级的协议头，减少数据传送量

WS 最初是作为 HTML5 重要特性出现的，最终在 W3C 和IETF 的推动下，形成 RFC6455 规范。

WS 是定义在 TCP 上的协议，只是其握手部分由 HTTP 完成。

#### 握手

相比 HTTP 的请求头，多了两行字段：

```
Upgrade: websocket
Connection: Upgrade
```

#### 数据传输

### 网络服务与安全

网景在发布 NetScape 之初就提出了 SSL，它在传输层提供对网络连接加密的功能。对于应用层而言它是透明的，数据在传递到应用层之前就已经完成了加密和解密的过程。随后 IETF 将其标准化，称为 TLS（Transport Layer Security）。

Node 在网络安全上提供了 3 个模块，分别为： 

- `crypto` 用于加密解密，SHA1、MD5等加密算法都在其中体现
- `tls` 提供了与 net 模块类似的功能，区别在于它建立在 TLS/SSL 加密的 TCP 连接上
- `https` 完全与 http 模块接口一致，只是建立于安全的连接上

#### TLS/SSL

是一个公钥/私钥的结构，非对称，每个服务器和客户端都有自己的公私钥。公钥用来加密要传输的数据，私钥用来解密接收到的数据。

Node 在底层采用的是 openssl 实现的 TLS/SSL。

```
// 生成私钥
openssl genrsa -out server.key 1024
openssl genrsa -out client.key 1024
// 生成公钥
openssl rsa -in server.key -pubout -out server.pem
openssl rsa -in client.key -pubout -out client.pem
```

通过数字证书来证明公钥与私钥的真实性。

## 第 8 章 -- 构建 Web 应用

### 基础功能

#### 请求方法

最常见的请求方法是：GET & POST，另外还有 HEAD、DELETE、PUT、CONNECT 等方法。

HTTP_Parser 在解析请求报文时，将报文头抽取出来，设置为 req.method。通常只需要处理 GET & POST 两类请求方法，但是在 RESTful 类 Web 服务中请求中请求方法十分重要，PUT 代表增，POST 代表改，DELETE 代表删。

```
function(req, res) {
  switch (req.method) {
    case 'POST':
      update(req, res);
      break;
    case 'DELETE':
      remove(req, res);
      break;
    case 'PUT':
      create(req, res);
      break;
    case 'GET':
    default:
      get(req, res);
  }
}
```
  
#### 路径解析

HTTP_Parser 将其解析为 req.url。客户端代理（浏览器）会将地址解析成报文，将路径和查询部分放在报文第一行，hash 部分会被丢弃，不存在于报文的任何地方。

```
function(req, res) {
  var pathname = url.parse(req.url).pathname;
  fs.readFile(path.join(ROOT, pathname), function(err, file) {
    if (err) {
      res.writeHead(404);
      res.end('找不到文件');
      return;
    }
    res.writeHead(200);
    res.end(file);
  });
}
```

#### 查询字符串

```
var url = require('url');
var querystring = require('querystring');
var query = querystring.parse(url.parse(req.url).query);
```

#### Cookie

由于 HTTP 无状态，使用 Cookie 来标识和认证一名用户。它最早由文本浏览器 Lynx 合作开发者 Lou Montulli 在 1994 年 Netscape 的第一版时发明，能记录服务器与客户端之间的状态。在 1997 年形成规范 RFC 2109，目前为 RFC 6265，是由浏览器和服务器共同协作实现的规范。

Cookie 的处理：

- 服务器向客户端发送 Cookie
- 浏览器将 Cookie 保存
- 之后每次浏览器都会将 Cookie 发向服务器端

客户端发送的 Cookie 在请求报文的 Cookie 字段中，可以通过 curl 工具构造这个字段：`curl -v -H "Cookie: foo=bar; baz=val" "http://127.0.0.1:1337/path?foo=bar&foo=baz"`。

HTTP_Parser 会将所有的报文字段解析到 req.headers 上，那么 Cookie 就是`req.headers.cookie`。

由于 Cookie 的实现机制，一旦服务器端向客户端发送了设置 Cookie 的意图，除非 Cookie 过期，否则客户端每次请求都会发送这些 Cookie 到服务器。只有域名相同时 Cookie 才会发送，所以要为静态文件设置不同的域名。Cookie 可以在前后端被修改。

#### Session

Session 的数据只保存在服务器。

#### 缓存

### 数据上传

Node 的 http 模块只对 HTTP 报文头进行了解析，然后触发 request 事件。如果请求中还带有内容部分，内容部分需要用户自行接收和解析。通过报头的`Transfer-Encoding` or `Content-Length`即可判断请求中是否带有内容。

```
var hasBody = function(req) {
  return 'transfer-encoding' in req.headers || 'content-length' in req.headers;
};
```

在 HTTP_Parser 解析报头结束后，报文内容部分会通过 data 事件触发，只需以流的方式处理即可：

```
function(req, res) {
  if (hasBody(req)) {
    var buffers = [];
    req.on('data', function(chunk) {
      buffers.push(chunk);
    });
    req.on('end', function() {
      req.rawBody = Buffer.concat(buffers).toString();
      handle(req, res);
    });
  } else {
    handle(req, res)
  }
}
```

#### 表单

默认的表单提交，请求头中的`Content-Type`字段值为`application/x-www-form-urlencoded`，它的报文体内容和查询字符串相同。

```
var handle = function(req, res) {
  if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    req.body = querystring.parse(req.rawBody);
  }
  todo(req, res);
};
```

直接访问`req.body`即可得到表单中提交的数据。

#### 其它格式

除了表单数据外，常见的提交还有 JSON & XML 文件等，也是根据`Content-Type`判断，分别为：`application/json` & `application/xml`。

如果要处理 XML，需要 xml2js 模块。

#### 附件上传

通常的表单，其内容可以通过 urlencoded 的方式编码内容形成报文体，再发送给服务器，但是业务场景往往需要用户直接上传文件。

```
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="username">Username:</label><input type="text" name="username" id="username" />
  <label for="file">Filename:</label><input type="file" name="file" id="file" />
  <input type="submit" name="submit" value="submit" />
</form>
```

浏览器在遇到`multipart/form-data`表单提交时，构造的请求报文如下：

```
Content-Type: multipart/form-data; boundary=AaBo3x
Content-Length: 18231 // 报文体的长度
```

它代表本次提交的内容由多部分构成，其中`boundary=随机值`指定的是每部分内容的分界符，报文体的内容将通过在它前面添加`--`进行分割，报文结束时在它前后都加上`--`表示结束。

接收大小未知的数据量时，需要谨慎。可以通过`formidable`，它基于流式处理解析报文，将接收到的文件写入到系统的临时文件夹中，并返回对应的路径：

```
var formidable = require('formidable');
function(req, res) {
  if (hasBody(req)) {
    if (mime(req) === 'multipart/form-data') {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        req.body = fields;
        req.files = files;
        handle(req, res);
      });
    }
  } else {
    handle(req, res);
  }
}
```

#### 数据上传与安全

### 路由解析

#### 文件路径型

有静态文件（直接返回对应文件）和动态文件两种。

#### MVC

User -> Router -> Controller -> Model -> View -> User

有手工映射（正则匹配、参数解析）和自然映射两种

#### RESTful - Representational State Transfer

表现层状态转化。符合 REST 规范的设计，称为 RESTful 设计。它的设计哲学主要将服务器提供的内容实体看作一个资源，并表现在 URL 上。

### 中间件

引入中间件来简化和隔离基础设施与逻辑之间的细节。最早的中间件的定义是一种在操作系统上为应用软件提供服务的计算机软件。如今的中间件指封装底层细节，为上层提供更方便服务的意义。

### 页面渲染

响应 JSON：

```
res.json = fucntion(json) {
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(json));
};
```

Web 应用的内容响应形式有静态文件、附件、跳转等。普通的 HTML 内容的响应，称为视力渲染。在动态页面技术中，最终的视力是由模板和数据共同生成。模板是带有特殊标签的 HTML 片段，通过与数据的渲染，将数据填充到这引起特殊标签中，最后生成普通的带数据的 HTML 片段。通常我们将渲染方法设计为`render`，参数就是模板路径和数据。

```
res.render = function(view, data) {
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  var html = render(view, data);
  res.end(html);
};
```

#### 模板

最早的服务器端动态页面开发，是在 CGI 程序或 servlet 中输出 HTML 片段，通过网络流输出到客户端，客户端将其渲染到用户界面上。这种逻辑代码与 HTML 输出的代码混杂，会导致一个小小的 UI 改动就要大动干戈。后来有了逻辑代码与 HTML 分离的 ASP、PHP、JSP 等动态网页技术，而模板技术就在这种方式中成熟起来。

模板技术的四要素：

- 模板语言
- 包含模板语言的模板文件
- 拥有动态数据的数据对象
- 模板引擎

对于 JSP 等而言，模板属于服务器端动态页面的内置功能，模板语言就是它们的宿主语言（Java 等），模板文件就是以 .jsp 等为后缀的文件，模板引擎就是 Web 容器。这种模板极度依赖上下文，甚至要处理整个 HTTP 请求对象。随后模板脱离上下文环境，只有数据对象就可以执行，如 Java 的 XSTL。

破局者是 Mustache，它宣称自己是弱逻辑的模板（logic-less templates），定义了以`{{}}`为标志的一套模板语言，并给出了十多门编程语言的模板引擎实现。

但，模板技术做的实际上是拼接字符串这样很底层的活。

模板引擎执行步骤：

- 语法分解：提取出普通字符串和表达式，这个过程通常用正则表达式匹配出来。`<%= %>`的正则为`/<%=([\s\S]+?)%>/g`
- 处理表达式：将标签表达式转换成普通的语言表达式
- 生成待执行的语句
- 与数据一起执行，生成最终字符串

```
var render = function(str, data) {
  var tpl = str.replace(/<%=([\s\S]+?)%>/g, function(match, code) {
    return "'+ obj." + code + "+'";
  });
  tpl = "var tpl = '" + tpl + "'\nreturn tpl;";
  var  complied = new Function('obj', tpl);
  return complied(data);
};
```

调用该模板：

```
var tpl = 'Hello <%=username%>.';
console.log(render(tpl, {username: 'uRuier'}));
```

为了能够最终与数据一起执行生成字符串，需要将原始的模板字符串转换成一个函数对象。如`Hello <%=username%>`会生成：

```
function(obj) {
  var tpl = 'Hello ' + obj.username + '.';
  return tpl;
}
```

这个过程称为模板编译，生成的中间函数只与模板字符串相关，与具体的数据无关。如果每次都生成这个中间函数，会浪费 CPU。所以要用模板预编译：

```
var complied = function(str) {
  var tpl = str.replace(/<%=([\s\S]+?)%>/g, function(match, code) {
    return "' + obj." + code + "+'";
  });
  tpl = "var tpl = '" + tpl + "'\nreturn tpl;";
  return new Function('obj, escape', tpl);
};
var render = function(complied, data) {
  return complied(data);
};
```

这样可以实现一次编译，多次运行。

#### Bigpipe

需要前后端配合实现的优化技术：

- 页面布局框架（无数据）
- 后端持续性的数据输出
- 前端渲染

## 第 9 章 -- 玩转进程

基于事件的服务模型存在的问题：CPU 的利用率和进程的健壮性。

### 多进程架构

```
var http = require('http');
var r = Math.round((1 + Math.random()) * 1000);
http.createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(r, '127.0.0.1');
console.log('已启动：' + r);
```

先开启一个 HTTP 服务器，然后复制出多个进程：

```
var fork = require('child_process').fork;
var cpus = require('os').cpus(); // 根据 CPU 核数 fork 进程数
for (var i = 0, len = cpus.length; i < len; i++) {
  fork('./index.js');
  console.log('这是CPU：' + i);
}
```

这称为主从模式。主进程不负责具体的业务处理，而是负责调度或管理工作进程，它是趋向于稳定的；工作进程负责具体的业务处理。

通过 fork 复制的进程都是一个独立的进程，这个进程中有着独立而全新的 V8 实例。它需要至少 30 毫秒的启动时间和至少 10MB 的内存。尽管 Node 提供了 fork 供复制进程使每个 CPU 内核都使用上，但 fork 进程是昂贵的。

#### 创建子进程

有 4 个方法创建子进程：

- `spawn` 启动一个子进程来执行命令
- `exec` 与`spawn`类似，但有一个回调函数获子进程的状况
- `execFile` 启动一个子进程来执行可执行文件 
- `fork` 与`spawn`类似，不同在于它创建 Node 的子进程只需指定要执行的 JavaScript 文件模块即可

`spawn`与`exec`、`execFile`不同的是，后两者创建时可以指定 timeout 属性设置超时时间，一旦创建的进程运行超过设定的时间将会被杀死。

`exec`与`execFile`不同的是，前者适合执行已有的命令，后者适合执行文件。

```
var cp = require('child_process');
cp.spawn('node', ['index.js']);
cp.exec('node index.js', function(err, stdout, stderr) {
  console.log('exec');
});
cp.execFile('index.js', function(err, stdout, stderr) {
  console.log('execFile');
});
cp.fork('./index.js');
```

四种方法的区别：

|类型|回调/异常|进程类型|执行类型|可设置超时|
|:---:|:---:|:---:|:---:|:---:|
|spawn|No|任意|命令|No|
|exec|Yes|任意|命令|Yes|
|execFile|Yes|任意|可执行文件|Yes|
|fork|No|Node|JavsScript 文件|No|

如果需要通过`execFile`运行 JavaScript 文件，需要在文件首先加入：`#!/usr/bin/env node`表示以 node 运行。

#### 进程间通信

前端的 JavaScript 解析与 UI 渲染共用一个线程，HTML5 提出 WebWorker API 允许创建工作线程并在后台运行，使得一些阻塞较为严重的计算不影响主线程上的 UI 渲染。

```
var worker = new Worker('worker.js');
worker.onmessage = function(event) {
  document.getElementById('result').textContent = event.data;
};

// worker.js
var n = 1;
search: while(true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      continue search;
    }
  }
  postMessage(n);
}
```

主线程和工作线程之间通过`onmessage`和`postMessage`进行通信，子进程对象则由`send`方法实现主进程向子进程发送数据，`message`事件实现收听子进程发来的数据，与 API 在一定程度上相似。通过消息传递内容，而不是共享或直接操作相关资源，这是较为轻量和无依赖的做法。

```
// parent.js
var cp = require('child_process');
var n = cp.fork(__dirname + '/sub.js');
n.on('message', function(m) {
  console.log('PARENT got message: ' + m);
});
n.send({hello: 'world'});

// sub.js
process.on('message', function(m) {
  console.log('CHILD got message: ' + m);
});
process.send({foo: 'bar'});
```

通过 fork 或其它 API，创建子进程后，为了实现父子进程之间的通信，父进程和子进程之间将会创建 IPC 通道。

Inter-Process Communication，即进程间通信。目的是为了让不同的进程能够互相访问资源并进行协调工作。Node 通过管道实现 IPC 通道，具体细节由 libuv 提供。

#### 句柄传递

`send`方法除了能通过 IPC 发送数据外，还能发送句柄，第二个可选参数就是句柄：`child.send(message, [sendHandle]);`。

名柄是一种可以用来标识资源的引用，它的内部包含了指向对象的文件描述符。比如句柄可以用来标识一个服务器端 socket 对象、一个管道等。

```
// parent.js
var cp = require('child_process');
var child1 = cp.fork('child.js');
var child2 = cp.fork('child.js');
// Open up the server object and send the handle
var server = require('net').createServer();
server.listen(1337, function() {
  child1.send('server', server);
  child2.send('server', server);
  server.close();
});

// child.js
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.send('handled by child, pid is ' + process.pid + '\n');
});
process.on('message', function(m, tcp) {
  if (m === 'server') {
    tcp.on('connection', function(socket) {
      server.emit('connection', socket);
    });
  }
});
```

这样，多个子进程可以同时监听相同端口，再没有 EADDRINUSE 异常发生了。

### Cluster 模块

v0.8 版本引入 cluster 模块，用以解决多核 CPU 利用率问题，同时也提供了较完美的 API，用以处理进程的健壮性问题。

```
var cluster = require('cluster');
cluster.setupMaster({
  exec: 'worker.js'
});
var cpus = require('os').cpus();
for (var i = 0; i < cpus.length; i++) {
  cluster.fork();
}
```

事实上 cluster 模块就是 child_process 和 net 模块的组合应用。cluster 启动时，它会在内部启动 TCP 服务器，在 cluster.fork 子进程时，将这个 TCP 服务器端 socket 的文件描述符发送给工作进程。如果进程是通过 cluster.fork 复制出来的，那么它的环境变量里就存在 NODE_UNIQUE_ID，如果工作进程中存在 listen 侦听网络端口的调用，它将拿到该文件描述符，通过 SO_REUSEADDR 端口重用，从而实现多个子进程共享端口。对于普通方式启动的进程，则不存在文件描述符传递共享等事情。

## 测试

测试包含单元测试、性能测试、安全测试和功能测试等几个方面。

### 单元测试

编写可测试代码的原则：

- 单一职责：如果一段代码承担的职责越多，为其编写单元测试的时候就要构造更多的输入数据，然后推测它的输出
- 接口抽象：通过对程序代码进行接口抽象后，我们可以针对接口进行测试，而具体代码实现的变化不影响为接口编写的单元测试
- 层次分享：层次分享实际上是单一职责的一种实现。在 MVC 结构的应用中，就是典型的层次分享模型

单元测试主要包含：

- 断言：如何对输出结果进行检测，以确认方法调用是正常的，是最基本的测试点。断言就是单元测试中用来保证最小单元是否正常的检测方法。Node 存在 assert 模块，用于检查程序在运行时是否满足期望。JavaScript 的断言规范最早来自 CommonJS 的单元测试规范，目前的断言库有 should.js
- 测试框架：记录下抛出的异常并继续执行，最后生成测试报告。它用于测试服务，本身并不参与测试。管理测试用例和生成测试报告，提升测试用例的开发速度，提高测试用例的可维护性和可读性。有 mocha，来自于 TJ Holowaychuk。测试用例的组织方式称为测试风格，有 TDD（测试驱动开发，关注所有功能是否被正确实现） & BDD（行为驱动开发，关注整体行为是否符合预期）两种

### 性能测试

包括：

- 负载测试
- 压力测试
- 基准测试

#### 基准测试

```
var nativeMap = function(arr, callback) {
  return arr.map(callback);
};
var customMap = function(arr, callback) {
  var ret = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    ret.push(callback(arr[i], i, arr));
  }
  return ret;
};
var run = function(name, times, fn, arr, callback) {
  var start = (new Date()).getTime();
  for (var i = 0; i < times; i++) {
    fn(arr, callback);
  }
  var end = (new Date()).getTime();
  console.log('运行了 %s  %d 次，花费了 %d 毫秒', name, times, end - start);
};
var callback = function(item) {
  return item;
}
run('nativeMap', 1000000, nativeMap, [0, 1, 2, 3, 5, 6], callback);
run('customMap', 1000000, nativeMap, [0, 1, 2, 3, 5, 6], callback);
```

#### 压力测试

对网络接口进行压力测试以判断网络接口的性能。考查的指标有吞吐率、响应时间和并发数。常用工具有 ab、 siege、 http_load 等。

```
ab -c 10 -t 3 http://localhost:8001/
```

表示 10 个并发用户持续 3 秒向服务器发出请求。

## 第 11 章 -- 产品化

### 项目工程化

#### 目录结构

#### 构建工具

合并静态文件、压缩文件大小、打包应用、编译模块等，这些工作交由构建工具完成。主流的有老牌的 make（*nix 环境，在 Makefile 文件里配置），之后是 Grunt，现在多用 Gulp。

#### 编码规范

为编辑器编写规范文件插件，这样编码的时候，自动提示应该遵循的规范。

#### 代码审查

开源代码托管在 Github，企业内部使用 gitlab 等开源工具。

### 部署流程

代码 -> stage（测试环境） -> pre-release（预发布环境） -> product（生产环境）

### 性能

#### 动静分离

静态文件放入静态文件服务器（如七牛这类服务器或专业的 CDN），Node 只处理动态请求。

#### 启用缓存

#### 多进程架构

进程管理模块：pm、forever、pm2 等。

#### 读写分离

### 日志

### 监控报警

- 日志监控
- 响应时间
- 进程监控
- 磁盘监控
- 内存监控
- CPU 占用监控
- CPU load 监控
- I/O 负载
- 网络监控
- 应用状态监控
- DNS 监控

### 稳定性

### 异构共存

## 调试

通过`debugger;`设置断点。

通过`node debug x.js`打开调试控制台。

通过 Node Inspector 工具。