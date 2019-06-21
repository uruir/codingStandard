## 什么是 npm

npm 是 [Node.js](https://nodejs.org) 自带的以 JavaScript 编写的软件包管理系统，最初由 [Isaac Z. Schlueter](https://github.com/isaacs) 使用 JS 开发，目的是让 JS 开发者易于**分享**和**复用**代码，同时也很容易更新已分享的代码，作用是让开发者从繁琐的包管理工作中解放出来，更加专注于功能的开发。可通过 `npm install -g npm@latest` 安装最新版。

它包含三个独立的部分：
- [website](https://www.npmjs.com)：查找和管理包的网站
- [CLI](https://docs.npmjs.com/cli/npm)：Command Line Interface，在终端运行，大部分开发者通过 CLI 与 npm 交互
- [registry](https://docs.npmjs.com/misc/registry)：是一个大型 JS 软件包仓库，包含海量包信息，开发者发布到这里的包采用 CommonJS 模式，包含一个名为 package.json 的文件。此仓库基于 CouchDB。

截止 2019 年 5 月，npm 拥有超 [82 万](https://skimdb.npmjs.com/registry)个库，是世界上[最大](http://www.modulecounts.com)的开源库集合，每月有超过 1000 万个用户进行超过 [400 亿](https://api.npmjs.org/downloads/point/last-month)次下载，最高的一天 JS 包下载量超 [19 亿](https://api.npmjs.org/downloads/range/last-month)。现代 Web 应用程序中 97% 代码来自 npm，只有 3% 是应用程序独有的代码。

|[库](https://npmcharts.com/compare/react,angular,@angular/core,vue?interval=30)|[star](https://star-history.t9t.io/#facebook/react&vuejs/vue)|[下载量](https://npm-stat.com/charts.html?package=react&package=vue&package=angular)|
|:---:|:---:|:---:|
|react|128967|高|
|vue|138.377|中|
|[angular](https://github.com/angular/angular)|47999|低|

注：在 2018 年 4 月，npm 收购 Lift Security 及其产品 Node Security Platform。现在集成了 NSP 的 npm 在每次安装时都会进行安全审计，通知开发者他们安装的模块是否安全。执行 `npm i` 命令时将显示如下信息：

```
audited 18320 packages in 15.105s
found 368 vulnerabilities (62 low, 274 moderate, 31 high, 1 critical)
run `npm audit fix` to fix them, or `npm audit` for details
```


## npm 原理

npm 是一个使用 Node.js 开发的命令行程序，也是 Node.js 默认的包管理器。常见的 CLI 还有 create-react-app、webpack。

Node.js 通过读 js 文件或目录下的 index.js 文件来导入模块，npm 通过在目录下添加 package.json 来管理模块。

大多数包（package）都是模块（module），但是一些 cli 程序的包只含一些可执行的命令行程序，没有提供 main 字段来指定程序供外部使用，这些 cli 不是模块。

|模式|通过 require 使用|注册 PATH|
|:---:|:---:|:---:|
|全局模式|否|是|
|本地模式|是|否|

全局安装将模块安装到系统目录中（package.json 中 bin 配置的命令添加到 $PATH 中，如 macOS 中 npm 会在 /usr/local/bin 下创建该命令的软链接，指向全局安装下来的该包），适用于工具模块如 `webpack`，直接在命令行运行此模块。

本地安装将模块安装到项目的 `node_modules` 目录中，通过 `require` 引入本地已安装的模块。
安装之前会先检查 `node_modules` 目录中是否已存在兼容版本的指定模块。如果存在则不安装。通过 package 安装和 cli 安装指定模块。

系统软件包管理器的思路：

- 检查软件包的依赖关系，找到该软件包依赖的所有软件包，得到所有依赖关系的信息文件
- 根据依赖关系的信息文件从软件源所指的镜像站点中，下载相关软件包，解压软件包
- 解压后的软件包有两种内容：可执行文件和源程序
- 如果包中是源程序，还需要编译器将其编译成为可执行文件
- 根据可执行文件完成应用程序的安装和配置

npm 遵循上述思路，大部分的安装包都是从 npm 仓库（基于 CouchDB 的数据库，包含包的名称、作者、依赖等信息）下载。

使用 npm-cli 的命令对 npm 数据库进行 CRUD 操作。

npm v3 开始使用扁平化 node_modules 目录。

### [semver](https://semver.org/lang/zh-CN/)

Semantic Versioning 格式：major.minor.patch

|代码状态|示例|对应命令|package.json|
|:---:|:---:|:---:|:---:|
|首次发布|1.0.0|npm init|1.0.0|
|发布补丁|1.0.1|npm version patch|兼容补丁版本： ~1.0.1|
|发布功能|1.1.0|npm version minor|兼容新发布的小版本、补丁：^1.1.0|
|发布大版本|2.0.0|npm version major|兼容所有版本：* or x|

[示例](https://semver.npmjs.com)

执行 `npm i` 时根据依赖包的版本值来确定是否下载新版本及更新 package.json 文件。 

### npm-cli 文件

```
#!/usr/bin/env node
;(function () { // wrapper in case we're in module_context mode
  ...
  process.title = 'npm'

  var npm = require('../lib/npm.js')
  var npmconf = require('../lib/config/core.js')

  npm.load(conf, function (er) {
    // 版本升级相关代码
    npm.commands[npm.command](npm.argv, function (err) {
      // https://genius.com/Lin-manuel-miranda-your-obedient-servant-lyrics
      if (
        !err &&
        npm.config.get('ham-it-up') &&
        !npm.config.get('json') &&
        !npm.config.get('parseable') &&
        npm.command !== 'completion'
      ) {
        console.error(
          `\n ${
            npm.config.get('unicode') ? '🎵 ' : ''
          } I Have the Honour to Be Your Obedient Servant,${
            npm.config.get('unicode') ? '🎵 ' : ''
          } ~ npm ${
            npm.config.get('unicode') ? '📜🖋 ' : ''
          }\n`
        )
      }
      errorHandler.apply(this, arguments)
    })
  })
})()
```

### npm init（文件路径：/lib/init.js）

生成一个 `package.json` 文件，该文件用于定义包描述文件，通过添加 `-y` 或 `--yes` 将使用已配置的值自动填充，用于跳过提问阶段。

若已使用 `npm [config] set init-author-name 'yourname'` 等，设置的这些值会存放在用户主目录 `~/.npmrc` 文件中，为 `npm init` 提供默认值。

可以使用 [npmrc](https://github.com/deoxxa/npmrc) 切换默认配置。

可以在用户根目录下创建 `.npm-init.js` 文件用于自定义 `npm init` 创建的初始文件。

### npm publish（文件路径：/lib/publish.js）

```
npm whoami
npm adduser
npm login
npm version major/minor/patch
npm publish
```

注：若 package.json 里 scripts 含 prepublish/postpublish，则 `npm publish` 时会执行相应钩子。

### npm install（文件路径：/lib/install.js）

有如下几种安装方式：

```
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>
```

`npm install` 安装时，优先检查 npm-shrinkwrap.json 再检查 package-lock.json。

1. 执行 package.json 文件里 scripts.preinstall

    当前项目如果定义了 preinstall 钩子此时会被执行，即自动执行 `npm run preinstall`。

2. 确定首层依赖模块

    从 package.json 中的 dependencies 和 devDependencies 将依赖包安装到当前目录的 node_modules 中。npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

3. 获取模块

    获取模块前确定其版本，package.json 中版本遵循 semantic versioning，如果版本描述文件（package-lock.json）中有该模块信息直接获取到 resolved，如果没有则从 npm 仓库获取满足 semantic 规范的最新版的 resolved。（和通过 https://registry.npmjs.org/react 获取到的 versions.latest-version.dist.tarball 值相同）

    ```
    {
      "name": "demo7",
      "version": "1.0.0",
      "lockfileVersion": 1,
      "requires": true,
      "dependencies": {
        "react": {
          "version": "16.8.6",
          "resolved": "https://registry.npmjs.org/react/-/react-16.8.6.tgz",
          "integrity": "sha512-pC0uMkhLaHm11ZSJULfOBqV4tIZkx87ZLvbbQYunNixAAvjnC+snJCg0XQXn9VIsttVsbZP/H/ewzgsd5fxKXw==",
          "requires": {
            "loose-envify": "1.4.0",
            "object-assign": "4.1.1",
            "prop-types": "15.7.2",
            "scheduler": "0.13.6"
          }
        }
      }
    }
    ```

    npm 根据 resolved 检查本地缓存（通过 `npm get cache` 获取缓存位置，一般位于 ~/.npm/_cacache，不是以模块名分类方式存放。将缓存里 content-v2 目录下的二进制文件添加扩展名 .tgz 再解压便得到 npm 包，index-v5 为索引文件的目录），有则获取，无则从 npm 仓库下载。
    ```
    .
    ├── content-v2
    ├── index-v5
    └── tmp
    ```
    递归上述两步骤。

4. 模块扁平化

    上述获取到的是一棵完整的依赖树，其中可能包含大量重复模块。
    
    从 npm v3 开始使用 dedupe 过程，遍历所有节点并将模块放到 node_modules 下面，有重复模块则丢弃。这里的重复是指模块名相同且 semver 兼容。

5. 安装模块

    install, postinstall etc.

6. 生成或更新 package.json/package-lock.json

/lib/install.js
```
function install (where, args, cb) {
    // where 是项目路径
    // args 是 npm install 的配置参数，值为 []
    // cb 是执行 npm install 命令的回调函数，做一些错误处理，位于 /bin/npm-cli.js 第 133 - 154 行
    // 配置参数 --dry-run 默认值为 false，指不会真的生成项目, 而是会打印出来如果创建该项目的话哪些文件将会生成
    new Installer(where, dryrun, args).run(cb)
}
function Installer (where, dryrun, args, opts) {
    // 定义变量，如 where, dryrun, 依赖包树结构等
    this.where = where
}
```

```
Installer.prototype.run = function (_cb) {
    var installSteps = []
    var postInstallSteps = []
    // 若添加 --dry-run 则只显示执行过程而不实际执行
    if (!this.dryrun) {
        installSteps.push(
            // newTracker 将信息显示在终端
            [this.newTracker(log, 'runTopLevelLifecycles', 2)],
            // 调用 /lib/install/actions 执行 preinstall，等价于 npm run preinstall
            [this, this.runPreinstallTopLevelLifecycles])
    }
    installSteps.push(
        [this.newTracker(log, 'loadCurrentTree', 4)],
        // 将 package.json 相关信息及 npm install 的配置信息整合在一起，优先级 npm-shrinkwrap.json > package-lock.json > package.json，然后调用 pacote 库生成 currentTree
        [this, this.loadCurrentTree],
        [this, this.finishTracker, 'loadCurrentTree'],

        [this.newTracker(log, 'loadIdealTree', 12)],
        // 优化 currentTree 并执行 pruneIdealTree，表示 lock file 里没有但 package.json 的依赖里存在的包
        [this, this.loadIdealTree],
        [this, this.finishTracker, 'loadIdealTree'],

        [this, this.debugTree, 'currentTree', 'currentTree'],
        [this, this.debugTree, 'idealTree', 'idealTree'],

        [this.newTracker(log, 'generateActionsToTake')],
        [this, this.generateActionsToTake], // diff tree, check permission
        [this, this.finishTracker, 'generateActionsToTake'],

        [this, this.debugActions, 'diffTrees', 'differences'],
        [this, this.debugActions, 'decomposeActions', 'todo'],
        [this, this.startAudit]) // this.startAudit 等价于执行 npm audit

    // 若添加配置参数 --package-lock-only 则仅更新 package-lock.json 文件
    if (this.packageLockOnly) {
        postInstallSteps.push([this, this.saveToDependencies])
    } else if (!this.dryrun) {
        installSteps.push(
            [this.newTracker(log, 'executeActions', 8)],
            [this, this.executeActions], // 执行一些 fetch/extract/preinstall/remove 等操作，比如将压缩包从 node_modules/.staging 解压到 node_modules 中并删除 .staging，解压时校验 integrity 和 resovled 字段
            [this, this.finishTracker, 'executeActions'])

            var node_modules = path.resolve(this.where, 'node_modules')
            var staging = path.resolve(node_modules, '.staging')

            postInstallSteps.push(
            [this.newTracker(log, 'rollbackFailedOptional', 1)],
            [this, this.rollbackFailedOptional, staging, this.todo],
            [this, this.finishTracker, 'rollbackFailedOptional'],
            [this, this.commit, staging, this.todo],

            [this, this.runPostinstallTopLevelLifecycles],
            [this, this.finishTracker, 'runTopLevelLifecycles']
        )
        if (getSaveType()) {
            postInstallSteps.push(
                // this is necessary as we don't fill in `dependencies` and `devDependencies` in deps loaded from shrinkwrap
                // until after we extract them
                [this, (next) => { computeMetadata(this.idealTree); next() }],
                [this, this.pruneIdealTree], // 清除 node_modules 里没有，但是 package.json 的依赖里却有的包
                [this, this.debugLogicalTree, 'saveTree', 'idealTree'],
                [this, this.saveToDependencies])
        }
    }
    postInstallSteps.push(
        [this, this.printWarnings],
        [this, this.printInstalled])

    var self = this
    chain(installSteps, function (installEr) {
        if (installEr) self.failing = true
        chain(postInstallSteps, function (postInstallEr) {
            // 错误处理
            cb(installEr || postInstallEr, self.getInstalledModules(), self.idealTree)
        })
    })
  return result
}
```

```
Installer.prototype.loadCurrentTree = function (cb) {
    validate('F', arguments)
    log.silly('install', 'loadCurrentTree')
    var todo = []
    // 全局安装还是本地安装
    if (this.global) {
        todo.push([this, this.readGlobalPackageData])
    } else {
        todo.push([this, this.readLocalPackageData])
    }
    todo.push([this, this.normalizeCurrentTree]) // 将 node_modules 里扁平化
    chain(todo, cb) // 执行
}
```

```
Installer.prototype.readLocalPackageData = function (cb) {
    validate('F', arguments)
    log.silly('install', 'readLocalPackageData')
    var self = this
    mkdirp(this.where, iferr(cb, function () {
        readPackageTree(self.where, iferr(cb, function (currentTree) {
            self.currentTree = currentTree
            self.currentTree.warnings = []
            if (currentTree.error && currentTree.error.code === 'EJSONPARSE') {
                return cb(currentTree.error)
            }
            if (!self.noPackageJsonOk && !currentTree.package) {
                log.error('install', "Couldn't read dependencies")
                var er = new Error("ENOENT, open '" + path.join(self.where, 'package.json') + "'")
                ...
            }
            if (!currentTree.package) currentTree.package = {}
            readShrinkwrap(currentTree, function (err) {
                if (err) { cb(err) } else {
                    self.loadArgMetadata(cb) // 该方法体内将调用 pacote 库从本地或 registry 下载
                }
            })
        }))
    }))
}
```

/lib/install/read-shrinkwrap.js
```
function readShrinkwrap (child, next) {
    if (child.package._shrinkwrap) return process.nextTick(next)
    BB.join( // BB 指 bluebird
        maybeReadFile('npm-shrinkwrap.json', child),
        // Don't read non-root lockfiles
        child.isTop && maybeReadFile('package-lock.json', child),
        child.isTop && maybeReadFile('package.json', child),
        (shrinkwrap, lockfile, pkgJson) => {
            if (shrinkwrap && lockfile) {
                log.warn('read-shrinkwrap', 'Ignoring package-lock.json because there is already an npm-shrinkwrap.json. Please use only one of the two.')
            }
            // 优先使用 npm-shrinkwrap.json 里的包信息
            const name = shrinkwrap ? 'npm-shrinkwrap.json' : 'package-lock.json'
            const parsed = parsePkgLock(shrinkwrap || lockfile, name)
            if (parsed && parsed.lockfileVersion !== PKGLOCK_VERSION) {
                log.warn('read-shrinkwrap', `This version of npm is compatible with lockfileVersion@${PKGLOCK_VERSION}, but ${name} was generated for lockfileVersion@${parsed.lockfileVersion || 0}. I'll try to do my best with it!`)
            }
            child.package._shrinkwrap = parsed
        }
    ).then(() => next(), next)
}
```

/node_modules/pacote/lib/util/fetch.js
```
function getFetcher (type) {
    if (!fetchers[type]) {
        // This is spelled out both to prevent sketchy stuff and to make life
        // easier for bundlers/preprocessors.
        switch (type) {
            case 'alias':
                fetchers[type] = require('./fetchers/alias')
                break
            case 'directory':
                fetchers[type] = require('./fetchers/directory')
                break
            case 'file':
                fetchers[type] = require('./fetchers/file')
                break
            case 'git':
                fetchers[type] = require('./fetchers/git')
                break
            case 'hosted':
                fetchers[type] = require('./fetchers/hosted')
                break
            case 'range':
                fetchers[type] = require('./fetchers/range')
                break
            case 'remote':
                fetchers[type] = require('./fetchers/remote')
                break
            case 'tag':
                fetchers[type] = require('./fetchers/tag')
                break
            case 'version':
                fetchers[type] = require('./fetchers/version')
                break
            default:
                throw new Error(`Invalid dependency type requested: ${type}`)
        }
    }
    return fetchers[type]
}
```

```
Installer.prototype.normalizeCurrentTree = function (cb) {
    this.currentTree.isTop = true
    normalizeTree(this.currentTree)
    // If the user didn't have a package.json then fill in deps with what was on disk
    if (this.currentTree.error) {
        for (let child of this.currentTree.children) {
            if (!child.fakeChild && isExtraneous(child)) {
                this.currentTree.package.dependencies[moduleName(child)] = computeVersionSpec(this.currentTree, child)
            }
        }
    }
    computeMetadata(this.currentTree)
    return cb()

    function normalizeTree (tree, seen) {
        if (!seen) seen = new Set()
        if (seen.has(tree)) return
        seen.add(tree)
        createNode(tree)
        tree.location = flatNameFromTree(tree) // 调用 /install/flatten-tree.js 将 node_modules 扁平化
        tree.children.forEach((child) => normalizeTree(child, seen))
    }
}
```

```
Installer.prototype.saveToDependencies = function (cb) {
    validate('F', arguments)
    if (this.failing) return cb()
    log.silly('install', 'saveToDependencies')
    // package-lock-only，默认为 false，若为 true 则只更新 package-lock.json，不检查 node_modules 也不下载依赖
    // idealTree 即是优化后的 node_modules 树
    if (this.saveOnlyLock) {
        saveShrinkwrap(this.idealTree, cb)
    } else {
        saveRequested(this.idealTree, cb) // 若 idealTree === package.json 则不保存，否则更新 package.json 文件 
    }
}
```

使用 `npm ls --depth 1` 查看依赖树结构。

与本地依赖包安装的 node_modules 扁平结构不同，global 方式依然使用传统的目录结构。若本地想得到传统目录结构使用 `npm i --global-style`。

### npm run

运行 `npm run test` 时会将 node_modules/.bin 目录临时添加到环境变量。

因此可以使用 `"scripts": {"test": "tap test/\*.js"}` 代替 `"scripts": {"test": "node_modules/.bin/tap test/\*.js"}`

### npx

npm v5.2.0 版本中内置了伴生命令：npx，类似于 npm 简化了项目开发中的依赖安装与管理，该工具致力于提升开发者使用包提供的命令行的体验。

npx 允许我们使用本地安装的命令行工具而不需要再定义 `npm run-script`，并且允许我们仅执行一次脚本而不需要再将其实际安装到本地；同时 npx 还允许我们以不同的 node 版本来运行指定命令、允许我们交互式地开发 node 命令行工具以及便捷地安装来自于 gist 的脚本。

## Node.js 创建命令行工具简单示例

1. 安装 commander inquirer chalk
2. 编写自己的命令行代码
```
#! /usr/bin/env node 

const program = require('commander')
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

program
    .command('install')
    .alias('i')
    .description('安装新的模块')
    .option('-a, --name [moduleName]', '模块名称')
    .action(option => {
        if (typeof option !== 'string') {
            fs.exists(path.resolve(__dirname, 'package.json'), function(exists) {
                if (exists) {
                    console.log('解析 package.json 并安装模块')
                } else {
                    inquirer.prompt({
                        type: 'input',
                        name: 'moduleName',
                        message: '请输入模块名称',
                        validate: function (input){
                            if(!input) {
                                return '不能为空'
                            }
                            return true
                        }
                    }).then(function (answer) {
                        console.log('模块名为：', chalk.green(answer.moduleName))
                    })
                }
            })
        } else {
            console.log('已安装：', option)
        }
    })
    
program.parse(process.argv)
```
3. 创建软链接

> /usr/local/bin/mynpm -> /usr/local/lib/node_modules/npmdemo/mynpm

> /usr/local/lib/node_modules/npmdemo -> /Users/username/yourprojectpath/npmdemo

注：`npm link` 通过 package.json 里 bin 字段将命令加入全局模块安装目录，并创建符号链接。

### 更新全局 npm 包

```
npm-check -u -g
npm update -g
npm outdated -g
```

### npm vs maven

包管理工具核心要素：

||npm|maven|
|:---:|:---:|:---:|
|配置文件|package.json|pom.xml|
|包的命名规则|name@version|groupId + artifactId + version|
|依赖源|https://registry.npmjs.org/||
|CLI|npm|mvn|

避免依赖冲突：

|npm|maven|
|:---:|:---:|
|扁平化，对于包名相同版本不同且不兼容的包，除第一次将包放入 node_modules 之外，其余的该包（不同版本且不兼容）放入依赖包内的 node_modules|依赖配置提供了 exclude 机制，用于阻断部分库的传递依赖|

区别：

- maven 管理的包是二进制的 jar 包，发布前需要编译，而依赖和编译紧密相关；而 npm 无需编译成二进制文件，对于使用 JS 新特性编写的代码只需要通过 babel 等工具转译成 ES5
- maven 不是单纯的包管理工具，而是项目管理工具，参与项目的整个生命周期

maven 特点：约定大于配置（Convention Over Configuration）


## 参考来源

1: https://blog.npmjs.org/post/180868064080/this-year-in-javascript-2018-in-review-and-npms

2: https://juejin.im/post/5c77e05e518825407a32b94b