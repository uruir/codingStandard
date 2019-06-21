> Pedro Teixeira 著，胡训强 张欣景 译，清华大学出版社出版

## 译者序

Node.js 是一套用来编写高性能网络服务器的 JavaScript 工具包，基于 JavaScript 引擎 V8 开发。

Pedro Teixeira 是 Node 公司创始人之一，是 Nodejitsu 公司的高级程序员，也是 Node Tuts 视频视频的制作者。

## 前言

在 C 语言中，可以针对服务器的开放 TCP 连接创建字，并编写服务器代码来接受连接。一般要接受大量并发连接，采用多线程方式。

## 第 1 章 -- 安装 [Node](http://nodejs.org)

在 2009 年的欧洲 JavaScript 大会上，Ryan Dahl 展示了他正在从事的一个项目，该项目是一个集成了 Google V8 JavaScript 引擎、事件循环和底层 I/O 应用编程接口的平台，这个项目被命名为 Node.js，一般也称为 Node。

\*nix：下载 -> 配置（`./configure`） -> 编译（`make`） -> 安装（`sudo make install`，将 Node 可执行文件复制到 /usr/local/bin/node 目录下）。

## 第 2 章 -- Node 简介

闭包是函数，它可以并访问它自身被声明的那个作用域里的变量。当将一个回调函数作为参数传递给另外一个进行 I/O 操作的函数时，回调函数稍后会被调用，且在被调用时，回调函数记住它自身声明时所在的上下文，于是可以访问该上下文及其父上下文里的所有变量，这是 Node 的核心。

## 第 3 章 -- 加载模块

Node 为服务器端的 JavaScript 制定了一些规范，并实现了 CommonJS 模块标准。在这个标准里，每个模块都拥有一个上下文，将该模块与其它模块隔离开来，这意味着模块不会污染全局作用域。

### 理解 Node 如何加载模块

在 Node 中既可以用文件路径也可以用名称来引用模块，除非是核心模块（在 Node 进程启动时预载入），否则用名称引用的模块最终都会被映射为一个文件路径。

不管什么类型的模块，在被导入脚本之后，程序员都可以使用其对外暴露的一组公共 API。如：`var fs = require('fs');`。

注：文件即模块。

### 导出模块

在 Node 中，CommonJS 模块系统是文件之间共享对象或函数的唯一方式。

定义模块（moduleTest.js）：

```
function printA() {
  console.log('A');
}

function pi() {
  console.log(Math.PI);
}

module.exports.printA = printA;
module.exports.pi = pi;
```

上面代码最后一行，定义了该模块导出的内容。`module`是一个变量，表示当前模块自身。`module.exports`表示模块向需要它的脚本（下面的代码）所导出的对象。

使用模块（moduleTest1.js）：

```
var m = require('./moduleTest');

m.printA();
m.pi();
```

运行：`node moduleTest1`，第一行导入`moduleTest`模块里定义的函数（即`printA`和`pi`）。

#### 加载模块

- 核心模块：二进制形式发布的模块，只能通过模块名引用，不能通过文件路径引用，即使已经存在一个与其同名的第三方模块，也会优先加载核心模块
- 文件模块：通过提供绝对路径从文件系统中加载非核心模块，如：`var myModule = require('../xx/xxx');`
- 文件夹模块：`var myModule = require('./myModuleDir');`，Node 会假定该文件夹是一个包，并试图查找包定义，包定义为`package.json`文件（查找该 json 文件中的`main`字段），若无此文件，会查找`index.js`或`index.node`
- `node_modules`文件夹：从当前目录的`node_modules`文件夹下查找模块。如：`var myModule = require('myModule.js');`即为`./node_modules/myModule.js`。若当前目录没有，则继续查找父文件夹的`node_modules`目录，直到根目录或找到所需模块为止
 
注：模块在首次加载时会被缓存起来，再次调用同名模块，直接从内存读取。

### 本章小结

Node 取消了 JavaScript 默认的全局名称空间，用 CommonJS 模块系统取代之，这样可以更好地组织代码，也因此避免了一些安全性问题和错误。

## 第 4 章 -- 应用缓冲区处理、编码和解码二进制数据

JavaScript 最初被设计用来处理 HTML 文档，因此不善于处理二进制数据，JavaScript 中没有字节类型，也没有结构化类型，甚至没有字节数组类型，只有数值类型和字符串类型。

为了使二进制数据处理任务变得容易，Node 引入了一个二进制缓冲区实现，该实现以 Buffer 伪类中的 JavaScript API 形式暴露给外界。缓冲区的长度以字节为计量单位，并且可以随机地设置和获取缓冲区中的数据。

注意：Buffer 数据占用的内存不是分配在 JavaScript VM 内存堆中（不会被垃圾收集算法处理），它占据一个不会被修改的永久内存地址中，避免了因缓冲区内容的内存复制造成 CPU 浪费。

### 创建缓冲区

```
var buf = new Buffer('8b76fde713ce', 'base64');
```

第二个参数默认为`UTF-8`编码，另外还有`ASCII`编码格式。

- `utf-8` 变宽度的编码格式，可以表示`Unicode`字符集中的任意字符
- `base64` 基于 64 个可打印的 ASCII 字符来表示二进制数据，通常用于在字符文档内嵌入可以被转换成字符串的二进制数据，在需要时又可以完整无损地转换回原来的二进制格式

如果缓冲区没有被任何内容初始化，可以通过指定容量大小来创建缓冲区。如：`var buf = new Buffer(1024);`，指创建长度为 1024 字节的缓冲区。

### 在缓冲区中获取和设置数据

在创建或获取缓冲区之后，可以通过`[]`操作符来访问缓冲区中的某个字节，如：

```
var buf = new Buffer('my name is uRuier.');
var str = '';
for (var i = 0, len = buf.length; i < len; i++) {
  str += buf[i];
  str += ' ';
}
console.log(str); // 109 121 32 110 97 109 101 32 105 115 32 117 82 117 105 101 114 46

var buf1 = new Buffer(1024);
console.log(buf1[100]); // 随机数
buf1[100] = 1234;
console.log(buf1[100]); // 用 256 对 1234 取模，值落在 0 - 255 之间。这里是 1234 - 256 * 4 = 210
buf1[100] = 123.4;
console.log(buf1[100]); // 123，向下取整
buf1[1234] = 123.4;
console.log(buf1[1234]); // undefined，超出边界
```

可以看出和数组一样，`index`从 0 开始计数，32 表示空格。通过`buf.length`求缓冲区长度。

### 切分缓冲区

一旦创建或获取到一个缓冲区，就可能需要将此缓冲区的一部分提取出来。通过指定起始位置和结束位置来切分缓冲区，从而创建一个更小的缓冲区。

