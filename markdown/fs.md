## fs 文件系统

- 文件属性读写：`fs.stat` | `fs.chmod` | `fs.chown`
- 文件内容读写：`fs.readFile` | `fs.readdir` | `fs.writeFile` | `fs.mkdir`
- 底层文件操作：`fs.open` | `fs.read` | `fs.write` | `fs.close`

```
var fs = require('fs-extra'); // 不用再引入 fs 模块！用 fs-extra 代替它！当然两者可以共存，即 var fse = require('fs-extra');
```

`fs-extra`是对官方`fs`的封装，因此使用更简单。

```
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}
```

### fs.readFile -- 读文件内容

```
var fs = require('fs-extra');
var pathname = __dirname + '/test.txt'; // __dirname 是全局变量，表示当前目录路径，事先需先创建 test.txt 文件

// 第二个参数 'utf-8' 为默认字符编码，可以省略
fs.readFile(pathname, 'utf-8', function (err, data) {
    if (err) {
        console.log('oops');
    } else {
        console.log(data); // 若省略了 'utf-8'，则为 Buffer 类型，需要用 toString 方法
    }
});
```

同步方式在方法名后加`Sync`，如`fs.readFileSync();`，但一般不推荐。

### fs.writeFile -- 将数据写入文件

```
var fs = require("fs");

console.log("准备写入文件");
fs.writeFile('test.txt', '我是要写入的文件内容！',  function(err) {
  if (err) {
    return console.error(err);
  }
  fs.readFile('test.txt', function (err, data) {
    if (err) {
      return console.error(err);
    }
    console.log("异步读取文件数据: " + data.toString());
  });
});
```

懂了读写操作，就可以实现文件复制：

```
// index.js
var fs = require('fs');

function copy(src, dst) {
    fs.writeFile(dst, fs.readFileSync(src)); 
    // 这里使用同步，是为了确保读完数据后，再写
    // 同时也省略了第三个参数，即回调函数，主要是因为本例中在写入文件后不需要再执行其它操作
    // 大文件拷贝使用：fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

这样在终端（Ubuntu 下使用 Ctrl + Alt + T 打开终端）里键入`node index.js ./test.txt ./bak.txt`可在当前目录下生成测试文本的拷贝（即 bak.txt）。

index.js 文件中 main 函数接收两个参数，分别是源文件和生成的目标文件，通过`process.argv.slice(2)`将两个参数转换成数组供main函数调用。

PS：`slice`函数将我们在终端里输入的命令转换成['node', 'index.js', './test.txt', './bak.txt']数组，并返回 index 为 2 和 3 的数组项，即['./test.txt', './bak.txt']。

PS：直接在 Linux 终端键入：`cp -r ./test.txt ./bak.txt`即可拷贝文件。

### fs.stat - 获取文件信息

```
var fs = require("fs");

console.log("准备打开文件！");
// 格式和读文件相似
fs.stat('test.txt', function (err, stats) {
  if (err) {
    return console.error(err);
  }
  console.log(stats);
  console.log("读取文件信息成功！");

  // 检测文件类型
  console.log("是否为文件? " + stats.isFile());
  console.log("是否为目录? " + stats.isDirectory()); // 要删除目录时，就要用到这个方法
});
```

文件状态如下：

```
{ 
  dev: 347801,
  mode: 33206,
  nlink: 1,
  uid: 0,
  gid: 0,
  rdev: 0,
  blksize: undefined,
  ino: 7599824371195152,
  size: 36,
  blocks: undefined,
  atime: Thu Dec 10 2015 13:38:13 GMT+0800 (中国标准时间),                 
  mtime: Thu Dec 10 2015 13:48:09 GMT+0800 (中国标准时间),                 
  ctime: Thu Dec 10 2015 13:48:09 GMT+0800 (中国标准时间),                 
  birthtime: Thu Dec 10 2015 13:38:13 GMT+0800 (中国标准时间)
}
```

是一个 JSON 文件，这里比较有用的是`stats.size`、`stats.birthtime`、`stats.mtime`。

### 检测文件是否存在

```
// 检测文件是否存在,如果存在则增加内容,否则新建文件并写入内容
const fs = require('fs')
var writeData = function() {
    fs.access('sam.js', (noAccess) => {
        if (noAccess) {
            fs.writeFile('sam.js', 'sam', (err) => {
                if (!err) console.log('writeFile success')
            })
        } else {
            fs.appendFile('sam.js', 'sam', (err) => {
                if (!err) console.log('appendFile success~')
            })
        }
    })
}
writeData()
```

### 创建目录

```
var fs = require("fs");

