在使用 Node.js 过程中，会遇到很多包提供全局安装，然后提供一些命令，通过在终端里键入命令完成任务，如 Gulp、Hexo 等。

通过 [commander](https://github.com/tj/commander.js) 开发这样的命令行工具。

commander 是一个轻巧的 Node.js 模块，提供了用户命令行输入和参数解析等强大功能，源自同名 ruby 项目。

```
// test.js
var program = require('commander');

program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq', 'Add bbq sauce')
  .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
  .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbq) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);
```

## 命令行测试：

无参数：`node test`，显示：

```
you ordered a pizza with:
  - marble cheese
```

多个参数：`node test -bcp`，显示：

```
you ordered a pizza with:
  - peppers
  - bbq
  - marble cheese
```

帮助：`node test --help`，显示：

```
Usage: test [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -p, --peppers        Add peppers
    -P, --pineapple      Add pineapple
    -b, --bbq            Add bbq sauce
    -c, --cheese [type]  Add the specified type of cheese [marble]
```

## API:

```
Option(): 初始化自定义参数对象，设置“关键字”和“描述”
Command(): 初始化命令行参数对象，直接获得命令行输入
Command#command(): 定义一个命令名字
Command#action(): 注册一个callback函数
Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
Command#parse(): 解析命令行参数argv
Command#description(): 设置description值
Command#usage(): 设置usage值
```

再来个例子（myApp.js）：

```
#!/usr/bin/env node

var program = require('commander');

// 命令版本号
program.version('0.0.2');

// help命令
program
  .command('help')
  .description('显示使用帮助')
  .action(function () {
    program.outputHelp();
  });

// create命令
program
  .command('create [dir]')
  .description('创建一个空的博客')
  .action(require('../lib/cmd_create'));

// preview命令
program
  .command('preview [dir]')
  .description('实时预览')
  .action(require('../lib/cmd_preview'));

// build命令
program
  .command('build [dir]')
  .description('生成整站静态HTML')
  .option('-o, --output <dir>', '生成的静态HTML存放目录')
  .action(require('../lib/cmd_build'));

// 开始解析命令
program.parse(process.argv);
```

第一行是 shell 的写法，表示用 node 执行该文件。

比如我发布了一个名叫`itachi`的包，`itachi create`中的`itachi`是包名，`create`就是具体要通过`itachi`执行的操作了，即上面示例中的`program.command('create [dir]')`。`description`是对操作的解释，`action`是执行该操作触发的行为。

## 发布为运行命令

新建 package.json 文件：

```
{
    "name": "myApp",
    "version": "0.0.1",
    "description": "commander",
    "preferGlobal": "true",
    "bin": { "itachi": "myApp.js" },
    "author": "xx",
    "engines": { "node": "*" }
}
```

在终端键入：`node link`即可将其注册为全局命令了，以后只要`itachi create`即可完成指令。

[查看更多](http://binbinliao.com/programming/commandline-nodejs.html)