```
var buf = new Buffer('my name is uRuier, I love LHW.');
var childBuf = buf.slice(11, 17);
console.log(childBuf.toString()); // uRuier，这里通过 toString() 方法将缓冲区内容转换成了字符串
buf[11] = 97;
console.log(childBuf.toString()); // aRuier，这里 u -> a

```

`childBuf`只是引用了`buf`的部分内容，所以一旦改变了父缓冲区，子缓冲区的内容也会改变。

### 复制缓冲区

```
var bufA = new Buffer('abcdefg hijklmn');
var bufB = new Buffer(7);

var targetStart = 0;
var sourceStart = 8;
var sourceEnd = 15;

bufA.copy(bufB, targetStart, sourceStart, sourceEnd);
console.log(bufB.toString()); // hijklmn
console.log(bufB.toString('ASCII')); // hijklmn
console.log(bufB.toString('utf-8')); // hijklmn
console.log(bufB.toString('base64')); // aGlqa2xtbg==
```

### 本章小结

可以看出，Buffer 类与数组有诸多相似之处。

## 第 5 章 -- 使用事件发射器模式简化事件绑定

通过把伪类`EventEmitter`作为基类自定义事件发射器。

### 理解标准回调模式

异步编程不使用函数返回值表示函数调用结束，而是采用后继传递风格（Continuation-passing style）。

```
var fs = require('fs');
fs.readFile(path, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
```

`fs.readFile`函数里的匿名函数即使用了 CPS，而匿名函数第一个参数是一个错误对象，如果有错误发生，这个参数将会是 Error 类的一个实例。

### 理解事件发射器模式

```
var req = http.request(options, function(res) {
  res.on('data', function(data) {
    console.log('some data: ' + data);
  });
  res.on('end', function() {
    console.log('res end');
  });
});
req.end();
```

`http.request`创建了一个 HTTP 请求，当收到服务器响应后就会执行内联函数。响应对象能够发射`data`、`end`等事件，每当这些事件发生时，注册的回调函数就会被调用。

一般而言，当需要在请求的操作完成后重新获取控制权就使用 CPS 模式，当事件可能发生多次时就使用事件发射器模式。

### 理解事件类型

发射的事件具有类型，用字符串（不包含空格的小写单词组成）表示，如上文中的`data`、`end`两种事件类型。

一旦有相关事件发生，事件发射器就会调用相应的事件监听器，并将相关数据作为参数传递给事件监听器。上文的`http.request`示例中，`data`事件的回调函数接收一个`data`对象，而`end`事件回调函数不接收任何参数。

Node 中的大多数事件发射器实现在程序发生错误时发射`error`事件，如果不监听`error`事件，则当其发生时，自动向上抛出一个未捕获的异常。

```
var em = new (require('events').EventEmitter)();
em.emit('trEvent'); // 无显示
em.emit('error', new Error('trMistake')); // Error: trMistake at ...
```

发射`trEvent`没有任何效果，但是发射`error`事件时，错误就会被抛出到堆栈。

### 应用事件发生器 API

任何实现了事件发射器模式的对象（TCP、HTTP 请求等）都实现了下列方法：

- `addListener` & `on` 为指定类型的事件添加事件监听器
- `once` 为指定类型的事件绑定一个仅会被调用一次的事件监听器
- `removeEventListener` 删除绑定到指定事件上的某个指定的事件监听器
- `removeAllEventListener` 删除绑定到指定事件上的所有事件监听器

#### 使用`addListener` or `on` 绑定回调函数

通过指定事件类型和回调函数，就可以注册当事件发时所要调用的操作。例如，当有可用的数据块时，文件可读流就会发射`data`事件。

```
function receiveData(data) {
  console.log(data);
}
readStream.addListener('data', receiveData); // 可以使用 on 方法代替 addListener

// 简写为
readStream.on('data', function(data) {
  console.log(data);
});
```

#### 绑定多个事件监听器

事件发射器模式允许多个事件监听器监听同一事件发射器发射的同一类型的事件。如：

```
readStream.on('data', function(data) {
  console.log('I have some ' + data);
});
readStream.on('data', function(data) {
  console.log('I have some ' + data + ' too.');
});
```

上例中，`readStream`对象的`data`类型事件上绑定了两个函数，每当`readStream`对象发射`data`事件时，控制台就输出两条信息。

事件调用按注册顺序依次调用，若前一个注册事件抛出错误，则后面注册的事件不会被调用。

#### 使用`removeListener`从事件发射器中删除一个事件监听器

如果希望当一个对象发射了某个特定事件后不再收到通知的话，可以通过指定事件类型和回调函数来取消事件监听器的注册。如：

```
function receiveData(data) {
  console.log('got ' + data);
}
readStream.on('data', receiveData);
readStream.removeListener('data', receiveDate);
```

因为回调函数在注册和删除时都调用了一次，所以最开始要为回调函数命名。

#### 使用`once`使回调函数最多执行一次

增加一个事件监听器，执行完后删除。

```
function receiveData(data) {
  console.log(data);
}
readStream.once('data', receiveData);
```

#### 使用`removeAllListeners`从事件发射器删除所有事件监听器

```
process.removeAllListener('SIGTERM');
```

删除进程中断事件的所有事件监听器。

### 创建事件发射器

#### 从 Node 事件发射器继承

```
util = require('util');
var EventEmitter = require('events').EventEmitter;
var myClass = function() {

}
util.inherits(myClass, EventEmitter);
```

#### 发射事件

```
myClass.prototype.someMethod = function() {
  this.emit('custom event', 'argument 1', 'argument 2');
};
```

当`someMethod`方法被`myClass`类实例调用时，会发射一个名为`custom event`的事件，该事件发射两个字符串，作为参数传递给事件监听器。

```
var myInstance = new myClass();
myInstance.on('custom event', function(str1, str2) {
  console.log('got a custom event with the str1 %s & str2 %s.', str1, str2);
});
```

还可以创建一个名为 Ticker 的伪类，让它每秒发射一个 tick 事件：

```
var Ticker = function() {
  var self = this;
  setInterval(function() {
    self.emit('tick');
  }, 1000);
};

var ticker = new Ticker();
ticker.on('tick', function() {
  console.log('tick');
});
```

## 第 6 章 -- 使用定时器制定函数执行计划

### 使用`setTimeout`推迟函数执行

调用`setTimeout`会返回一个超时句柄，它是一个内部对象，作为参数传递给`clearTimeout`。

### 使用`clearInterval`取消函数执行

```
var interval = setInterval(function() {
  console.log('tick');
}, 1000);
clearInterval(interval);
```

### 使用`process.nextTick`将函数执行推迟到下一轮事件循环