var dir = __dirname + '/myDir';
fs.mkdir(dir, function(err){
  if (err) {
    return console.error(err);
  }
  console.log("目录创建成功。");
});
```

### 读取目录

```
var fs = require("fs");

fs.readdir(__dirname, function(err, files){
  if (err) {
    return console.error(err);
  }
  files.forEach(function (file){
    console.log(file); // file 指当前目录下的文件名
  });
});
```

### 删除目录

```
var fs = require("fs");

var dir = __dirname + '\\myDir'; // 在当前目录下创建一个名为 myDir 的目录，然后随便添加几个文件。当然也可以写成：__dirname + '/myDir'，NodeJS 会自动判断是 windows 的路径还是 *nix 的路径
// 要删除目录，首先要删除该目录下面所有文件
fs.readdir(dir, function(err, files){
  if (err) {
    return console.error(err);
  }
  // 遍历待删除目录下所有文件
  files.forEach(function (file){
    // 拼接文件路径，file 是文件名
    var filename = dir + '\\' + file;
    // 删除之
    fs.unlink(filename, function(err){
      if (err) {
        return console.error(err);
      }
      console.info("已删除" + file);
    })
  });
  // 这样就可以删除目录了
  fs.rmdir(dir, function(err) {
    if (err) {
      return console.error(err);
    }
    console.log("已删除目录：" + dir);
  })
});
```

注意到在 fs 操作中使用到回调函数的情况下，回调函数的第一个参数都是`err`！

## fs-extra

**写了这么多，其实并没有什么卵用。`fs-extra`模块对`fs`进行封装并提供更简洁的文件读写操作方式。**

### 创建 JSON 文件 -- outputJson

```
var fs = require('fs-extra');
var dn = __dirname;
var file = dn + '/dest.json';

fs.writeJson(file, {name: 'JP'}, function (err) {
  console.log(err) // => null
  
  // 读 JSON 文件
  fs.readJson(file, function(err, data) {
    console.log(data.name) // => JP
  })
})
```

若文件不存在，创建；存在，覆盖。

### 复制文件或目录 -- copy

```
var fs = require('fs-extra');

fs.copy(__dirname + '/src.txt', __dirname + '/dest.txt', function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('复制文件成功！')
  }
});

// 复制目录，即使目录不为空
var fs = require('fs-extra');
var dn = __dirname;

fs.copy(dn + '/src', dn + '/dest', function (err) {
  if (err) return console.error(err)
  console.log('success!')
})
```

### 写入流 -- createOutputStream

类似于`createWriteStream`，但即使文件不存在，也会创建成功。

```
var fs = require('fs-extra');
var dn = __dirname;

var ws = fs.createWriteStream(dn + '/ws.txt');
ws.write('hello, 这是测试文本！');
```

不管该目录下是否有文件，都清空。

### 新建与修改文件内容 -- outputFile

```
var fs = require('fs-extra');
var dn = __dirname;
var file = dn + '/dest.txt';

fs.writeFile(file, 'hello!', function (err) {
  console.log(err) // => null

  fs.readFile(file, 'utf8', function (err, data) {
    console.log(data) // => hello!
  })
})
```

当文件不存在，创建；若存在，则覆盖。

### 删除文件或目录 -- remove

```
var fs = require('fs-extra');
var dn = __dirname;
var file = dn + '/hah';

fs.remove(file, function (err) {
  if (err) return console.error(err)

  console.log('success!')
})
```

**不管是文件，还是文件夹（不论是否为空），均强制删除！**

### 新建文件夹 -- mkdirs

```
var fs = require('fs-extra');
var dn = __dirname;