Node 中的事件循环在一个处理事件队列的循环里运行，事件循环每执行一次就称为一个 tick。可以安排在事件循环开始下一轮时调用回调函数一次，然而`setTimeout`使用的是 JavaScript 运行时的内部执行队列，而不是使用事件循环。

通过用`process.nextTick(callback)`代替`setTimeout(callback, 0)`，回调函数会在事件队列内的所有事件处理完毕后立刻执行，它比激活 JavaScript 的超时队列快得多。

### 阻塞事件循环

Node & JavaScript 的运行时采用的是单线程事件循环。

### 使用`setTimeout`代替`setInterval`强制函数串行执行

I/O 操作和`setInterval`一起使用时，无法保证在任意时刻只有一个挂起的调用。

```
var interval = 1000;
(function sehedule() {
  setTimeout(function doIt() {
    myAsyncFunc(function() {
      console.log('async is done');
      schedule();
    });
  }, interval);
}());
```

## 查询和读写文件

Node 中有一组流 API，它们可以像处理网络流那样处理文件。流 API 用起来方便，但只允许以连续的方式处理文件。如果需要在文件的指定位置进行读写，流 API 无能为力。所以，Node 使用更底层的操作来对文件系统自身进行处理。

Node 的很多文件 API 几乎是 UNIX(POSIX) 中对应文件 API 的翻版。比如文件描述符句柄在 Node 中也是一个整数，代表进程文件描述符表的某个入口的索引。

有三个特殊的文件描述符 -- 1、2、3，分别代表标准输入（只读流，进程可以用它读取控制台的输入或其它进程传送的数据）文件、标准输出文件和标准错误文件的描述符。

一旦进程启动完毕，就能使用上述三个文件描述符了，使用这些文件描述符，只能连续地读写，已写入的数据不能更改。

文件则不受这样的限制。如在 Node 中可以创建只能向尾部追加数据的文件，也能在指定的位置写入数据。

文件读写等操作的第一个参数是路径，路径出错，回调函数也就总是`error`了，所以在学习读写文件前先对路径进行处理。

### 处理文件路径

Node 的`path`模块用于规范化、连接和解析路径，还可以将绝对路径转换成相对路径、提取路径的组成部分及确定路径是否存在。`path`模块只对字符串处理，而不需要通过和文件系统交互来验证字符串（`path.exists()`函数除外）。

#### 规范化路径

在存储和使用路径前需要对其进行规范化。

```
var path = require('path');
console.log(path.normalize('/foo/bar//baz/asdf/quux/..')); // \foo\bar\baz\asdf
```

#### 连接路径

```
var path = require('path');
console.log(path.join('c:\\', 'windows', 'drives/user', 'sthPath', 'sthPathhaha/..')); // c:\windows\drives\user\sthPath
```

这里`..`是返回上一级目录，因此最后的`sthPathhaha`被抵消掉了。

#### 解析路径

```
var path = require('path');
console.log(path.resolve('foo/bar', './baz')); // F:\桌面\前端知识库\NodeJS\foo\bar\baz
console.log(path.resolve('foo/bar', '/baz/haha')); // F:\baz\haha
```

我的当前目录位置位于：`F:\桌面\前端知识库\NodeJS`，第一次打印是因为`resolve`的第二个参数里含`./`，所以把两个参数的路径连接起来。正常情况下是对每个参数依次`cd`操作。

```
var path = require('path');
console.log(path.resolve('wwwroot', 'static/png', '../gif/image.gif')); // F:\桌面\前端知识库\NodeJS\wwwroot\static\gif\image.gif
```

`resolve`的路径可以是文件（image.gif）。

#### 查找两个绝对路径之间的相对路径

```
var path = require('path');
console.log(path.relative('data/static/javascript', 'data/views/index.jade')); // ..\..\views\index.jade
```

从第一个参数跳转到第二个参数的位置。

#### 提取路径的组成部分

```
var path = require('path');
console.log(path.dirname('data/static/css/custom.css')); // data/static/css
```

即提取文件夹路径。

```
var path = require('path');
console.log(path.basename('data/static/css/custom.css')); // custom.css
```

即提取文件名。

```
var path = require('path');
console.log(path.basename('data/static/css/custom.css', '.css')); // custom
```

假设我们知道文件的扩展名（第二个参数），因此`basename`提取到的是文件名（不含后缀）。如果不知道扩展名，则：

```
var path = require('path');
var filePath = 'data/static/css/custom.css';
var ext = path.extname(filePath);
console.log(ext); // .css
console.log(path.basename(filePath, ext)); // custom
```

通过`path.extname`提取扩展名。

#### 确定路径是否存在

到目前为止，所进行的路径处理和提取都没有涉及底层的文件系统，但有时候也许需要判断给定的路径究竟是否存在。例如在创建目录或文件前，首先要确定它存在不存在。

```
var fs = require('fs');
var filePath = 'F:\\桌面\\前端知识库\\NodeJS';
fs.exists(filePath, function(exists) {
  if (exists) {
    console.log('文件路径存在！'); // 确定了文件路径存在，就可以读写了
  } else {
    console.log('文件路径不存在啊！'); // 路径不存在，就要新建文件了
  }
});
```

当路径存在或不存在时，调用不同的回调函数。上例回调函数中的`exists`值为`true`，所以执行第一个`console.log`。

因为`fs.exists`函数进行了 I/O 操作，因此它是异步的，所以必须要向其传递一个回调函数，当 I/O 操作结束后通知这个回调函数。如果不是在 I/O 回调函数中，也可以使用同步操作`fs.existsSync`，功能完全一样。

```
var fs = require('fs');
var filePath = 'F:\\桌面\\前端知识库\\NodeJS';
console.log(fs.existsSync(filePath)); // true
```

### fs 模块简介

`fs`模块可以查询文件的统计信息、打开文件、读写文件和关闭文件。

#### 查询文件的统计信息

查询文件的大小、创建时间或权限等。

```
var fs = require('fs');
var filePath = 'F:\\桌面\\前端知识库\\NodeJS';
fs.stat(filePath, function(err, stats){
  if (err) {
    throw err;
  } else {
    console.log(stats);
  }
});
```

因为路径正确，所以`fs.stat`函数调用了`stats`类的一个实例给它的回调函数。这个`stats`有多个属性，如`mtime`表示目录创建的时间，也有多个方法：

- `stats.isFile()` 如果是标准文件而不是目录、套接字、符号链接或设备的话，返回 true
- `stats.isDirectory()` 是目录，返回 true
- `stats.isBlockDevice()` 块设备则返回 true，大多娄 \*nix 系统中块设备位于 /dev 目录下
- `stats.isCharacterDevice()` 字符设备则返回 true
- `stats.isSymbolicLink()` 符号链接则返回 true
- `stats.isFifo()` 是管道则返回 true
- `stats.isSocket()` 是套接字则返回 true

```
var fs = require('fs');
var filePath = 'F:\\桌面\\前端知识库\\NodeJS';
fs.stat(filePath, function(err, stats){
  if (err) {
    throw err;
  } else {
    if (stats.isDirectory()) {
      console.log('是目录');
    }
  }
});
```

因此上例输出：“是目录”。

### 打开文件

在读取或处理文件之前，必须首先打开文件，然后使用文件描述符调用所提供的回调函数，稍后就可以用这个回调函数对打开的文件进行读写。

```
var fs = require('fs');
fs.open(__dirname + '\\深入浅出 Node.js.md', 'r', function(err, fd){
  if (err) {
    throw err;
  } else {
    console.log(fd); // 3
  }
});
```

`fs.open`的第二个参数是标志位，表明文件以何种模式打开，标志位的含义：

- `r` 打开文本文件进行读取，数据流的位置在文件的起始处
- `r+` 打开文件进行读写，数据流的位置在文件的起始处
- `w` 如果文件不存在则创建，如果文件存在则清零，数据流的位置在文件的起始笮
- `w+` 打开文件进行读写，如果不存在则创建，如果存在则清零，数据流的位置在文件起始处
- `a` 打开文件写入数据，如果不存在则创建，如果存在则清零，数据流的位置在文件的结尾处，此后的定操作都将数据追加到文件尾
- `a+` 打开文件进行读写，如果不存在则创建，如果存在则清零，数据流的位置在文件的结尾昝，此后的写操作都将数据追加到文件尾

### 读取文件

```
var fs = require('fs');
// 打开文件
fs.open(__dirname + '\\深入浅出 Node.js.md', 'r', function(err, fd){
  if (err) {
    throw err;
  }
  var readBuffer = new Buffer(1024); //
  var bufferOffset = 0;
  var bufferLen = readBuffer.length;
  var filePosition = 100;
  // 当有错误发生、成功读取了数据或没有数据可读时会触发 fs.read 的最后一个参数即回调函数；当有错误发生，回调函数的第一个参数获取一个错误对象，否则 err 的值为 null，如果成功读取到数据，则第二个参数即 readBytes 获取读入缓冲区的数据，如果其值为 0，则代表到达文件尾
  fs.read(fd, readBuffer, bufferOffset, bufferLen, filePosition, function read(err, readBytes){
    if (err) {
      throw err;
    }
    console.log('Just read ' + readBytes + ' bytes.');
    if (readBytes > 0) {
      fs.writeFile('test.txt', readBuffer, function(err){
        if (err) {
          throw err;
        } else {
          console.log(readBuffer.toString());
        }
      })
    }
  });
});
```

### 写入文件

`fs.write(fd, writeBuffer, bufferPosition, bufferLength, filePosition, function (err, written) {})`。

### 关闭文件

`fs.close(fd, function() {})`。

## 第 8 章 -- 创建和控制外部进程

Node 的强项是高效处理 I/O 操作。当有 CPU 密集型任务时，需要创建新进程，以释放事件循环。另一种使用子进程的方式是执行一个外部命令（如 windows 的 cmd、notepad、calc 等命令），当执行结束后让 Node 获取返回的结果。

### 执行外部命令

```
var child_process = require('child_process');
var exec = child_process.exec;

exec('calc', function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
  console.log('已打开计算器！' + stdout);
});
```

`exec`打开了 windows 自带的计算器程序。

如果执行命令需要参数，则：

```
var options = {
  key: value
}
exec('命令', options, function (err, stdout, stderr) {});
```

创建父子进程：

```
// parent.js
var child_process = require('child_process');
var exec = child_process.exec;
var options = {
  env: {
    number: 1234
  }
};
exec('node child', options, function(err, stdout, stderr) {
  if (err) {
    throw err;
  }
  console.log('父进程开始\n' + 'stdout: ' + stdout + '父进程结束');
});


// child.js
var exec = require('child_process').exec;
var number = process.env.number;
console.log('这里是子进程');
exec('calc', function(err, stdout, stderr){
  console.log('已打开计算器');
});
```

输出：

```
父进程开始                                                               
stdout: 这里是子进程                                                     
已打开计算器                                                             
父进程结束
```

可以看到，父进程通过`node child`创建了子进程，子进程打印内容并打开计算器程序，执行完后把结果返回给父进程（stdout）。

### 生成子进程

通过上述方法创建子进程的缺点：

- 除了命令行参数和环境变量外，`exec`函数不允许与子进程通信
- 子进程的输出是被缓存的，结果无法对其进行流操作，它可能会耗尽内存

但是`child_process`还提供另外的创建进程方法来弥补缺点，使其可以在两个进程间进行通信。

#### 创建子进程

```
var spawn = require('child_process').spawn;
var child = spawn('calc', []);
```

创建子进程，其中`spawn`的第二个参数是`calc`命令的参数。`spawn`会返回一个 ChildProcess 对象，该对象是一个句柄，它封装了对实际进程的访问，此处将这个对象的描述符赋值给 child 变量。

#### 监听子进程的输出数据

任何一个子进程句柄都有一个属性 stdout，它以流的形式表示子进程的标准输出信息，然后可以在这个流上绑定事件，即“对于从子进程输出中获取的每个数据块，都要调用回调函数”。

```
var spawn = require('child_process').spawn;
var child = spawn('calc', []);
child.stdout.on('data', function(data) {
  console.log('calc output: ' + data);
});
```

这样每次子进程有数据输出时，都会触发`child.stdout.on()`。如果子进程发生错误，则监听标准错误流：`child.stderr.on()`。当然`calc`无输出显示，所以看不到啥，啊啊。

#### 向子进程发送数据

除了从子进程的输出流中获取数据之外，父进程也向子进程的标准输入流中定稿数据，这相当于各子进程发送数据，标准输入流是用`childProcess.stdin`属性表示。子进程也可以使用`process.stdin`流来监听数据，但首先要恢复流，因为默认情况下它处于暂停状态。

```
// child.js
process.stdin.resume();
// 子进程的输入内容为 data
process.stdin.on('data', function(data){
  var number;
  try {
    number = parseInt(data.toString(), 10);
    number += 1;
    // 子进程的输出内容为 number
    process.stdout.write(number + '\n');
  } catch(err) {
    process.stderr.write(err.message + '\n');
  }
});
```

在控制台输入数字并回车，它会自动 +1 并显示结果。