var dir = dn + '/ha'
fs.mkdir(dir, function (err) {
  if (err) return console.error(err)
  console.log("success!")
})
```

文件夹不存在，则新建空目录；若存在，不操作。


### 移动文件夹 -- move

```
var fs = require('fs-extra');
var dn = __dirname;

var src = dn + '/src';
var dst = dn + '/dst';
fs.move(src, dst, function (err) {
  if (err) return console.error(err)
  console.log("success!")
})
```

将`src`目录下面的所有文件移动到`dst`目录下，且删除空目录`src`。

### 清空文件夹 -- emptyDir

```
var fs = require('fs-extra');
var dn = __dirname;

// assume this directory has a lot of files and folders
fs.emptyDir(dn + '/src', function (err) {
  if (!err) console.log('success!')
}) // copies directory, even if it has subdirectories or files
```

### 扫描文件夹 -- walk

```
var fs = require('fs-extra');
var dn = __dirname;
var dir = dn + '/dest';

var items = [] // files, directories, symlinks, etc
fs.walk(dir)
  .on('data', function (item) {
    items.push(item.path)
  })
  .on('end', function () {
    console.dir(items) // => [ ... array of files]
  })
```

先打印`dir`的路径，然后无序显示该目录下所有文件、目录及子孙文件、子孙目录。

## 事件驱动程序 - EventEmitter

```
var events = require('events'); // 导入事件模块
var eventEmitter = new events.EventEmitter(); // 实例化监听对象，EventEmitter 也是 events 的唯一一个对象

// 创建一个函数
var connectionHandler = function(argv1, argv2) {
  console.log('连接成功：' + argv1 + ', ' + argv2);
  eventEmitter.emit('connect');
};

// 通过 on 方法绑定名为 connect 的函数，函数体为 on 的第二个参数
eventEmitter.on('connect', function(){
  console.log('有数据');
});

// 第二个参数直接用了之前声明的函数体
// 可以把多个事件依次注册到同一个对象上
eventEmitter.on('connection', connectionHandler);
eventEmitter.on('connection', function(argv1, argv2){
  console.log(argv1 + ': ' + argv2);
});

var eL = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eL + '个事件');
eventEmitter.emit('connection', 'Hello', 'World');

// 移除监听器
eventEmitter.removeListener('connection', connectionHandler);

// 绑定事件名与事件体之后，使用 emit 方法触发它
eventEmitter.emit('connection', 'Hello', 'World');

var eL = require('events').EventEmitter.listenerCount(eventEmitter, 'connection');
console.log(eL + '个事件');
```

大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

为什么要这样做呢？原因有两点：首先，具有某个实体功能的对象实现事件符合语义， 事件的监听和发射应该是一个对象的方法。其次 JavaScript 的对象机制是基于原型的，支持 部分多重继承，继承 EventEmitter 不会打乱对象原有的继承关系。

## Buffer

JavaScript 有字符串数据类型，但无二进制数据类型。但在处理 TCP 流或文件流时，必须使用二进制数据。因此，Node.js 定义了一个 Buffer 类，该类用于创建一个专门存放二进制数据的缓冲区。

一个 Buffer 类似于一个整数数组，对应于 V8 堆内存之外的一块原始数据。

### 多种方式创建 Buffer 类

- `var buf = new Buffer(10);`
- `var buf = new Buffer([10, 20, 30, 40, 50]);`
- `var buf = new Buffer("www.turuir.cn", "utf-8");` // 还支持 ASCII & base64 & hex etc.

### 写入缓冲区

```
buf.write(string[, offset][, length][, encoding]); // 默认为0的索引值，长度buffer.length，默认为utf-8的编码

var buf = new Buffer(256);
var len = buf.write("练习", "utf-8");
console.log(len); // 6，一个汉字占3字符