```
// parent.js
var spawn = require('child_process').spawn;
var child = spawn('node', ['child.js']); // 将上述示例作为子进程 child.js 在此运行

setInterval(function() {
  var number = Math.floor(Math.random() * 10000); // 生成一个小于 10000 的随机数
  child.stdin.write(number + '\n'); // 子进程 child 的输入内容为随机数 number
  // 子进程的输出内容为：child replied to xxx with: xxx + 1
  child.stdout.once('data', function (data) {
    console.log('child replied to ' + number + ' with: ' + data);
  });
}, 3000); // 每隔 3 秒钟运行一次该匿名函数
child.stderr.on('data', function(data){
  process.stdout.write(data);
});
```

#### 当子进程退出时获取通知

```
var spawn = require('child_process').spawn;
var child = spawn('notepad', []); // 将上述示例作为子进程 child.js 在此运行

child.stdout.on('data', function(data){
  console.log('data from child: ' + data);
});
child.on('exit', function(code){
  console.log('关闭记事本：' + code);
});
```

当关闭记事本时，输出“关闭计算器：0”。若 code 的值不为 0，则表示出错了。

### 向进程发送信号并终止进程

使用信号来控制子进程，信号是父进程和子进程进行通信的一种简单方式，甚至可以用它来终止子进程。最常见的信号是终止进程：

```
var spawn = require('child_process').spawn;
var child = spawn('notepad', []);
setTimeout(function(){
  child.kill();
}, 3000);
```

3 秒后关闭记事本。`child.kill()`还可以有标识信号类型的字符串作为参数。如：`child.kill('SIGUSR2');`，子进程可以对信号进行重写。如在子进程中编写：

```
process.on('SIGUSR2', function() {
  console.log('Got a SIGUSR2 signal');
});
```

这样当子进程收到信号 SIGUSR2 时不会被终止，则是用`console.log`来代替，通过这种方法可以控制子进程。

注意：SIGKILL & SIGSTOP 是由操作系统处理的特殊信号，不能被重写。

## 第 9 章 -- 读写数据流

通过 Node 对象实现可读流和可写流，代表数据的向内流动（可读流）和向外流动（可写流）。流的一个例子是 TCP 套接字，可以在其上进行读写操作，流的另一个例子是文件，可以对其按顺序进行追加和读取。

### 使用可读流

#### 等待数据

流能够以块为单位发送数据，通过监听`data`事件，在流每次提交一块数据据时，都会得到通知。可以以缓冲区或字符串的形式获取数据，这取决于流的编码设置（`stream.setEncoding('utf-8');`）。

#### 暂停与恢复流

可读流像阀门，可以通过暂停流来阻止数据流动：`stream.pause()`。恢复流使用：`stream.resume()`。

#### 了解流何时终止

当可读流到达文件结尾时，流会发射`end`事件，这时监听`end`事件即可：

```
var readableStream = '...';
readableStream.on('end', function() {
  console.log('the stream has ended');
});
```

这时再也接收到到`data`事件了。

### 使用可写流

#### 将数据写入流

通过向可写流传递缓冲区或字符串，可以将字符串写入其中：

```
var writableStream = 'xxx';
writableStream.write('this is an UTF-8 string');
```

这里默认传递的是 UTF-8 格式的字符串，`x.write(str, 'base64')`可以修改字符格式。

#### 等待流被清空

Node 不会在 I/O 操作上产生阻塞，也不会在读或写命令上产生阻塞，在调用写命令时能确定缓冲区是否被立即刷新，如未刷新则将其存储在进程内存中，稍后当流成功刷新挂起的缓冲区时，就会发射`drain`事件：

```
var writableStream = '...';
writableStream.on('drain', function() {
  console.log('drain.emitted');
});
```

### 考虑几个流的例子

#### 创建文件系统流

```
var fs = require('fs');
var rs = fs.createReadStream('text.txt');
```

### stream.pipe

暂停可读流直到可写流赶上并在之后恢复可读流的过程是一种循环模式。

```
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
  var rs = fs.createReadStream('./test.txt');
  rs.pipe(res, {end: false});
  rs.on('end', function(){
    res.write('that\'s all!');
    res.end();
  });
}).listen(6789);
```

默认情况，`end`会在可读流结束时，在可写流上被调用。为了避免这种情况，在`pipe`里传入参数`{end: false}`。

## 第 10 章 -- 构建 TCP 服务器

Transmission Control Protocol 是 Internet 的基础协议之一，它位于 Internet Protocol 之上，为应用层提供了一种传输机制。

### 创建 TCP 服务器

使用 net 模块创建 TCP 服务器。

可以向 createServer 传递一个回调函数，每当有 connection 事件发生时都会调用该回调函数。在回调函数内部会提交一个套接字对象，可以应用该对象从客户端获取数据或向客户端发送数据。

因为服务器对象也是一个事件发射器，所以也可以在其生命周期内监听事件：

- `listening` 当服务器在指定的端口或地址监听时触发
- `connection` 当有新的连接创建时。回调函数会接收对应的套接字对象，可以向 net.createServer() 函数传递一个回调函数绑定到该事件上
- `clone` 当服务器被关闭时
- `error` 如当尝试绑定一个已被战胜的端口或没有权限绑定的端口时触发

```
var server = require('net').createServer();
var port = 3333;

server.on('listening', function(){
  console.log('服务开启于：' + port);
});

server.on('connection', function(socket){
  console.log('产生一个新连接');
  socket.end();
  server.close(); // 触发关闭连接操作
});

server.on('close', function(){
  console.log('服务关闭');
});

server.on('error', function(err){
  console.log(err.message);
});

server.listen(port);
```

在 CMD 里输入`telnet localhost 3333`，则控制台输出：

```
服务开启于：3333                                                         
产生一个新连接                                                                  
服务关闭
```

#### 应用套接字对象

当获取 connection 事件时也获得了一个套接字对象作为回调函数的第一个参数，套接字既是可读流也是可写流，这意味着当它获得数据包时会发射`data`事件，当连接关闭时会发射`end`事件。

因为套接字对象也是一个可写流，于是可以应用`socket.write()`函数向套接字写入缓冲区或者字符串。通过调用`socket.end`函数告诉套接字当所有数据都被写入之后应该终止连接。

```
var server = require('net').createServer(function(socket){
  console.log('产生新连接');
  socket.setEncoding('utf-8');
  socket.write('请输入内容，键入"quit"退出。');
  socket.on('data', function(data){
    console.log('收到：' + data.toString());
    if (data.trim().toLowerCase() === 'quit') {
      socket.write('再贱');
      return socket.end();
    }
    socket.write('+' + data + '|');
  });
  socket.on('end', function(){
    console.log('连接关闭');
  });
}).listen(4321);
```

在 windows 的 CMD 里输入`telnet localhost 4321`。

这个示例，我这测试了是每输入一个字符就触发`data`，这样根本输入不了连接的字符串啊，还怎么`quit`，日了狗。

因为 socket 对象是一个可读流，可以通过调用 socket.pause & socket.resume 函数控制数据流，甚至用管道将套接字写入一个可写流中。

```
var ws = require('fs').createWriteStream('test.txt');
require('net').createServer(function(socket){
  socket.pipe(ws);
}).listen(4321);
```

这样，在 CMD 里输入了内容回车后，test.txt 文件内容把输入的内容追加到文件尾（最开始先执行清零）。

同样的，将可读流传给 socket 套接字中。

```
var rs = require('fs').createReadStream('test.txt');
require('net').createServer(function(socket){
  rs.pipe(socket);
}).listen(4321);
```

这样在 CMD 里`telnet localhost 4321`，则可以看到 test.txt 文件内容了。如果希望连接一直保持为运行状态，应该将`{end: false}`参数传给`pipe`命令作为其第二个参数。

### 构建简单的 TCP 聊天服务器

```
var net = require('net');
var server = net.createServer();
var sockets = [];

server.on('connection', function(socket){
  console.log('有一个新连接');
  sockets.push(socket);
  socket.on('data', function(data){
    console.log('获取数据：' + data);
    sockets.forEach(function(otherSocket){
      if (otherSocket !== socket) {
        otherSocket.write(data);
      }
    });
  });
  socket.on('close', function(){
    console.log('关闭连接');
    var index = sockets.indexOf(socket);
    sockets.splice(index, 1);
  });
});

server.on('error', function(err){
  console.log(err.message);
});

server.on('close', function(){
  console.log('服务器关闭');
});

server.listen(4321);
```

在 CMD 里打开多个`telnet localhost 4321`，往其中一个输入信息，其它的终端会显示出信息。

## 第 11 章 -- 构建 HTTP 服务器

HTTP 服务器是最主流的 Web 服务器。

```
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello uRuier');
}).listen(4321);
```

或者简写成：

```
require('http').createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('uRuier');
}).listen(4321);
```

`http.createServer()`函数接受了一个回调函数，该回调函数会在每个请求上被调用。`res.end()`接收一个字符串或缓冲区，它会在结束请求前将这个字符串或缓冲区写入响应。

当客户端发出一个请求时，HTTP 就会发射一个 request 事件，该事件传入 HTTP 请求和 HTTP 响应对象。

### 理解 http.ServerRequest 对象

在监听 request 事件时，回调函数会得到一个 http.ServerRequest 对象作为第一个参数。这个对象包含一些属性：

- `req.url` 包含路径，如下例中的'/abcd'
- `req.method` 值为 GET | POST | DELETE 等
- `req.headers` 该属性包含一个对象，它拥有请求上所有的 HTTP 头，下面示例中使用`util.inspect()`分析它的属性

```
var util = require('util');

require('http').createServer(function(req, res){
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(req.url + '\n' + req.method + '\n' + util.inspect(req.headers));
}).listen(4321);
```

在浏览器里键入：`http://localhost:4321/abcd`，将得到：

```
/abcd
GET
{ host: 'localhost:4321',
  connection: 'keep-alive',
  'cache-control': 'max-age=0',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
  'accept-encoding': 'gzip, deflate, sdch',
  'accept-language': 'zh-CN,zh;q=0.8',
  cookie: '_ga=GA1.1.1681871243.1446367663' }
```

来个 Express 实例：

```
var express = require('express');
var app = express();
var ws = '';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/form.html');
});

app.listen(4321);

app.post('/process_get', function(req, res){
  req.on('data', function(data){
    console.log('当前接收：' + data);
    ws += data;
    console.log('ws: ' + ws);
  });
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(ws);
});


// form.html
<html>
<body>
<form action="http://127.0.0.1:4321/process_get" method="POST">
    First Name: <input type="text" name="first_name">
    <br>
    Last Name: <input type="text" name="last_name">
    <br>
    <input type="submit" value="Submit">
</form>
</body>
</html>
```

在浏览器里输入：`http://localhost:4321/`，填写表单，即可看到 request 请求体（request.body）。

### 理解 http.ServerResponse 对象

```
res.writeHead(200, {
  'Content-Type': 'text/plain',
  'Cache-Control': 'max-age=3600'
});
```

写入响应头，第一个参数是状态码，200 表示服务器成功接收到浏览器发送过来的请求；第二个参数是一个包含所有想要发送的响应头属性的对象，可选。

通过`res.setHeader(name, value);`修改已经设置的响应头或设置一个新的响应头。这个设置要在`res.write()`或`res.end()`之前设置。如果已经在响应对象上设置了`res.writeHead()`，则其也不会生效，这是因为`res.writeHead()`已经把响应头发送出去了。

通过`res.removeHeader(name);`删除已设置的响应头。同样，要在响应头未发送到浏览器之前设置。

通过`res.write(str or buffer)`发送响应主体。

### 以流的形式传送 HTTP 分块响应

```
var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res){
  res.writeHead(200, {'Content-Type': 'video/mp4'});
  var rs = fs.createReadStream(__dirname + '/one.mp4');
  rs.pipe(res);
});

app.listen(4321);
```

在当前目录下先放 one.mp4 文件，这样浏览器（现代浏览器）将直接播放视频，即使只下载了一点点。

若未指定`Content-Length`响应头，则 Node HTTP 服务器会向浏览器发送：

```
Transfer-Encoding:chunked
X-Powered-By:Express
```

上述响应头会让客户端接受若干数据块作为响应主体，并在客户端结束响应之前发送一个具有 0 长度的结束块。这对向浏览器传送音频或视频非常有用。由 Express 驱动。

上例中的`pipe`很有用，可以在每收到一个请求时，发送后台结果给浏览器。

```
var spawn = require('child_process').spawn;

require('http').createServer(function(req, res){
  var child = spawn('node', ['child.js']);
  child.stdout.pipe(res);
  res.on('end', function(){
    child.kill();
  });
}).listen(4321);
```

### 关闭服务器

`server.close`，如果希望它能够重新开始监听，需要再次执行`server.listen(port[, hostname]);`。

### 实例 -- 获取静态文件

```
var path = require('path');
var fs = require('fs');

function reportError(err) {
  console.log(err);
  res.writeHead(500);
  res.end('服务器发生错误');
}

require('http').createServer(function(req, res){
  var filePath = path.normalize('.' + req.url);
  console.log(filePath);
  fs.exists(filePath, function(exists){
    if (exists) {
      fs.stat(filePath, function(err, stats){
        if (err) {
          return reportError(err);
        }
        if (stats.isDirectory()) {
          res.writeHead(403);
          res.end('禁止访问');
        } else {
          rs = fs.createReadStream(filePath);
          rs.on('error', reportError);
          res.writeHead(200, {'Content-Type': 'text/javascript', 'Encoding': 'UTF-8'});
          rs.pipe(res);
        }
      });
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
}).listen(4321);
```