var buf = new Buffer(26);
for (var i = 0; i < 26; i++) {
  // 类似于数组的操作
  buf[i] = i + 97;
}
console.log(buf.toString('ascii')); // 第二、三个参数默认为索引开始与结束，abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('utf-8', 0, 7)); // 从索引0开始，7结束，abcdefg
console.log(buf.toString(undefined, 0, 14)); // 默认utf-8编码，abcdefghijklmn
```

### 将 Buffer 转换成 JSON 对象

```
var buf = new Buffer('www.turuir.cn');
var json = buf.toJSON(buf);
console.log(json); // { type: 'Buffer', data: [119, 119, 119, 46, 116, 117, 114, 117, 105, 114, 46, 99, 110] }
```

### 缓冲区合并

```
var buf1 = new Buffer('博客');
var buf2 = new Buffer('www.turuir.cn');
var newBuf = Buffer.concat([buf1, buf2]);
console.log(newBuf); // <Buffer e5 8d 9a e5 ae a2 77 77 77 2e 74 75 72 75 69 72 2e 63 6e>
console.log(newBuf.toString()); // 博客www.turuir.cn
```

可以看出一个汉字的确占用了三个字符位（博 -- e5 8d 9a）。

### 缓冲区比较

```
var buf1 = new Buffer('ABC');
var buf2 = new Buffer('ABCD');
var r = buf1.compare(buf2);
if (r < 0) {
  console.log('buf1比buf2小'); // 结果在这里
} else if (r = 0) {
  console.log('buf1等于buf2');
} else {
  console.log('buf1比buf2大');
}
```

### 拷贝缓冲区

```
var buf1 = new Buffer('ABCDEFG');
var buf2 = new Buffer(4); // 大小为4
buf1.copy(buf2); // buf1复制到buf2，直到buf2装不下
console.log(buf2.toString()); // ABCD
```

## Stream

Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对 http 服务器发起请求的 request 对象就是一个 Stream，还有 stdout（标准输出）。

String 有四种流类型：

- Readable - 可读操作
- Writable - 可写操作
- Duplex - 可读可写操作
- Transform - 操作被写入数据，然后读出结果

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- data - 当有数据可读时触发
- end - 没有更多的数据可读时触发
- error - 在接收和写入过程中发生错误时触发
- finish - 所有数据已被写入到底层系统时触发

```
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function (chunk) {
    if (!ws.write(chunk)) {
        rs.pause();
    } else {
      console.log(chunk)
    }
});

// drain 代表可以继续往文件中写入内容了
ws.on('drain', function () {
    rs.resume();
});

rs.on('end', function () {
    ws.end();
});
```

PS：Stream 基于事件机制工作，所有 Stream 的实例都继承于 NodeJS 提供的 [EventEmitter](http://nodejs.org/api/events.html)。

### 读取数据流

```
var fs = require('fs');
var data = '';

var readStream = fs.createReadStream('test.txt');
readStream.setEncoding('utf-8');
readStream.on('data', function(chunk){
  data += chunk; // 持续执行此操作直到数据全读取完毕
});
readStream.on('end', function(chunk){
  console.log(data); // 数据读取完毕时触发的操作
});
readStream.on('error', function(err){
  console.log(err);
});
console.log('流读取完毕！');
```

### 写入流

```
var fs = require('fs');
var data = '博客地址：http://www.turuir.cn';

var writeStream = fs.createWriteStream('output.txt'); // 创建一个可写入的文件
writeStream.write(data, 'utf-8'); // 往文件里写数据
writeStream.end(); // 标记数据已全部写入，这里是结束
// 使用 on 方法监听事件，监听到写完了。如果没有上面的 end()，那便不会触发下面的 finish
writeStream.on('finish', function(){
  console.log('写入完毕！');
});
// 监听到有错误
writeStream.on('error', function(err){
  console.log(err);
});
// 不管监听到什么，程序执行结束了
console.log('流的写示例结束');
```

### 管道流

著名的前端构建工具 Gulp 就用了管道来管理数据。

```
var fs = require('fs');

var input = fs.createReadStream('test.txt');
var output = fs.createWriteStream('output.txt');
input.pipe(output);
console.log('管道示例结束！');
```

### 链式管道流

```
var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('test.txt').
  pipe(zlib.createGzip()).
  pipe(fs.createWriteStream('output.txt.gz'));
console.log('管道流示例结束！');
```

```
var fs = require('fs');
var zlib = require('zlib');

fs.createReadStream('output.txt.gz').
  pipe(zlib.createGunzip()).
  pipe(fs.createWriteStream('output.txt'));
```