差点忘了`path.exists`已经变成`fs.exists`了。

```
require('http').createServer(function(req, res){
  res.writeHead(200);
  var left = 10;
  var interval = setInterval(function(){
    console.log(interval);
    if (--left === 0) {
      clearInterval(interval);
      res.end();
    }
  }, 1000);
}).listen(4321);
```

要及时清除`interval`，要不会内存泄漏。

## 第 12 章 -- 构建 TCP 客户端

TCP 位于 IP 上一层，是应用最广泛的互联网传输协议之一，它面向连接，意味着一个终端需要和另一个终端建立专门的连接，该连接是双向数据流，两个终端可以同时通过该数据流收发数据。TCP 可以保证所收到的消息是有序的（通过内置的数据流控制机制）。建立的连接形成两个数据流：接收数据的可读流和写入数据的可写流。

注意：TCP 只能保证数据包被应用程序顺序接收，不能保证数据包被全部接收。

### 连接服务器

使用 net 模块连接 TCP 服务器。

### 发送和接收数据

调用`net.createConnection()`函数的返回值是`net.Socket`类的一个实例，这表示与服务器的连接，它既是可读流也是可写流，允许发送数据：`conn.write('给浏览器的数据', 'UTF-8');`。

当数据可用时，连接会发射`data`事件：

```
conn.setEncoding('base64');
conn.on('data', function(data){
  console.log('some data: ' + data);
});
```

### 终止连接

`conn.end('再贱', 'utf-8')`。

### 处理错误

```
conn.on('error', function(err){
  console.error(err.message + err.code);
});
```

### 创建命令行 TCP 客户端

```
var net = require('net');
var conn = net.createConnection(4321);

conn.on('connect', function(){
  console.log('连接成功');
});

conn.on('error', function(err){
  console.log(err);
});
```

当 Node 进程启动时，`process.stdin`用于接收键盘输入，初始化处于暂停状态，恢复之后才会发射`data`事件，调用流上的`resume()`方法恢复流。

将服务器发送给进程标准输出流的每条消息打印出来，通过`conn.pipe(process.stdout);`。然而默认情况下，`sourceStream.pipe(targetStream)`会在源流结束时终止目标流，这意味着进程的标准输出流会在连接关闭之后关闭，通过`conn.pipe(process.stdout, {end: false});`避免。

## 第 13 章 -- 创建 HTTP 请求

HTTP 已经成为互联网上许多私有和公有服务的底层基础的核心部分，HTTP 不仅被用来提供静态数据，也成为提供和使用公共 API 的首选方式。

在 HTTP 协议中，请求有两个重要的属性：URL 和方法。

### 应用第三方请求模块(request)简化 HTTP 请求

安装`request`模块：`cnpm install request`。

```
request(url, function(error, response, body) {
  
});
```

可以根据 HTTP 动词简化操作：

- `request.put(url)` 发布一个 PUT 请求
- `request.post(url)`
- `request.head(url)`
- `request.del(url)`
- `request.get(url)` 只是追求形式上的统一，它是默认的 request 请求

其中的 url 可以用 option 对象来代替：

```
{
  url: 'http://www.baidu.com',
  method: 'GET',
  headers: {Accept: 'application/json'},
  body: new Buffer('uRuier')
}
```

下面是 option 具体的参数清单：

- `uri` 合法的 url 或经 url.parse() 解析过的 url 对象
- `method`
- `headers`
- `qs` 作为查询字符串附加到 URL 后的 key-value，如：{a: 1, b: 2}
- `body` POST 和 PUT 请求主体，必须是缓冲区或字符串
- `form` 将请求主体设置为`qs`的形式，并且在请求头中增加了内容类型`application/x-www-form-urlencoded; charset=utf-8`
- `json` 将请求主体设置为 JSON 形式，且在头部数据中增加了内容类型`application/json`
- `followRedirect` 跟随具有状态码 3XX 的响应，默认为 true
- `maxRedirects` 跟随重定向最多次数，默认 10
- `onResponse` 如果值为 true，回调函数将会在 response 事件发生时被调用，而不是在 end 事件发生时调用
- `encoding` 如果值为 null，响应主体将以缓冲区的形式返回
- `pool` 表示请求代理的哈希对象，如果忽略该选项，请求会使用全局套接字池（被设置为在 Node 中 maxSockets 的默认值）
- `pool.maxSockets` 一个整数，表示套接字池中套接字的最大数
- `timeout` 一个整数，表示在放弃之前等待对请求做出响应的时间，单位毫秒

```
var fs = require('fs');
var request = require('request');
var option = {
  url: 'http://www.baidu.com/s',
  method: 'GET',
  qs: {wd: 'NodeJS'}
}

request(option, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var writeStream = fs.createWriteStream('./output.html'); // 创建一个可写入的文件
    writeStream.write(body, 'utf-8'); // 往文件里写数据
    writeStream.end();
  }
});
```

运行后会把从百度查找 NodeJS 的结果返回到 output.html 文件中（图片挂了）。

#### 查询城市 ID

```
var fs = require('fs');
var express = require('express');
var app = express();
var request = require('request');

app.listen(4321);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/form.html');
});

app.post('/searchTianqi', function(req, res){
  req.on('data', function(data){
    var url = 'http://apis.baidu.com/apistore/weatherservice/citylist?' + data;
    var option = {
      url: url,
      method: 'GET',
      encoding: 'utf-8',
      headers: {apikey: 'e3320173f0bfd2027834cc0e72990a44'}
    };
    request(option, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var area_id = JSON.parse(body).retData[0]['area_id'];
        app.set('cityId', area_id);
      }
    });
  });
  
  // 这里要等待上面的 request 返回城市 ID 才能给浏览器发送，用 promise | async 来异步操作？
  setTimeout(function(){
    res.send(app.get('cityId'));
  }, 1000);
});
```

从百度 apistore 中提供的天气 API 进行查询。

#### 流式传送

```
var fs = require('fs');
var request = require('request');

request('http://www.baidu.com').pipe(fs.createWriteStream('baidu.html'));
```

直接将请求的网页内容保存到本地。

## 第 14 章 -- 使用用户数据报

使用 UDP 的网络应用程序：

- Domain Name System
- Internet Portocol Television
- Voice over IP
- Trivial File Transfer Protocol
- Simple Network Management Protocol
- Dynamic Host Configuration Protocol

### 构建数据报服务器

```
var dgram = require('dgram');
var server = dgram.createSocket('udp4');
```

注意：在 UDP 上不存在真正的服务器，它只是在套接字上监听消息的终端，服务器一般要对收到的消息提供某种类型的反馈。

## 第 15 章 -- 用 TLS/SSL 保证服务器的安全性

## 第 16 章 -- 用 HTTPS 保证 HTTP 服务器的安全性

## 第 17 章 -- 测试模块及应用程序

自动化测试是提供代码质量的最重要实践之一，目的是创建覆盖全部代码的一系列测试，包括软件运行的主要情形和边缘情形。一些准则，例如测试驱动开发甚至鼓励编写测试并让其遭遇失败，然后再实现可让测试成功运行的代码。

### node-tap

在目录下新建 package.json 文件，写入：

```
{
  "name": "myApp",
  "version": "0.0.1",
  "devDependencies": {
    "tap": "*"
  }
}
```

然后：`cnpm install`，即自动安装依赖。编写测试文件 test.js，如下：

```
var test = require('tap').test;

test('addition of 2 and 2 works', function(t){
  t.equal(2 + 2, 4, '2 + 2 should be 4');
  t.end();
});
```

### 使用断言测试模块

要创建可用的测试，需要一种验证结果与期望是否匹配的方法，因此，前面的例子用到了 node-tap 内置的断言函数。

#### 使用断言模块

Node 在其自身的测试中用到了内置的 assert 模块，此外它还向外暴露了 assert 模块，这意味着可以用它在自己的测试中验证假设。

通过`var assert = require('assert');`使用 assert 模块，这样就可以使用断言了，每一个断言函数都会设置一个期望条件，如果期望条件不满足，会抛出一个异常。

首先，可以测试值是否为真：

```
var a = true;
assert(a);
```

断言中还提供一个消息，作为函数的最后一个参数，以此来在测试失败时提供更多的显示信息：

```
assert(a, 'a should be truthy');
```

还可以使用别名来判断值是否为真：`assert.ok(a, 'a should be truthy');`。assert 模块有浅（类似于`==`）和深（类似于`===`）两种相等性测试。

浅：`assert.equal('10', 10); // true`。

还可以使用它的对立面--不相等断言：`assert.notEqual('10', 10);`。

还有严格相等主义：`assert.strictEqual('10', 10, 'string 10 should equal to number 10');`。

深：

```
var obj = {b: 1, a: [1, 2, 3, 4]};
assert.deepEqual(obj, {a: [1, 2, 3, 4], b: 1});
```

#### 使用 Node-Tap 中的内置断言函数

```
var test = require('tap').test;

test('addition of 2 and 2 works', function(t){
  var a = {a: 1, b: 2};
  t.equivalent(a, {b: 2, a: 1});
  t.end();
});
```

使用`t.type()`函数测试对象类型：

```
var test = require('tap').test;

test('Object type', function(t) {
  t.type(1, 'number');
  t.type('abc', 'string');
  t.type({}, Object);
  
  var EventEmitter = require('events').EventEmitter;
  var ee = new EventEmitter();
  t.type(ee, EventEmitter);
  t.type(ee, Oject);
  
  t.end();
});
```

显示如下：

```
TAP version 13
    # Subtest: Object type
    ok 1 - type is number
    ok 2 - type is string
    ok 3 - type is Object
    ok 4 - type is EventEmitter
    ok 5 - type is Object
    1..5
ok 1 - Object type # time=34.277ms

1..1
# time=65.688ms
```

可以通过向`t.type()`断言函数传递一个构造函数来判断一个对象是否继承自某个构造函数。

### 测试异步模块

## 第 18 章 -- 调试模块及应用程序

### 使用 Node 检查器

Node 检查器作为一个守护程序默认运行在 8080 端口，通过`node-inspector &`启动它。

控制台显示：

```
Node Inspector v0.12.5
Visit http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858 to start debuggi
ng.
```

在浏览器中打开`http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858`就可以看到类似谷歌开发者工具的界面了，它会向后台发送 node-inspector 进程。

然后需要在 node 可执行文件上使用`--debug-brk` or `--debug`选项来启动应用程序，如：`node --debug-brk test.js`。

`--debug-brk`选项让应用程序在第 1 行中断，而`--debug`选项只是启动了调试功能。

## 第 19 章 -- 控制回调流程

当 Node 执行异步操作时，操作的结果并不是通过返回函数来反馈。相反，异步程序依赖于回调函数，回调函数通常作为参数传入。

如果需要离开进程并进行一些 I/O 操作，大多数时候需要指定一个在操作结束时被调用的回调函数。

### 使用 ASYNC 流程控制库

## 第 20 章 -- 构建和使用 HTTP 中间件

## 第 21 章 -- 用 Express 创建 Web 应用程序

## 第 22 章 -- 使用 Socket.io 创建通用的实时 Web 应用程序

## 第 23 章 -- 使用 node-mysql 连接 MySQL 数据库

## 第 24 章 -- 使用 Nano 连接 CouchDB 数据库

## 第 25 章 -- 使用 Mongoose 连接 MongoDB 数据库

面向文档的数据库处于 NoSQL 运动的前锋和中心，它们与关系数据库不同，不需要事先指定数据结构，相反可以根据项目需要有组织地改变数据结构。与关系数据库另一个重要不同之处在于文档是原子单元，可以根据需要保证其完整性，因此不再需要跨表联合和事务。

在 MongoDB 中，数据被组织起来以便 MongoDB 能保持一组集合，每个集合中都有一组文档，而每个文档又有一组字段。字段为 key-value 形式，key 是字符串，值为基本类型。

Mongoose 允许采用对象模型来访问 MongoDB。

### 安装 Mongoose

```
{
  "name": "myApp",
  "version": "0.0.1",
  "dependencies": {
    "express": "4.13.1",
    "jade": "1.11.0",
    "mongoose": ">=2.7.0"
  }
}
```

`cnpm install`。

### 理解 Mongoose 如何使用模型封闭对数据库的访问

Mongoose是一个对数据库交互对象建模的工具，一个数据库有多个集合，每个集合又有多个文档。同一集合中的两个文档不必喝的相似的数据结构。

要在 Mongoose 中定义模式，每个模式都包含一个字段以及字段约束列表，所有字段都有类型以及由类型限定的约束。

模型表示数据库到使用模式的集合的连接。

### 连接 MongoDB 数据库

需要先指定一个指向 MongoDB 数据库的 URL：`mongodb://username:password@hostname:port/database`。

如果连接本地 MongoDB，则：`mongodb://localhost/database`。

然后就可以用 Mongoose 连接数据库，在 app.js 中添加如下代码：

```
var dbURL = 'mongodb://localhost/database';
var db = require('mongoose').connect(dbURL);
```

### 定义模式

```
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String
});

module.exports = UserSchema;
```

### 定义模型

```
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

var User = mongoose.model('User', Username);

module.exports = User;
```

未完待续。